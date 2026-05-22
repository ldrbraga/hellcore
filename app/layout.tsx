import type { Metadata } from "next";
import { Bebas_Neue, Barlow_Condensed } from "next/font/google";
import "./globals.css";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const barlow = Barlow_Condensed({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata: Metadata = {
  title: "HellCore Industries",
  description:
    "Skate, arte e contracultura. Camisetas, shapes customizados, bonés e arte digital.",
  metadataBase: new URL("https://hellcore.vercel.app"),
  openGraph: {
    title: "HellCore Industries",
    description: "Arte que incomoda. Vista o que você representa.",
    siteName: "HellCore Industries",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/logo-hellcore.png",
        width: 512,
        height: 512,
        alt: "HellCore Industries",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${bebas.variable} ${barlow.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <div className="relative overflow-x-hidden">{children}</div>
      </body>
    </html>
  );
}
