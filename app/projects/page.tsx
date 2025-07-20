// app/projects/page.tsx

import { PageIntroduction } from "../components/pages/projects/page-introduction";
import { ProjectsList } from "../components/pages/projects/projects-list";
import { ProjectsPageData } from "../types/page-info";
import { fetchHygraphQuery } from "../utils/fetch-hygraph-query";

const getPageData = async (lang: string): Promise<ProjectsPageData> => {
  const query = `
    query ProjectsQuery($locale: Locale!) {
      projects(locales: [$locale], orderBy: createdAt_DESC) {
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
    }
  `;

  return fetchHygraphQuery(query, { locale: lang });
};

export default async function Projects({
  searchParams,
}: {
  searchParams: { lang: string };
}) {
  const lang = searchParams.lang || "en";
  const data = await getPageData(lang);

  if (!data || !data.projects) {
    return <div>Erro ao carregar projetos.</div>;
  }

  return (
    <>
      <PageIntroduction />
      <ProjectsList projects={data.projects} />
    </>
  );
}
