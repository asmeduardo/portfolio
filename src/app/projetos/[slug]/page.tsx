import { ArrowLeft, ArrowUpRight, LockKeyhole } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getProject, portfolio } from "@/data/portfolio";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return portfolio.projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projetos/${project.slug}` },
    openGraph: {
      title: `${project.title} — Case de ${portfolio.name}`,
      description: project.summary,
      url: `/projetos/${project.slug}`,
      type: "article",
      locale: "pt_BR",
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: `${portfolio.siteUrl}/projetos/${project.slug}`,
    author: { "@type": "Person", name: portfolio.name, url: portfolio.siteUrl },
    keywords: project.technologies.join(", "),
  };

  const sections = [
    { title: "O problema", paragraphs: project.problem },
    { title: "Minha contribuição", paragraphs: project.contribution },
    { title: "Decisões de engenharia", paragraphs: project.decisions },
    { title: "Resultados", paragraphs: project.results },
  ];

  return (
    <main className="project-page section-shell" id="conteudo">
      <Link className="back-link" href="/#projetos">
        <ArrowLeft aria-hidden="true" size={17} /> Voltar aos projetos
      </Link>

      <header className="project-hero">
        <div>
          <p className="eyebrow">{project.eyebrow}</p>
          <h1>{project.title}</h1>
          <p>{project.summary}</p>
        </div>
        <span className="status status-large">
          {project.status !== "Publicado" ? (
            <LockKeyhole aria-hidden="true" size={15} />
          ) : null}
          {project.status}
        </span>
      </header>

      {project.metrics.length > 0 ? (
        <section className="project-metrics" aria-label="Resultados do projeto">
          {project.metrics.map((metric) => (
            <div key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </section>
      ) : null}

      <ul
        className="tag-list project-tags"
        aria-label="Tecnologias e práticas do projeto"
      >
        {project.technologies.map((technology) => (
          <li key={technology}>{technology}</li>
        ))}
      </ul>

      <div className="case-sections">
        {sections.map((section, index) => (
          <section
            key={section.title}
            aria-labelledby={`case-section-${index}`}
          >
            <p className="section-number" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </p>
            <div>
              <h2 id={`case-section-${index}`}>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}
      </div>

      {project.links.length > 0 ? (
        <div className="project-links" aria-label="Links do projeto">
          {project.links.map((link) => (
            <a
              className="button button-primary"
              href={link.href}
              key={link.href}
              rel="noreferrer"
              target="_blank"
            >
              {link.label} <ArrowUpRight aria-hidden="true" size={17} />
            </a>
          ))}
        </div>
      ) : null}

      <aside className="privacy-note">
        <LockKeyhole aria-hidden="true" size={20} />
        <p>
          Este case respeita confidencialidade e propriedade intelectual.
          Informações internas, credenciais, dados pessoais e código privado não
          são publicados.
        </p>
      </aside>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectJsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </main>
  );
}
