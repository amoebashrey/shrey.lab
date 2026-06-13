'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * FadeUp — fades content up +12px over ~500ms on mount.
 *
 * Reduced motion: renders instantly as a plain <div> — no transform, no opacity
 * transition, no delay.
 *
 * `delay` lets a caller offset the start (seconds). `as` is intentionally not
 * exposed; this always renders a block-level div wrapper.
 */
export function FadeUp({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
