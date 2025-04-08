import { HeroSection } from "./components/pages/home/hero-section";
import { HighlightedProjects } from "./components/pages/home/higthlighted-projects";
import { WorkExperience } from "./components/pages/home/work-experience";
import { KnownTechs } from "./components/pages/home/known-techs";
import { HomePageData } from "./types/page-info";
import { fetchHygraphQuery } from "./utils/fetch-hygraph-query";
import { Carousel } from "./components/carousel";

export const metadata = {
  title: "Home",
};

const getPageData = async (): Promise<HomePageData> => {
  const query = `
    query PageInfoQuery {
      page(where: {slug: "home"}) {
        introduction {
          raw
        }
        technologies(first: 100) {
          name
        }
        profilePicture {
          url
        }
        socials {
          url
          iconSvg
        }
        knownTechs(first: 100) {
          iconSvg
          name
          startDate
          category
        }
        highlightProjects {
          slug
          thumbnail {
            url
          }
          title
          shortDescription
          technologies(first: 100) {
            name
          }
        }
      }
      workExperiences {
        companyLogo {
          url
        }
        role
        companyName
        companyUrl
        startDate
        endDate
        description {
          raw
        }
        technologies(first: 100) {
          name
          category
        }
      }
    }
  `;

  return fetchHygraphQuery(query, 60 * 60);
  // return fetchHygraphQuery(query, 0); // 0 desativa o cache
};

export default async function Home() {
  const { page: pageData, workExperiences } = await getPageData();

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
