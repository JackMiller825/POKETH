import type { Metadata } from "next";
import "./globals.css";

const baseUrl = "https://poketh.site";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "PokeETH ($POKETH) | Welcome to Etherwild",
  description: "Meet Ethchu and ten original Etherwild creatures in an Ethereum fantasy adventure.",
  openGraph: {
    title: "PokeETH — Welcome to Etherwild",
    description: "Ten creatures. Eight chapters. One magical Ethereum adventure.",
    images: [`${baseUrl}/assets/reference/banner-800.webp`],
  },
  alternates: { canonical: baseUrl },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><head><link rel="icon" href={`${basePath}/assets/reference/favicon-32.png`} sizes="32x32" type="image/png" /></head><body>{children}</body></html>;
}
