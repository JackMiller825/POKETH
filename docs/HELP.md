# PokeETH Help (V2)

## Start
1. Install Node.js 20+ and npm.
2. Open the project directory and run `npm install`, then `npm run dev`.
3. Open http://localhost:3000. On Windows, double-click `START_POKEETH.cmd`.

## Tokens and links
Edit `app/config.ts` to supply the official Ethereum mainnet ERC-20 address and social profile URLs. Until a valid 42-character hexadecimal address exists, the site disables purchase, chart, copy and explorer links and says Coming soon. A formatted address is not a verification of legitimacy. Double-check liquidity and permissions separately.

## Reference-matched art
All 22 corresponding source filenames live under `public/assets/reference/`. The main 6 sections consume these directly: hero `banner-800.webp`; trainer `trainer-card-480.webp`; steps `step-wallet-480.webp`, `step-sol-480.webp` (shows ETH, filename retained for compatibility), `step-swap-480.webp`, `step-hold-480.webp`; badges `gym-badges.webp`; gallery uses 14 images in the same sequence as the Pokecity JS; community background `festival-480.webp`; popup `pikachu.jpg` (image contains only Ethchu; original filename retained for integration).

`public/assets/chapters/` and `public/assets/creatures/` contain story/character expansion artwork; the expandable Etherwild Chronicle preserves all eight chapters while leaving reference primary section order unchanged.

## Page interactions
Sticky navigation, mobile menu, floating hero banner, dialogue panels, CA and crystal orb, scroll reveals, chapter toggle, 14-image lightbox (arrows, escape, swipe), and an Ethchu surprise popup. Reduced-motion preferences disable animations.

## Quality gates
Run `npm run verify:assets`, `npm run typecheck`, and `npm run build`. Compare screenshots at 1440px, 768px, 390px and 320px widths. Watch for fonts blocked by corporate firewalls, horizontal scroll, clipped button labels, long party text, and hero art blur. Never use reference character art from Pokecity in the PokeETH project.

## Trademark
PokeETH and the slogan still evoke Pokémon; clear the name before commercial launch. Characters, art, world and copy are original adaptations, not official Nintendo or Pokémon products.
