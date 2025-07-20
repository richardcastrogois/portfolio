// src/app/components/language-switcher.tsx
"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/app/lib/utils";
import { MdGTranslate } from "react-icons/md";

export const LanguageSwitcher = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentLang = searchParams.get("lang") || "en"; // Pega o idioma da URL, padrão 'en'

  return (
    <div className="flex items-center gap-4 text-gray-400">
      {/* Link para Português */}
      <Link
        href={`${pathname}?lang=pt_BR`}
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
        href={`${pathname}?lang=en`}
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
