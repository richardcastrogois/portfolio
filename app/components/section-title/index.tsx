'use client'

import { cn } from "../../lib/utils";
import { motion } from 'framer-motion'

type SectionTitleProps = {
  title: string;
  subtitle: string;
  className?: string
}

export const SectionTitle = ({
  title,
  subtitle,
  className
}: SectionTitleProps) =>{
  const animProps = {
    initial: { opacity: 0, x: -100 },
    whileInView: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  }
  return(
    <div className={cn('flex flex-col gap-4', className)}>
      <motion.span 
        className="font-mono text-sm text-emerald-400"
        {...animProps}
        transition= {{ duration: 1}}
      >
        {`../${subtitle}`}
      </motion.span>

      <motion.h3
        className="text-3xl font-medium"
        {...animProps}
        transition= {{ duration: 1, delay: 0.5}}
      >
        {title}
      </motion.h3>
    </div>
  )
}