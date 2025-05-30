import { PageIntroduction } from "../components/pages/projects/page-introduction";
import { ProjectsList } from "../components/pages/projects/projects-list";
import { ProjectsPageData } from "../types/page-info";
import { fetchHygraphQuery } from "../utils/fetch-hygraph-query";

export const metadata = {
  title: 'Projetos',
}

const getPageData = async (): Promise<ProjectsPageData> => {
  const query = `
    query ProjectsQuery {
      projects {
        shortDescription
        slug
        title
        thumbnail {
          url
        }
        technologies(first: 100) {
          name
          category
        }
      }
    }`;

  return fetchHygraphQuery(query, 60 * 60);

  /*
  return fetchHygraphQuery(query, 0); // 0 desativa o cache
  */
}

export default async function Projects () {
  const { projects } = await getPageData();

  return (
    <>
      <PageIntroduction />
      <ProjectsList projects={projects} />
    </>
  )
}