import { Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="section-shell not-found" id="conteudo">
      <p className="eyebrow">Erro 404</p>
      <h1>Esta página não foi encontrada.</h1>
      <p>O endereço pode ter mudado ou o conteúdo já não está disponível.</p>
      <Link className="button button-primary" href="/">
        <Home aria-hidden="true" size={18} /> Voltar ao início
      </Link>
    </main>
  );
}
