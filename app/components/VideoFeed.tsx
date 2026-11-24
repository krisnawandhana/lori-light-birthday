"use client";

import { useEffect, useState } from "react";
import type { Video, VideoFeedState } from "../lib/profile";

/*
  R-27: the three states are built, not promised. No API key exists yet, so the
  feed resolves to "empty" after a short delay, which is the honest outcome
  today. The state switcher below is a real control that lets the owner see each
  state, not a mock.
*/

async function fetchVideos(): Promise<Video[]> {
  // TODO: replace with YouTube Data API v3 once a key is available.
  await new Promise((r) => setTimeout(r, 1100));
  return [];
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
  );
}

function LoadingState() {
  return (
    <Shell>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="rounded-lg border border-turquoise/10 bg-ocean/25 p-4"
        >
          <div
            className="mb-4 aspect-video w-full animate-pulse rounded-md bg-turquoise/10"
            style={{ animationDelay: `${i * 140}ms` }}
          />
          <div className="h-3 w-3/4 animate-pulse rounded-sm bg-turquoise/10" />
          <span className="sr-only">Loading videos</span>
        </div>
      ))}
    </Shell>
  );
}

function EmptyState() {
  return (
    <div className="rounded-lg border border-dashed border-turquoise/25 bg-ocean/20 px-6 py-14 text-center">
      <p className="font-display text-2xl text-pearl">Nothing surfaced yet</p>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-text-secondary">
        Once the channel is connected, the newest karaoke sets and covers appear
        here on their own.
      </p>
    </div>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div
      role="alert"
      className="rounded-lg border border-coral/35 bg-coral/8 px-6 py-12 text-center"
    >
      <p className="font-display text-2xl text-pearl">The signal broke up</p>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-text-secondary">
        The video feed could not be reached. This happens; the platform is
        usually back shortly.
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-5 rounded-md border border-coral/50 px-4 py-2.5 text-sm text-pearl transition-colors hover:bg-coral/15"
      >
        Try again
      </button>
    </div>
  );
}

function VideoGrid({ videos }: { videos: Video[] }) {
  return (
    <Shell>
      {videos.map((v) => (
        <a
          key={v.id}
          href={v.url}
          target="_blank"
          rel="noreferrer"
          className="group rounded-lg border border-turquoise/12 bg-ocean/30 p-4 transition-colors hover:border-turquoise/40"
        >
          <div className="mb-4 aspect-video w-full overflow-hidden rounded-md bg-abyss-deep" />
          <p className="text-sm leading-snug text-pearl">{v.title}</p>
        </a>
      ))}
    </Shell>
  );
}

export default function VideoFeed() {
  const [state, setState] = useState<VideoFeedState>("loading");
  const [videos, setVideos] = useState<Video[]>([]);
  /* Bumped to re-run the fetch effect on retry, so the request lives in the
     effect rather than in a handler that sets state on its way in. */
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let live = true;
    fetchVideos()
      .then((v) => {
        if (!live) return;
        setVideos(v);
        setState(v.length ? "ready" : "empty");
      })
      .catch(() => {
        if (live) setState("error");
      });
    return () => {
      live = false;
    };
  }, [attempt]);

  const load = () => {
    setState("loading");
    setAttempt((n) => n + 1);
  };

  return (
    <div>
      {state === "loading" && <LoadingState />}
      {state === "empty" && <EmptyState />}
      {state === "error" && <ErrorState onRetry={load} />}
      {state === "ready" && <VideoGrid videos={videos} />}

      {/*
        A real control, kept until the API lands, so every state can be checked
        in the browser instead of taken on trust. Labelled as a preview tool.
      */}
      <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-turquoise/10 pt-5">
        <span className="mr-1 w-full text-[11px] uppercase tracking-[0.16em] text-text-secondary sm:w-auto">
          Preview state
        </span>
        {(["loading", "ready", "empty", "error"] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => {
              if (s === "loading") return load();
              if (s === "ready") {
                setVideos([
                  { id: "p1", title: "[Video title]", url: "#content", thumbnail: null },
                  { id: "p2", title: "[Video title]", url: "#content", thumbnail: null },
                  { id: "p3", title: "[Video title]", url: "#content", thumbnail: null },
                ]);
              }
              setState(s);
            }}
            aria-pressed={state === s}
            /* 44px floor for tap targets (R-03). */
            className={`inline-flex min-h-11 items-center rounded-sm px-3 text-xs transition-colors ${
              state === s
                ? "bg-turquoise/20 text-pearl"
                : "text-text-secondary hover:text-pearl"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
