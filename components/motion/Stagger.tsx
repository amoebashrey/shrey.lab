'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { Children, type ReactNode } from 'react';

/**
 * Stagger — orchestrates direct children with a 60ms delay between each, each
 * child fading up +12px (~500ms).
 *
 * Reduced motion: renders instantly as a plain <div>, children untouched — no
 * transform, no per-child delay.
 *
 * Each child is wrapped in a block-level motion.div. Pass section-level blocks
 * as children (not inline elements).
 */
const STAGGER_SECONDS = 0.06; // 60ms between children

const childVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Stagger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="show"
      variants={{
        show: { transition: { staggerChildren: STAGGER_SECONDS } },
      }}
    >
      {Children.map(children, (child) => (
        <motion.div variants={childVariants}>{child}</motion.div>
      ))}
    </motion.div>
  );
}
