import { ArrowUpRight, LockKeyhole } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { ProjectCase } from "@/data/portfolio";

type ProjectCardProps = {
  project: ProjectCase;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  const thumbnail = project.gallery[0];

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
      <Link
        aria-label={`Ver projeto ${project.title}`}
        className={[
          "project-visual",
          thumbnail ? "project-visual-with-image" : "",
          thumbnail ? `project-visual-${project.galleryLayout}` : "",
        ]
          .filter(Boolean)
          .join(" ")}
        href={`/projetos/${project.slug}`}
      >
        {thumbnail ? (
          <span className="project-visual-media" aria-hidden="true">
            <Image
              alt=""
              fill
              priority={index === 0}
              sizes={
                project.galleryLayout === "mobile"
                  ? "(max-width: 920px) 45vw, 30vw"
                  : "(max-width: 920px) 100vw, 50vw"
              }
              src={thumbnail.src}
            />
          </span>
        ) : null}
        <span className="project-visual-index" aria-hidden="true">
          {String(index + 1).padStart(2, "0")} / 03
        </span>
        <strong aria-hidden="true">{project.title}</strong>
        <span className="project-visual-type" aria-hidden="true">
          {thumbnail ? "Ver imagens do projeto" : project.eyebrow}
        </span>
      </Link>
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
