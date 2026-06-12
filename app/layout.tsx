import type { Metadata } from "next";
import { Cormorant_Garamond, Dancing_Script, Great_Vibes, Playfair_Display } from "next/font/google";
import "./globals.css";
import ReferralBanner from "./components/ReferralBanner";

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400", "700", "900"],
  variable: "--font-playfair"
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-great-vibes"
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["300", "400", "600"],
  variable: "--font-cormorant"
});

const dancing = Dancing_Script({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-dancing"
});

export const metadata: Metadata = {
  title: "Muskan Beauty Salon & Academy | Ballia",
  description: "Premium beauty salon and academy in Ballia, Uttar Pradesh"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${greatVibes.variable} ${cormorant.variable} ${dancing.variable}`}>
      <body>
        {children}
        <ReferralBanner />
      </body>
    </html>
  );
}
