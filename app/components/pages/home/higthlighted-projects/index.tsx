//app/components/pages/home/higthlighted-projects/index.tsx

"use client";

import { HorizontalDivider } from "@/app/components/divider/horizontal";
import { SectionTitle } from "@/app/components/section-title";
import { ProjectCard } from "./project-card";
import { HiArrowNarrowRight } from "react-icons/hi";
import { Link } from "@/app/components/link";
import { Project } from "@/app/types/projects";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "@/app/hook/useTranslations";

type HighlightedProjectsProps = {
  projects: Project[];
};

export const HighlightedProjects = ({ projects }: HighlightedProjectsProps) => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang");

  const projectsPageHref = lang ? `/projects?lang=${lang}` : "/projects";

  return (
    <section className="container py-16">
      <SectionTitle
        subtitle={t.subtitle_highlights}
        title={t.title_highlights}
      />
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
          <span className="text-gray-400">{t.highlights_interested}</span>{" "}
          <Link href={projectsPageHref} className="inline-flex">
            {t.highlights_see_all}
            <HiArrowNarrowRight />
          </Link>
        </p>
      </div>
    </section>
  );
};
