import { Children, type CSSProperties, type ReactNode } from 'react';

/**
 * Stagger — settles direct children into place one after another, 60ms apart.
 *
 * CSS only (globals.css .stagger-item). The old framer-motion version rendered
 * every section at opacity 0 on the server and only revealed them after
 * hydration, so on a slow phone the page below the hero was blank until the JS
 * arrived. Now the content is readable on the first frame: the entrance moves
 * it 12px into place without hiding it, and reduced motion drops the motion.
 *
 * Pass section-level blocks as children (each is wrapped in a block div).
 */
const STAGGER_MS = 60;

export function Stagger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      {Children.map(children, (child, i) => (
        <div
          className="stagger-item"
          style={{ animationDelay: `${i * STAGGER_MS}ms` } as CSSProperties}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
