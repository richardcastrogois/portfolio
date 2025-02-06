"use client";

import React, { useState, useRef, useEffect } from "react";
import { HorizontalDivider } from "../divider/horizontal";
import Image from "next/image";
import { SectionTitle } from "../section-title";
import { motion } from "framer-motion";

const MAX_VISIBILITY = 3;

interface CardProps {
  title: string;
  content: string;
  image?: string;
}

const certifications = [
  { title: "Certificação 1", content: "Imersão Inteligência Artificial Alura", image: "/certalura01.jpg" },
  { title: "Certificação 2", content: "Proficiency Achievement Certificate: Low Intermediate", image: "/download_page-0001.jpg" },
];

const Card: React.FC<CardProps> = ({ title, content, image }) => (
  <div className="relative w-full h-full text-gray-600 flex items-center justify-center overflow-hidden">
    {image && (
      <Image
        src={image}
        alt={title}
        layout="fill"
        objectFit="contain"
        className="absolute top-0 left-0 w-full h-full z-0"
      />
    )}
    <div className="bg-transparent">
      <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
      <p className="text-sm md:text-base">{content}</p>
    </div>
  </div>
);

const Dots: React.FC<{ count: number; active: number; onClick: (index: number) => void }> = ({ count, active, onClick }) => (
  <div className="flex justify-center space-x-2 mt-2">
    {Array.from({ length: count }).map((_, i) => (
      <button
        key={i}
        className={`w-3 h-3 rounded-full transition-colors ${
          i === active ? "bg-gray-800" : "bg-gray-300"
        }`}
        onClick={() => onClick(i)}
      />
    ))}
  </div>
);

export const Carousel: React.FC = () => {
  const [active, setActive] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % certifications.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="container py-16">
      <SectionTitle subtitle="competências" title="Certificações" />
      <div>
        <HorizontalDivider />
      </div>

      <div className="flex flex-col items-center relative">  
        <motion.div
          className="flex items-center justify-center w-full h-[300px] md:h-[400px] overflow-hidden relative mt-0 mb-0 lg:mt-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit= {{ opacity: 0, y: 50}}
          transition={{ duration: 1 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            ref={carouselRef}
            className="relative w-full max-w-4xl h-full lg:max-w-3xl perspective-500 transform-style-preserve-3d flex justify-center"
          >
            {certifications.map((card, i) => {
              const distance = active - i;
              const isActive = distance === 0;

              return (
                <div
                  key={i}
                  className="absolute transition-all duration-300 ease-out flex justify-center items-center"
                  style={{
                    transform: isActive ? "none" : `translateX(${Math.sign(distance) * 100}%)`, // Movimento horizontal simples
                    opacity: isActive ? 1 : 0, // Apenas o card ativo é visível
                    pointerEvents: isActive ? "auto" : "none",
                    zIndex: isActive ? 10 : 5 - Math.abs(distance),
                    width: "100%",
                    maxWidth: "80vw",
                    height: "100%",
                  }}
                >
                  <Card title={card.title} content={card.content} image={card.image} />
                </div>
              );
            })}
          </div>
        </motion.div>

        <div className="w-full mt-0">
          <Dots count={certifications.length} active={active} onClick={(index) => setActive(index)} />
        </div>
      </div>

      <div className="w-full flex justify-center mt-2">
        <p className="text-sm md:text-base text-center text-gray-600">
          {certifications[active]?.content || "Nenhum conteúdo disponível"}
        </p>
      </div>
    </section>
  );
};