import { ArrowUpRight, LockKeyhole } from "lucide-react";
import Link from "next/link";

import type { ProjectCase } from "@/data/portfolio";

type ProjectCardProps = {
  project: ProjectCase;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <article className={`project-card project-card-${(index % 4) + 1}`}>
      <div className="project-card-topline">
        <span>{project.eyebrow}</span>
        <span className="status">
          {project.status !== "Publicado" ? (
            <LockKeyhole aria-hidden="true" size={13} />
          ) : null}
          {project.status}
        </span>
      </div>
      <div className="project-visual" aria-hidden="true">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <div />
      </div>
      <div className="project-card-content">
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <ul className="tag-list" aria-label={`Tecnologias de ${project.title}`}>
          {project.technologies.slice(0, 5).map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
        <Link href={`/projetos/${project.slug}`}>
          Ler o case <ArrowUpRight aria-hidden="true" size={17} />
        </Link>
      </div>
    </article>
  );
}
