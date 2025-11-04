# Accessibility audit — automated pa11y scan (results)

Date: 2025-10-24
Target: Local development server (http://localhost:3000)

Summary
-------
- I ran an automated pa11y audit against three high-priority pages and fixed the single high-severity issue found.
- Pages scanned: `/` (homepage), `/jobbsoker`, `/kunde`.
- Results: `/jobbsoker` and `/kunde` had no automated issues. The homepage had one WCAG 2.0 AA contrast failure (insufficient text contrast) which I fixed.

Findings (automated)
--------------------
1) Homepage — insufficient contrast (WCAG 1.4.3 — AA)
   - Issue: Text element "Menneskene i Bluecrew" used color `#0ea5e9` and failed the 4.5:1 contrast requirement (measured 2.77:1).
   - Selector reported by pa11y: `html > body > div:nth-child(2) > main > section:nth-child(5) > div > div:nth-child(1) > span`
   - Context: `<span style="...;color:#0ea5e9;...">Menneskene i Bluecrew</span>`
   - Action taken: Updated the `sx.teamAccent` color from `#0ea5e9` to a higher-contrast `#007eb6` in `app/lib/styles.ts`.
   - Verification: Re-ran pa11y after the change — the homepage now reports no issues.

Files changed
-------------
- `app/lib/styles.ts` — changed `teamAccent.color` from `#0ea5e9` to `#007eb6` to meet WCAG contrast.

How to reproduce locally (scripts)
----------------------------------
1) Dev-mode scan (faster, for local iteration):
  - Run: `scripts/run-pa11y.ps1`
  - What it does: starts `npm run dev` (Turbopack disabled), waits for readiness, warms key routes, runs pa11y with waits, writes JSON files under `docs/`, stops server.
2) Prod-mode scan (matches CI more closely):
  - Run: `scripts/run-pa11y-prod.ps1`
  - What it does: starts `npm start`, warms routes, runs pa11y with waits, writes JSON files under `docs/`, stops server.

pa11y JSON outputs
------------------
The scripts produce these files (empty array means no findings):
   - `docs/pa11y-home.json` — after the fix this file is empty (no issues).
   - `docs/pa11y-jobbsoker.json` — empty.
   - `docs/pa11y-kunde.json` — empty.
  - `docs/pa11y-kontakt.json` — empty.
  - `docs/pa11y-om-oss.json` — empty.
  - `docs/pa11y-cookies.json` — empty.

How I verified the fix
----------------------
- Re-started the dev server (without Turbopack) and re-ran the pa11y scans using a PowerShell helper script `scripts/run-pa11y.ps1`. The homepage previously reported the single contrast failure; after updating `sx.teamAccent` pa11y returned no errors on the scanned pages.

Manual QA checklist (recommended)
--------------------------------
Run these checks locally (manual) to complement the automated scan:

- Keyboard / focus
  - Tab through the header navigation and open desktop dropdowns with Enter/Space.
  - Use ArrowDown / ArrowUp to navigate menu items. Press Escape to close. Ensure focus returns to the trigger.
  - Open the mobile menu, Tab through links, and ensure focus is trapped and Escape closes the sheet.

- Screen reader (VoiceOver / NVDA)
  - With the screen reader active, navigate to the main navigation. Ensure the menu trigger announces itself (e.g., "button, expanded/has popup"), submenus are announced as menus, and menuitems are read properly.
  - Verify decorative icons are hidden from assistive tech (aria-hidden) and CTA buttons announce clear labels.

- Color contrast & visuals
  - Spot-check CTA buttons and small text on dark backgrounds at the smallest sizes used (mobile). Use a contrast checker to confirm 4.5:1 for normal text and 3:1 for large text where applicable.

Next steps I can take
---------------------
1. Broader automated scan: extend to more pages (kontakt, om-oss, form pages) and run axe-core for deeper issues (landmark roles, forms, ARIA misuses).
2. Address any manual QA findings (I can patch code and open a PR with fixes + tests).
3. Add a CI step running pa11y or axe on a deployed preview URL to prevent regressions.

If you want me to continue, I can now:
- run a wider pa11y/axe sweep across more pages and produce a prioritized list, or
- perform manual screen reader / keyboard testing and report any observed problems and fixes.

Appendix — raw pa11y outputs
---------------------------
- `docs/pa11y-home.json` (after fix): empty array
- `docs/pa11y-jobbsoker.json`: empty array
- `docs/pa11y-kunde.json`: empty array

---

If you'd like, I can open a small PR with the `styles.ts` change and include tests or CI checks; otherwise I can proceed with a wider scan next. Let me know which direction you prefer.

---

## Extended scan and fixes (additional run)

Date: 2025-10-24 (extended run)

What I ran
---------
- An extended pa11y sweep using `scripts/run-pa11y-more.ps1` which starts the dev server, waits for readiness, scans a broader set of pages, writes JSON outputs to `docs/pa11y-*.json`, and stops the server.

Pages scanned in the extended run
-------------------------------
- `/` (homepage)
- `/jobbsoker/registrer`
- `/kunde/registrer-behov`
- `/kontakt`
- `/om-oss`
- `/cookies`

Findings and actions taken
--------------------------
- Cookies page — multiple low-contrast links and a background contrast suggestion were reported. The links used `#0ea5e9` which failed the 4.5:1 threshold. I updated link and footer colors to the higher-contrast `#007eb6` / darker footer `#475569` where appropriate.
- Also updated `app/components/CookieBanner.tsx` so banner links and button-links use the new `#007eb6` color.
- Applied link color updates on `app/personvern/page.tsx` and `app/vilkar/page.tsx` (they shared the low-contrast link color) to ensure consistency across policy pages.

Files changed (additional)
-------------------------
- `app/cookies/page.tsx` — updated link colors and footer text color to improve contrast.
- `app/personvern/page.tsx` — changed local link color to `#007eb6`.
- `app/vilkar/page.tsx` — changed local link color to `#007eb6`.
- `app/components/CookieBanner.tsx` — updated link/button-link color to `#007eb6`.
- `scripts/run-pa11y-more.ps1` — helper script used to run the extended pa11y sweep.

Verification
------------
- After the fixes I re-ran the extended script. The generated `docs/pa11y-*.json` files for the scanned pages are now empty arrays (no automated issues reported by pa11y for those pages at the time of scanning).

Current automated coverage (from these runs)
-----------------------------------------
- `docs/pa11y-home.json` — empty
- `docs/pa11y-jobbsoker-registrer.json` — empty
- `docs/pa11y-kunde-registrer-behov.json` — empty
- `docs/pa11y-kontakt.json` — empty
- `docs/pa11y-om-oss.json` — empty
- `docs/pa11y-cookies.json` — empty

CI notes
--------
- Workflow: `.github/workflows/a11y.yml` warms routes, runs pa11y with `--wait 3000 --timeout 60000` on six key routes, writes JSON to `docs/`, uploads them as artifacts, and prints a brief summary to logs.
- If CI ever reports failures, download the `pa11y-reports` artifact and inspect the non-empty JSON file(s). Reproduce with `scripts/run-pa11y-prod.ps1` and fix the specific selector/message.
-- Status: As of 2025‑11‑04 the pa11y job is BLOCKING (continue-on-error disabled). Any new findings will fail the workflow while still uploading artifacts and printing summaries.

Notes and next recommended steps
--------------------------------
- Automated scans are clear for the pages covered. Automated tools cover many but not all accessibility issues (they can't fully validate keyboard semantics, screen-reader announcements, or some ARIA misuse).
- Next high-value step: manual screen-reader walkthroughs (VoiceOver and NVDA) for navigation, mobile menu (focus trap), and form flows. I can run these tests and record a concise checklist of observed behaviors and suggested fixes.
- After manual QA, add a CI check (pa11y/axe) on preview deployments to prevent regressions.

If you'd like I can now:
- run the manual screen-reader + keyboard QA and file any small fixes found, or
- expand the automated sweep to all public pages and prepare a CI job that runs pa11y/axe against a preview deployment.
