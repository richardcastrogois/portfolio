import { HeroSection } from "./components/pages/home/hero-section";
import { HigthlightedProjects } from "./components/pages/home/higthlighted-projects";
import { KnownTechs } from "./components/pages/known-techs";

export default async function Home() {
  return (
    <>
      <HeroSection />
      <KnownTechs />
      <HigthlightedProjects />
    </>
  )
}
