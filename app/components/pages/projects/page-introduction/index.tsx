//app/components/pages/projects/page-introduction/index.tsx

"use client";

import { Link as CustomLink } from "@/app/components/link";
import { SectionTitle } from "@/app/components/section-title";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "@/app/hook/useTranslations";

export const PageIntroduction = () => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang");

  const homeHref = lang ? `/?lang=${lang}` : "/";

  return (
    <section className="w-full h-[450px] lg:h-[630px] bg-hero-image bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center px-2">
      <SectionTitle
        subtitle={t.projects_page_subtitle}
        title={t.projects_page_title}
        className="text-center items-center [&>h3:text-4xl]"
      />
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-gray-400 text-center max-w-[640px] my-6 text-sm sm:text-base">
          {t.projects_page_description}
        </p>
        <CustomLink href={homeHref}>
          <HiArrowNarrowLeft size={20} />
          {t.projects_page_back_button}
        </CustomLink>
      </motion.div>
    </section>
  );
};