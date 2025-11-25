# CLAUDE.md - AI Assistant Guide for Bluecrew Codebase

This document provides comprehensive guidance for AI assistants working on the Bluecrew codebase. Last updated: 2025-11-25

## Table of Contents
1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Directory Structure](#directory-structure)
4. [Development Workflow](#development-workflow)
5. [Code Conventions](#code-conventions)
6. [Key Patterns](#key-patterns)
7. [Security Guidelines](#security-guidelines)
8. [Common Tasks](#common-tasks)
9. [Testing & Quality](#testing--quality)
10. [Deployment](#deployment)

---

## Project Overview

**Name:** Bluecrew AS
**Industry:** Maritime staffing and recruitment (Norway)
**Tech:** Next.js 15.5.5 (App Router), React 19, TypeScript 5
**Database:** Supabase (PostgreSQL + Storage)
**Hosting:** Vercel

### Business Context
- Provides staffing (bemanning) and recruitment for maritime industry
- Targets: Ship captains, mates, sailors, engineers, deck officers
- Clients: Aquaculture, fishing, offshore, service vessels
- Geographic focus: Norway (especially Northern Norway)
- Requires STCW-2010 maritime certifications

### Core Features
- **User Authentication**: Clerk-based login/registration with email verification
- **User Portal** (`/min-side`): View applications, download personal data, request deletion (GDPR)
- Candidate registration with CV/certificate uploads
- Client needs registration (business leads)
- Vipps identity verification (Norwegian BankID) - for enhanced verification
- Salary calculator with 7 positions (matros, dekksoffiser, styrmann, kaptein, maskinoffiser, akvatekniker, kokk)
- Career guides for maritime professions
- Job postings (currently in testing, not public)
- Contact forms and interest registration

---

## Tech Stack

### Frontend
- **Next.js 15.5.5** with App Router (RSC enabled)
- **React 19.1.0** (latest stable)
- **TypeScript 5** (strict mode)
- **Tailwind CSS 4** (PostCSS plugin)
- **Vanilla Extract CSS** (type-safe CSS-in-TypeScript, zero-runtime)

### Backend & Services
- **Supabase**: PostgreSQL database + file storage (Row Level Security enabled)
- **Upstash Redis**: Rate limiting (sliding window, 8 req/min per IP)
- **Resend**: Transactional email with HTML templates
- **Clerk Pro**: User authentication with Organizations, publicMetadata, webhooks
- **Vipps**: OAuth 2.0 identity verification (Norwegian BankID) - stored in Clerk metadata
- **AdminCrew API**: External admin backend at `admincrew.no` for job postings and applications

### Validation & Security
- **Custom Zod** (`app/lib/zod.ts`): Lightweight validation with Norwegian errors
- **CSRF Protection**: JWT-based tokens with Jose library
- **Content Security Policy**: Strict CSP headers in middleware
- **Rate Limiting**: Upstash Redis sliding window

### Analytics & Monitoring
- **Plausible Analytics**: Privacy-friendly, consent-based
- **Vercel Speed Insights**: Core Web Vitals
- **Custom Logger** (`app/lib/logger.ts`): Structured logging

### Tools
- **ESLint 9**: Next.js + TypeScript configs
- **Pa11y**: Automated WCAG 2.1 AA accessibility testing

---

## Directory Structure

```
/home/user/bluecrew/
├── app/                          # Next.js 15 App Router
│   ├── page.tsx                  # Homepage (/)
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Global styles
│   ├── components/               # Shared components
│   │   ├── SiteLayout.tsx        # Main layout wrapper
│   │   ├── CookieBanner.tsx      # GDPR consent
│   │   ├── FormControls.tsx      # Reusable form inputs
│   │   ├── CsrfTokenInput.tsx    # CSRF token component
│   │   └── home/                 # Homepage sections
│   ├── lib/                      # Utilities and services
│   │   ├── server/               # Server-only code
│   │   │   ├── supabase.ts       # Database client
│   │   │   ├── email.ts          # Resend integration
│   │   │   ├── rate-limit.ts     # Upstash rate limiting
│   │   │   ├── csrf.ts           # CSRF token management
│   │   │   ├── vipps.ts          # Vipps OAuth helpers
│   │   │   └── candidate-files.ts # File upload handling
│   │   ├── admin.ts              # Admin functions (server-only)
│   │   ├── admin-config.ts       # Admin config (client-safe)
│   │   ├── validation.ts         # Form schemas (Zod)
│   │   ├── zod.ts                # Custom Zod implementation
│   │   ├── constants.ts          # App constants (counties, FAQs)
│   │   ├── consent.ts            # Cookie consent logic
│   │   └── logger.ts             # Structured logging
│   ├── api/                      # API routes
│   │   ├── submit-candidate/     # Candidate registration
│   │   ├── submit-client/        # Client lead submission
│   │   ├── submit-interest/      # Quick interest form
│   │   ├── contact/              # Contact form
│   │   ├── csrf/                 # CSRF token generation
│   │   ├── gdpr/delete-request/  # GDPR data deletion requests
│   │   ├── vipps/                # Vipps OAuth flow
│   │   ├── webhooks/clerk/       # Clerk user lifecycle webhooks
│   │   └── health/               # Health check endpoints
│   ├── logg-inn/                 # Login page (Clerk)
│   │   └── [[...logg-inn]]/      # Catch-all for Clerk redirects
│   ├── registrer/                # Registration page (Clerk)
│   │   └── [[...registrer]]/     # Catch-all for Clerk redirects
│   ├── min-side/                 # User portal (protected)
│   │   └── page.tsx              # Dashboard with applications & GDPR
│   ├── jobbsoker/                # Job seeker pages
│   │   ├── registrer/skjema/     # Multi-step registration
│   │   └── oppdrag/              # Available assignments
│   ├── kunde/                    # Client pages
│   │   ├── registrer-behov/      # Client needs form
│   │   ├── bemanning/            # Staffing services
│   │   └── rekruttering/         # Recruitment services
│   ├── karriere/                 # Career guides
│   │   ├── skipsforer/           # Captain career path
│   │   ├── matros/               # Sailor career path
│   │   └── maskinoffiser/        # Engineer career path
│   ├── lonn/                     # Salary information
│   │   ├── kalkulator/           # Salary calculator
│   │   ├── oversikt/             # 2025 salary overview
│   │   └── [role]/               # Role-specific salaries
│   └── stillinger/               # Job postings (testing)
│       └── [slug]/               # Individual job pages
├── public/                       # Static assets
│   ├── hero/                     # Hero images
│   ├── team/                     # Team photos
│   ├── icons/                    # Icons and logos
│   └── guides/                   # Career guide images
├── styles/                       # Global CSS and tokens
│   ├── theme.css.ts              # Vanilla Extract theme
│   └── utils.css.ts              # Utility classes
├── supabase/                     # Database migrations
│   └── migrations/               # SQL migration files
├── docs/                         # Documentation
│   ├── ADMIN-PROJECT-CONTEXT.md  # Admin context
│   ├── GROWTH-STRATEGY-2025.md   # Business strategy
│   ├── SECURITY-FIXES-APPLIED.md # Security audit
│   ├── juridisk-helsesjekk.md    # Legal compliance
│   └── dpa/                      # Data Processing Agreements
├── scripts/                      # Build scripts
│   └── generate-favicon.mjs      # Favicon generator
├── middleware.ts                 # Edge middleware (CSP, security)
├── instrumentation.ts            # Runtime initialization
├── next.config.ts                # Next.js configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies
```

---

## Development Workflow

### Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```

   Required variables (see `.env.example` for full list):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `UPSTASH_REDIS_REST_URL` (no quotes around URLs!)
   - `UPSTASH_REDIS_REST_TOKEN`
   - `RESEND_API_KEY`
   - `CSRF_SECRET`
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` (required for auth)
   - `CLERK_SECRET_KEY` (required for auth)
   - `CLERK_WEBHOOK_SECRET` (for user lifecycle webhooks)
   - `VIPPS_CLIENT_ID`, `VIPPS_CLIENT_SECRET`, etc. (for enhanced verification)

3. **Run development server:**
   ```bash
   npm run dev
   ```
   Opens at `http://localhost:3000`

4. **Build for production:**
   ```bash
   npm run build    # Runs prebuild (favicon generation) + build
   npm run start    # Production server
   ```

### Git Workflow

**Branch naming:**
- Feature branches: `feature/description`
- Bug fixes: `fix/description`
- Claude AI branches: `claude/claude-md-{session-id}`

**Commit conventions:**
- Use clear, descriptive messages
- Follow existing commit style (see `git log`)
- Examples:
  - `"Fix: Build errors - remove unused import"`
  - `"CRITICAL FIX: Remove required validation for fylke/kommune"`
  - `"Update Google Ads tracking ID to AW-17731534362"`

**Important:**
- NEVER push to `main` without review
- Always push to feature branches first
- Use `git push -u origin <branch-name>`
- Retry up to 4 times with exponential backoff on network errors

---

## Code Conventions

### File Naming
- **Components**: PascalCase (`SiteLayout.tsx`, `Hero.tsx`)
- **Utilities**: camelCase (`validation.ts`, `rate-limit.ts`)
- **Pages**: `page.tsx` (Next.js convention)
- **API Routes**: `route.ts` (Next.js convention)
- **Styles**: Co-located with `.css.ts` extension (`Hero.css.ts`)

### Component Patterns

**Server Component (default):**
```typescript
// app/[route]/page.tsx
import { Metadata } from "next";
import { SiteLayout } from "@/app/components/SiteLayout";

export const metadata: Metadata = {
  title: "Page Title - Bluecrew",
  description: "SEO description",
};

export default async function Page() {
  // Can fetch data directly here
  const data = await fetchData();

  return (
    <SiteLayout active="page-key">
      <h1>Content</h1>
    </SiteLayout>
  );
}
```

**Client Component:**
```typescript
// app/components/Interactive.tsx
"use client";
import { useState } from "react";
import * as styles from './Interactive.css';

export function Interactive() {
  const [state, setState] = useState(false);

  return (
    <div className={styles.container}>
      <button onClick={() => setState(!state)}>
        Toggle
      </button>
    </div>
  );
}
```

**Vanilla Extract Styles:**
```typescript
// app/components/Interactive.css.ts
import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  gap: "1rem",
  padding: "2rem",
  "@media": {
    "(max-width: 768px)": {
      flexDirection: "column",
    },
  },
});
```

### TypeScript Guidelines

**Strict mode enabled** - follow these practices:

1. **Always type function parameters and returns:**
   ```typescript
   // Good
   async function submitForm(data: FormData): Promise<SubmitResult> {
     // ...
   }

   // Avoid
   async function submitForm(data) {
     // ...
   }
   ```

2. **Use type inference where appropriate:**
   ```typescript
   // Good - type is inferred
   const [open, setOpen] = useState(false);

   // Unnecessary
   const [open, setOpen] = useState<boolean>(false);
   ```

3. **Define interfaces for complex objects:**
   ```typescript
   interface CandidateData {
     name: string;
     email: string;
     work_main: string[];
     fylke: string | null;
     kommune: string | null;
   }
   ```

4. **Use `unknown` instead of `any` for uncertain types:**
   ```typescript
   // Good
   function parseJson(str: string): unknown {
     return JSON.parse(str);
   }

   // Avoid (but allowed with warning)
   function parseJson(str: string): any {
     return JSON.parse(str);
   }
   ```

### Import Organization

**Order:**
1. React/Next.js imports
2. Third-party libraries
3. Internal utilities (`@/app/lib/*`)
4. Components
5. Types
6. Styles (last)

**Example:**
```typescript
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { z } from "@/app/lib/zod";
import { validateEnvironment } from "@/app/lib/env";
import { SiteLayout } from "@/app/components/SiteLayout";
import type { CandidateData } from "@/app/lib/types";
import * as styles from "./page.css";
```

---

## Key Patterns

### API Route Pattern

**Every POST endpoint follows this structure:**

```typescript
// app/api/[endpoint]/route.ts
import { NextResponse, type NextRequest } from "next/server";
import { requireCsrfToken } from "@/app/lib/server/csrf";
import { enforceRateLimit } from "@/app/lib/server/rate-limit";
import { schema } from "@/app/lib/validation";
import { getSupabaseServiceClient } from "@/app/lib/server/supabase";
import { sendEmail } from "@/app/lib/server/email";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    // 1. CSRF Protection (when enabled)
    const csrfValid = await requireCsrfToken(req);
    if (!csrfValid) {
      return NextResponse.json(
        { error: "Invalid CSRF token" },
        { status: 403 }
      );
    }

    // 2. Rate Limiting
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const rate = await enforceRateLimit(`endpoint:${ip}`);
    if (!rate.allowed) {
      return NextResponse.json(
        { error: "Too many requests" },
        { status: 429 }
      );
    }

    // 3. Extract and Validate
    const formData = await req.formData();
    const values = {
      name: formData.get("name"),
      email: formData.get("email"),
      honey: formData.get("honey") || "",
      // ... other fields
    };

    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.errors },
        { status: 400 }
      );
    }

    // 4. Honeypot Check (bot detection)
    if (values.honey) {
      return new NextResponse(null, { status: 204 });
    }

    // 5. Process Files (if applicable)
    const cvFile = formData.get("cv") as File | null;
    // ... handle file uploads

    // 6. Store in Database
    const supabase = getSupabaseServiceClient();
    const { data, error } = await supabase
      .from("table_name")
      .insert(parsed.data)
      .select()
      .single();

    if (error) throw error;

    // 7. Send Emails
    await Promise.all([
      sendEmail({
        to: process.env.RESEND_TO_EMAILS,
        subject: "New Submission",
        html: "...",
      }),
      sendEmail({
        to: parsed.data.email,
        subject: "Confirmation",
        html: "...",
      }),
    ]);

    // 8. Return Success
    return NextResponse.json({ success: true, id: data.id });
  } catch (error) {
    console.error("Error in endpoint:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

### Form Validation Pattern

**Using custom Zod implementation:**

```typescript
// app/lib/validation.ts
import { z } from "./zod";

export const candidateSchema = z
  .object({
    // Basic fields
    name: z.string().trim().min(2, "Oppgi fullt navn (minst 2 tegn)"),
    email: z.string().trim().email("Oppgi en gyldig e-postadresse"),
    phone: z.string().trim().min(8, "Oppgi gyldig telefonnummer"),

    // Arrays with validation
    work_main: z
      .array(z.string())
      .min(1, "Velg minst ett arbeidsområde"),

    // Optional fields
    fylke: z.string().trim().nullable(),
    kommune: z.string().trim().nullable(),

    // Booleans with refinement
    gdpr: z.boolean().refine(
      (v) => v === true,
      "Du må samtykke til personvernreglene"
    ),

    stcw_confirm: z.boolean().refine(
      (v) => v === true,
      "Du må bekrefte at du har eller vil skaffe STCW-sertifikat"
    ),

    // Honeypot (must be empty)
    honey: z.literal(""),
  })
  .superRefine((values, ctx) => {
    // Custom cross-field validation
    if (values.fylke && !values.kommune) {
      ctx.addIssue({
        code: "custom",
        path: ["kommune"],
        message: "Velg kommune når fylke er valgt",
      });
    }
  });

export type CandidateInput = z.infer<typeof candidateSchema>;
```

### File Upload Pattern

**Handling CV and certificate uploads:**

```typescript
// app/lib/server/candidate-files.ts
import { getSupabaseServiceClient } from "./supabase";

export async function uploadCandidateFiles(
  email: string,
  cv: File,
  certificates: File | null
) {
  const supabase = getSupabaseServiceClient();
  const timestamp = Date.now();
  const basePath = `candidates/${email}/${timestamp}`;

  // Upload CV (required)
  const cvPath = `${basePath}/CV.pdf`;
  const { error: cvError } = await supabase.storage
    .from("candidates-private")
    .upload(cvPath, cv, {
      contentType: "application/pdf",
      upsert: false,
    });

  if (cvError) throw new Error(`CV upload failed: ${cvError.message}`);

  // Upload certificates (optional)
  let certsPath: string | null = null;
  if (certificates) {
    const ext = certificates.name.split(".").pop();
    certsPath = `${basePath}/certificates.${ext}`;
    const { error: certsError } = await supabase.storage
      .from("candidates-private")
      .upload(certsPath, certificates, {
        contentType: certificates.type,
        upsert: false,
      });

    if (certsError) {
      console.error("Certificate upload failed:", certsError);
      certsPath = null;
    }
  }

  return { cvPath, certsPath };
}
```

**File validation:**
```typescript
// In API route
const cvFile = formData.get("cv") as File | null;
if (!cvFile || cvFile.size === 0) {
  return NextResponse.json(
    { error: "CV (PDF) er påkrevd" },
    { status: 400 }
  );
}

// Validate file type
if (cvFile.type !== "application/pdf") {
  return NextResponse.json(
    { error: "CV må være en PDF-fil" },
    { status: 400 }
  );
}

// Validate file size (10MB max)
const MAX_SIZE = 10 * 1024 * 1024;
if (cvFile.size > MAX_SIZE) {
  return NextResponse.json(
    { error: "CV-filen er for stor (maks 10MB)" },
    { status: 400 }
  );
}
```

### Email Template Pattern

```typescript
// app/lib/server/email.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendCandidateNotification(data: CandidateData) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; }
        table { border-collapse: collapse; width: 100%; }
        td { padding: 8px; border-bottom: 1px solid #ddd; }
        td:first-child { font-weight: bold; width: 150px; }
      </style>
    </head>
    <body>
      <h2>Ny kandidat har registrert seg</h2>
      <table>
        <tr><td>Navn</td><td>${data.name}</td></tr>
        <tr><td>E-post</td><td>${data.email}</td></tr>
        <tr><td>Telefon</td><td>${data.phone}</td></tr>
        <tr><td>Arbeidsområder</td><td>${data.work_main.join(", ")}</td></tr>
      </table>
      ${getComplianceFooter()}
    </body>
    </html>
  `;

  const text = `
    Ny kandidat har registrert seg

    Navn: ${data.name}
    E-post: ${data.email}
    Telefon: ${data.phone}
    Arbeidsområder: ${data.work_main.join(", ")}
  `;

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: process.env.RESEND_TO_EMAILS!.split(","),
    subject: "Ny kandidat - Bluecrew",
    html,
    text,
    attachments: [
      // Attach CV and certificates
    ],
  });
}
```

### Clerk Authentication Pattern

**Root Layout Setup:**
```typescript
// app/layout.tsx
import { ClerkProvider } from "@clerk/nextjs";
import { nbNO } from "@clerk/localizations";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider localization={nbNO}>
      <html lang="no">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
```

**Protected Route (Middleware):**
```typescript
// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/min-side(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    const { userId } = await auth();
    if (!userId) {
      const signInUrl = new URL("/logg-inn", req.url);
      signInUrl.searchParams.set("redirect_url", req.url);
      return NextResponse.redirect(signInUrl);
    }
  }
  return NextResponse.next();
});
```

**Using Clerk in Client Components:**
```typescript
"use client";
import { useUser, useSignIn, SignOutButton, UserButton } from "@clerk/nextjs";

export function UserDashboard() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return <div>Loading...</div>;
  if (!user) return <div>Not logged in</div>;

  return (
    <div>
      <p>Welcome, {user.fullName}</p>
      <UserButton />
      <SignOutButton>
        <button>Logg ut</button>
      </SignOutButton>
    </div>
  );
}
```

**Custom Sign In Page:**
```typescript
// app/logg-inn/[[...logg-inn]]/page.tsx
"use client";
import { useSignIn } from "@clerk/nextjs";

export default function LoggInnPage() {
  const { signIn, setActive } = useSignIn();

  async function handleSubmit(email: string, password: string) {
    const result = await signIn.create({ identifier: email, password });
    if (result.status === "complete") {
      await setActive({ session: result.createdSessionId });
      // Redirect to /min-side
    }
  }
  // Custom form UI...
}
```

### Clerk Pro Features (Organizations, Metadata, Webhooks)

**publicMetadata Storage:**
Clerk Pro stores user data persistently in `publicMetadata`:
```typescript
// Store Vipps verification in Clerk metadata
import { auth, clerkClient } from "@clerk/nextjs/server";

const { userId } = await auth();
if (userId) {
  const client = await clerkClient();
  await client.users.updateUserMetadata(userId, {
    publicMetadata: {
      vipps_verified: true,
      vipps_verified_at: new Date().toISOString(),
      candidate_registered: true,
      candidate_status: "pending",
      role: "admin", // Optional: admin role
    },
  });
}
```

**Reading Metadata in Client Components:**
```typescript
"use client";
import { useUser } from "@clerk/nextjs";

export function UserProfile() {
  const { user } = useUser();

  const metadata = user?.publicMetadata as {
    vipps_verified?: boolean;
    candidate_status?: string;
    role?: string;
  } | undefined;

  return (
    <div>
      {metadata?.vipps_verified && <span>ID-verifisert</span>}
      {metadata?.candidate_status && <span>Status: {metadata.candidate_status}</span>}
    </div>
  );
}
```

**Admin Access via Organizations:**
```typescript
// app/lib/admin-config.ts (client-safe)
export const ADMIN_ORG_SLUG = "bluecrew-admin-1764030919";
export const ADMIN_EMAILS: readonly string[] = [
  "isak@bluecrew.no",
  "tf@bluecrew.no",
  "isak.didriksson@gmail.com",
];

export function isAdminUser(userEmail: string | null, role: string | null): boolean {
  if (role === "admin") return true;
  if (!userEmail) return false;
  return ADMIN_EMAILS.includes(userEmail.toLowerCase());
}
```

```typescript
// app/lib/admin.ts (server-only)
import "server-only";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function checkAdminAccess(): Promise<{
  isAdmin: boolean;
  userId: string | null;
  method: "organization" | "role" | "email" | null;
}> {
  const { userId, orgSlug } = await auth();
  if (!userId) return { isAdmin: false, userId: null, method: null };

  // 1. Check Clerk Organization membership
  if (orgSlug === ADMIN_ORG_SLUG) {
    return { isAdmin: true, userId, method: "organization" };
  }

  // 2. Check publicMetadata.role
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  if (user.publicMetadata?.role === "admin") {
    return { isAdmin: true, userId, method: "role" };
  }

  // 3. Check email list
  const email = user.primaryEmailAddress?.emailAddress;
  if (email && ADMIN_EMAILS.includes(email.toLowerCase())) {
    return { isAdmin: true, userId, method: "email" };
  }

  return { isAdmin: false, userId, method: null };
}
```

**Clerk Webhook for User Sync:**
```typescript
// app/api/webhooks/clerk/route.ts
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  // Verify signature with Svix
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);
  const evt = wh.verify(body, {
    "svix-id": headers.get("svix-id")!,
    "svix-timestamp": headers.get("svix-timestamp")!,
    "svix-signature": headers.get("svix-signature")!,
  }) as WebhookEvent;

  switch (evt.type) {
    case "user.created":
      // Sync to clerk_users table
      break;
    case "user.updated":
      // Update local cache
      break;
    case "user.deleted":
      // GDPR: Anonymize user data
      break;
  }
}
```

**Database Table (clerk_users):**
```sql
-- supabase/migrations/20251124_create_clerk_users.sql
CREATE TABLE IF NOT EXISTS clerk_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clerk_user_id TEXT UNIQUE NOT NULL,
    email TEXT,
    first_name TEXT,
    last_name TEXT,
    full_name TEXT,
    is_admin BOOLEAN DEFAULT FALSE,
    vipps_verified BOOLEAN DEFAULT FALSE,
    candidate_registered BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ -- Soft delete for GDPR
);
```

### Metadata Pattern (SEO)

```typescript
// app/[route]/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Title - Bluecrew AS",
  description: "Detailed description for SEO (150-160 characters)",
  keywords: ["maritime", "bemanning", "rekruttering", "sjøfart"],
  alternates: {
    canonical: "https://bluecrew.no/route",
  },
  openGraph: {
    title: "Page Title",
    description: "Social media description",
    url: "https://bluecrew.no/route",
    siteName: "Bluecrew",
    images: [
      {
        url: "https://bluecrew.no/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "nb_NO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Page Title",
    description: "Twitter description",
    images: ["https://bluecrew.no/og-image.jpg"],
  },
};
```

**Structured data (Schema.org):**
```typescript
// Include in page component
export default function Page() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Hjem",
        item: "https://bluecrew.no",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Page Name",
        item: "https://bluecrew.no/route",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Page content */}
    </>
  );
}
```

---

## Security Guidelines

### CRITICAL: Always Follow These Security Practices

1. **NEVER trust user input**
   - Always validate with Zod schemas
   - Sanitize before database insertion
   - Escape HTML output when rendering user content

2. **File uploads MUST be validated**
   - Check file type (MIME type + extension)
   - Limit file size (10MB max)
   - Upload to private Supabase bucket
   - Never serve user uploads directly without validation

3. **Rate limiting on ALL public endpoints**
   ```typescript
   const rate = await enforceRateLimit(`prefix:${ip}`);
   if (!rate.allowed) {
     return NextResponse.json({ error: "Too many requests" }, { status: 429 });
   }
   ```

4. **CSRF protection on state-changing operations**
   ```typescript
   // Currently temporarily disabled on candidate form
   // but should be enabled in production
   const csrfValid = await requireCsrfToken(req);
   ```

5. **Honeypot fields on all forms**
   ```tsx
   <input
     type="text"
     name="honey"
     value=""
     style={{ display: "none" }}
     tabIndex={-1}
     autoComplete="off"
   />
   ```

6. **Environment variables**
   - NEVER commit `.env` or `.env.local`
   - Use `.env.example` as template
   - Validate on startup (`instrumentation.ts`)

7. **Database access**
   - Server-side only: use service role key
   - Never expose service role key to client
   - Use Row Level Security (RLS) policies
   - Private storage buckets (never public)

8. **Middleware security headers**
   - CSP headers already configured
   - HSTS enforced
   - X-Frame-Options: DENY
   - Don't modify without review

9. **Error handling**
   - NEVER expose stack traces to users
   - Log errors server-side
   - Return generic error messages
   ```typescript
   catch (error) {
     console.error("Internal error:", error);
     return NextResponse.json(
       { error: "Internal server error" },
       { status: 500 }
     );
   }
   ```

10. **Admin routes**
    - `/admin/*` is hard-blocked in middleware
    - Returns 404 (not 403) to hide existence
    - Never expose admin functionality without authentication

### Security Score: 9/10
See `SECURITY-FIXES-APPLIED.md` for complete security audit results.

---

## Common Tasks

### Adding a New Page

1. **Create the route folder:**
   ```bash
   mkdir -p app/new-route
   ```

2. **Create `page.tsx`:**
   ```typescript
   import type { Metadata } from "next";
   import { SiteLayout } from "@/app/components/SiteLayout";

   export const metadata: Metadata = {
     title: "Page Title - Bluecrew",
     description: "SEO description",
   };

   export default function NewPage() {
     return (
       <SiteLayout active="new-route">
         <main>
           <h1>Page Title</h1>
           <p>Content here</p>
         </main>
       </SiteLayout>
     );
   }
   ```

3. **Add to navigation (if needed):**
   Update `app/components/SiteLayout.tsx` navigation array.

4. **Add to sitemap:**
   Update `app/sitemap.ts` with new route.

### Adding a New API Endpoint

1. **Create the route:**
   ```bash
   mkdir -p app/api/new-endpoint
   touch app/api/new-endpoint/route.ts
   ```

2. **Follow the API route pattern** (see [Key Patterns](#key-patterns))

3. **Add rate limiting:**
   ```typescript
   const rate = await enforceRateLimit(`new-endpoint:${ip}`);
   ```

4. **Create validation schema:**
   ```typescript
   // app/lib/validation.ts
   export const newEndpointSchema = z.object({
     // fields
   });
   ```

5. **Test the endpoint:**
   ```bash
   curl -X POST http://localhost:3000/api/new-endpoint \
     -H "Content-Type: application/json" \
     -d '{"field": "value"}'
   ```

### Adding a New Form

1. **Create validation schema** in `app/lib/validation.ts`

2. **Create form component:**
   ```tsx
   "use client";
   import { useState } from "react";
   import { CsrfTokenInput } from "@/app/components/CsrfTokenInput";

   export function NewForm() {
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState("");

     async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
       e.preventDefault();
       setLoading(true);
       setError("");

       try {
         const formData = new FormData(e.currentTarget);
         const res = await fetch("/api/new-endpoint", {
           method: "POST",
           body: formData,
         });

         if (!res.ok) {
           const data = await res.json();
           throw new Error(data.error || "Something went wrong");
         }

         // Success - redirect or show message
         window.location.href = "/success";
       } catch (err) {
         setError(err instanceof Error ? err.message : "Unknown error");
       } finally {
         setLoading(false);
       }
     }

     return (
       <form onSubmit={handleSubmit}>
         <CsrfTokenInput />
         <input type="hidden" name="honey" value="" />

         <input name="field" required />

         {error && <div className="error">{error}</div>}

         <button type="submit" disabled={loading}>
           {loading ? "Sender..." : "Send inn"}
         </button>
       </form>
     );
   }
   ```

3. **Create API handler** (follow API route pattern)

4. **Add email notifications** (if needed)

### Modifying Database Schema

1. **Create migration:**
   ```bash
   # In Supabase dashboard or CLI
   # Create new migration file in supabase/migrations/
   ```

2. **Write SQL:**
   ```sql
   -- supabase/migrations/YYYYMMDDHHMMSS_description.sql
   CREATE TABLE IF NOT EXISTS new_table (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     created_at TIMESTAMPTZ DEFAULT NOW(),
     -- fields
   );

   -- Enable RLS
   ALTER TABLE new_table ENABLE ROW LEVEL SECURITY;

   -- Create policy
   CREATE POLICY "Service role access"
     ON new_table
     FOR ALL
     TO service_role
     USING (true)
     WITH CHECK (true);
   ```

3. **Apply migration:**
   ```bash
   # Via Supabase CLI or dashboard
   supabase db push
   ```

4. **Update TypeScript types** (if needed)

### Adding Environment Variables

1. **Add to `.env.example`:**
   ```env
   # Description of what this is
   NEW_API_KEY=your_key_here
   ```

2. **Add validation** in `app/lib/env.ts`:
   ```typescript
   export function validateEnvironment() {
     const required = [
       // ... existing vars
       'NEW_API_KEY',
     ];
     // ...
   }
   ```

3. **Use in code:**
   ```typescript
   const apiKey = process.env.NEW_API_KEY!;
   ```

4. **Update Vercel environment variables** (production)

### Running Accessibility Tests

```bash
# Test local development
npm run a11y:dev

# Test production
npm run a11y:prod
```

**Fix common issues:**
- Missing alt text on images
- Insufficient color contrast
- Missing form labels
- Keyboard navigation problems
- ARIA attribute errors

---

## Testing & Quality

### Accessibility Testing

**Automated with Pa11y (WCAG 2.1 AA):**
```bash
npm run a11y:dev   # Test http://localhost:3000
npm run a11y:prod  # Test production site
```

**Manual checklist:**
- [ ] Keyboard navigation works (Tab, Enter, Esc)
- [ ] Screen reader announcements are correct
- [ ] Color contrast meets WCAG AA (4.5:1 for text)
- [ ] All images have alt text
- [ ] Forms have proper labels and error messages
- [ ] Focus indicators are visible
- [ ] Skip links work
- [ ] Headings are hierarchical (h1 → h2 → h3)

### Code Quality

**Linting:**
```bash
npm run lint
```

**Type checking:**
```bash
npx tsc --noEmit
```

**Build test:**
```bash
npm run build
```

### Health Checks

**Available endpoints:**
- `/api/health` - Basic health check
- `/api/health/supabase` - Database connectivity
- `/api/health/supabase/storage` - Storage access
- `/api/health/supabase/storage/cv` - CV upload test

**Usage:**
```bash
curl http://localhost:3000/api/health
```

### Testing Checklist for New Features

- [ ] TypeScript compiles without errors
- [ ] ESLint passes
- [ ] Build completes successfully
- [ ] Accessibility tests pass
- [ ] Manual keyboard navigation works
- [ ] Mobile responsive (test on real devices)
- [ ] Forms validate correctly (both client and server)
- [ ] Rate limiting works (test with curl loop)
- [ ] Error handling works (test invalid inputs)
- [ ] Email notifications send correctly
- [ ] Database entries are correct
- [ ] SEO metadata is present
- [ ] Analytics events fire (check Plausible)

---

## Deployment

### Hosting: Vercel

**Build command:** `npm run build`
**Output directory:** `.next`
**Install command:** `npm install`
**Node version:** 20.x

### Environment Variables (Production)

Set in Vercel dashboard:

**Supabase:**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

**Redis (Upstash):**
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

**Email (Resend):**
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL` (e.g., `noreply@bluecrew.no`)
- `RESEND_TO_EMAILS` (comma-separated)

**Security:**
- `CSRF_SECRET` (random 32+ character string)

**Clerk Pro (Authentication & User Management):**
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` (from Clerk dashboard)
- `CLERK_SECRET_KEY` (from Clerk dashboard)
- `CLERK_WEBHOOK_SECRET` (from Clerk dashboard → Webhooks)
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL` (default: `/logg-inn`)
- `NEXT_PUBLIC_CLERK_SIGN_UP_URL` (default: `/registrer`)
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` (default: `/min-side`)
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` (default: `/min-side`)

**Vipps (Enhanced Identity Verification):**
- `VIPPS_CLIENT_ID`
- `VIPPS_CLIENT_SECRET`
- `VIPPS_SUBSCRIPTION_KEY`
- `VIPPS_API_BASE_URL` (production: `https://api.vipps.no`)
- `VIPPS_REDIRECT_URI` (e.g., `https://bluecrew.no/api/vipps/callback`)

**Analytics:**
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` (e.g., `bluecrew.no`)

**Operational:**
- `MAINTENANCE_MODE` (set to `true` to enable maintenance page)

### Deployment Workflow

1. **Push to branch:**
   ```bash
   git push -u origin feature/description
   ```

2. **Vercel auto-deploys preview** (for branches)

3. **Test preview deployment:**
   - Check preview URL in GitHub PR
   - Test all forms and functionality
   - Verify environment variables work

4. **Merge to main:**
   ```bash
   git checkout main
   git merge feature/description
   git push origin main
   ```

5. **Vercel auto-deploys to production**

6. **Verify production:**
   - Check https://bluecrew.no
   - Test critical flows
   - Check health endpoints
   - Monitor error logs

### Force Redeploy

See detailed guide: `docs/vercel-redeploy.md`

**Quick version:**
```bash
# Trigger redeploy without code changes
git commit --allow-empty -m "Trigger redeploy"
git push origin main
```

### Maintenance Mode

**Enable:**
Set `MAINTENANCE_MODE=true` in Vercel environment variables.

**Behavior:**
- Shows maintenance page to all users
- Allows assets (CSS, JS, images)
- Health checks still work
- Admin routes blocked
- Non-GET requests return 503

**Disable:**
Remove or set `MAINTENANCE_MODE=false`.

---

## Norwegian Market Specifics

### Language
- All UI text in Norwegian Bokmål
- Error messages in Norwegian
- Email templates in Norwegian
- SEO content in Norwegian

### Geographic Data

**Fylker (Counties) and Kommuner (Municipalities):**
Defined in `app/lib/constants.ts`:
```typescript
export const FYLKER_KOMMUNER: Record<string, string[]> = {
  "Troms og Finnmark": [
    "Hammerfest", "Harstad", "Tromsø", // ...
  ],
  "Nordland": [
    "Bodø", "Narvik", "Mo i Rana", // ...
  ],
  // ... all Norwegian counties
};
```

**Usage in forms:**
```tsx
<select name="fylke">
  {Object.keys(FYLKER_KOMMUNER).map(fylke => (
    <option key={fylke} value={fylke}>{fylke}</option>
  ))}
</select>
```

### Integrations

**Clerk (User Authentication):**
- Email/password authentication with Norwegian localization (`nbNO`)
- Magic link / email code login option
- Email verification required for new accounts
- Routes:
  - `/logg-inn` - Login page (custom UI)
  - `/registrer` - Registration page (custom UI)
  - `/min-side` - Protected user dashboard
- Middleware protection for `/min-side/*` routes
- CSP configured for Clerk domains and Cloudflare Turnstile (bot protection)

**Vipps (Enhanced Identity Verification):**
- OAuth 2.0 / OpenID Connect
- BankID integration (highest trust level in Norway)
- Used for enhanced identity verification (optional)
- Routes: `/api/vipps/start`, `/api/vipps/callback`, `/api/vipps/session`

**AdminCrew API (External Backend):**
- Base URL: `https://admincrew.no`
- Used for job postings and application management
- Endpoints:
  - `GET /api/job-postings?status=active` - Active job listings
  - `GET /api/job-applications?user_id={id}` - User's applications

**Brreg (Norwegian Company Registry):**
- API: `https://data.brreg.no/enhetsregisteret/api/enheter/{orgNumber}`
- Used for company lookup
- Auto-fill company details in forms

### Legal Compliance

**GDPR (EU/EEA):**
- Cookie consent required (GDPR Article 6)
- Privacy policy at `/personvern`
- Data Processing Agreements in `docs/dpa/`
- Right to access, rectify, delete data

**Norwegian Maritime Regulations:**
- STCW-2010 certification required
- ILO Maritime Labour Convention (MLC 2006)
- Norwegian health certificate requirements
- Working time regulations (Arbeidsmiljøloven)

**Documents:**
- `docs/juridisk-helsesjekk.md` - Legal compliance checklist
- `docs/dpa/README.md` - Data Processing Agreements

---

## Troubleshooting

### Common Issues

**Build fails with TypeScript errors:**
```bash
# Check types
npx tsc --noEmit

# Common fixes:
# - Add missing types to interfaces
# - Fix strict null checks (use optional chaining)
# - Check imports are correct
```

**Supabase connection fails:**
```bash
# Check environment variables
echo $NEXT_PUBLIC_SUPABASE_URL
echo $SUPABASE_SERVICE_ROLE_KEY

# Test connection
curl http://localhost:3000/api/health/supabase
```

**Rate limiting not working:**
```bash
# Check Redis connection
echo $UPSTASH_REDIS_REST_URL
echo $UPSTASH_REDIS_REST_TOKEN

# Test rate limit (should get 429 after 8 requests)
for i in {1..10}; do
  curl -X POST http://localhost:3000/api/submit-interest \
    -H "Content-Type: application/json" \
    -d '{"name":"Test","email":"test@example.com"}'
  sleep 1
done
```

**Email not sending:**
```bash
# Check Resend configuration
echo $RESEND_API_KEY
echo $RESEND_FROM_EMAIL
echo $RESEND_TO_EMAILS

# Check logs for errors
# Look for "Failed to send email" in console
```

**File upload fails:**
```bash
# Check Supabase storage bucket exists: candidates-private
# Check RLS policies allow service role access
# Check file size < 10MB
# Check file type is correct (PDF for CV)
```

**CSRF token invalid:**
```typescript
// Temporarily disabled on candidate form (noted in code)
// To re-enable, uncomment in:
// app/api/submit-candidate/route.ts
// app/jobbsoker/registrer/skjema/page.tsx
```

**Clerk authentication fails:**
```bash
# Check Clerk environment variables
echo $NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
echo $CLERK_SECRET_KEY

# Common issues:
# - Missing publishableKey: Set NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
# - Build errors: Clerk requires keys even at build time
# - CSP blocking: Check middleware.ts for Clerk domains
# - Bot protection: Cloudflare Turnstile requires CSP for challenges.cloudflare.com
```

**Build fails with Clerk errors:**
```bash
# Error: @clerk/clerk-react: Missing publishableKey
# Solution: Set NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY in environment
# Note: This is required even during build (not just runtime)

# For local builds without Clerk:
# The build will fail if Clerk keys are not set
# Get keys from: https://dashboard.clerk.com/last-active?path=api-keys
```

**Vipps OAuth fails:**
```bash
# Check environment variables
echo $VIPPS_CLIENT_ID
echo $VIPPS_CLIENT_SECRET
echo $VIPPS_REDIRECT_URI

# Check redirect URI matches exactly (including https)
# Check API base URL is correct for environment
```

### Logging

**Server logs:**
```typescript
import { logger } from "@/app/lib/logger";

logger.info("Message", { context: "value" });
logger.warn("Warning", { details });
logger.error("Error occurred", { error, stack });
```

**Log levels:**
- `debug` - Development only
- `info` - Informational messages
- `warn` - Warnings (non-critical)
- `error` - Errors (need attention)

**Viewing logs:**
- Development: Console output
- Production: Vercel dashboard → Logs

---

## Resources

### Documentation
- `README.md` - Getting started guide
- `SECURITY-FIXES-APPLIED.md` - Security audit report
- `docs/ADMIN-PROJECT-CONTEXT.md` - Admin context
- `docs/GROWTH-STRATEGY-2025.md` - Business strategy
- `docs/juridisk-helsesjekk.md` - Legal compliance
- `docs/vercel-redeploy.md` - Deployment guide
- `docs/dpa/` - Data Processing Agreements

### External Resources
- [Next.js 15 Docs](https://nextjs.org/docs)
- [React 19 Docs](https://react.dev)
- [Supabase Docs](https://supabase.com/docs)
- [Clerk Docs](https://clerk.com/docs) - Authentication
- [Clerk Next.js SDK](https://clerk.com/docs/quickstarts/nextjs)
- [Vanilla Extract Docs](https://vanilla-extract.style)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Vipps Login API](https://developer.vippsmobilepay.com/docs/APIs/login-api/)

### Tools
- [Clerk](https://clerk.com/) - User authentication
- [Pa11y](https://pa11y.org/) - Accessibility testing
- [Plausible](https://plausible.io/) - Privacy-friendly analytics
- [Resend](https://resend.com/) - Email API
- [Upstash](https://upstash.com/) - Serverless Redis

---

## Contact & Support

**Repository:** `maritimbemanning/bluecrew`
**Primary Contact:** See team information in codebase
**Issues:** Use GitHub issues for bug reports and feature requests

---

## Changelog

**2025-11-25** - Clerk Pro full integration
- Clerk Organizations for admin access control (`bluecrew-admin` org)
- User metadata storage (Vipps verification, candidate status)
- Clerk webhook endpoint for user lifecycle sync (`/api/webhooks/clerk`)
- Database table `clerk_users` for local user cache
- Enhanced `/min-side` dashboard with Vipps verification badge
- Split admin modules: `admin-config.ts` (client) and `admin.ts` (server)
- GDPR-compliant user data anonymization on deletion

**2025-11-23** - Major authentication update
- Added Clerk authentication (email/password, magic links)
- Custom Norwegian login (`/logg-inn`) and registration (`/registrer`) pages
- New user portal (`/min-side`) with GDPR compliance features
- Protected routes with middleware authentication
- Added `Kokk/Forpleining` role to salary calculator
- GDPR data deletion request endpoint (`/api/gdpr/delete-request`)
- Updated CSP for Clerk and Cloudflare Turnstile
- Removed Sentry (observability.ts is now a no-op placeholder)
- Integration with AdminCrew API for job applications

**2025-11-19** - Initial CLAUDE.md creation
- Comprehensive codebase analysis
- Documentation of all major patterns and conventions
- Security guidelines and best practices
- Deployment and troubleshooting guides

---

**End of CLAUDE.md**

This document should be updated whenever significant architectural changes are made to the codebase.
