'use client'

import { TbArrowNarrowUp } from "react-icons/tb"
import { Button } from "../button"
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from 'framer-motion'

export const BackToTop = () => {
  const [show, setShow] = useState(false);

  const scrollToTop = () => {
    const start = window.scrollY;
    const duration = 500;

    const startTime = performance.now();

    const scrollSmoothly = (time: number) => {
      const timeElapsed = time - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const currentScroll = start - start * progress;

      window.scrollTo(0, currentScroll);

      if (progress < 1) {
        requestAnimationFrame(scrollSmoothly);
      }
    };

    requestAnimationFrame(scrollSmoothly);
  };

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;

    if (!show && scrollPosition > 500) {
      setShow(true);
    } else if (show && scrollPosition <= 500) {
      setShow(false);
    }
  }, [show]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed right-4 bottom-4 z-20"
        initial={{ opacity: 0, right: -10 }}
        animate={{ opacity: 1, right: 16 }}
        exit={{ opacity: 0, right: -10}}
        transition={{ duration: 0.5 }}
      >
        <Button onClick={scrollToTop} className="shadow-lg shadow-emerald-400/20">
          <TbArrowNarrowUp size={20} />
        </Button>
      </motion.div>
    </AnimatePresence>
  );
};
