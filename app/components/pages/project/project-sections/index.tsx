import Image from "next/image"

const sections = [
  {
    title: 'Login',
    image: "https://media.graphassets.com/mYImcL1BRr6AhUeU0kEg"
  },
  {
    title: 'Home',
    image: "https://media.graphassets.com/eslYQMyhQ6qI9Y37PTei"
  }
]

export const ProjectSections = () => {
  return (
    <section className="container my-12 md:my-32 flex flex-col gap-8 md:gap-32">
      {sections.map(section => (
        <div key={section.title} className="flex flex-col items-center gap-6 md:gap-12">
          <h2 className="text-2xl md:text-3xl font-medium text-gray-300">
            {section.title}
          </h2>
          <Image 
            src={section.image}
            width={1080}
            height={672}
            className="w-full aspect-auto rounded-lg object-cover"
            alt={`Imagem da sessão ${section.title}`}
            unoptimized
          />
        </div>
      ))}
    </section>
  )
}