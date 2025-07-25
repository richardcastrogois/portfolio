//app/components/pages/home/higthlighted-projects/project-card/index.tsx

"use client";

import { TechBadge } from "@/app/components/tech-badge";
import { Project } from "@/app/types/projects";
import Image from "next/image";
import { HiArrowNarrowRight } from "react-icons/hi";
import { motion } from "framer-motion";
import { fadeUpAnimation, techBadgeAnimation } from "@/app/lib/animations";
import { useTranslations } from "@/app/hook/useTranslations";

type ProjectCardProps = {
  project: Project;
};

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const t = useTranslations();

  return (
    <motion.div
      className="flex gap-6 lg:gap-12 flex-col lg:flex-row"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-full h-[200px] sm:h-[300px] lg:w-[420px] lg:min-h-full"
        initial={{ opacity: 0, y: 100, scale: 0.5 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 100, scale: 0.5 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        {project.thumbnail && (
          <Image
            width={420}
            height={304}
            src={project.thumbnail.url}
            alt={t.project_card_alt_thumbnail.replace("{title}", project.title)}
            className="w-full h-full object-cover rounded-lg"
          />
        )}
      </motion.div>

      <div className="flex-1 lg:py-[18px]">
        <motion.h3
          className="flex items-center gap-3 font-medium text-lg text-gray-50"
          {...fadeUpAnimation}
          transition={{ duration: 0.7 }}
        >
          <Image
            width={25}
            height={25}
            alt=""
            src="/saint_500.png"
            className="filter brightness-0 invert"
          />
          {project.title}
        </motion.h3>

        <motion.p
          className="text-gray-400 my-6"
          {...fadeUpAnimation}
          transition={{ duration: 0.2, delay: 0.3 }}
        >
          {project.shortDescription}
        </motion.p>

        <div className="flex gap-x-2 gap-y-3 flex-wrap mb-8 lg:max-w-[350px]">
          {project.technologies.map((tech, i) => (
            <TechBadge
              key={`${project.title}-tech-${tech.name}`}
              name={tech.name}
              {...techBadgeAnimation}
              transition={{ duration: 0.2, delay: 0.5 + i * 0.2 }}
            />
          ))}
        </div>

        <div className="inline-flex items-center gap-2 font-medium text-gray-300 group-hover:text-emerald-500 transition-colors">
          {t.project_card_view_project}
          <HiArrowNarrowRight />
        </div>
      </div>
    </motion.div>
  );
};