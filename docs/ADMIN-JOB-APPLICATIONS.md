# Job Applications - Admin Implementation Guide

Kode som må legges til i admin-repoet for å motta jobbsøknader fra bluecrew.no.

## 1. Database Migration

**Opprett fil:** `supabase/migrations/20241122_job_applications.sql`

```sql
-- =====================================================
-- JOB APPLICATIONS TABLE
-- Mottar søknader fra bluecrew.no job portal
-- =====================================================

CREATE TABLE IF NOT EXISTS job_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_posting_id UUID REFERENCES job_postings(id) ON DELETE SET NULL,

  -- Søker info
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  cover_letter TEXT,
  cv_key TEXT,

  -- Vipps/BankID verifisering
  vipps_verified BOOLEAN DEFAULT false,
  vipps_sub TEXT UNIQUE,  -- Unik Vipps bruker-ID
  vipps_phone TEXT,
  vipps_name TEXT,
  vipps_verified_at TIMESTAMPTZ,

  -- Metadata
  source TEXT DEFAULT 'web',
  user_agent TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'contacted', 'interview', 'rejected', 'hired')),
  notes TEXT,
  reviewed_by UUID,
  reviewed_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

-- Indexes for performance
CREATE INDEX idx_job_applications_job_posting ON job_applications(job_posting_id);
CREATE INDEX idx_job_applications_status ON job_applications(status);
CREATE INDEX idx_job_applications_created ON job_applications(created_at DESC);
CREATE INDEX idx_job_applications_vipps_sub ON job_applications(vipps_sub);

-- Function to increment application count
CREATE OR REPLACE FUNCTION increment_application_count(posting_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE job_postings
  SET application_count = COALESCE(application_count, 0) + 1,
      updated_at = NOW()
  WHERE id = posting_id;
END;
$$ LANGUAGE plpgsql;

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION update_job_applications_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER job_applications_updated_at
  BEFORE UPDATE ON job_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_job_applications_updated_at();

-- RLS Policies (adjust based on your auth setup)
CREATE POLICY "Service role full access" ON job_applications
  FOR ALL TO service_role USING (true) WITH CHECK (true);
```

---

## 2. API Endpoint

**Opprett fil:** `app/api/job-applications/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// CORS headers - tillat requests fra bluecrew.no
const corsHeaders = {
  "Access-Control-Allow-Origin": process.env.NODE_ENV === "production"
    ? "https://bluecrew.no"
    : "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Handle preflight requests
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// POST - Motta ny søknad fra bluecrew.no
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const { job_posting_id, name, email, phone } = body;

    if (!job_posting_id || !name || !email || !phone) {
      return NextResponse.json(
        { error: "Mangler påkrevde felt: job_posting_id, name, email, phone" },
        { status: 400, headers: corsHeaders }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Ugyldig e-postadresse" },
        { status: 400, headers: corsHeaders }
      );
    }

    // Check if job posting exists and is active
    const { data: jobPosting, error: jobError } = await supabase
      .from("job_postings")
      .select("id, title, status")
      .eq("id", job_posting_id)
      .single();

    if (jobError || !jobPosting) {
      return NextResponse.json(
        { error: "Stillingen finnes ikke" },
        { status: 404, headers: corsHeaders }
      );
    }

    if (jobPosting.status !== "active") {
      return NextResponse.json(
        { error: "Stillingen er ikke lenger aktiv" },
        { status: 400, headers: corsHeaders }
      );
    }

    // Check for duplicate application (same vipps_sub for same job)
    if (body.vipps_sub) {
      const { data: existing } = await supabase
        .from("job_applications")
        .select("id")
        .eq("job_posting_id", job_posting_id)
        .eq("vipps_sub", body.vipps_sub)
        .single();

      if (existing) {
        return NextResponse.json(
          { error: "Du har allerede søkt på denne stillingen" },
          { status: 409, headers: corsHeaders }
        );
      }
    }

    // Insert application
    const { data, error } = await supabase
      .from("job_applications")
      .insert({
        job_posting_id: body.job_posting_id,
        name: body.name.trim(),
        email: body.email.trim().toLowerCase(),
        phone: body.phone.trim(),
        cover_letter: body.cover_letter?.trim() || null,
        cv_key: body.cv_key || null,
        vipps_verified: body.vipps_verified || false,
        vipps_sub: body.vipps_sub || null,
        vipps_phone: body.vipps_phone || null,
        vipps_name: body.vipps_name || null,
        vipps_verified_at: body.vipps_verified_at || null,
        source: body.source || "web",
        user_agent: body.user_agent || null,
        status: "new",
      })
      .select()
      .single();

    if (error) {
      console.error("Failed to insert job application:", error);
      return NextResponse.json(
        { error: "Kunne ikke lagre søknaden" },
        { status: 500, headers: corsHeaders }
      );
    }

    // Increment application count on job posting
    await supabase.rpc("increment_application_count", {
      posting_id: job_posting_id,
    });

    // TODO: Send notification email to admin
    // await sendApplicationNotification(data, jobPosting);

    console.log(`New job application received: ${data.id} for ${jobPosting.title}`);

    return NextResponse.json(
      {
        success: true,
        id: data.id,
        message: "Søknad mottatt!"
      },
      { status: 201, headers: corsHeaders }
    );

  } catch (err) {
    console.error("Job application error:", err);
    return NextResponse.json(
      { error: "Intern serverfeil" },
      { status: 500, headers: corsHeaders }
    );
  }
}

// GET - Hent søknader (for admin dashboard)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const jobPostingId = searchParams.get("job_posting_id");
    const status = searchParams.get("status");
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");

    let query = supabase
      .from("job_applications")
      .select(`
        *,
        job_posting:job_postings(id, title, company_name)
      `)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (jobPostingId) {
      query = query.eq("job_posting_id", jobPostingId);
    }

    if (status) {
      query = query.eq("status", status);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error("Failed to fetch applications:", error);
      return NextResponse.json(
        { error: "Kunne ikke hente søknader" },
        { status: 500, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      { applications: data, total: count },
      { headers: corsHeaders }
    );

  } catch (err) {
    console.error("Get applications error:", err);
    return NextResponse.json(
      { error: "Intern serverfeil" },
      { status: 500, headers: corsHeaders }
    );
  }
}
```

---

## 3. Update Application Status Endpoint

**Opprett fil:** `app/api/job-applications/[id]/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// PATCH - Update application status
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    const allowedUpdates = ["status", "notes", "reviewed_by"];
    const updates: Record<string, unknown> = {};

    for (const key of allowedUpdates) {
      if (body[key] !== undefined) {
        updates[key] = body[key];
      }
    }

    if (body.status && !["new", "reviewed", "contacted", "interview", "rejected", "hired"].includes(body.status)) {
      return NextResponse.json(
        { error: "Ugyldig status" },
        { status: 400 }
      );
    }

    // Set reviewed_at when status changes from 'new'
    if (body.status && body.status !== "new") {
      updates.reviewed_at = new Date().toISOString();
    }

    const { data, error } = await supabase
      .from("job_applications")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Failed to update application:", error);
      return NextResponse.json(
        { error: "Kunne ikke oppdatere søknad" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, application: data });

  } catch (err) {
    console.error("Update application error:", err);
    return NextResponse.json(
      { error: "Intern serverfeil" },
      { status: 500 }
    );
  }
}

// GET - Get single application
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const { data, error } = await supabase
      .from("job_applications")
      .select(`
        *,
        job_posting:job_postings(id, title, company_name, location)
      `)
      .eq("id", id)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: "Søknad ikke funnet" },
        { status: 404 }
      );
    }

    return NextResponse.json(data);

  } catch (err) {
    console.error("Get application error:", err);
    return NextResponse.json(
      { error: "Intern serverfeil" },
      { status: 500 }
    );
  }
}
```

---

## 4. Sjekkliste

- [ ] Kjør database migration i Supabase
- [ ] Opprett `app/api/job-applications/route.ts`
- [ ] Opprett `app/api/job-applications/[id]/route.ts`
- [ ] Test med curl:
  ```bash
  curl -X POST https://admincrew.no/api/job-applications \
    -H "Content-Type: application/json" \
    -d '{"job_posting_id":"test-uuid","name":"Test","email":"test@test.no","phone":"12345678"}'
  ```
- [ ] Legg til i admin dashboard UI (valgfritt)

---

## 5. Request/Response Format

### POST /api/job-applications

**Request:**
```json
{
  "job_posting_id": "uuid",
  "name": "Ola Nordmann",
  "email": "ola@example.com",
  "phone": "+47 900 00 000",
  "cover_letter": "Jeg er interessert...",
  "cv_key": "path/to/cv.pdf",
  "vipps_verified": true,
  "vipps_sub": "unique-vipps-id",
  "vipps_phone": "+47 900 00 000",
  "vipps_name": "Ola Nordmann",
  "vipps_verified_at": "2024-11-22T10:00:00Z",
  "source": "web",
  "user_agent": "Mozilla/5.0..."
}
```

**Response (201):**
```json
{
  "success": true,
  "id": "application-uuid",
  "message": "Søknad mottatt!"
}
```

**Error Response (400/500):**
```json
{
  "error": "Beskrivelse av feil"
}
```
