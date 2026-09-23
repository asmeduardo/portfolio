import type { Metadata } from "next";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { portfolio } from "@/data/portfolio";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(portfolio.siteUrl),
  title: {
    default: `${portfolio.name} — Engenheiro de Software`,
    template: `%s | ${portfolio.name}`,
  },
  description: portfolio.introduction,
  alternates: { canonical: "/" },
  authors: [{ name: portfolio.name, url: portfolio.siteUrl }],
  creator: portfolio.name,
  openGraph: {
    title: `${portfolio.name} — Engenheiro de Software`,
    description: portfolio.introduction,
    url: portfolio.siteUrl,
    siteName: `Portfólio de ${portfolio.name}`,
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${portfolio.name} — Engenheiro de Software`,
    description: portfolio.introduction,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: portfolio.name,
  url: portfolio.siteUrl,
  email: `mailto:${portfolio.email}`,
  jobTitle: "Engenheiro de Software",
  address: {
    "@type": "PostalAddress",
    addressRegion: "Minas Gerais",
    addressCountry: "BR",
  },
  sameAs: [portfolio.social.github, portfolio.social.linkedin],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Instituto Federal de Minas Gerais",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <a className="skip-link" href="#conteudo">
            Ir para o conteúdo
          </a>
          <SiteHeader />
          {children}
          <SiteFooter />
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
