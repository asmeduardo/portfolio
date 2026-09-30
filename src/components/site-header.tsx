import Link from "next/link";

import { ModeToggle } from "@/components/mode-toggle";

const navigation = [
  { label: "Projetos", href: "/#projetos" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Experiência", href: "/#experiencia" },
  { label: "Contato", href: "/#contato" },
] as const;

export function SiteHeader() {
  return (
    <header className="site-header" id="top">
      <div className="header-inner">
        <Link
          className="brand"
          href="/"
          aria-label="Página inicial de Eduardo Melo"
        >
          <span aria-hidden="true">em.</span>
          <strong>Eduardo Melo</strong>
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
