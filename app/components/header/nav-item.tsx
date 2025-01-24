import Link from "next/link"
import { usePathname } from "next/navigation";
import { cn } from "../lib/utils";

type NavItemProps = {
    label: string
    href: string
}

export const NavItem = ({label, href }: NavItemProps) => {
    const pathname = usePathname();

    const isActive = pathname === href;

    return (
        <Link href={href} className={cn(
            "text-gray-400 flex items-center gap-2 font-medim font-mono"
        )}>
            <span className="text-emerald-400">#</span>
            {label}
        </Link>
    )
}