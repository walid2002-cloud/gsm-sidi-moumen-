import type { Metadata, Viewport } from "next";
import { Outfit, Plus_Jakarta_Sans, Cairo } from "next/font/google";
import { Providers } from "@/components/Providers";
import { FAQ_ITEMS, SITE } from "@/lib/constants";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gsm-sidi-moumen.ma"),
  title: {
    default: `${SITE.name} | ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "soutien scolaire Sidi Moumen",
    "GSM Sidi Moumen",
    "cours particuliers Casablanca",
    "semaine gratuite soutien scolaire",
    "Maître Mohssine",
  ],
  openGraph: {
    title: SITE.name,
    description: SITE.description,
    locale: "fr_MA",
    type: "website",
    images: [
      { url: "/images/logo-gsm.png", alt: "Logo GSM Sidi Moumen" },
      { url: "/images/maitre-mohssine.jpg", alt: "Maître Mohssine, GSM Sidi Moumen" },
      { url: "/images/evenement-gsm.jpg", alt: "Événement GSM Sidi Moumen" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: SITE.description,
    images: ["/images/evenement-gsm.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f4ff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0616" },
  ],
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: SITE.legalName,
  alternateName: SITE.name,
  description: SITE.description,
  telephone: SITE.phoneTel,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address,
    addressLocality: "Sidi Moumen",
    addressCountry: "MA",
  },
  sameAs: [SITE.instagramUrl],
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${plusJakarta.variable} ${outfit.variable} ${cairo.variable} overflow-x-hidden antialiased`}>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('gsm-theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark');var l=localStorage.getItem('gsm-lang');if(l==='darija'){document.documentElement.lang='ar';document.documentElement.dir='rtl';document.documentElement.classList.add('darija')}}catch(e){}",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
