import type { CSSProperties, ReactNode } from 'react';

/**
 * FadeUp — fades content up +12px over ~500ms on load.
 *
 * Pure CSS (globals.css .fade-up), not framer-motion: the old version rendered
 * `opacity:0` on the server and swapped to a plain <div> under reduced motion
 * on the client — React doesn't patch attribute mismatches during hydration,
 * so the server's opacity:0 stuck and the whole block (e.g. a case study's
 * body) never appeared for reduced-motion visitors. CSS needs no hydration,
 * and the kit's reduced-motion rule snaps it straight to visible.
 *
 * `delay` offsets the start (seconds).
 */
export function FadeUp({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const style = delay ? ({ animationDelay: `${delay}s` } as CSSProperties) : undefined;
  return (
    <div className={`fade-up ${className}`} style={style}>
      {children}
    </div>
  );
}
