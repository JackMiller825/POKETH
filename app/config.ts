/** Update this file before launch. No contract or social URL is assumed. */
export const SITE = {
  name: "PokeETH", ticker: "$POKETH", chain: "Ethereum", coin: "ETH",
  contractAddress: "0x07045063789c37abc60e5c38aedada61deb37f50",
  dexScreenerUrl: "https://dexscreener.com/ethereum/0xd95b1740859d0c322fc783c6653aca0622184058",
  dexToolsUrl: "https://www.dextools.io/app/ether/pair-explorer/0xd95b1740859d0c322fc783c6653aca0622184058",
  xUrl: "https://x.com/pokeeth2026",
  telegramUrl: "https://t.me/pokeeth",
  tokenomics: { supply: "1B", tax: "0%", liquidity: "Burnt", ownership: "Renounced" },
};
export const CREATURES = [
  { name: "Ethchu", element: "Electric", image: "ethchu", note: "Tiny hero, huge crystalline ears, and absolutely no self-control." },
  { name: "Candlizard", element: "Fire", image: "candlizard", note: "The bakery's worst nightmare, and proud of it." },
  { name: "Liquidoo", element: "Water", image: "liquidoo", note: "Spills his magical reservoir on every important occasion." },
  { name: "Hodltoise", element: "Earth", image: "hodltoise", note: "Slept through the Great Gas Storm. Says he predicted it." },
  { name: "Moonibble", element: "Wind", image: "moonibble", note: "A flying dreamer who is terrified of heights." },
  { name: "Sneakoon", element: "Shadow", image: "sneakoon", note: "Your missing crystals? Never seen them." },
  { name: "Fomoth", element: "Light", image: "fomoth", note: "Will investigate anything shiny, immediately." },
  { name: "Blockbit", element: "Tech", image: "blockbit", note: "Can solve anything, except comedy." },
  { name: "Gaspook", element: "Ghost", image: "gaspook", note: "Charges cookies at the village gates." },
  { name: "Bullhorn", element: "Strength", image: "bullhorn", note: "The gentlest giant in Etherwild, accidentally wrecking the scenery." },
] as const;
export const CHAPTERS = [
  { name: "The Village That Didn't Care About ETH", file: "01-peaceful-village", summary: "Before the crystal, everyone in Etherwild had ordinary problems: chores, snacks, and Candlizard's cooking." },
  { name: "The Crystal From Block 0001", file: "02-crystal-from-block-0001", summary: "A violet comet crashes into the village square, sending ETH energy through Etherwild." },
  { name: "The Great Awakening", file: "03-great-awakening", summary: "Each creature gains a strange new power. Nobody has read the instructions." },
  { name: "Ethchu Eats the Entire Blockchain", file: "04-ethchu-eats-crystal", summary: "Mistaking the last crystal for dessert, Ethchu becomes a walking beacon of ETH energy." },
  { name: "The Expedition to Etherwild", file: "05-etherwild-expedition", summary: "Our heroes cross Candle Canyon, Liquidity Lagoon, and the Misty Gas Mountains." },
  { name: "The Great Gas Storm", file: "06-great-gas-storm", summary: "When the storm blocks their path, Ethchu ignores all the instructions—and sneezes." },
  { name: "Building PokeETH City", file: "07-building-pokeeth-city", summary: "Working together, the creatures rebuild their home as a magical crystal-powered city." },
  { name: "The Next Block Awaits", file: "08-next-block-awaits", summary: "At last, peace returns. Then Ethchu discovers another glowing crystal under the town square." },
] as const;
export const JOURNEY_STEPS = [
  { title: "Get an Ethereum wallet", subtitle: "STEP 1", description: "Create a self-custody wallet such as MetaMask or Rabby. Back up your recovery phrase offline and never share it.", asset: "step-wallet-480.webp" },
  { title: "Add ETH to your backpack", subtitle: "STEP 2", description: "Get ETH from a reputable provider, send it using Ethereum mainnet, and keep some ETH available for network gas.", asset: "step-sol-480.webp" },
  { title: "Swap at the Crystal Gate", subtitle: "STEP 3", description: "When the official contract is announced, visit Uniswap on Ethereum, verify the address carefully and review the swap.", asset: "step-swap-480.webp" },
  { title: "Welcome to Etherwild", subtitle: "STEP 4", description: "Meet the Etherwild creatures, swap stories, and make memes with the town. Enjoy the adventure; never count on profits.", asset: "step-hold-480.webp" }
] as const;
export function tokenLinks() {
  const ca = SITE.contractAddress.trim();
  const valid = /^0x[a-fA-F0-9]{40}$/.test(ca);
  return {
    valid,
    contract: ca,
    buy: valid ? `https://app.uniswap.org/swap?chain=ethereum&outputCurrency=${ca}` : "",
    chart: SITE.dexScreenerUrl || (valid ? `https://dexscreener.com/ethereum/${ca}` : ""),
    dexTools: SITE.dexToolsUrl || "",
    explorer: valid ? `https://etherscan.io/token/${ca}` : "",
    swap: valid ? `https://app.uniswap.org/swap?chain=ethereum&outputCurrency=${ca}` : "",
  };
}
