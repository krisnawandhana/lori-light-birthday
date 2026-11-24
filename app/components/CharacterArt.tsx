import { SoundBars } from "./Waveform";

/*
  R-23: no artwork has been supplied, so this is an explicit placeholder that
  reads as a placeholder. It holds the real composition (a tall figure with the
  tail curving out of frame) so the hero balance is already correct, and it is
  labelled in plain sight rather than dressed up as final art.
*/
export default function CharacterArt() {
  return (
    <div className="relative mx-auto aspect-3/4 w-full max-w-105 lg:max-w-120">
      {/* Glow behind the figure: one of the two glow uses on the page (R-13). */}
      <div
        aria-hidden="true"
        className="absolute inset-0 animate-[sway_9s_ease-in-out_infinite]"
        style={{
          background:
            "radial-gradient(ellipse 48% 42% at 50% 44%, rgba(63,210,199,0.30), transparent 72%)",
          filter: "blur(28px)",
        }}
      />

      <div className="absolute inset-0 animate-[sway_11s_ease-in-out_infinite]">
        <svg
          viewBox="0 0 300 400"
          className="h-full w-full"
          role="img"
          aria-label="Placeholder silhouette of Lori Light. Final character artwork has not been added yet."
        >
          <defs>
            <linearGradient id="fig" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7ceaf0" stopOpacity="0.30" />
              <stop offset="55%" stopColor="#3fd2c7" stopOpacity="0.20" />
              <stop offset="100%" stopColor="#0e5c6b" stopOpacity="0.10" />
            </linearGradient>
          </defs>

          {/*
            One continuous figure: head into torso into a tail that curves off
            to the right. Drawn as a single path so it reads as a body, not as
            stacked shapes.
          */}
          <path
            d="M150 40
               C 172 40, 186 56, 186 76
               C 186 92, 178 104, 168 110
               C 186 118, 196 142, 196 172
               C 196 206, 188 240, 178 266
               C 196 286, 206 314, 200 342
               C 214 334, 230 330, 244 334
               C 236 348, 220 362, 200 368
               C 208 378, 210 388, 206 396
               C 186 388, 168 372, 158 352
               C 150 366, 138 376, 124 378
               C 120 360, 124 340, 134 324
               C 122 300, 116 268, 116 232
               C 116 186, 122 140, 132 110
               C 122 104, 114 92, 114 76
               C 114 56, 128 40, 150 40 Z"
            fill="url(#fig)"
            stroke="#3fd2c7"
            strokeOpacity="0.5"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          {/* Hair: long, drifting past the shoulders. The one confirmed trait. */}
          <path
            d="M114 64 C 92 96, 84 148, 94 198 C 100 226, 106 244, 112 256
               M186 64 C 208 96, 216 148, 206 198 C 200 226, 194 244, 188 256
               M104 70 C 86 110, 82 164, 92 206"
            fill="none"
            stroke="#3fd2c7"
            strokeOpacity="0.5"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Tail fluke edge, catching the light from above. */}
          <path
            d="M178 266 C 196 286, 206 314, 200 342 M158 352 C 168 340, 176 322, 178 300"
            fill="none"
            stroke="#7ceaf0"
            strokeOpacity="0.35"
            strokeWidth="1.1"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Honest label, per R-23. Not disguised. */}
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-md border border-dashed border-turquoise/40 bg-abyss/70 px-3 py-1.5">
        <SoundBars className="h-3 w-8" />
        <span className="text-[11px] uppercase tracking-[0.18em] text-text-secondary">
          [Character art]
        </span>
      </div>
    </div>
  );
}
