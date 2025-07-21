// app/page.tsx

import { HeroSection } from "./components/pages/home/hero-section";
import { HighlightedProjects } from "./components/pages/home/higthlighted-projects";
import { WorkExperience } from "./components/pages/home/work-experience";
import { KnownTechs } from "./components/pages/home/known-techs";
import { HomePageData } from "./types/page-info";
import { fetchHygraphQuery } from "./utils/fetch-hygraph-query";
import { Carousel } from "./components/carousel";

const getPageData = async (locale: string): Promise<HomePageData> => {
  const query = `
    query PageInfoQuery($locale: Locale!) {
      page(where: {slug: "home"}, locales: [$locale]) {
        introduction { raw }
        technologies(first: 100) { name }
        profilePicture { url }
        socials { url, iconSvg }
        knownTechs(first: 100) { iconSvg, name, startDate, category }
        
        # AQUI COMEÇA A CORREÇÃO
        highlightProjects {
          slug
          title
          shortDescription
          thumbnail { # <-- ESTA LINHA FOI ADICIONADA
            url
          }
          technologies(first: 100) {
            name
          }
        }
        # AQUI TERMINA A CORREÇÃO

      }
      workExperiences(locales: [$locale]) {
        companyLogo { url }
        role, companyName, companyUrl, startDate, endDate
        description { raw }
        technologies(first: 100) { name, category }
      }
    }
  `;

  return fetchHygraphQuery(
    query,
    { locale },
    0 // Sem cache
  );
};

export default async function Home({
  searchParams,
}: {
  searchParams: { lang: string };
}) {
  const lang = searchParams.lang || "en";
  const data = await getPageData(lang);

  if (!data) {
    return <h1>Erro ao carregar dados.</h1>;
  }

  const { page: pageData, workExperiences } = data;

  return (
    <>
      <HeroSection homeInfo={pageData} />
      <KnownTechs techs={pageData.knownTechs} />
      <Carousel />
      <HighlightedProjects projects={pageData.highlightProjects} />
      <WorkExperience experiences={workExperiences} />
    </>
  );
}
