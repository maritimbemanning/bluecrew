# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Bluecrew AS** - Maritime staffing and recruitment platform for the Norwegian market, built with Next.js 15.5.5 (App Router), React 19, TypeScript 5, Supabase, and Clerk authentication.

## Essential Commands

```bash
# Development
npm install                  # Install dependencies
npm run dev                 # Start dev server at http://localhost:3000

# Build & Production
npm run build               # Build for production (includes favicon generation)
npm run start               # Start production server

# Code Quality
npm run lint                # ESLint with Next.js & TypeScript configs
npx tsc --noEmit           # Type checking

# Accessibility Testing (Windows PowerShell)
npm run a11y:dev           # Test local development (WCAG 2.1 AA)
npm run a11y:prod          # Test production site

# Database Migrations (via Supabase CLI or dashboard)
supabase db push           # Apply migrations from supabase/migrations/
```

## Architecture & Key Patterns

### Tech Stack
- **Frontend**: Next.js 15.5.5 App Router (RSC enabled), React 19, TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS 4 (PostCSS plugin) + Vanilla Extract (type-safe CSS-in-TS)
- **Database**: Supabase (PostgreSQL + Storage with RLS enabled)
- **Auth**: Clerk Pro (Organizations, publicMetadata, webhooks) with Norwegian locale
- **Services**: Upstash Redis (rate limiting), Resend (email), Vipps (identity verification)

### Core Architectural Patterns

#### 1. API Route Security Pattern
Every POST endpoint must follow this security structure:
1. CSRF protection (JWT-based via Jose)
2. Rate limiting (Upstash Redis, 8 req/min sliding window)
3. Zod validation with Norwegian error messages
4. Honeypot field for bot detection
5. File validation (type, size, extension)
6. Supabase storage with service role key
7. Email notifications via Resend

#### 2. Clerk Authentication Pattern
- Root layout wraps app with `ClerkProvider` and Norwegian locale
- Middleware protects `/min-side/*` routes
- User metadata stored in `publicMetadata` (Vipps verification, admin status)
- Organizations for admin access control
- Webhooks sync user lifecycle to `clerk_users` table

#### 3. Form Validation Pattern
Custom lightweight Zod implementation (`app/lib/zod.ts`) with:
- Norwegian error messages
- Cross-field validation with `superRefine`
- Type inference for TypeScript
- Honeypot validation (must be empty)

#### 4. Component Organization
- **Server Components** (default): Direct data fetching, SEO metadata
- **Client Components**: Prefix with `"use client"`, handle interactivity
- **Styles**: Vanilla Extract `.css.ts` files co-located with components
- **Layouts**: `SiteLayout` wrapper for consistent navigation/footer

### Critical Security Requirements

1. **NEVER expose service role keys** - Server-side only
2. **Always validate file uploads** - Type, size (10MB max), extension
3. **Rate limit all public endpoints** - Use `enforceRateLimit`
4. **Honeypot on all forms** - Hidden field that must remain empty
5. **CSP headers configured** - Don't modify without review
6. **Admin routes blocked** - `/admin/*` returns 404 in middleware

### Environment Variables

Required for development (copy `.env.example` to `.env.local`):
- Supabase: `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`
- Redis: `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` (no quotes!)
- Email: `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_TO_EMAILS`
- Auth: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`
- Security: `CSRF_SECRET` (32+ char random string)

### Database Schema

Key tables (Supabase PostgreSQL with RLS):
- `candidates`: Job applicants with CV/certificate paths
- `clients`: Business leads
- `clerk_users`: Cached Clerk user data (synced via webhook)
- Storage buckets: `candidates-private` (never public)

### File Structure

```
app/
├── api/                    # API routes following security pattern
├── components/             # Shared components (SiteLayout, forms)
├── lib/                    # Core utilities
│   ├── server/            # Server-only code (supabase, email, csrf)
│   ├── validation.ts      # Zod schemas
│   └── constants.ts       # Norwegian counties/municipalities
├── logg-inn/              # Clerk login page
├── min-side/              # Protected user dashboard
├── jobbsoker/             # Candidate registration
└── kunde/                 # Client pages
```

### Norwegian Market Specifics

- **UI/Content**: All text in Norwegian Bokmål
- **Geographic**: Counties/municipalities in `app/lib/constants.ts`
- **Integrations**: Vipps (BankID), Brreg (company registry)
- **Legal**: GDPR compliance, STCW-2010 certifications required

### Deployment

Hosted on Vercel with automatic deployments:
- Push to branch → Preview deployment
- Merge to `main` → Production deployment
- Force redeploy: `git commit --allow-empty -m "Trigger redeploy"`

### Common Development Tasks

#### Adding a New Page
1. Create route folder: `app/new-route/`
2. Add `page.tsx` with SEO metadata and `SiteLayout`
3. Update navigation in `SiteLayout.tsx` if needed
4. Add to `sitemap.ts`

#### Adding an API Endpoint
1. Create `app/api/endpoint/route.ts`
2. Follow API route security pattern (see above)
3. Add validation schema to `app/lib/validation.ts`
4. Configure rate limiting prefix

#### Adding a Form
1. Create validation schema with Norwegian messages
2. Add `CsrfTokenInput` and honeypot field
3. Handle submission with proper error states
4. Test validation and rate limiting

### Troubleshooting

**TypeScript errors**: Run `npx tsc --noEmit` and fix strict mode issues
**Supabase connection**: Check env vars and test with `/api/health/supabase`
**Rate limiting**: Verify Redis connection, test with curl loop
**Clerk auth**: Ensure keys are set (required even at build time)
**File uploads**: Check bucket exists, RLS policies, file validation

### Key Files Reference

- `middleware.ts`: Security headers, CSP, auth protection
- `app/lib/server/supabase.ts`: Database client initialization
- `app/lib/validation.ts`: All form validation schemas
- `app/components/SiteLayout.tsx`: Main layout with navigation
- `app/lib/constants.ts`: Norwegian geographic data

### Recent Updates

**2025-11-25**: Clerk Pro integration with Organizations, metadata, webhooks
**2025-11-23**: Added Clerk auth, user portal, GDPR features
**2025-11-19**: Initial comprehensive documentation

## Notes

- This is a production codebase with real users - be cautious with changes
- Security score: 9/10 (see `SECURITY-FIXES-APPLIED.md`)
- Always test locally before pushing
- Follow existing patterns for consistency