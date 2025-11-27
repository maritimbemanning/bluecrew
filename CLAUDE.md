# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Bluecrew AS** - Maritime staffing and recruitment platform for the Norwegian market. Connects qualified maritime professionals with shipping companies and offshore operators.

**Tech Stack**: Next.js 15.5.5 (App Router), React 19, TypeScript 5 (strict), Supabase, Clerk Pro

**Live**: [bluecrew.no](https://bluecrew.no)

## Essential Commands

```bash
npm install          # Install dependencies
npm run dev          # Dev server at localhost:3000
npm run build        # Production build (includes favicon generation)
npm run lint         # ESLint with Next.js & TypeScript
npx tsc --noEmit     # Type checking (strict mode)

# Accessibility (Windows PowerShell)
npm run a11y:dev     # WCAG 2.1 AA test on localhost
npm run a11y:prod    # WCAG 2.1 AA test on production

# Database
supabase db push     # Apply migrations from supabase/migrations/
```

## Architecture

### Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15.5.5 App Router, React 19, TypeScript 5 (strict) |
| Styling | Tailwind CSS 4 + Vanilla Extract (type-safe CSS-in-TS) |
| Database | Supabase PostgreSQL + Storage (RLS enabled) |
| Auth | Clerk Pro (Norwegian locale, webhooks, Organizations) |
| Services | Upstash Redis (rate limiting), Resend (email), Vipps (BankID) |
| Analytics | Plausible (privacy-first), Sentry (error tracking) |

### File Structure

```
app/
├── api/                    # 23 API routes with security pattern
│   ├── csrf/              # CSRF token generation
│   ├── contact/           # Contact form
│   ├── submit-candidate/  # Candidate registration
│   ├── submit-client/     # Business lead form
│   ├── submit-interest/   # Job interest form
│   ├── job-applications/  # Job application management
│   ├── user/              # Protected user endpoints
│   │   ├── documents/     # CV/certificate management
│   │   ├── messages/      # Inbox system
│   │   ├── time-entries/  # Time registration
│   │   └── applications/  # User's job applications
│   ├── admin/             # Admin endpoints (email whitelist)
│   ├── webhooks/clerk/    # Clerk user sync
│   ├── gdpr/              # GDPR data deletion
│   └── health/            # Health checks (supabase, storage)
├── components/            # Shared UI components
│   ├── SiteLayout.tsx     # Main layout with nav/footer
│   ├── FloatingPhone.tsx  # Floating contact button
│   └── home/              # Homepage sections
├── lib/                   # Core utilities
│   ├── server/            # Server-only (supabase, email, csrf)
│   ├── validation.ts      # Zod schemas with Norwegian messages
│   ├── zod.ts             # Custom Zod implementation
│   ├── constants.ts       # Norwegian counties/municipalities
│   ├── admin.ts           # Admin access check
│   └── admin-config.ts    # Admin email whitelist
├── hooks/                 # React hooks
├── logg-inn/              # Clerk login (catch-all)
├── registrer/             # Clerk signup (catch-all)
├── min-side/              # Protected user dashboard
│   ├── dokumenter/        # Document archive
│   ├── meldinger/         # Messages
│   ├── oppdrag/           # Assignments
│   ├── personvern/        # Privacy settings
│   ├── soknader/          # Job applications
│   ├── timer/             # Time entries
│   └── varsler/           # Notifications
├── stillinger/            # Job portal
│   ├── [slug]/            # Dynamic job pages
│   │   └── sok/           # Application form
│   └── page.tsx           # Job listings
├── jobbsoker/             # Candidate registration
├── kunde/                 # Business/client pages
├── lonn/                  # Salary calculator & guides
├── karriere/              # Career paths
├── kontakt/               # Contact form
└── personvern/            # Privacy policy
styles/
├── tokens.css.ts          # Design tokens (colors, spacing)
├── global.css.ts          # Global styles
└── utils.css.ts           # Utility classes
supabase/
└── migrations/            # Database migrations (9 total)
middleware.ts              # Security headers, CSP, auth protection
```

### Core Patterns

#### 1. API Route Security (Required for all POST endpoints)

```typescript
// Every POST endpoint must follow this structure:
export async function POST(request: Request) {
  // 1. CSRF protection (JWT via Jose)
  const csrfValid = await validateCsrfToken(request);
  if (!csrfValid) return Response.json({ error: 'Invalid token' }, { status: 403 });

  // 2. Rate limiting (8 req/min per IP)
  const rateLimited = await enforceRateLimit(request, 'endpoint-name');
  if (rateLimited) return Response.json({ error: 'Too many requests' }, { status: 429 });

  // 3. Zod validation with Norwegian messages
  const result = schema.safeParse(data);
  if (!result.success) return Response.json({ errors: result.error.issues }, { status: 400 });

  // 4. Honeypot check (must be empty)
  if (data.honey !== '') return Response.json({ error: 'Bot detected' }, { status: 400 });

  // 5. File validation (type, size 10MB max, extension, magic bytes)
  // 6. Supabase operations (service role key, server-side only)
  // 7. Email notifications via Resend
}
```

#### 2. Clerk Authentication

**Root Layout** (`app/layout.tsx`):
- `ClerkProvider` with Norwegian locale (`nbNO`)
- Redirect URLs: `/logg-inn`, `/registrer`, `/min-side`

**Middleware** (`middleware.ts`):
- Protects `/min-side/*` (requires auth)
- Protects `/admin/*` (email whitelist only)
- CSP headers, www redirect, maintenance mode

**Admin Access** (`app/lib/admin-config.ts`):
- Email whitelist: `isak@bluecrew.no`, `tf@bluecrew.no`
- NO metadata/organization checks - email only

**Webhook Sync** (`app/api/webhooks/clerk/route.ts`):
- Events: `user.created`, `user.updated`, `user.deleted`
- Syncs to `clerk_users` table
- Svix signature verification required

#### 3. Form Validation

Custom Zod in `app/lib/zod.ts` with Norwegian messages:

```typescript
// app/lib/validation.ts
export const candidateSchema = z.object({
  name: z.string().min(2, 'Navn må være minst 2 tegn'),
  email: z.string().email('Ugyldig e-postadresse'),
  phone: z.string().regex(/^\d{8}$/, 'Telefonnummer må være 8 siffer'),
  fylke: z.string().min(1, 'Velg fylke'),
  kommune: z.string().min(1, 'Velg kommune'),
  skills: z.array(z.string()).min(1, 'Velg minst én kompetanse'),
  stcwConfirmed: z.literal(true, { errorMap: () => ({ message: 'Du må bekrefte STCW' }) }),
  gdprConsent: z.literal(true, { errorMap: () => ({ message: 'Du må godta vilkårene' }) }),
  honey: z.literal(''),  // Honeypot - must be empty
});
```

#### 4. Component Organization

- **Server Components** (default): Data fetching, SEO metadata
- **Client Components**: `"use client"` for interactivity
- **Styling**: Vanilla Extract `.css.ts` co-located with components
- **Layout**: `SiteLayout` wrapper for nav/footer consistency

#### 5. Styling Approach

**Design Tokens** (`styles/tokens.css.ts`):
```typescript
export const vars = {
  colors: {
    primary: '#0369a1',    // Sky blue
    accent: '#0ea5e9',     // Lighter sky blue
    text: '#0f172a',
    muted: '#64748b',
  },
  space: { xs: '8px', sm: '12px', md: '16px', lg: '24px', xl: '40px' },
  radius: { sm: '6px', md: '12px' },
};
```

**Usage**: Mix of Vanilla Extract (type-safe) and inline styles for flexibility.

### Database Schema

**Key Tables** (Supabase PostgreSQL with RLS):

| Table | Purpose |
|-------|---------|
| `clerk_users` | Cached Clerk data (synced via webhook) |
| `candidates` | Job applicants with CV/cert paths, linked to `clerk_user_id` |
| `leads` | Business leads, linked to `clerk_user_id` |
| `job_applications` | Job posting applications with status workflow |
| `time_entries` | Time registration for assignments |
| `job_assignments` | User job assignments |
| `notifications` | User notification inbox |

**Storage**: `candidates-private` bucket (RLS, service role only)

**Security**: RLS on all tables, soft delete (`deleted_at`) for GDPR, PII encryption

### Environment Variables

Required (copy `.env.example` to `.env.local`):

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key  # Server-only!

# Redis (NO QUOTES!)
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token

# Email
RESEND_API_KEY=re_your-api-key
RESEND_FROM_EMAIL=noreply@bluecrew.no
RESEND_TO_EMAILS=hr@bluecrew.no,admin@bluecrew.no

# CSRF
CSRF_SECRET=random-32-char-string

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxx
CLERK_SECRET_KEY=sk_live_xxx
CLERK_WEBHOOK_SECRET=whsec_xxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/logg-inn
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/registrer

# Optional
NEXT_PUBLIC_CLERK_PROXY_URL=https://clerk.bluecrew.no  # Custom domain
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=bluecrew.no
NEXT_PUBLIC_SENTRY_DSN=https://xxx@sentry.io/xxx
NEXT_PUBLIC_ADMIN_URL=https://admincrew.no
```

### Security Requirements

1. **NEVER expose service role keys** - Server-side only
2. **Validate all file uploads** - Type, size (10MB), extension, magic bytes
3. **Rate limit all POST endpoints** - 8 req/min via `enforceRateLimit`
4. **Honeypot on all forms** - Hidden field must remain empty
5. **CSP headers** - Don't modify without security review
6. **Admin access** - Email whitelist only (see `app/lib/admin-config.ts`)

### Common Tasks

#### Add a New Page
1. Create `app/new-route/page.tsx`
2. Export `metadata` for SEO
3. Wrap content in `SiteLayout`
4. Add to navigation in `SiteLayout.tsx` if needed
5. Add to `sitemap.ts`

#### Add an API Endpoint
1. Create `app/api/endpoint/route.ts`
2. Follow security pattern (CSRF → rate limit → validate → execute)
3. Add schema to `app/lib/validation.ts`
4. Test with curl

#### Add a Form
1. Create validation schema in `app/lib/validation.ts`
2. Include honeypot field (`honey: z.literal('')`)
3. Add `CsrfTokenInput` component
4. Handle loading/error states
5. Test rate limiting

### Troubleshooting

| Issue | Solution |
|-------|----------|
| TypeScript errors | `npx tsc --noEmit` and fix strict mode issues |
| Supabase connection | Check env vars, test `/api/health/supabase` |
| Rate limiting | Verify Redis connection, check `/api/health/debug` |
| Clerk auth | Keys required even at build time |
| File uploads | Check bucket exists, RLS policies, file validation |
| Admin access | Check email in `app/lib/admin-config.ts` |

### Key Files

| File | Purpose |
|------|---------|
| `middleware.ts` | Security headers, CSP, auth protection |
| `app/lib/server/supabase.ts` | Database client |
| `app/lib/validation.ts` | Form validation schemas |
| `app/lib/zod.ts` | Custom Zod with Norwegian messages |
| `app/lib/admin-config.ts` | Admin email whitelist |
| `app/components/SiteLayout.tsx` | Main layout |
| `app/lib/constants.ts` | Norwegian geographic data |
| `styles/tokens.css.ts` | Design tokens |

### Norwegian Market

- **Language**: All UI in Norwegian Bokmål
- **Geography**: Counties/municipalities in `app/lib/constants.ts`
- **Integrations**: Vipps (BankID), Brreg (company registry)
- **Legal**: GDPR compliance, STCW-2010 certifications
- **Clerk**: Norwegian locale (`nbNO`)

### Deployment

Vercel with automatic deployments:
- Push to branch → Preview deployment
- Merge to `main` → Production deployment
- Force redeploy: `git commit --allow-empty -m "Trigger redeploy"`
- Maintenance mode: Set `MAINTENANCE_MODE=true` in env

### Health Checks

- `/api/health/supabase` - Database connection
- `/api/health/supabase/storage` - Storage bucket access
- `/api/health/debug` - Debug info (dev only)

## Recent Updates

- **2025-11-27**: Login/profile button in mobile header
- **2025-11-26**: Job portal redesign, inline styles refactor, animation optimizations
- **2025-11-25**: Clerk Pro with Organizations, webhook sync, admin hardening
- **2025-11-24**: Portal tables (time entries, assignments, notifications)
- **2025-11-23**: User portal, GDPR features, document archive

## Notes

- Production codebase with real users - be careful with changes
- Always test locally before pushing
- Follow existing patterns for consistency
- Security score: 9/10 (see `SECURITY-FIXES-APPLIED.md`)
