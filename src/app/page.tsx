import {
  ArrowRight,
  BriefcaseBusiness,
  CodeXml,
  Download,
  Mail,
  MapPin,
} from "lucide-react";
import Link from "next/link";

import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { portfolio } from "@/data/portfolio";

export default function HomePage() {
  return (
    <main id="conteudo">
      <section className="hero section-shell" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">Engenharia de software com evidências</p>
          <h1 id="hero-title">
            Eu construo software confiável, do domínio à produção.
          </h1>
          <p className="hero-lead">{portfolio.introduction}</p>
          <div className="hero-actions" aria-label="Ações principais">
            <Link className="button button-primary" href="#projetos">
              Ver projetos <ArrowRight aria-hidden="true" size={18} />
            </Link>
            <a
              className="button button-secondary"
              href="/eduardo-melo-curriculo.pdf"
              download
            >
              <Download aria-hidden="true" size={18} /> Baixar currículo
            </a>
          </div>
          <p className="location">
            <MapPin aria-hidden="true" size={16} /> {portfolio.location}
          </p>
        </div>

        <div className="hero-mark" aria-hidden="true">
          <span>EM</span>
          <div className="hero-orbit hero-orbit-one" />
          <div className="hero-orbit hero-orbit-two" />
        </div>
      </section>

      <section
        className="section-shell impact-grid"
        aria-label="Indicadores de impacto"
      >
        {portfolio.impact.map((metric) => (
          <div className="impact-card" key={metric.label}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </div>
        ))}
      </section>

      <section
        className="section-shell content-section"
        id="sobre"
        aria-labelledby="sobre-title"
      >
        <SectionHeading
          id="sobre-title"
          eyebrow="Sobre"
          title="Base técnica para resolver problemas reais"
        />
        <div className="about-grid">
          <div className="prose-copy">
            {portfolio.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="skill-groups" aria-label="Competências técnicas">
            {portfolio.skills.map((skillGroup) => (
              <div className="skill-group" key={skillGroup.group}>
                <h3>{skillGroup.group}</h3>
                <ul>
                  {skillGroup.items.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="section-shell content-section"
        id="projetos"
        aria-labelledby="projetos-title"
      >
        <SectionHeading
          id="projetos-title"
          eyebrow="Projetos"
          title="Produtos e sistemas construídos com propósito"
          description="Cada case apresenta contexto, decisões e resultados comprováveis. Projetos privados expõem apenas informações seguras."
        />
        <div className="project-grid">
          {portfolio.projects
            .filter((project) => project.featured)
            .map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
        </div>
      </section>

      <section
        className="section-shell content-section"
        id="experiencia"
        aria-labelledby="experiencia-title"
      >
        <SectionHeading
          id="experiencia-title"
          eyebrow="Experiência"
          title="Software entregue em contexto real"
        />
        <div className="timeline">
          {portfolio.experience.map((item) => (
            <article className="timeline-item" key={item.organization}>
              <div className="timeline-meta">
                <p>{item.period}</p>
                <span aria-hidden="true" />
              </div>
              <div>
                <h3>{item.role}</h3>
                <p className="organization">{item.organization}</p>
                <p>{item.description}</p>
                <ul>
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        className="section-shell content-section"
        id="formacao"
        aria-labelledby="formacao-title"
      >
        <SectionHeading
          id="formacao-title"
          eyebrow="Formação"
          title="Fundamentos e especialização"
        />
        <div className="education-grid">
          {portfolio.education.map((item) => (
            <article className="education-card" key={item.course}>
              <p>{item.period}</p>
              <h3>{item.course}</h3>
              <span>{item.institution}</span>
            </article>
          ))}
        </div>
      </section>

      <section
        className="section-shell contact-section"
        id="contato"
        aria-labelledby="contato-title"
      >
        <div>
          <p className="eyebrow">Contato</p>
          <h2 id="contato-title">
            Vamos conversar sobre software bem construído.
          </h2>
          <p>
            Estou disponível para oportunidades em engenharia de software,
            backend Java e full stack.
          </p>
        </div>
        <div className="contact-links">
          <a href={`mailto:${portfolio.email}`}>
            <Mail aria-hidden="true" size={20} /> E-mail
          </a>
          <a href={portfolio.social.linkedin} rel="noreferrer" target="_blank">
            <BriefcaseBusiness aria-hidden="true" size={20} /> LinkedIn
          </a>
          <a href={portfolio.social.github} rel="noreferrer" target="_blank">
            <CodeXml aria-hidden="true" size={20} /> GitHub
          </a>
        </div>
      </section>
    </main>
  );
}
