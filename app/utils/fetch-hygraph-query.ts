// src/utils/fetch-hygraph-query.ts

export const fetchHygraphQuery = async <T>(
  query: string,
  variables: Record<string, any> = {}, // ALTERAÇÃO: Adicionamos este parâmetro
  revalidate?: number
): Promise<T> => {
  const response = await fetch(process.env.HYGRAPH_URL!, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${process.env.HYGRAPH_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables, // ALTERAÇÃO: Enviamos as variáveis no corpo da requisição
    }),
    next: {
      revalidate,
    },
  });

  const { data } = await response.json();

  return data;
};
