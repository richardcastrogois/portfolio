"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation"; // 1. Importe o useSearchParams
import { cn } from "../../lib/utils";

type NavItemProps = {
  label: string;
  href: string;
};

export const NavItem = ({ label, href }: NavItemProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams(); // 2. Obtenha os parâmetros da URL
  const lang = searchParams.get("lang"); // 3. Pegue o valor de 'lang'

  const isActive = pathname === href;

  // 4. Crie o link final. Se 'lang' existir, adicione-o ao href.
  const finalHref = lang ? `${href}?lang=${lang}` : href;

  return (
    <Link
      href={finalHref} // 5. Use o link final aqui
      className={cn(
        "text-gray-400 flex items-center gap-2 font-medium font-mono hover:text-emerald-400 transition-all transform hover:scale-110",
        isActive && "text-emerald-400"
      )}
    >
      <span className={cn("text-emerald-400", isActive && "text-emerald-400")}>
        #
      </span>
      {label}
    </Link>
  );
};
