import Link from "next/link"
import { ProjectCard } from "./project-card"

export const ProjectsList = () => {
  return (
    <section className="container py-32 grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-x-4 gap-y-6">
      <Link href="/projects/book-wise">
        <ProjectCard />
      </Link>
    </section>
  )
}