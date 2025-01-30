'use client'

import { useEffect, useState } from 'react'; // Importando useState e useEffect do React
import { Button } from "@/app/components/button";
import { CMSIcon } from "@/app/components/cms-icon";
import { RichText } from "@/app/components/rich-text";
import { TechBadge } from "@/app/components/tech-badge";
import { HomePageInfo } from "@/app/types/page-info";
import Image from "next/image";
import { HiArrowNarrowRight } from "react-icons/hi";
import { motion } from 'framer-motion'
import { techBadgeAnimation } from '@/app/lib/animations';

type HomeSectionProps = {
    homeInfo: HomePageInfo
}

//Efeito de digitação
const TypingEffect = ({ text }: { text: string }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [index, setIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(true);
    const typingSpeed = 100;
    const resetDelay = 1000;

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        if (isTyping && index < text.length) {
            timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + text[index]);
                setIndex((prevIndex) => prevIndex + 1);
            }, typingSpeed);
        } else if (index === text.length && isTyping) {
            timeout = setTimeout(() => {
                setIsTyping(false);
            }, resetDelay);
        } else if (!isTyping) {
            timeout = setTimeout(() => {
                setDisplayedText('');
                setIndex(0);
                setIsTyping(true);
            }, resetDelay);
        }

        return () => clearTimeout(timeout);
    }, [text, index, isTyping]);

    const placeholder = ' '.repeat(text.length);

    return (
        <div
            className={`
                text-shadow-subtleNeonGreen       
                animate-pulseNeon      
                text-green           
                inline-block
            `}
            style={{
                display: 'inline-block',
                textAlign: 'center',
                width: `${text.length}ch`,
                whiteSpace: 'pre-wrap',
            }}
        >
            {displayedText || placeholder}
        </div>
    );
};
export default TypingEffect;



export const HeroSection = ({ homeInfo }: HomeSectionProps) => {
    const handleContact = () => {
        const contactSection = document.querySelector('#contact') as HTMLElement | null;
        
        if (contactSection) {
          const targetPosition = contactSection.offsetTop;
          
          const scrollSmoothly = (start: number, end: number) => {
            const startTime = performance.now();
            const duration = 500;
      
            const animateScroll = (time: number) => {
              const timeElapsed = time - startTime;
              const progress = Math.min(timeElapsed / duration, 1);
              const currentScroll = start + (end - start) * progress;
              
              window.scrollTo(0, currentScroll);
      
              if (progress < 1) {
                requestAnimationFrame(animateScroll);
              }
            };
      
            requestAnimationFrame(animateScroll);
          };
      
          scrollSmoothly(window.scrollY, targetPosition);
        }
    };

    return (
        <section className="w-full min-h-[755px] lg:min-h-screen bg-hero-image bg-cover bg-center bg-no-repeat flex flex-col justify-end pb-10 sm:pb-32 py-32 lg:pb-[110px]">
            <div className="container flex items-start justify-between flex-col-reverse lg:flex-row">
                <motion.div 
                    className="w-full lg:max-w-[530px]"
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                >
                    <p className="font-mono text-emerald-400">Olá, meu nome é</p>
                    <h2 className="text-4xl font-medium mt-2">
                        <TypingEffect text="Richard Castro" />
                    </h2>

                    <div className="text-gray-400 my-6 text-sm sm:text-base">
                        <RichText content={homeInfo.introduction.raw} />
                    </div>

                    <div className="flex flex-wrap gap-x-2 gap-y-3 lg:w-full lg:justify-start lg:gap-x-4">
                        {homeInfo.technologies.map((tech, i) => (
                            <TechBadge
                                name={tech.name}
                                key={`intro-tech-${tech.name}`}
                                {...techBadgeAnimation}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            />
                        ))}
                    </div>

                    <div className="mt-6 lg:mt-10 flex sm:items-center sm:gap-5 flex-col sm:flex-row">
                        <Button className="w-max shadow-button" onClick={handleContact}>
                            Entre em contato
                            <HiArrowNarrowRight size={18} />
                        </Button>

                        <div className="text-2xl text-gray-600 flex items-center h-20 gap-3">
                            {homeInfo.socials.map((contact, index) => (
                                <a
                                    href={contact.url}
                                    key={'contact-${index}'}
                                    target="_blank"
                                    className=" hover:text-gray-100 transition-colors"
                                >
                                    <CMSIcon icon={contact.iconSvg} className="hover:scale-125" />
                                </a>
                            ))}
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 200, scale: 0.5 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 200, scale: 0.5 }}
                    transition={{ duration: 1 }}
                    className="origin-center"
                >
                    <Image
                        className="w-[300px] h-[300px] lg:w-[420px] lg:h-[404px] mb-6 lg:mb-0 shadow-2xl rounded-lg object-cover"
                        width={420}
                        height={404}
                        src={homeInfo.profilePicture.url}
                        alt="Foto de perfil do Gabriel Borges"
                    />
                </motion.div>
            </div>
        </section>
    );
}
