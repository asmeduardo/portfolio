import {
  ArrowRight,
  BriefcaseBusiness,
  CodeXml,
  Download,
  Mail,
  MapPin,
} from "lucide-react";
import Link from "next/link";

import { BookCarousel } from "@/components/book-carousel";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { portfolio } from "@/data/portfolio";

export default function HomePage() {
  return (
    <main id="conteudo">
      <section className="hero section-shell" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">Eduardo Melo · Engenheiro de software</p>
          <h1 id="hero-title">
            Software que resolve <em>problemas reais.</em>
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
        <div className="hero-aside" aria-label="Foco de atuação">
          <span className="hero-aside-index">01 / ENGENHARIA APLICADA</span>
          <div className="hero-aside-rule" />
          <p>Do problema ao produto.</p>
          <span className="hero-aside-detail">
            Backend Java · interfaces web · entrega em produção
          </span>
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
          title="Da ideia ao software em uso."
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
          title="Trabalhos selecionados."
          description="Contexto, escolhas técnicas e resultados verificáveis. Os projetos privados são apresentados sem expor informações confidenciais."
        />
        <p className="current-project-note">
          <span aria-hidden="true" /> Projeto em andamento:{" "}
          <strong>VigorU</strong> — plataforma web e mobile para acompanhar
          treinos.
        </p>
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
          title="Experiência em contextos reais."
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
          title="Formação e aprendizado contínuo."
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
        className="section-shell content-section"
        id="cursos"
        aria-labelledby="cursos-title"
      >
        <SectionHeading
          id="cursos-title"
          eyebrow="Cursos"
          title="Estudo aplicado à prática."
        />
        <div className="learning-grid">
          <div className="learning-column">
            <h3>Concluídos</h3>
            {portfolio.learning.courses.completed.map((course) => (
              <article className="learning-item" key={course.title}>
                <strong>{course.title}</strong>
                <span>{course.provider}</span>
              </article>
            ))}
          </div>
          <div className="learning-column">
            <h3>Em andamento</h3>
            {portfolio.learning.courses.current.length ? (
              portfolio.learning.courses.current.map((course) => (
                <article className="learning-item" key={course.title}>
                  <strong>{course.title}</strong>
                  <span>{course.provider}</span>
                </article>
              ))
            ) : (
              <p className="learning-empty">
                Nenhum curso em andamento informado.
              </p>
            )}
          </div>
        </div>
      </section>

      <section
        className="section-shell content-section"
        id="leituras"
        aria-labelledby="leituras-title"
      >
        <SectionHeading
          id="leituras-title"
          eyebrow="Leituras"
          title="Ideias que levo para o código."
        />
        <BookCarousel books={portfolio.learning.books.completed} />
        {portfolio.learning.books.current.length > 0 ? (
          <div className="learning-current">
            <h3>Lendo agora</h3>
            {portfolio.learning.books.current.map((book) => (
              <article className="learning-item" key={book.title}>
                <a
                  href={book.href}
                  rel="noreferrer"
                  target="_blank"
                  aria-label={`Ver ${book.title} na Amazon`}
                >
                  <strong>{book.title}</strong>
                  <ArrowRight aria-hidden="true" size={17} />
                </a>
                <span>{book.author}</span>
              </article>
            ))}
          </div>
        ) : null}
      </section>

      <section
        className="section-shell contact-section"
        id="contato"
        aria-labelledby="contato-title"
      >
        <div>
          <p className="eyebrow">Contato</p>
          <h2 id="contato-title">Vamos construir algo que faça sentido.</h2>
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
