# Plausible goals and dashboard

This project sends consent-aware Plausible custom events for key actions. Use this guide to create conversion goals and a lightweight dashboard in Plausible.

## Event catalog (already emitted by the site)

Each event includes custom props to enable precise filtering.

- Event: "CTA Click"
  - Props: { location: "header", cta: "Meld interesse" }
- Event: "Verify Click"
  - Props: { provider: "Vipps", location: "header" }
- Event: "Phone Click"
  - Props: { location: "hero" | "floating" }
- Event: "Lead Submitted"
  - Props: { form: "candidate" | "client" }
- Event: "Interest Submitted"
  - Props: { form: "candidate_interest" }

Note: Events only fire when analytics consent is granted (via `PlausibleLoader`).

## Create conversion goals

1) Open Plausible → Sites & apps → Select your site
2) Go to Conversions → Add goal → "Custom event"
3) Configure each goal as follows:

- Goal: Header Interest click
  - Event name: CTA Click
  - Property filters: cta equals "Meld interesse" AND location equals "header"

- Goal: Vipps verify click (header)
  - Event name: Verify Click
  - Property filters: provider equals "Vipps" AND location equals "header"

- Goal: Phone click (Hero)
  - Event name: Phone Click
  - Property filters: location equals "hero"

- Goal: Phone click (Floating)
  - Event name: Phone Click
  - Property filters: location equals "floating"

- Goal: Candidate lead submitted
  - Event name: Lead Submitted
  - Property filters: form equals "candidate"

- Goal: Client lead submitted
  - Event name: Lead Submitted
  - Property filters: form equals "client"

- Goal: Interest submitted
  - Event name: Interest Submitted
  - Property filters: form equals "candidate_interest"

Save each goal. Plausible will backfill counts from the time events started sending.

## Suggested dashboard widgets

On the Dashboard → Customize, add the following:

- Time series: Conversions → Header Interest click
  - Break down by prop: location or cta if you want cross-checks
- Time series: Conversions → Vipps verify click (header)
  - Breakdown by prop: provider (to confirm only "Vipps")
- Time series: Conversions → Phone Click (stacked)
  - Breakdown by prop: location → hero vs floating
- Time series: Conversions → Lead Submitted (stacked)
  - Breakdown by prop: form → candidate vs client
- Table: Top pages → Filter by page equals "/" and "/kunde/registrer-behov" to focus on funnel pages
- KPI: Conversion rate → Candidate lead submitted
- KPI: Conversion rate → Client lead submitted

Optional funnels (Explorations → Funnels):

- Funnel: Header interest → Candidate lead submitted
  - Step 1: CTA Click (cta: "Meld interesse", location: "header")
  - Step 2: Lead Submitted (form: "candidate")

- Funnel: Vipps verify → Account created (future)
  - Step 1: Verify Click (provider: "Vipps", location: "header")
  - Step 2: [Add an "Account Created" event when implemented]

## QA checklist

- In a consented session, click each CTA and confirm events appear in Plausible → Realtime (takes a few seconds)
- Confirm CSP allows `plausible.io` (already configured in `middleware.ts`)
- Verify goals show non-zero counts after interacting

## Notes

- Event names and props are case-sensitive. Use the exact strings above.
- If you rename an event or prop in code, update the corresponding Plausible goal filters.
- For UTM/source analysis, use Plausible's built-in "Sources" and "UTM" breakdowns alongside these goals.
