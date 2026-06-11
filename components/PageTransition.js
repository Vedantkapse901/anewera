'use client';

import { motion } from 'framer-motion';

export default function PageTransition({ children }) {
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={variants}>
      {children}
    </motion.div>
  );
}
