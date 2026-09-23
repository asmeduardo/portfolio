import { portfolio } from "@/data/portfolio";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="section-shell footer-inner">
        <p>
          © {new Date().getFullYear()} {portfolio.name}. Conteúdo e cases
          apresentados com evidências verificáveis.
        </p>
        <a href="#top">Voltar ao topo</a>
      </div>
    </footer>
  );
}
