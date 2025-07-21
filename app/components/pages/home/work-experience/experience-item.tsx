//app/components/pages/home/work-experience/experience-item.tsx

"use client";

import { RichText } from "@/app/components/rich-text";
import { TechBadge } from "@/app/components/tech-badge";
import { WorkExperience } from "@/app/types/work-experience";
import { differenceInMonths, differenceInYears, format } from "date-fns";
import { ptBR, enUS } from "date-fns/locale"; // Importar os dois locales
import Image from "next/image";
import { motion } from "framer-motion";
import { techBadgeAnimation } from "@/app/lib/animations";
import { useTranslations } from "@/app/hook/useTranslations"; // Importar o hook de tradução
import { useSearchParams } from "next/navigation"; // Importar para ler a URL

type ExperienceItemProps = {
  experience: WorkExperience;
};

export const ExperienceItem = ({ experience }: ExperienceItemProps) => {
  const t = useTranslations(); // Chamar o hook
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang");

  const currentLocale = lang === "pt_BR" ? ptBR : enUS;

  const {
    endDate,
    companyName,
    companyLogo,
    companyUrl,
    description,
    role,
    technologies,
  } = experience;

  const startDate = new Date(experience.startDate);

  // Usar o locale dinâmico e a tradução para a data final
  const formattedStartDate = format(startDate, "MMM yyyy", {
    locale: currentLocale,
  });
  const formattedEndDate = endDate
    ? format(new Date(endDate), "MMM yyyy", { locale: currentLocale })
    : t.work_experience_present;

  const end = endDate ? new Date(endDate) : new Date();

  const months = differenceInMonths(end, startDate);
  const years = differenceInYears(end, startDate);
  const monthsRemaining = months % 12;

  // Lógica de duração usando as traduções do dicionário
  const yearText = years > 1 ? t.work_experience_years : t.work_experience_year;
  const monthText =
    monthsRemaining > 1 ? t.work_experience_months : t.work_experience_month;
  const totalMonthText =
    months > 1 ? t.work_experience_months : t.work_experience_month;

  const formattedDuration =
    years > 0
      ? `${years} ${yearText}${
          monthsRemaining > 0
            ? ` ${t.work_experience_and} ${monthsRemaining} ${monthText}`
            : ""
        }`
      : `${months} ${totalMonthText}`;

  return (
    <motion.div
      className="grid grid-cols-[40px,1fr] gap-4 md:gap-10"
      {...techBadgeAnimation}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="rounded-full border border-gray-500 p-0.5">
          {companyLogo && (
            <Image
              src={companyLogo.url}
              width={40}
              height={40}
              className="rounded-full"
              alt={`Logo da empresa ${companyName}`}
            />
          )}
        </div>

        <div className="h-full w-[1px] bg-gray-800" />
      </div>

      <div>
        <div className="flex flex-col gap-2 text-sm sm:text-base">
          <a
            href={companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-emerald-500 transition-colors"
          >
            @ {companyName}
          </a>
          <h4 className="text-gray-300">{role}</h4>
          <span className="text-gray-500">
            {formattedStartDate} • {formattedEndDate} • ({formattedDuration})
          </span>
          <div className="text-gray-400">
            <RichText content={description.raw} />
          </div>
        </div>

        <p className="text-gray-400 text-sm mb-3 mt-6 font-semibold">
          {t.work_experience_skills} {/* Texto traduzido */}
        </p>
        <div className="flex gap-x-2 gap-y-3 flex-wrap lg:max-w-[350px] mb-8">
          {technologies.map((tech, i) => (
            <TechBadge
              key={`experience-${companyName}-tech-${tech.name}`}
              name={tech.name}
              {...techBadgeAnimation}
              transition={{ duration: 0.4, delay: i * 0.2 }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};