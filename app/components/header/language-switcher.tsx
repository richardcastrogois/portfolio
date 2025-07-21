"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/app/lib/utils";
import { MdGTranslate } from "react-icons/md";

export const LanguageSwitcher = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentLang = searchParams.get("lang") || "en";

  // O link para inglês (EN) não precisa do parâmetro 'lang=en',
  // pois é o seu idioma padrão.
  const enHref = pathname;

  // O link para português (PT) sempre precisa do parâmetro 'lang=pt_BR'.
  const ptHref = `${pathname}?lang=pt_BR`;

  return (
    <div className="flex items-center gap-4 text-gray-400">
      {/* Link para Português */}
      <Link
        href={ptHref} // Use a variável aqui
        className={cn(
          "font-medium font-mono hover:text-emerald-400 transition-all transform hover:scale-110",
          currentLang === "pt_BR" && "text-emerald-400"
        )}
      >
        PT
      </Link>

      <MdGTranslate size={20} />

      {/* Link para Inglês */}
      <Link
        href={enHref} // Use a variável aqui
        className={cn(
          "font-medium font-mono hover:text-emerald-400 transition-all transform hover:scale-110",
          currentLang === "en" && "text-emerald-400"
        )}
      >
        EN
      </Link>
    </div>
  );
};
