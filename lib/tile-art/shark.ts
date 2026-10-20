import type { Creature, ShapeFn } from './types';

/** Half-width of the body along its length (u = 0 at the nose, 1 at the tail). */
function w(u: number) {
  if (u < 0.33) return 0.13 * Math.pow(Math.sin(((u / 0.33) * Math.PI) / 2), 0.65);
  if (u < 0.88) return 0.02 + 0.11 * (0.5 + 0.5 * Math.cos(((u - 0.33) / 0.55) * Math.PI));
  return 0.02;
}

/**
 * One shark in greyscale, nose at (s.x, s.y) pointing along s.a.
 * Red channel = shading (0 dark back, 1 pale belly), alpha = coverage.
 * Geometry is the prototype's, unchanged.
 */
export const drawShark: ShapeFn = (k, s: Creature, t) => {
  const L = s.L;
  const N = 48;
  const ph = t * 0.0035 * (1 + s.v * 0.6) + s.p;
  // Lateral bend grows toward the tail (u^1.6), so the head stays steady.
  const sp = (u: number) => Math.sin(u * 4.2 - ph) * L * 0.055 * Math.pow(u, 1.6);
  const P = (u: number, side: number): [number, number] => [
    -u * L,
    sp(u) + (side < 0 ? -w(u) * L : w(u) * L * 0.88),
  ];

  k.save();
  k.translate(s.x, s.y);
  k.rotate(s.a + Math.sin(ph) * 0.02);

  // Body
  const gr = k.createLinearGradient(0, -L * 0.13, 0, L * 0.12);
  gr.addColorStop(0, 'rgb(8,8,8)');
  gr.addColorStop(0.42, 'rgb(70,70,70)');
  gr.addColorStop(0.58, 'rgb(170,170,170)');
  gr.addColorStop(1, 'rgb(250,250,250)');
  k.fillStyle = gr;
  k.beginPath();
  let p: [number, number];
  k.moveTo(L * 0.015, sp(0));
  for (let i = 0; i <= N; i++) {
    p = P(i / N, -1);
    k.lineTo(p[0], p[1]);
  }
  for (let i = N; i >= 0; i--) {
    p = P(i / N, 1);
    k.lineTo(p[0], p[1]);
  }
  k.closePath();
  k.fill();

  // Dorsal fin
  k.fillStyle = 'rgb(25,25,25)';
  let a = P(0.34, -1);
  let b = P(0.52, -1);
  let y0 = sp(0.45);
  k.beginPath();
  k.moveTo(a[0], a[1] + 2);
  k.quadraticCurveTo(-L * 0.4, y0 - L * 0.2, -L * 0.53, y0 - L * 0.215);
  k.quadraticCurveTo(-L * 0.49, y0 - L * 0.12, b[0], b[1] + 2);
  k.closePath();
  k.fill();

  // Second dorsal fin
  a = P(0.78, -1);
  b = P(0.84, -1);
  k.beginPath();
  k.moveTo(a[0], a[1] + 1);
  k.lineTo(-L * 0.84, sp(0.82) - L * 0.065);
  k.lineTo(b[0], b[1] + 1);
  k.fill();

  // Pectoral fin
  k.fillStyle = 'rgb(55,55,55)';
  a = P(0.27, 1);
  b = P(0.36, 1);
  y0 = sp(0.32);
  k.beginPath();
  k.moveTo(a[0], a[1] - 2);
  k.quadraticCurveTo(-L * 0.33, y0 + L * 0.17, -L * 0.47, y0 + L * 0.24);
  k.quadraticCurveTo(-L * 0.4, y0 + L * 0.12, b[0], b[1] - 2);
  k.closePath();
  k.fill();

  // Anal fin
  a = P(0.8, 1);
  b = P(0.86, 1);
  k.beginPath();
  k.moveTo(a[0], a[1] - 1);
  k.lineTo(-L * 0.87, sp(0.84) + L * 0.05);
  k.lineTo(b[0], b[1] - 1);
  k.fill();

  // Tail: tall upper lobe, smaller lower lobe
  const ty = sp(1);
  const tx = -L;
  const tw = Math.sin(ph - 1.2) * L * 0.04;
  a = P(0.93, -1);
  b = P(0.93, 1);
  k.fillStyle = 'rgb(18,18,18)';
  k.beginPath();
  k.moveTo(a[0], a[1]);
  k.quadraticCurveTo(tx - L * 0.06, ty - L * 0.1 + tw, tx - L * 0.17, ty - L * 0.25 + tw);
  k.quadraticCurveTo(tx - L * 0.08, ty - L * 0.06, tx - L * 0.03, ty);
  k.quadraticCurveTo(tx - L * 0.07, ty + L * 0.06, tx - L * 0.11, ty + L * 0.15 + tw);
  k.quadraticCurveTo(tx - L * 0.04, ty + L * 0.06, b[0], b[1]);
  k.closePath();
  k.fill();

  // Eye
  k.fillStyle = 'rgb(0,0,0)';
  k.beginPath();
  k.arc(-L * 0.075, sp(0.075) - L * 0.035, Math.max(L * 0.011, 1.5), 0, 7);
  k.fill();

  k.restore();
};

/** The prototype's four sharks, positioned in its 800×460 frame. */
export const DEFAULT_SHARKS: readonly Creature[] = [
  { x: 200, y: 170, a: -0.12, L: 300, v: 0.65, p: 0 },
  { x: 560, y: 340, a: 3.02, L: 210, v: 0.5, p: 2 },
  { x: 120, y: 390, a: -0.35, L: 130, v: 0.42, p: 4 },
  { x: 640, y: 90, a: 3.25, L: 95, v: 0.36, p: 1 },
];
