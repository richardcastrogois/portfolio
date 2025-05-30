'use client'

import { motion } from 'framer-motion'
import { ComponentProps } from 'react';

type TechBadgeProps = ComponentProps<typeof motion.span> & {
  name: string;
}

export const TechBadge = ({ name, ...props }: TechBadgeProps) => {
  return (
    <motion.span 
      className="text-emerald-200 bg-emerald-900/80 texte-sm py-1 px-3 rounded-lg"
      {...props}
    >
      {name}
    </motion.span>
  );
}