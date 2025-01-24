import { TbBrandNextjs } from "react-icons/tb"
import { SectionTitle } from "../../section-title"
import { KnownTech } from "./known-tech"

export const KnownTechs = () => {
  return (
    <section className="container py-16">
      <SectionTitle subtitle="competências" title="Conhecimentos" />

      <div className="grid grid-cols-[repeat(auto-fit,minmax(264px,1fr))] gap-3 mt-[60px]">
        {Array.from({ length: 8 }).map((_, index) => (
          <KnownTech key={index} tech={{
            icon: <TbBrandNextjs />,
            name: 'Next.js',
            startDate: '2021-01-01'
          }}/>
        ))}
      </div>
    </section>
  )
}