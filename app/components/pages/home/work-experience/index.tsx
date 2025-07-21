//app/components/pages/home/work-experience/index.tsx

"use client";

import { SectionTitle } from "@/app/components/section-title";
import { ExperienceItem } from "./experience-item";
import { WorkExperience as IWorkExperience } from "@/app/types/work-experience";
import { useTranslations } from "@/app/hook/useTranslations";

type WorkExperienceProps = {
  experiences: IWorkExperience[];
};

export const WorkExperience = ({ experiences }: WorkExperienceProps) => {
  const t = useTranslations();

  return (
    <section className="container py-16 flex gap-10 md:gap-4 lg:gap-16 flex-col md:flex-row">
      <div className="max-w-[420px]">
        <SectionTitle
          subtitle={t.work_experience_subtitle}
          title={t.work_experience_title}
        />
        <p className="text-gray-400 mt-6">{t.work_experience_description}</p>
      </div>

      <div className="flex flex-col gap-4">
        {experiences?.map((experience) => (
          <ExperienceItem
            key={experience.companyName}
            experience={experience}
          />
        ))}
      </div>
    </section>
  );
};