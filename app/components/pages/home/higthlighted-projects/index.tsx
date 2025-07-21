"use client";

import { HorizontalDivider } from "@/app/components/divider/horizontal";
import { SectionTitle } from "@/app/components/section-title";
import { ProjectCard } from "./project-card";
import { HiArrowNarrowRight } from "react-icons/hi";
import { Link } from "@/app/components/link";
import { Project } from "@/app/types/projects";
import { useSearchParams } from "next/navigation";

type HighlightedProjectsProps = {
  projects: Project[];
};

export const HighlightedProjects = ({ projects }: HighlightedProjectsProps) => {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang");

  const projectsPageHref = lang ? `/projects?lang=${lang}` : "/projects";

  return (
    <section className="container py-16">
      <SectionTitle subtitle="destaques" title="Projetos em destaque" />
      <HorizontalDivider className="mb-16" />

      <div>
        {projects?.map((project) => {
          const projectHref = lang
            ? `/projects/${project.slug}?lang=${lang}`
            : `/projects/${project.slug}`;

          return (
            <div key={project.slug}>
              <Link href={projectHref}>
                <ProjectCard project={project} />
              </Link>
              <HorizontalDivider className="my-16" />
            </div>
          );
        })}
        <p className="flex items-center gap-1.5">
          <span className="text-gray-400">Se interessou?</span>
          <Link href={projectsPageHref} className="inline-flex">
            Ver todos
            <HiArrowNarrowRight />
          </Link>
        </p>
      </div>
    </section>
  );
};
