"use client";

import { useEffect, useMemo, useState } from "react";

/*
  The ocean environment. Design.md section 16 asks for the water to be part of
  the experience rather than decoration, so these layers are fixed behind the
  whole document and shift with scroll: the page reads as one continuous descent
  instead of a stack of sections that happen to be blue.
*/

type Bubble = {
  left: number;
  size: number;
  delay: number;
  duration: number;
  sway: number;
  peak: number;
};

/*
  Deterministic rather than random, so the same field renders on the server and
  the client and a re-render never reshuffles the water.

  Results are rounded to two decimals on purpose: Math.sin's last bits differ
  between Node and the browser's V8, and an unrounded value lands in a style
  attribute as e.g. -10.177976938939537px on one side and ...9157816px on the
  other, which tears hydration.
*/
function scatter(i: number, salt: number) {
  const x = Math.sin((i + 1) * salt) * 43758.5453;
  return x - Math.floor(x);
}

const r2 = (n: number) => Math.round(n * 100) / 100;

function buildBubbles(count: number): Bubble[] {
  return Array.from({ length: count }, (_, i) => ({
    left: r2(scatter(i, 12.9898) * 100),
    size: r2(3 + scatter(i, 78.233) * 11),
    delay: r2(scatter(i, 39.425) * 22),
    duration: r2(16 + scatter(i, 27.611) * 16),
    sway: r2(-30 + scatter(i, 54.187) * 60),
    peak: r2(0.16 + scatter(i, 93.772) * 0.34),
  }));
}

function useScrollDepth() {
  const [depth, setDepth] = useState(0);

  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      setDepth(window.scrollY);
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(read);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    /* No synchronous first read: the page loads at the top, and any restored
       scroll position fires a scroll event of its own. */
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return depth;
}

const BUBBLES = buildBubbles(26);

export default function Ocean() {
  const depth = useScrollDepth();

  /*
    Parallax factors are small and differ per layer, so the light rays fall
    behind faster than the bubbles. That difference is what sells depth; equal
    speeds would just be a moving background.
  */
  const rayShift = useMemo(() => depth * 0.35, [depth]);
  const causticShift = useMemo(() => depth * 0.14, [depth]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/*
        Vertical gradient is the water column itself: surface light at the top
        falling to abyss. This is the one gradient with a stated job (R-01),
        it encodes depth, which the whole page is organised around.
      */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #0a3a4d 0%, #06263a 28%, #041a28 58%, #020d16 100%)",
        }}
      />

      {/* Light rays from the surface, per Design.md section 2. */}
      <div
        className="absolute inset-x-0 top-0 h-[85vh] opacity-55 mix-blend-screen"
        style={{
          transform: `translateY(${-rayShift}px)`,
          background:
            "repeating-linear-gradient(101deg, transparent 0 68px, rgba(124,234,240,0.05) 68px 104px, transparent 104px 190px)",
          maskImage:
            "linear-gradient(180deg, rgba(0,0,0,0.9) 0%, transparent 92%)",
        }}
      />

      {/* Slow caustic wash, keeps the water from ever being perfectly still. */}
      <div
        className="absolute inset-x-[-25%] top-0 h-[60vh] opacity-30 mix-blend-screen"
        style={{ transform: `translateY(${-causticShift}px)` }}
      >
        <div
          className="h-full w-[200%] animate-[drift_46s_linear_infinite]"
          style={{
            background:
              "radial-gradient(ellipse 50% 32% at 18% 10%, rgba(63,210,199,0.16), transparent 70%), radial-gradient(ellipse 42% 26% at 62% 4%, rgba(124,234,240,0.13), transparent 70%)",
          }}
        />
      </div>

      {BUBBLES.map((b, i) => (
        <span
          key={i}
          className="absolute bottom-[-8vh] rounded-full animate-[rise_linear_infinite]"
          style={
            {
              left: `${b.left}%`,
              width: `${b.size}px`,
              height: `${b.size}px`,
              animationDelay: `${b.delay}s`,
              animationDuration: `${b.duration}s`,
              "--sway": `${b.sway}px`,
              "--peak": b.peak,
              background:
                "radial-gradient(circle at 32% 28%, rgba(255,255,255,0.85), rgba(124,234,240,0.28) 48%, rgba(124,234,240,0.05) 72%)",
              boxShadow: "inset 0 0 3px rgba(255,255,255,0.4)",
            } as React.CSSProperties
          }
        />
      ))}

      {/* Floor darkening, so content near the bottom keeps its contrast (R-25). */}
      <div className="absolute inset-x-0 bottom-0 h-[38vh] bg-linear-to-t from-abyss-deep to-transparent" />
    </div>
  );
}
