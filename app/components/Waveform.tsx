/*
  The identity motif (Part 3, Levers). Lori sings underwater, so one curve does
  both jobs: read as a water surface, read as an audio waveform. It appears as a
  section divider and, in bar form, wherever singing is literally the subject.
  Repeating this one shape is what makes the page belong to her specifically
  rather than to any ocean-themed template.
*/

export function WaveDivider({
  flip = false,
  className = "",
}: {
  flip?: boolean;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none w-full overflow-hidden leading-[0] ${className}`}
      style={flip ? { transform: "rotate(180deg)" } : undefined}
    >
      <svg
        viewBox="0 0 1440 70"
        preserveAspectRatio="none"
        className="block h-[46px] w-full sm:h-[70px]"
      >
        <path
          d="M0 34 C 120 6, 216 62, 336 40 S 552 4, 672 30 S 888 66, 1008 42 S 1224 8, 1344 32 L 1440 38 L 1440 70 L 0 70 Z"
          fill="none"
          stroke="url(#wave-stroke)"
          strokeWidth="1.5"
        />
        <defs>
          <linearGradient id="wave-stroke" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#3fd2c7" stopOpacity="0" />
            <stop offset="28%" stopColor="#3fd2c7" stopOpacity="0.55" />
            <stop offset="72%" stopColor="#7ceaf0" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#7ceaf0" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/*
  Bar heights are a fixed pattern, not random: a random set re-rolls on every
  render and the shape stops being recognisable as a signature.
*/
const BARS = [
  0.32, 0.58, 0.9, 0.46, 0.74, 1, 0.52, 0.28, 0.66, 0.94, 0.4, 0.8, 0.34, 0.6,
  0.86, 0.44,
];

export function SoundBars({
  animated = false,
  className = "",
}: {
  animated?: boolean;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex items-end gap-[3px] ${className}`}
    >
      {BARS.map((h, i) => (
        <span
          key={i}
          className="w-[3px] origin-bottom rounded-full bg-turquoise/70"
          style={{
            height: `${Math.round(h * 100)}%`,
            animation: animated
              ? `sing ${900 + (i % 5) * 190}ms ease-in-out ${i * 55}ms infinite`
              : undefined,
          }}
        />
      ))}
    </span>
  );
}
