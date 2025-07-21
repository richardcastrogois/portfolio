import { useSearchParams } from "next/navigation";
import { translations } from "@/app/lib/dictionaries";

// Tipo para garantir que estamos usando uma chave válida do nosso objeto de traduções
type Language = keyof typeof translations;

export const useTranslations = () => {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") as Language | null;

  if (lang === "pt_BR") {
    return translations.pt_BR;
  }

  return translations.en;
};
