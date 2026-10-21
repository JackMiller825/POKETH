# CURSOR BUILD PROMPT — PokeETH

You are working in the included Next.js / TypeScript PokeETH project. The reference is https://pokecitycoin.lol/ . The user's original reference assets are supplied as a separate ZIP. Our 22 copyright-distinct replacement assets live in `public/assets/reference/` with the same filenames, dimensions and aspect ratios as the reference. Do not copy original Pokémon illustrations, social links or token contracts. The goal is an exceptionally close reference layout and interactions with original Etherwild art, PokeETH story and Ethereum chain.

MUST FOLLOW
1. Start by running npm install, npm run verify:assets, npm run typecheck, npm run build. Do not falsely claim passes. Fix issues.
2. Use a browser at fixed 1440x900, 768x1024, 390x844 and 320x700 viewports to screenshot reference and localhost at same positions. For each section, compare screenshot geometries, background colors, typography, card aspect ratios, image cropping, borders, whitespace, mobile flow, dialog boxes, and animations. Log a before/after issue list and pixel distances for major elements.
3. Keep single scrolling page and same primary order/anchors: Hero/CA → Trainer Card → Your Journey (2x2) → Crystal Badges → Gallery (14 items) → Town Square → Footer. Eight chapter Chronicle remains toggleable under Trainer Card.
4. Use exactly the mapped 22 image filenames under `/assets/reference` in main site sections, not chapter preview collages or individual mascot overlays in place of dedicated step illustrations. Reference image source resolution may be low, so preserve aspect ratio and avoid heavy scale-up beyond native resolution.
5. Keep the beautiful PokeETH palette (amethyst/cyan/yellow) and original Ethchu plus 9 Etherwild creatures. Do not use Pokecity Pokémon characters or source art in production. Replace the reference's ball with the crystal-orb UI but mirror the popup/copy interactions.
6. Keep 0x contract placeholder blank until user supplies actual Ethereum CA. Keep Uniswap, DexScreener, Etherscan disabled before launch. No claims of burned LP or renounced ownership until verified. Social links empty until user provides URLs.
7. Implement accessibility: keyboard gallery navigation, tab focus, menu ARIA, focus trapping in lightbox, reduced motion, meaningful alt text, properly disabled buttons, and no horizontal overflow.
8. Optimize public images with Next/Image where useful without harming layout. Ensure loaded image sizes and native aspect ratio. Use no fake external accounts, fake prices or promises.
9. Update `docs/HELP.md` and this prompt and relevant asset docs after any feature changes; report test results in `docs/QA_REPORT.md`.
10. Deliver a committed Next.js site and screenshot diff evidence; do not consider it complete without passing checks and visual screenshots.

Reference-match fidelity is measured by spacing/order/element geometry and interaction timing, NOT by copying original Pokémon art.

## Precise asset usage contract

See `docs/ASSET_SLOT_MAP.md`. Do not swap images arbitrarily. Check proportions versus the reference source: 800×267 hero art; 480×360 trainer; 480×360 four buy panels; 1152×864 badge case; 480px gallery scenes; portrait popup. Keep the original gallery order (14) from `main.js.download` in supplied source ZIP.

## Visual priorities by section

- **Navigation:** match bar height, logo circle size, typeface, link spacing, shadow and collapse breakpoint. All links scroll on the same page.
- **Hero:** centered floating 3:1 rounded banner with thick border and offset shadow; headline and ticker underneath; game dialogue panel; pill CTAs; contract bar overlaps bottom. Match vertical distances.
- **Trainer Card:** large yellow gold 2-column card; reddish/purple header, portrait panel, stats list, large passport illustration; dialogue row full width. No compressed/missing card info.
- **Journey:** precisely two cards per row on desktop, single stacked on phone; 4:3 top artwork and overlapping caption dialogue box. No extra mascots layered on the supplied illustrations.
- **Badges:** left 4:3 vault illustration, right 2×3 badge information grid, stacked layout on tablet/phone. Claims must be explicit about proposed vs verified.
- **Gallery:** exactly 14 image tiles with captions in same order as reference. Four-ish columns at desktop and responsive auto-fill on mobile; lightbox controls and touch swipe.
- **Community:** colorful PokeETH festival illustration behind an X-style community information card. No links to reference project accounts.
- **Footer:** PokeETH logo, simple social links, contract verification and notices.

## Expected output
Deliver `docs/QA_REPORT.md` with a section table reporting reference screenshot, local screenshot, pixel-layout discrepancy, fix, and re-test evidence. Correct the highest visual deltas first. Run full build and acceptance tests. If reference browser is inaccessible, state exactly what could not be tested; do not invent a "perfect" visual match.
