// app/projects/[slug]/page.tsx

import { ProjectDetails } from "@/app/components/pages/project/project-details";
import { ProjectSections } from "@/app/components/pages/project/project-sections";
import { ProjectPageData, ProjectsPageStaticData } from "@/app/types/page-info";
import { fetchHygraphQuery } from "@/app/utils/fetch-hygraph-query";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

type ProjectProps = {
  params: { slug: string };
  searchParams: { lang: string };
};

const getProjectDetails = async (
  slug: string,
  lang: string
): Promise<ProjectPageData> => {
  const query = `
    query ProjectDetailsQuery($slug: String!, $locale: Locale!) {
      project(where: {slug: $slug}, locales: [$locale]) {
        pageThumbnail { url }
        thumbnail { url }
        sections {
          title
          image { url }
        }
        title
        shortDescription
        description {
          raw
          text
        }
        technologies(first: 100) {
          name
          category
        }
        liveProjectUrl
        githubUrl
      }
    }
  `;

  return fetchHygraphQuery(query, { slug, locale: lang },0);
};

export default async function Project({ params, searchParams }: ProjectProps) {
  const lang = searchParams.lang || "en";
  const data = await getProjectDetails(params.slug, lang);

  if (!data || !data.project) {
    return <h2>Projeto não encontrado.</h2>;
  }

  return (
    <>
      <ProjectDetails project={data.project} />
      <ProjectSections sections={data.project.sections} />
    </>
  );
}

// =======================================================================
// PODE APAGAR OU COMENTAR ESTA FUNÇÃO INTEIRA
// =======================================================================
/*
export async function generateStaticParams() {
  const query = `
    query ProjectsSlugsQuery() {
      projects(first: 100){
        slug
      }
    }
  `
  const { projects } = await fetchHygraphQuery<ProjectsPageStaticData>(query)

  return projects
}
*/
// =======================================================================

export async function generateMetadata({
  params,
  searchParams,
}: ProjectProps): Promise<Metadata> {
  const lang = searchParams.lang || "en";
  const data = await getProjectDetails(params.slug, lang);

  if (!data || !data.project) {
    return { title: "Projeto não encontrado" };
  }

  const { project } = data;

  return {
    title: project.title,
    description: project.description.text,
    openGraph: {
      images: [
        // Adicionamos uma verificação: só incluir a imagem se ela existir
        ...(project.thumbnail
          ? [
              {
                url: project.thumbnail.url,
                width: 1200,
                height: 630,
              },
            ]
          : []),
      ],
    },
  };
}
