import React, { useMemo, useEffect } from 'react';
import { motion } from 'motion/react';

interface Petal {
  id: number; x: number; delay: number; duration: number; size: number;
  color: string; startRotate: number; endRotate: number; swayAmps: number[]; shapeIdx: number;
}

const PETAL_COLORS = ['#f9c8d9','#f7b2cb','#fce4ec','#e8c8f0','#d4a9e8','#f0ddf7','#fde68a','#fcd34d','#fbcfe8','#c59d5f','#ecd0a1'];
const PETAL_SHAPES = [
  'M0,-10 C5,-10 10,-5 10,0 C10,5 5,10 0,10 C-5,10 -10,5 -10,0 C-10,-5 -5,-10 0,-10',
  'M0,-8 C4,-12 12,-4 8,0 C12,4 4,12 0,8 C-4,12 -12,4 -8,0 C-12,-4 -4,-12 0,-8',
  'M0,-12 C6,-8 8,0 4,8 C0,12 -6,8 -8,0 C-6,-8 0,-12 0,-12',
];

function rnd(a: number, b: number) { return a + Math.random() * (b - a); }

function makePetals(n: number): Petal[] {
  return Array.from({ length: n }, (_, i) => {
    const amp = rnd(25, 55);
    return {
      id: i, x: rnd(0, 100), delay: rnd(0, 2.2), duration: rnd(3, 5.5), size: rnd(10, 20),
      color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
      startRotate: rnd(0, 360), endRotate: rnd(0, 360) * (Math.random() > 0.5 ? 1 : -1) + 720,
      swayAmps: [0, amp, -amp * 0.6, amp * 0.3, 0], shapeIdx: i % PETAL_SHAPES.length,
    };
  });
}

const PetalEl: React.FC<{ p: Petal }> = ({ p }) => (
  <motion.div
    className="pointer-events-none fixed top-0 z-[9999]"
    style={{ left: `${p.x}vw` }}
    initial={{ y: -p.size - 10, rotate: p.startRotate, opacity: 1, x: 0 }}
    animate={{ y: '108vh', rotate: p.endRotate, x: p.swayAmps, opacity: [1, 1, 0.9, 0.5, 0] }}
    transition={{
      duration: p.duration, delay: p.delay, ease: 'easeIn',
      x: { duration: p.duration, delay: p.delay, ease: 'easeInOut', times: [0, 0.3, 0.6, 0.8, 1] },
      opacity: { duration: p.duration, delay: p.delay, times: [0, 0.4, 0.65, 0.85, 1] },
    }}
  >
    <svg width={p.size} height={p.size} viewBox="-14 -14 28 28" fill="none">
      <path d={PETAL_SHAPES[p.shapeIdx]} fill={p.color} opacity={0.9} />
    </svg>
  </motion.div>
);

export const FlowerConfetti: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  const petals = useMemo(() => makePetals(45), []);
  const maxMs = Math.max(...petals.map(p => (p.delay + p.duration) * 1000));
  useEffect(() => {
    const t = setTimeout(onDone, maxMs + 400);
    return () => clearTimeout(t);
  }, [maxMs, onDone]);
  return <>{petals.map(p => <PetalEl key={p.id} p={p} />)}</>;
};
