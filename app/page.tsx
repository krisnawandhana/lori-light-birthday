import Nav from "./components/Nav";
import Ocean from "./components/Ocean";
import CharacterArt from "./components/CharacterArt";
import VideoFeed from "./components/VideoFeed";
import { WaveDivider, SoundBars } from "./components/Waveform";
import { PROFILE, SCHEDULE, SOCIALS, STREAM } from "./lib/profile";

/* Reusable bit: a value that has not been supplied yet, shown as such (R-38). */
function Blank({ children = "[Not set]" }: { children?: string }) {
  return (
    <span className="text-text-secondary/70 [font-variant-numeric:tabular-nums]">
      {children}
    </span>
  );
}

function SectionTitle({
  eyebrow,
  title,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      {/*
        Small caps label, not a pill badge (R-09): it names the section for
        orientation and carries no decoration of its own.
      */}
      <p className="mb-3 text-xs uppercase tracking-[0.22em] text-turquoise/80">
        {eyebrow}
      </p>
      <h2 className="font-display text-4xl font-light leading-[1.08] text-pearl sm:text-5xl">
        {title}
      </h2>
    </div>
  );
}

export default function Home() {
  /*
    Resolved once on the server. Reading the clock during render on both sides
    lets a visitor whose timezone has already rolled over disagree with the
    server and tear hydration, which is a real risk for a page that will be up
    across a new year.
  */
  const year = new Date().getFullYear();

  return (
    <>
      <Ocean />
      <Nav />

      <main id="main" className="relative z-10 flex-1">
        {/*
          SECTION 1 — Hero. Asymmetric two-column: the figure sits right and
          slightly low, text hangs left. The focal point is the character, and
          the status card tucks under the copy rather than centring everything.
        */}
        <section
          id="top"
          className="mx-auto flex min-h-svh max-w-6xl flex-col justify-center px-5 pb-16 pt-28 sm:px-8 lg:pt-32"
        >
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div className="order-2 lg:order-1">
              <p className="mb-5 flex items-center gap-3 text-xs uppercase tracking-[0.24em] text-turquoise/85">
                <SoundBars animated className="h-3 w-12" />
                {PROFILE.species}
              </p>

              <h1 className="font-display text-[3.25rem] font-light leading-[0.94] text-pearl sm:text-7xl lg:text-[5.5rem]">
                Welcome to
                <span className="block italic text-turquoise">my ocean</span>
              </h1>

              <p className="mt-6 max-w-md text-base leading-relaxed text-text-secondary sm:text-lg">
                I am {PROFILE.name}. I sing down here, mostly badly, sometimes
                not. Pull up a rock and stay a while.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                {/*
                  Primary CTA is the only pill on the page (R-11), and one of the
                  two glowing elements (R-13). It is specific about the action
                  rather than "Get Started" (R-15).
                */}
                <a
                  href="#content"
                  className="inline-flex min-h-12 items-center justify-center rounded-pill bg-turquoise px-7 text-sm font-medium text-abyss-deep shadow-[0_0_26px_-6px_rgba(63,210,199,0.75)] transition-all hover:shadow-[0_0_34px_-4px_rgba(63,210,199,0.95)]"
                >
                  Hear me sing
                </a>
                <a
                  href="#about"
                  className="inline-flex min-h-12 items-center justify-center rounded-md border border-turquoise/30 px-7 text-sm text-pearl transition-colors hover:border-turquoise/70"
                >
                  Who is Lori
                </a>
              </div>

              {/* Live status. Offline today, so it says so plainly. */}
              <div className="mt-10 max-w-md rounded-lg border border-turquoise/12 bg-ocean/28 p-5">
                {STREAM.state === "live" ? (
                  <div>
                    <p className="flex items-center gap-2.5 text-sm font-medium text-coral">
                      <span className="h-2 w-2 animate-[pulse-ring_2s_ease-out_infinite] rounded-full bg-coral" />
                      Live now
                    </p>
                    <p className="mt-2 text-pearl">{STREAM.title}</p>
                  </div>
                ) : (
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-text-secondary">
                        Currently offline
                      </p>
                      <p className="mt-1.5 text-pearl">
                        Next stream{" "}
                        {STREAM.nextStream ? (
                          <>
                            {STREAM.nextStream.label} · {STREAM.nextStream.time}
                          </>
                        ) : (
                          <Blank>[Not scheduled]</Blank>
                        )}
                      </p>
                    </div>
                    <a
                      href="#schedule"
                      /* 44px floor for tap targets (R-03). */
                      className="inline-flex min-h-11 items-center rounded-md border border-turquoise/25 px-4 text-xs text-pearl transition-colors hover:border-turquoise/60"
                    >
                      See the week
                    </a>
                  </div>
                )}
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <CharacterArt />
            </div>
          </div>
        </section>

        <WaveDivider />

        {/*
          SECTION 2 — About. Deliberately different: a single narrow column,
          text-led, with the profile as a definition list rather than cards.
          Nothing here is a grid, which breaks the rhythm on purpose.
        */}
        <section
          id="about"
          className="mx-auto max-w-2xl px-5 py-24 sm:px-8 sm:py-32"
        >
          <SectionTitle eyebrow="About" title="A voice from the deep" />

          <p className="mt-7 text-base leading-[1.85] text-text-secondary">
            {PROFILE.intro ?? (
              <Blank>
                [Lori&apos;s introduction goes here, in her own words.]
              </Blank>
            )}
          </p>

          <dl className="mt-12 divide-y divide-turquoise/10 border-y border-turquoise/10">
            {[
              ["Name", PROFILE.name],
              ["Species", PROFILE.species],
              ["Birthday", PROFILE.birthday],
              ["Height", PROFILE.height],
              ["Home", PROFILE.home],
              ["Likes", PROFILE.likes?.join(", ") ?? null],
              ["Dislikes", PROFILE.dislikes?.join(", ") ?? null],
            ].map(([label, value]) => (
              <div
                key={label as string}
                className="flex flex-wrap items-baseline gap-x-6 gap-y-1 py-4"
              >
                <dt className="w-24 shrink-0 text-xs uppercase tracking-[0.16em] text-turquoise/70">
                  {label}
                </dt>
                <dd className="text-pearl">
                  {value ?? <Blank />}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/*
          SECTION 3 — Content. Full-bleed darker band so the section reads as a
          deeper stratum, with the feed grid inside. Different ground, different
          composition.
        */}
        <section
          id="content"
          className="relative border-y border-turquoise/10 bg-abyss-deep/55 py-24 sm:py-32"
        >
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionTitle eyebrow="Content" title="Latest from the surface" />
              <p className="max-w-xs text-sm leading-relaxed text-text-secondary">
                Everything stays on its original platform. This is only the
                window.
              </p>
            </div>

            <div className="mt-12">
              <VideoFeed />
            </div>
          </div>
        </section>

        {/*
          SECTION 4 — Schedule. A list, not cards and not a grid of seven equal
          boxes. Empty days are visibly empty, which is the honest state.
        */}
        <section
          id="schedule"
          className="mx-auto max-w-2xl px-5 py-24 sm:px-8 sm:py-32"
        >
          <SectionTitle eyebrow="Schedule" title="The week" align="center" />

          <ul className="mt-12">
            {SCHEDULE.map((slot) => {
              const set = slot.kind !== null;
              return (
                <li
                  key={slot.day}
                  className={`grid grid-cols-[3.25rem_1fr_auto] items-baseline gap-x-4 border-b border-turquoise/10 py-4 ${
                    set ? "" : "opacity-55"
                  }`}
                >
                  <span className="font-display text-2xl text-turquoise">
                    {slot.day}
                  </span>
                  <span className="text-pearl">
                    {slot.kind ?? <Blank>[No stream set]</Blank>}
                  </span>
                  <span className="text-sm text-text-secondary [font-variant-numeric:tabular-nums]">
                    {slot.time ?? "—"}
                  </span>
                </li>
              );
            })}
          </ul>

          <p className="mt-8 text-center text-sm text-text-secondary">
            Times fill in once Lori confirms the week.
          </p>
        </section>

        <WaveDivider flip />

        {/*
          SECTION 5 — Links. Two columns of rows, no icons: R-04 says an icon
          must earn its place, and a generic platform glyph set would be exactly
          the library look the rule warns about. The name does the work.
        */}
        <section
          id="find-me"
          className="relative bg-abyss-deep/55 py-24 sm:py-32"
        >
          <div className="mx-auto max-w-5xl px-5 sm:px-8">
            <SectionTitle eyebrow="Elsewhere" title="Find me" align="center" />
            <p className="mx-auto mt-4 max-w-sm text-center text-sm leading-relaxed text-text-secondary">
              The reef is quiet until Lori opens it. These go live as each
              account is confirmed.
            </p>

            <ul className="mt-12 grid gap-px overflow-hidden rounded-lg border border-turquoise/12 bg-turquoise/10 sm:grid-cols-2">
              {SOCIALS.map((s) => {
                const inner = (
                  <>
                    <span className="font-display text-2xl text-pearl">
                      {s.label}
                    </span>
                    <span className="mt-1 block text-sm text-text-secondary">
                      {s.blurb}
                    </span>
                  </>
                );

                return (
                  <li key={s.key} className="bg-abyss">
                    {s.url ? (
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noreferrer"
                        className="block min-h-24 p-6 transition-colors hover:bg-ocean/40"
                      >
                        {inner}
                      </a>
                    ) : (
                      /* R-26: not a link, because there is nowhere to go yet. */
                      <div className="relative block min-h-24 p-6">
                        {inner}
                        <span className="absolute right-6 top-6 rounded-sm border border-dashed border-turquoise/30 px-2 py-1 text-[11px] uppercase tracking-[0.14em] text-text-secondary">
                          Coming soon
                        </span>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-turquoise/10 px-5 py-14 text-center sm:px-8">
        <p className="font-display text-3xl font-light italic text-pearl">
          Thank you for swimming by
        </p>
        <SoundBars className="mx-auto mt-5 h-4 w-28" />
        <p className="mt-6 text-xs text-text-secondary">
          © {year} {PROFILE.name}
        </p>
      </footer>
    </>
  );
}
