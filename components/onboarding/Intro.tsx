'use client';

import { useEffect, useRef } from 'react';

/**
 * Intro — first-visit cinematic overlay. A lime ball drops, rolls left→right
 * writing "hello, i'm shreyas" in its wake, strikes a wall, returns to center,
 * then expands to fill the screen and dissolves to reveal the homepage.
 *
 * Self-contained: the homepage is fully rendered underneath the entire time;
 * this only sits on top (fixed, z above everything) and unmounts on complete.
 *
 * GSAP is imported DYNAMICALLY inside the effect, so it ships as its own chunk
 * and never weighs down the rest of the app.
 *
 * Reduced motion is honored by the gate (IntroGate) and again here as a guard:
 * if the user prefers reduced motion we never animate — instant reveal.
 */
export function Intro({ onDone }: { onDone: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const wallRef = useRef<HTMLDivElement>(null);
  const voidRef = useRef<HTMLDivElement>(null);
  const textureRef = useRef<HTMLDivElement>(null); // glass skin overlay on the ball
  // GSAP timeline handle, set once the library loads — used by skip + cleanup.
  const tlRef = useRef<{ kill: () => void } | null>(null);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    // Reduced-motion guard: never trap the user in motion.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      doneRef.current();
      return;
    }

    let cancelled = false;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden'; // no scroll behind the overlay

    (async () => {
      const mod = await import('gsap');
      const gsap = mod.gsap ?? mod.default;
      const ball = ballRef.current;
      const text = textRef.current;
      const wall = wallRef.current;
      const voidEl = voidRef.current;
      const overlay = overlayRef.current;
      const texture = textureRef.current;
      if (cancelled || !ball || !text || !wall || !voidEl || !overlay || !texture) return;

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const size = ball.offsetWidth; // resolved responsive ball size (px)
      const edgePad = size / 2 + 10;
      const leftX = -(vw / 2 - edgePad);
      const rightX = vw / 2 - edgePad;
      const dropStartY = -(vh / 2 + size);
      const circumference = Math.PI * size;
      const degPerPx = 360 / circumference;
      // Scale needed for the ball to cover the whole viewport from center.
      const fillScale = (Math.max(vw, vh) * 2.4) / size;

      gsap.set(ball, { x: 0, y: dropStartY, rotation: 0, scale: 1 });
      gsap.set(text, { clipPath: 'inset(0 100% 0 0)', opacity: 1 });
      gsap.set([wall, voidEl], { opacity: 0 });

      const reveal = { v: 100 }; // drives the text clip, tied to the roll

      const tl = gsap.timeline({
        onComplete: () => {
          if (!cancelled) doneRef.current();
        },
      });
      tlRef.current = tl;

      // 1 — DROP: fall to center, damped bounce.
      tl.to(ball, { y: 0, duration: 0.9, ease: 'bounce.out' });

      // wind-up: roll to the left edge so the reveal can run the full width.
      tl.to(ball, {
        x: leftX,
        rotation: `-=${Math.abs(leftX) * degPerPx}`,
        duration: 0.3,
        ease: 'power2.inOut',
      });

      // 2 — ROLL + REVEAL: left→right; text clip-path follows the ball's x.
      tl.add('roll');
      tl.to(
        ball,
        { x: rightX, rotation: `+=${(rightX - leftX) * degPerPx}`, duration: 1.2, ease: 'none' },
        'roll'
      );
      tl.to(
        reveal,
        {
          v: 0,
          duration: 1.2,
          ease: 'none',
          onUpdate: () => {
            text.style.clipPath = `inset(0 ${reveal.v}% 0 0)`;
          },
        },
        'roll'
      );

      // 3 — WALL HIT: flick the right-edge line, ball recoils.
      tl.add('wall');
      tl.to(wall, { opacity: 1, duration: 0.07 }, 'wall')
        .to(wall, { opacity: 0, duration: 0.33, ease: 'power2.out' }, 'wall+=0.07')
        .to(
          ball,
          { x: rightX - 34, rotation: '-=46', duration: 0.18, ease: 'power2.out' },
          'wall'
        );

      // 4 — RETURN: ease back to center.
      tl.to(ball, { x: 0, rotation: '+=24', duration: 0.55, ease: 'power2.inOut' });

      // 5 — EXPAND: scale up until lime fills the viewport (fade the text out).
      tl.to(ball, { scale: fillScale, duration: 0.7, ease: 'power3.in' });
      tl.to(text, { opacity: 0, duration: 0.3 }, '<');
      // Resolve the glass skin → flat lime as it grows (a giant specular looks
      // wrong at full screen). Synced to the expand start; no beat timing changed.
      tl.to(texture, { opacity: 0, duration: 0.45, ease: 'power2.in' }, '<');

      // 6 — VOID → REVEAL: lime → greyish void, then fade the overlay away.
      tl.to(voidEl, { opacity: 1, duration: 0.35, ease: 'power1.inOut' });
      tl.to(overlay, { opacity: 0, duration: 0.4, ease: 'power1.inOut' });
    })();

    return () => {
      cancelled = true;
      tlRef.current?.kill();
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  // Skip → jump straight to the reveal: stop the timeline, fade out, finish.
  function skip() {
    tlRef.current?.kill();
    const overlay = overlayRef.current;
    if (!overlay) return doneRef.current();
    import('gsap').then((mod) => {
      const gsap = mod.gsap ?? mod.default;
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.25,
        ease: 'power1.out',
        onComplete: () => doneRef.current(),
      });
    });
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] overflow-hidden bg-[#181815]"
      role="dialog"
      aria-label="Intro animation"
    >
      <button
        type="button"
        onClick={skip}
        className="absolute right-5 top-5 z-10 inline-flex h-11 items-center rounded-full px-3 font-mono text-sm text-[#FBFAF7]/70 transition-colors duration-150 hover:text-[#FBFAF7]"
      >
        skip →
      </button>

      {/* Text revealed in the ball's wake (clip-path driven by the timeline) */}
      <div
        ref={textRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 px-6 text-center font-display italic text-[#FBFAF7]"
        style={{ fontSize: 'clamp(28px, 7vw, 72px)', willChange: 'clip-path' }}
      >
        hello, i&apos;m shreyas
      </div>

      {/* Invisible right wall — flicks visible on impact */}
      <div ref={wallRef} className="absolute inset-y-0 right-0 w-px bg-[#FBFAF7]" />

      {/* The lime ball — solid #A8E10C base (what the expand resolves to) with a
          glass-sphere skin overlaid; the skin fades out during EXPAND. */}
      <div
        ref={ballRef}
        className="absolute left-1/2 top-1/2 rounded-full bg-[#A8E10C]"
        style={{
          width: 'clamp(48px, 12vw, 72px)',
          height: 'clamp(48px, 12vw, 72px)',
          marginLeft: 'calc(clamp(48px, 12vw, 72px) / -2)',
          marginTop: 'calc(clamp(48px, 12vw, 72px) / -2)',
          willChange: 'transform',
          boxShadow: '0 0 26px rgba(168, 225, 12, 0.35)', // faint outer lime glow
        }}
      >
        <div ref={textureRef} className="intro-ball-texture">
          <span className="intro-ball-glass" />
          <span className="intro-ball-sheen" />
        </div>
      </div>

      {/* Greyish void — fades in over the lime fill, then the overlay dissolves */}
      <div ref={voidRef} className="pointer-events-none absolute inset-0 bg-[#2b2b28]" />
    </div>
  );
}
