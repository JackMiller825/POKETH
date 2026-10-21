# Pokecity reference audit → PokeETH implementation

Evidence base: live text crawl of `https://pokecitycoin.lol/` October 20, 2026; and the user-provided ZIP `Pokecity Coin ($Pokecity) _ Welcome to Pokecity!_files.zip`. The ZIP includes `style.css`, `main.js.download` and 22 image entries (some repeated as JPG/WEBP). **It does NOT contain the main saved HTML**. This audit therefore distinguishes code-confirmed facts from layout assumptions.

## Reference asset inventory

- `banner-800.webp` — 800×267 — 3:1 main hero/banner.
- `logo-800.webp`, `logo-400.jpg` — 800×800, 400×400 — portrait/emblem.
- `hero-city-480.webp`, `night-city-480.webp` — 480×270 — landscape backdrops.
- `trainer-card-480.webp` — 480×360 — passport sidebar.
- `step-wallet-480.webp`, `step-sol-480.webp`, `step-swap-480.webp`, `step-hold-480.webp` — 480×360 — 4 journey cards.
- `step-sol.jpg`, `step-swap.jpg`, `step-hold.jpg` — 1152×864 — larger versions.
- `gym-badges-480.webp`, `gym-badges.webp`, `gym-badges.jpg` — 480×360 and 1152×864.
- `gold-coin-480.webp` — 480×480 — decorative/gallery.
- `exchange-market-480.webp`, `festival-480.webp` — 480×270 — gallery.
- `to-the-moon-480.webp` — 480×640 — portrait/gallery.
- `pikachu.jpg` — 420×580 — popup artwork.
- `favicon-32.png` — 32×32.

## Measurable CSS / behavior

| Reference trait | CSS/JS measurement | PokeETH adaptation |
|---|---|---|
| Navigation | sticky, top 0; 5px border; menu hidden <=860px | same structure, purple instead of red |
| Hero banner | max-width 1080px; border radius 22px; 5px white border/5px dark outer; float at 5s | 1500×500 PokeETH banner, same frame |
| Title | Luckiest Guy, clamp(2.8rem,9vw,6rem), 4px navy outline | same display grammar |
| Pixel elements | Press Start 2P; ~0.55–0.95rem | same typography |
| Buttons | 3px border, 5px dark shadow, squish/hover | preserved |
| Hero backdrop | background cover + vertical overlay | Etherwild city storyboard |
| Content sections | padding clamp(56px,8vw,96px); 1100px max | preserved |
| Address box | 920px max, negative top margin -26px | preserved, orb replaces Pokéball |
| Trainer card | yellow 1.1fr/0.9fr grid; <=820px one column | identical grid; Crystal Passport |
| Journey | 2 columns, gap 28px, <=720px one column | identical; Ethereum instructional content |
| Badges | 1fr/1fr outer grid, 2 columns within badges; <=860 and <=420px collapse | same; original vault art |
| Gallery | grid auto-fill minmax(230px,1fr); lightbox arrows/Esc/swipe | preserved and keyboard-accessible |
| Community | background image with gradient overlay, single centered social card | preserved |
| Interactivity | URL and CA config, copy toast, orb wobble, 6-second typed popup, reveal observer | React adaptation |

## Exact section sequence from live page

Sticky nav → hero → contract address → Trainer Card → Your Journey (4 steps) → Gym Badges (6 badges) → Gallery → Community → footer, plus transient popup and gallery overlay.

## PokeETH story integration

The design should remain visually close to the source. The 8 chapters therefore live under a single **collapsible Etherwild Chronicle** within the Crystal Passport section, and each chapter is discoverable in the gallery. This avoids an extra, very tall mandatory section breaking the page rhythm.

## Critical differences that are deliberate

- Different color palette: PokeETH purple, cyan, yellow rather than exact Pokecity red, blue, yellow.
- Original characters and landscapes; no Pikachu, Poké Balls, Pokecity social links or Nintendo likenesses.
- Chain: Ethereum; ETH, MetaMask/Rabby, Uniswap, Etherscan, DexScreener.
- Missing/unverified launch parameters remain disabled or labeled *proposed*.
- The 8 scene illustrations are still simplified composite **storyboards**, not the final cinematic scenes.

## Visual acceptance checklist

- Desktop at 1440: one-line nav; wide hero; proper 3:1 framed banner; CTA row; CA panel overlaps hero.
- 1024: still clean cards; navbar shrinks sensibly.
- 768: sticky nav menu toggle; trainer card stacks; badge layout stacks.
- 390/320: no horizontal overflow; 4:3 journey scenes scale correctly; buttons remain usable; headings don't crop.
- All hero/character artwork uses correct `object-fit` semantics (background cover, sprites contain).
- Contrast, keyboard focus, reduced-motion, lightbox, no social/contract links to competitor.
- Test with Playwright screenshot comparisons before declaring pixel-exact.
