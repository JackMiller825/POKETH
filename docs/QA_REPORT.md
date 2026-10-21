# PokeETH V2 — QA Report

## Completed checks
- PASS: all 22 PokeETH replacement filenames exist and dimensions match the source ZIP exactly (Pillow checks, Oct 21 2026).
- PASS: `npm run verify:assets` checks 51 required source/doc/image paths and all 6 page anchors.
- PASS: local TypeScript `transpileModule` parser reports no syntax diagnostics for `app/page.tsx`, `app/config.ts`, `app/layout.tsx`.
- PASS: React/Next.js source uses mapped images in hero, Trainer Card, all four Journey steps, Crystal Vault, 14 Gallery tiles, community backdrop, popup and favicon.
- PASS: token and social configuration remains blank until official details are supplied.

## Unable to complete in the current environment
- NOT RUN: actual Next.js production build and full TypeScript semantic check. `npm install` could not complete due restricted package registry access (timed out).
- NOT RUN: pixel-accurate comparison screenshots. Browser navigation to https://pokecitycoin.lol/, file:// and http://127.0.0.1 local static preview was blocked by the execution environment.
- NOT VERIFIED: runtime events, mobile menu touch behavior, gallery keyboard and touch interactions in a running Next.js app.

## Required final verification in Cursor or an unrestricted browser
1. Run `npm install`, `npm run verify:assets`, `npm run typecheck`, `npm run build`.
2. Run `npm run dev` and test at 1440×900, 768×1024, 390×844 and 320×700 against the live reference.
3. Compare screenshots section-by-section for spacing, shadows, sizing, responsive behavior, font rendering, clipping and image sharpness.
4. Test gallery open/close, previous/next, keyboard Escape/left/right, touch swipe, chapter modal, mobile hamburger menu, contract copy disabled, pop-up and reduced motion.
5. Before launch verify Ethereum contract, token parameters, liquidity ownership and real social links.

**Status:** reference asset integration completed; structural fidelity is high, but pixel-perfect fidelity has not been proved.
