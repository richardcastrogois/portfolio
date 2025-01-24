import { Button } from "@/app/components/button";
import { TechBadge } from "@/app/components/tech-badge";
import Image from "next/image";
import { HiArrowNarrowRight } from "react-icons/hi";
import { TbBrandGithub, TbBrandLinkedin, TbBrandInstagram, TbBrandWhatsapp } from 'react-icons/tb';

const MOCK_CONTACTS = [
    {
        url:'https://github.com/richardcastrogois',
        icon: <TbBrandGithub />
    },
    {
        url:'https://www.linkedin.com/in/richard-castro-00a6b42bb/',
        icon: <TbBrandLinkedin />
    },
    {
        url:'https://www.instagram.com/richardcastrogois/',
        icon: <TbBrandInstagram />
    },
    {
        url:'https://www.linkedin.com/in/richard-castro-00a6b42bb/',
        icon: <TbBrandWhatsapp />
    },
]

export const HeroSection = () => {
    return (
        <section className="w-full lg:h-[755px] bg-hero-image bg-cover bg-center bg-no-repeat flex flex-col justify-end pb-10 sm:pb-32 py-32 lg:pb-[110px]">
            <div className="container flex items-start justify-between flex-col-reverse lg:flex-row">
                <div className="w-full lg:max-w-[530px]">
                    <p className="font-mono text-emerald-400">Olá, meu nome é</p>
                    <h2 className="text-4xl font-medium mt-2">Richard Castro</h2>

                    <p className="text-gray-400 my-6 text-sm sm:text-base">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis delectus tempora vitae minus similique dolore consequatur earum esse totam, soluta enim quas possimus temporibus quisquam repudiandae optio tempore est? Nihil.</p>

                    <div className="flex flex-wrap gap-x-2 gap-y-3 lg:max-w-[340px]">
                        {Array.from({ length: 7 }).map((_, index) => (
                        <TechBadge name="Next.js" />
                        ))}
                    </div>

                    <div className="mt-6 lg:mt-10 flex sm:items-center sm:gap-5 flex-col sm:flex-row">
                        <Button className="w-max shadow-button">
                            Entre em contato
                            <HiArrowNarrowRight size={18} />
                        </Button>

                        <div className="text-2xl text-gray-600 flex items-center h-20 gap-3">
                            {MOCK_CONTACTS.map((contact, index) => (
                                <a
                                    href={contact.url}
                                    key={'contact-${index}'}
                                    target="_blank"
                                    className=" hover:text-gray-100 transition-colors"
                                >
                                    {contact.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <Image
                    src="/images/profile2.png"
                    alt="Foto de perfil do Richard Castro"
                    width={420}
                    height={404}
                    className="w-[300px] h-[300px] lg:w-[420px] lg:h-[404px] mb-6 lg:mb-0 shadow-2xl rounded-lg object-cover border-none transition-transform duration-300 ease-in-out hover:-translate-y-2"
                />

            </div>
        </section>
    );
}