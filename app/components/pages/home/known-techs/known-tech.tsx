//app/components/pages/home/known-techs/known-tech.tsx

import { KnownTech as IKnownTech } from "@/app/types/projects"
import { getRelativeTimeString } from "@/app/utils/get-relative-time"
import { CMSIcon } from "../../../cms-icon"
import { useTranslations } from "@/app/hook/useTranslations";

type KnownTechProps = {
  tech: IKnownTech
}

export const KnownTech = ({ tech }: KnownTechProps ) => {
  const t = useTranslations();
  const relativeTime = getRelativeTimeString(
    new Date(tech.startDate), 'pt-BR',
  ).replace('há ', '')
  return (
    <div className="p-6 rounded-lg bg-gray-600/20 text-gray-500 flex flex-col gap-2 hover:text-emerald-500 hover:bg-gray-600/30 transition-all">
      <div className="flex items-center justify-between">
        <p className="font-medium">{tech.name}</p>
        <CMSIcon icon={tech.iconSvg} scale={1.6} />
      </div>

      <span>
        {relativeTime} {t.known_tech_experience_unit}
      </span>
    </div>
  );
}