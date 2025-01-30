'use client'

import Image from "next/image"
import Link from "next/link"
import { NavItem } from "./nav-item"
import { motion } from 'framer-motion'


const NAV_ITEMS = [
    {
        name: "Home",
        link: "/"
    },
    {
        name: "Projects",
        link: "/projects"
    },
]

export const Header = () => {
    return(
        <motion.header 
            className="absolute top-0 w-full z-10 h-24 flex items-center justify-center"
            initial={{ top: -100 }}
            animate={{ top: 0 }}
            transition={{ duration: 1 }}
        >
            <div className="container flex items-center justify-between">
                <Link href="/">
                <Image
                    src="/images/teste2.png"
                    alt="Logo RC Dev"
                    width={160}
                    height={80}
                />
                </Link>

                <nav className="flex items-center gap-4 sm:gap-10">
                    {NAV_ITEMS.map(item => (
                       <NavItem label={item.name} href={item.link} key={item.name} />
                ))}
                </nav>
            </div>
        </motion.header>
    )
}