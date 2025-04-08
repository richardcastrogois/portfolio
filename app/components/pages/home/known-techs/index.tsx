"use client";

import { SectionTitle } from "../../../section-title";
import { KnownTech } from "./known-tech";
import { KnownTech as IKnownTech } from "@/app/types/projects";
import { motion } from "framer-motion";

type KnownTechsProps = {
  techs: IKnownTech[];
};

export const KnownTechs = ({ techs }: KnownTechsProps) => {
  const groupedTechs = techs.reduce(
    (acc: { [key: string]: IKnownTech[] }, tech) => {
      const category = tech.category
        ? tech.category
            .replace("bancodedados", "Banco de Dados")
            .replace("frontend", "Frontend")
            .replace("backend", "Backend")
            .replace("ferramentas", "Ferramentas")
            .replace("design", "Design")
        : "Outros";

      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(tech);
      return acc;
    },
    {} as { [key: string]: IKnownTech[] }
  );

  const categoryOrder = [
    "Frontend",
    "Backend",
    "Banco de Dados",
    "Ferramentas",
    "Design",
    "Outros",
  ];

  const categories = categoryOrder.filter((category) =>
    Object.keys(groupedTechs).includes(category)
  );

  return (
    <section className="container py-16">
      <SectionTitle subtitle="competências" title="Conhecimentos" />

      {/* Mostrar cada categoria com suas tecnologias */}
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

/*
"use client";

import { SectionTitle } from "../../../section-title";
import { KnownTech } from "./known-tech";
import { KnownTech as IKnownTech } from "@/app/types/projects";
import { motion } from "framer-motion";

type KnownTechsProps = {
  techs: IKnownTech[];
};

export const KnownTechs = ({ techs }: KnownTechsProps) => {
  return (
    <section className="container py-16">
      <SectionTitle subtitle="competências" title="Conhecimentos" />

      <div className="grid grid-cols-[repeat(auto-fit,minmax(264px,1fr))] gap-3 mt-[60px]">
        {techs?.map((tech, i) => (
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
    </section>
  );
};
*/
