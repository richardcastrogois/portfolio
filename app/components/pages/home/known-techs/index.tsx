//app/components/pages/home/known-techs/index.tsx

"use client";

import { SectionTitle } from "../../../section-title";
import { KnownTech } from "./known-tech";
import { KnownTech as IKnownTech } from "@/app/types/projects";
import { motion } from "framer-motion";
import { useTranslations } from "@/app/hook/useTranslations";

type KnownTechsProps = {
  techs: IKnownTech[];
};

export const KnownTechs = ({ techs }: KnownTechsProps) => {
  const t = useTranslations();

  // Mapeia as categorias da API para as traduções do dicionário
  const categoryMap: { [key: string]: string } = {
    bancodedados: t.tech_category_database,
    frontend: t.tech_category_frontend,
    backend: t.tech_category_backend,
    ferramentas: t.tech_category_tools,
    design: t.tech_category_design,
  };

  const groupedTechs = techs.reduce(
    (acc: { [key: string]: IKnownTech[] }, tech) => {
      const categoryKey = tech.category || "others";
      const category = categoryMap[categoryKey] || t.tech_category_others;

      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(tech);
      return acc;
    },
    {} as { [key: string]: IKnownTech[] }
  );

  const categoryOrder = [
    t.tech_category_frontend,
    t.tech_category_backend,
    t.tech_category_database,
    t.tech_category_tools,
    t.tech_category_design,
    t.tech_category_others,
  ];

  const categories = categoryOrder.filter((category) =>
    Object.keys(groupedTechs).includes(category)
  );

  return (
    <section className="container py-16">
      <SectionTitle
        subtitle={t.known_techs_subtitle}
        title={t.known_techs_title}
      />

      {categories.map((category) => (
        <div key={category} className="mt-10">
          <h3 className="text-2xl font-semibold mb-4">{category}</h3>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-[repeat(auto-fit,minmax(264px,1fr))] md:gap-3">
            {groupedTechs[category].map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <KnownTech tech={tech} />
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};