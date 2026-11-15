import Link from "next/link";

import { portfolio } from "@/data/portfolio";

import { ModeToggle } from "@/components/mode-toggle";

const navigation = [
  { label: "Projetos", href: "/#projetos" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Experiência", href: "/#experiencia" },
  { label: "Formação", href: "/#formacao" },
  { label: "Contato", href: "/#contato" },
] as const;

export function SiteHeader() {
  return (
    <header className="site-header" id="top">
      <div className="header-inner">
        <Link
          className="brand"
          href="/"
          aria-label={`Página inicial de ${portfolio.name}`}
        >
          <span aria-hidden="true">em.</span>
          <strong>{portfolio.name}</strong>
        </Link>
        <nav aria-label="Navegação principal">
          {navigation.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <ModeToggle />
      </div>
    </header>
  );
}
