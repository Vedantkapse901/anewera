'use client';

import { motion } from 'framer-motion';

export const AnimatedContainer = ({ children, delay = 0, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const AnimatedContent = ({ children, stagger = true }) => {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger ? 0.1 : 0,
        delayChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div variants={container} initial="hidden" animate="visible">
      {Array.isArray(children)
        ? children.map((child, idx) => (
            <motion.div key={idx} variants={item}>
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
};

export const AnimatedText = ({ children, as: Component = 'span', ...props }) => {
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <Component {...props}>
      {typeof children === 'string'
        ? children.split(' ').map((word, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={variants}
              initial="hidden"
              animate="visible"
              style={{ display: 'inline-block', marginRight: '0.25em' }}
            >
              {word}
            </motion.span>
          ))
        : children}
    </Component>
  );
};
