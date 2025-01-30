'use client'

import Link from "next/link"
import { ProjectCard } from "./project-card"
import { Project } from "@/app/types/projects"
import { motion } from "framer-motion"
import { fadeUpAnimation } from "@/app/lib/animations"

type ProjectsListProps = {
  projects: Project[]
}

export const ProjectsList = ({ projects }: ProjectsListProps) => {
  return (
    <section className="container py-32 grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-x-4 gap-y-6">
      {projects.map((project, i) =>(
        <motion.div 
          key={project.title}
          {...fadeUpAnimation}
          transition={{ duration: 1, delay: i * 0.2 }}       
        >
          <Link href={`/projects/${project.slug}`}>
            <ProjectCard project={project} />
          </Link>
        </motion.div>
      ))}
    </section>
  )
}