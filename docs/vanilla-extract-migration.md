# vanilla-extract migration notes

What I added
- `@vanilla-extract` integration in `next.config.ts` (wrap Next config).
- `styles/tokens.css.ts` — design tokens (colors, spacing, radius, shadows).
- `styles/global.css.ts` — base global styles using tokens.
- `styles/utils.css.ts` — utility styles (container, buttons, focus ring).
- `app/components/home/*` — `Hero`, `StorySection`, `ServiceCards` components with `.css.ts` styles.

Install (required)
---------------
Run these commands locally to install required packages:

```powershell
npm install @vanilla-extract/css @vanilla-extract/next-plugin --save-dev
# Optional: install types if you want (not strictly necessary)
```

Notes
-----
- The repo currently references `sx` style objects in many places. I replaced key front-page sections with vanilla-extract components and left the rest untouched to avoid large risky changes in one go.
- TypeScript/Next will report missing module errors until you install the new packages. After installing, the plugin will allow `.css.ts` files to be compiled.

Next steps
----------
1. Run `npm install` locally.
2. Start dev server: `npm run dev` and validate pages load.
3. Migrate additional components incrementally:
   - Replace `sx` usages with `style` classes from vanilla-extract.
   - Prefer token usage (import `vars` from `styles/tokens.css.ts`) for color/spacing.
4. Consider adding a tiny ESLint rule or codemod to find `style={sx.` and flag for migration.

If you want, I can now:
- run a targeted migration for the rest of the homepage, or
- create a codemod that changes `style={sx.*}` to classNames referencing generated utilities (semi-automatic), or
- set up Tailwind (alternative) if you prefer a utility-first system.
