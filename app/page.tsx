"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { trackCta, type Cta } from "@/lib/analytics/tracker";
import { useActiveSection } from "@/lib/hooks/useActiveSection";
import { CHAPTERS, CREATURES, JOURNEY_STEPS, SITE, tokenLinks } from "./config";

const PUBLIC_BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";
const PENDING_CA = "Coming soon — verify the address here after launch";
const asset = (path: string) => `${PUBLIC_BASE}${path}`;
const BRAND = asset("/assets/brand");
const REF = asset("/assets/reference");
const CREATURE = asset("/assets/creatures");
const CHAPTER = asset("/assets/chapters");

type GalleryImage = { src: string; caption: string; kind: "scene" | "creature" | "brand" };

function PokeETHLogo({ small = false }: { small?: boolean }) {
  return <img src={`${REF}/logo-800.webp`} alt="PokeETH emblem featuring Ethchu" width={small ? 38 : 110} height={small ? 38 : 110} />;
}

export default function Home() {
  useActiveSection();
  const links = tokenLinks();
  const [toast, setToast] = useState("");
  const [orbOpen, setOrbOpen] = useState(false);
  const [wildOpen, setWildOpen] = useState(false);
  const [wildMessage, setWildMessage] = useState("A wild ETHCHU appeared!");
  const [wildDisplay, setWildDisplay] = useState("");
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);
  const [chapterPreview, setChapterPreview] = useState<string | null>(null);
  const [chronicleOpen, setChronicleOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const orbTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wildTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wildShown = useRef(false);
  const lastFocus = useRef<HTMLElement | null>(null);
  const lbClose = useRef<HTMLButtonElement | null>(null);

  // Preserve the exact 14-image order defined by the Pokecity reference JavaScript.
  // Gallery "full" files use their reference-sized equivalent where available.
  const gallery = useMemo<GalleryImage[]>(() => [
    { src: `${REF}/banner-800.webp`, caption: "PokeETH City — Crystal Isles banner", kind: "brand" },
    { src: `${REF}/logo-800.webp`, caption: "PokeETH — Ethchu emblem", kind: "brand" },
    { src: `${REF}/hero-city-480.webp`, caption: "Etherwild seaside panorama", kind: "scene" },
    { src: `${REF}/gold-coin-480.webp`, caption: "The Ethereum Crystal Coin", kind: "scene" },
    { src: `${REF}/exchange-market-480.webp`, caption: "PokeETH Crystal Exchange", kind: "scene" },
    { src: `${REF}/to-the-moon-480.webp`, caption: "Ethchu visits the moon", kind: "scene" },
    { src: `${REF}/trainer-card-480.webp`, caption: "Crystal Passport at the dock", kind: "scene" },
    { src: `${REF}/step-wallet-480.webp`, caption: "Step 1 · Create a wallet", kind: "scene" },
    { src: `${REF}/step-sol-480.webp`, caption: "Step 2 · Get ETH", kind: "scene" },
    { src: `${REF}/step-swap-480.webp`, caption: "Step 3 · Swap at the Crystal Gate", kind: "scene" },
    { src: `${REF}/step-hold-480.webp`, caption: "Step 4 · Celebrate with friends", kind: "scene" },
    { src: `${REF}/gym-badges-480.webp`, caption: "The Crystal Vault", kind: "scene" },
    { src: `${REF}/festival-480.webp`, caption: "PokeETH City festival", kind: "scene" },
    { src: `${REF}/night-city-480.webp`, caption: "Etherwild after dark", kind: "scene" }
  ], []);

  const notify = useCallback((message: string) => {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 2400);
  }, []);

  const showWild = useCallback((message = "A wild ETHCHU appeared! CRYSTAL CRYSTAL! ✨") => {
    setWildMessage(message);
    setWildOpen(true);
    if (wildTimer.current) clearTimeout(wildTimer.current);
    wildTimer.current = setTimeout(() => setWildOpen(false), 6000);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) { setWildDisplay(wildMessage); return; }
    if (!wildOpen) { setWildDisplay(""); return; }
    setWildDisplay("");
    let position = 0;
    const interval = setInterval(() => {
      position += 1;
      setWildDisplay(wildMessage.slice(0, position));
      if (position >= wildMessage.length) clearInterval(interval);
    }, 32);
    return () => clearInterval(interval);
  }, [wildOpen, wildMessage]);

  useEffect(() => {
    const node = document.getElementById("journey");
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(entries => {
      if (!wildShown.current && entries.some(e => e.isIntersecting)) {
        wildShown.current = true;
        showWild("A wild ETHCHU appeared! Welcome to Etherwild! ✨");
        observer.disconnect();
      }
    }, { threshold: .25 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [showWild]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const nodes = [...document.querySelectorAll(".tcard,.step,.badge,.xcard,.gi,.creature-card,.chapter-card")];
    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("in"); observer.unobserve(e.target); }
    }), { threshold: .09 });
    nodes.forEach(n => { n.classList.add("reveal"); observer.observe(n); });
    return () => observer.disconnect();
  }, [chronicleOpen]);

  const copyCA = useCallback(async () => {
    const text = links.valid ? links.contract : PENDING_CA;
    try { await navigator.clipboard.writeText(text); }
    catch {
      const input = document.createElement("textarea"); input.value = text;
      document.body.appendChild(input); input.select(); document.execCommand("copy"); input.remove();
    }
    setOrbOpen(true);
    if (orbTimer.current) clearTimeout(orbTimer.current);
    orbTimer.current = setTimeout(() => setOrbOpen(false), links.valid ? 1600 : 800);
    if (links.valid) {
      notify("Gotcha! Ethereum contract copied ✨");
      showWild("Gotcha! $POKETH contract was collected!");
    } else {
      notify("Copied to clipboard ✨");
    }
  }, [links.contract, links.valid, notify, showWild]);

  function orbClick() {
    void copyCA();
  }

  const openGallery = useCallback((index: number) => {
    lastFocus.current = document.activeElement as HTMLElement;
    setGalleryIndex(index);
  }, []);
  const closeGallery = useCallback(() => {
    setGalleryIndex(null); setChapterPreview(null);
    requestAnimationFrame(() => lastFocus.current?.focus());
  }, []);
  const changeGallery = useCallback((delta: number) => {
    setGalleryIndex(current => current === null ? null : (current + delta + gallery.length) % gallery.length);
  }, [gallery.length]);

  useEffect(() => {
    if (galleryIndex === null && chapterPreview === null) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lbClose.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeGallery();
      if (e.key === "ArrowLeft" && !chapterPreview) changeGallery(-1);
      if (e.key === "ArrowRight" && !chapterPreview) changeGallery(1);
      // Keep keyboard focus within the active lightbox until it is closed.
      if (e.key === "Tab") {
        const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>(".lb button:not([disabled])"));
        if (!buttons.length) return;
        const first = buttons[0]; const last = buttons[buttons.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = old; document.removeEventListener("keydown", onKey); };
  }, [galleryIndex, chapterPreview, closeGallery, changeGallery]);
  useEffect(() => () => {
    [toastTimer, orbTimer, wildTimer].forEach(r => { if (r.current) clearTimeout(r.current); });
  }, []);

  function actionLink(label: string, url: string, className: string, fallback: string, cta?: Cta) {
    return url ? (
      <a
        className={className}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          if (cta) trackCta(cta);
        }}
      >
        {label}
      </a>
    ) : (
      <button className={className} disabled title={fallback} aria-label={`${label} — ${fallback}`}>{label} · soon</button>
    );
  }

  const tokenBadges = [
    { icon: "◆", title: "Name", value: "PokeETH", className: "b1" },
    { icon: "$", title: "Ticker", value: "$POKETH", className: "b2" },
    { icon: "⛓", title: "Chain", value: "Ethereum mainnet", className: "b3" },
    { icon: "✦", title: "Contract", value: links.valid ? `${links.contract.slice(0, 6)}…${links.contract.slice(-4)}` : "Coming soon", className: "b4" },
    { icon: "◇", title: "Supply / Tax", value: `${SITE.tokenomics.supply} / ${SITE.tokenomics.tax}`, className: "b5" },
    { icon: "♡", title: "Liquidity / Ownership", value: `${SITE.tokenomics.liquidity} / ${SITE.tokenomics.ownership}`, className: "b6" },
  ];

  const swipeStartX = useRef<number | null>(null);
  return <>
    <a className="skip" href="#main">Skip to content</a>
    <header className="nav">
      <a className="brand" href="#top" onClick={() => showWild()}><PokeETHLogo small /><span>PokeETH</span></a>
      <nav className={`nav-links ${mobileMenu ? "expanded" : ""}`} aria-label="Main navigation">
        <a href="#trainer" onClick={() => setMobileMenu(false)}>Trainer Card</a>
        <a href="#journey" onClick={() => setMobileMenu(false)}>Journey</a>
        <a href="#badges" onClick={() => setMobileMenu(false)}>Crystal Badges</a>
        <a href="#gallery" onClick={() => setMobileMenu(false)}>Gallery</a>
        <a href="#community" onClick={() => setMobileMenu(false)}>Community</a>
      </nav>
      <button className="menu-toggle" type="button" aria-label="Toggle menu" aria-expanded={mobileMenu} onClick={() => setMobileMenu(v => !v)}>☰</button>
      {actionLink("Follow on X", SITE.xUrl, "btn btn-y btn-sm nav-cta", "Social account not configured", "x")}
    </header>

    <main id="main">
      <section className="hero" id="top" style={{ "--bg": `url(${REF}/hero-city-480.webp)` } as CSSProperties}>
        <div className="hero-inner">
          <div className="hero-banner"><img src={`${REF}/banner-800.webp`} width="800" height="267" alt="PokeETH banner with Ethchu and the sparkling crystal towers of Etherwild" /></div>
          <h1 className="title" onClick={() => showWild()}><span>PokeETH</span><small className="ticker">$POKETH</small></h1>
          <div className="dialog hero-dialog"><p className="px eyebrow">ETHERWILD · A CREATURE ADVENTURE</p><p className="tagline">Ten creatures. One magical ETH crystal. Absolutely no instructions.</p><div className="dialog-arrow">▼</div></div>
          <div className="cta">
            {actionLink("Get $POKETH", links.buy, "btn btn-r", "Contract not announced", "buy")}
            {actionLink("View chart", links.chart, "btn btn-b", "Chart available after contract", "chart")}
            {actionLink("Join the adventure", SITE.xUrl, "btn btn-y", "Community account coming soon", "x")}
          </div>
        </div>
      </section>

      <div className="ca-wrap" aria-label="Ethereum token contract"><div className="ca-box">
        <button type="button" className={`crystal-orb ${orbOpen ? "open" : ""}`} onClick={orbClick} aria-label="Tap Ethereum crystal to copy token address"><span className="orb-center">◆</span><span className="orb-spark orb-s1">✦</span><span className="orb-spark orb-s2">✧</span></button>
        <div className="ca-main"><p className="px">ETHEREUM CONTRACT ADDRESS</p><code className={`ca ${!links.valid ? "pending" : ""}`}>{links.valid ? links.contract : PENDING_CA}</code></div>
        <button type="button" className="btn btn-y" onClick={() => void copyCA()}>Copy</button>
      </div><div className="ca-links px">
        {actionLink("Uniswap", links.buy, "tiny-link", "Contract coming soon", "buy")}
        <span>·</span>{actionLink("DexTools", links.dexTools, "tiny-link", "Chart coming soon", "chart")}
        <span>·</span>{actionLink("DexScreener", links.chart, "tiny-link", "Chart coming soon", "chart")}
        <span>·</span>{actionLink("Etherscan", links.explorer, "tiny-link", "Contract coming soon")}
        <span>·</span>{actionLink("Swap", links.swap, "tiny-link", "Contract coming soon")}
      </div></div>

      <section id="trainer" className="sec sec-sky">
        <h2 className="h2">Trainer Card</h2><p className="center sub">CRYSTAL PASSPORT · MEET ETHCHU</p>
        <div className="tcard bouncy">
          <div className="tcard-head"><span className="px">ETHERWILD PASSPORT</span><span className="px">No. $POKETH</span></div>
          <div className="tcard-body"><div className="tcard-pic"><PokeETHLogo /></div><dl className="tcard-stats">
            <div><dt>NAME</dt><dd>PokeETH</dd></div><div><dt>TICKER</dt><dd>$POKETH</dd></div>
            <div><dt>HOMETOWN</dt><dd>Etherwild, the Crystal City</dd></div><div><dt>CHAIN</dt><dd>Ethereum</dd></div>
            <div><dt>PARTY</dt><dd>Ethchu · Candlizard · Liquidoo · Hodltoise · Moonibble + five friends</dd></div>
            <div><dt>X</dt><dd>{SITE.xUrl ? <a href={SITE.xUrl} target="_blank" rel="noopener noreferrer">Join our town</a> : "Coming soon"}</dd></div>
          </dl></div>
          <div className="tcard-wide"><img src={`${REF}/trainer-card-480.webp`} width="480" height="360" alt="Ethchu Crystal Passport resting beside the Etherwild harbor" /></div>
          <div className="dialog"><p className="px">A MESSAGE FROM ETHCHU</p><p>Once, the creatures of Etherwild cared only about snacks and adventures. Then a mysterious purple crystal fell from the sky—and Ethchu accidentally ate it. The eight-chapter story begins here.</p>
            <button type="button" className="story-toggle" aria-expanded={chronicleOpen} aria-controls="chronicle" onClick={() => setChronicleOpen(v => !v)}>{chronicleOpen ? "Hide the Etherwild Chronicle ▲" : "Read all eight story chapters ▼"}</button></div>
        </div>
        {chronicleOpen && <div id="chronicle" className="chronicle"><h3 className="h3">The Etherwild Chronicle</h3><div className="chapter-grid">{CHAPTERS.map((c,i) =>
          <article className="chapter-card bouncy" key={c.file}><button type="button" onClick={() => { lastFocus.current = document.activeElement as HTMLElement; setChapterPreview(`${CHAPTER}/${c.file}.webp`); }} aria-label={`Enlarge chapter ${i+1}: ${c.name}`}><img loading="lazy" src={`${CHAPTER}/${c.file}.webp`} alt={`${c.name} story scene`}/></button><div className="chapter-content"><p className="px">CHAPTER {String(i+1).padStart(2,"0")}</p><h4>{c.name}</h4><p>{c.summary}</p></div></article>)}</div></div>}
      </section>

      <section id="journey" className="sec journey-sec">
        <h2 className="h2">Your Journey</h2><p className="center sub px">HOW TO BEGIN THE $POKETH ADVENTURE</p>
        <ol className="steps">{JOURNEY_STEPS.map((step,i) => <li className="step bouncy" key={step.title}>
          <div className="step-art"><img loading="lazy" className="step-bg" src={`${REF}/${step.asset}`} alt={`${step.title} illustrated Etherwild adventure scene`} /></div>
          <div className="dialog"><p className="px">{step.subtitle}</p><h3>{step.title}</h3><p>{step.description}</p><span className="dialog-arrow">▼</span></div>
        </li>)}</ol>
      </section>

      <section id="badges" className="sec sec-sky">
        <h2 className="h2">Crystal Badges</h2><p className="center sub px">TOKENOMICS</p>
        <div className="badges-wrap"><div className="badges-pic bouncy"><img className="badge-reference-img" src={`${REF}/gym-badges.webp`} width="1152" height="864" alt="A jeweled Crystal Vault containing six Etherwild token information emblems" loading="lazy" /></div>
        <ul className="badges">{tokenBadges.map(b => <li className="badge bouncy" key={b.title}><span className={`bi ${b.className}`} aria-hidden="true">{b.icon}</span><div><b>{b.title}</b><span>{b.value}</span></div></li>)}</ul></div>
      </section>

      <section id="gallery" className="sec gallery-sec">
        <h2 className="h2">Etherwild Gallery</h2><p className="center sub px">MEET THE CREATURES · TAP TO EXPLORE</p>
        <div className="gallery">{gallery.map((g,i) => <button className="gi bouncy" type="button" key={`${g.src}-${i}`} onClick={() => openGallery(i)} aria-label={`Open image: ${g.caption}`}>
          <img src={g.src} alt={g.caption} loading="lazy" className={g.kind === "creature" ? "gallery-creature" : ""}/><span className="px">{g.caption}</span>
        </button>)}</div>
      </section>

      <section id="community" className="sec comm" style={{ "--bg": `url(${REF}/festival-480.webp)` } as CSSProperties}>
        <h2 className="h2">Town Square</h2><p className="center sub px">THE ADVENTURE IS BETTER WITH FRIENDS</p>
        <div className="xcard bouncy"><div className="xcard-top"><PokeETHLogo small /><div><b>PokeETH</b><span>Etherwild Community</span></div><strong className="xlogo">𝕏</strong></div>
          <p>Ten creatures. Eight chapters. One magical ETH crystal. Join our ridiculous Etherwild adventure! ✨</p>
          <div className="cta">{actionLink("Follow on X", SITE.xUrl, "btn btn-b", "Official X coming soon", "x")}{actionLink("Telegram", SITE.telegramUrl, "btn btn-y", "Official Telegram coming soon", "telegram")}</div>
        </div>
      </section>
    </main>

    <footer className="foot"><PokeETHLogo /><p className="px">$POKETH · THE NEXT BLOCK AWAITS</p><p><a href="#top">Back to the crystal ▲</a></p></footer>

    <div className={`wild ${wildOpen ? "show" : ""}`} role="status" aria-live="polite" aria-hidden={!wildOpen}>
      <picture><img src={`${REF}/pikachu.jpg`} alt="A wild Ethchu" width="120" height="120"/></picture>
      <div className="dialog"><p className="px">{wildDisplay}</p><button type="button" className="wild-ok px" onClick={() => setWildOpen(false)}>OK ▶</button></div>
    </div>
    <div className={`toast ${toast ? "show" : ""}`} role="status" aria-live="polite">{toast}</div>

    {(galleryIndex !== null || chapterPreview !== null) && <div role="dialog" aria-modal="true" aria-label="Etherwild image gallery" className="lb" onClick={e => { if(e.target===e.currentTarget) closeGallery(); }}
      onTouchStart={e => { swipeStartX.current = e.touches[0]?.clientX ?? null; }}
      onTouchEnd={e => { if(swipeStartX.current===null) return; const d=e.changedTouches[0].clientX-swipeStartX.current; if(Math.abs(d)>45 && !chapterPreview) changeGallery(d<0?1:-1); swipeStartX.current=null; }}>
      <button ref={lbClose} className="lb-x" type="button" onClick={closeGallery} aria-label="Close image">✕</button>
      {!chapterPreview && <button className="lb-nav lb-prev" type="button" onClick={() => changeGallery(-1)} aria-label="Previous image">◀</button>}
      <figure>{chapterPreview ? <><img src={chapterPreview} alt="The Etherwild Chronicle: enlarged illustration"/><figcaption className="px">THE ETHERWILD CHRONICLE</figcaption></> : galleryIndex !== null ? <><img key={galleryIndex} src={gallery[galleryIndex].src} alt={gallery[galleryIndex].caption}/><figcaption className="px">{galleryIndex+1}/{gallery.length} · {gallery[galleryIndex].caption}</figcaption></> : null}</figure>
      {!chapterPreview && <button className="lb-nav lb-next" type="button" onClick={() => changeGallery(1)} aria-label="Next image">▶</button>}
    </div>}
  </>;
}
