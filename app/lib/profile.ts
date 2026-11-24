/*
  Every field Lori has not confirmed yet is null, and the UI renders null as a
  visible placeholder rather than inventing a value (R-38). Fill these in and
  the page picks them up with no layout change.
*/

export type Pending<T> = T | null;

export const PROFILE = {
  name: "Lori Light",
  species: "Mermaid",
  tagline: "Mermaid VTuber, singer, karaoke gremlin",
  // Confirmed with the owner: teal hair, music-led, known for karaoke.
  known: ["Karaoke", "Covers", "Original songs"] as const,
  birthday: null as Pending<string>,
  height: null as Pending<string>,
  home: null as Pending<string>,
  likes: null as Pending<string[]>,
  dislikes: null as Pending<string[]>,
  intro: null as Pending<string>,
} as const;

export type StreamStatus =
  | { state: "live"; title: string; url: string; startedAt: string }
  | { state: "offline"; nextStream: Pending<{ label: string; time: string }> };

/*
  Static for now. Section 15 of Design.md wants this pulled from the YouTube and
  Twitch APIs; that swap happens here, behind the same shape, once keys exist.
*/
export const STREAM: StreamStatus = {
  state: "offline",
  nextStream: null,
};

export type Social = {
  key: string;
  label: string;
  blurb: string;
  url: Pending<string>;
};

/*
  R-24 / R-26: a null url renders as a labelled "Coming soon" chip, not an
  anchor, so nothing here is a link that goes nowhere.
*/
export const SOCIALS: Social[] = [
  { key: "youtube", label: "YouTube", blurb: "Karaoke archives, covers, VODs", url: null },
  { key: "twitch", label: "Twitch", blurb: "Live singing and late-night chats", url: null },
  { key: "instagram", label: "Instagram", blurb: "Art, outfits, and stills", url: null },
  { key: "tiktok", label: "TikTok", blurb: "Song clips and short bits", url: null },
  { key: "x", label: "X", blurb: "Stream notices and small talk", url: null },
  { key: "discord", label: "Discord", blurb: "The reef, where the community lives", url: null },
];

export type Slot = {
  day: string;
  kind: Pending<string>;
  time: Pending<string>;
};

export const SCHEDULE: Slot[] = [
  { day: "Mon", kind: null, time: null },
  { day: "Tue", kind: null, time: null },
  { day: "Wed", kind: null, time: null },
  { day: "Thu", kind: null, time: null },
  { day: "Fri", kind: null, time: null },
  { day: "Sat", kind: null, time: null },
  { day: "Sun", kind: null, time: null },
];

export type VideoFeedState = "loading" | "ready" | "empty" | "error";

export type Video = {
  id: string;
  title: string;
  url: string;
  thumbnail: Pending<string>;
};
