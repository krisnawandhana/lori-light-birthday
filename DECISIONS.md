# Design decisions

One line per major choice, per R-31 of `antislop.md`. Direction comes from
`Design.md`; this file records how it was applied and where it was filtered.

## Design Read

Reading this as: VTuber hub page for Lori Light, for stream viewers and the
karaoke community, in an underwater-fantasy visual language built on a music
motif, dial **ENERGY 3 / RHYTHM 3 / MOTION 2**.

- ENERGY 3 because a VTuber persona is a performance; a calm dial would
  contradict the product.
- RHYTHM 3 because `Design.md` section 16 asks the ocean to be the experience,
  which only happens if sections change like depth changes.
- MOTION 2 because the direction asks for drift, bubbles and parallax, but not
  pinned scroll choreography.

## Identity motif

One curve that reads as both a water surface and an audio waveform. Lori sings
underwater, so the same shape serves the wave divider between sections, the
navbar hover underline, and the bar form beside "Mermaid" and in the footer.
Repeating one specific gesture is what stops this design from being portable to
any other product.

## Choices

| Decision | Reason |
|---|---|
| Palette: abyss / teal / turquoise + coral accent | Three cores plus one accent (R-29). Coral is the only warm colour, so it marks the one thing that is urgent: the live indicator. |
| Dark only, no toggle | The character lives in the deep ocean; a light mode would contradict the premise. Shipping no toggle beats shipping a broken one (R-21, R-34). |
| Display face: Cormorant Garamond | High-contrast serif with long curved terminals, carrying the operatic register of a singer; its thin-to-thick stroke echoes the waveform motif. Not the default AI serif pick. |
| Body face: Outfit | Geometric sans whose round counters read as bubbles next to the serif, and which stays legible at small sizes on a dark ground. Chosen over Inter/Geist deliberately. |
| Vertical background gradient | Encodes depth, which is the page's organising idea: surface light at the top falling to abyss at the footer. A gradient with a job, not decoration (R-01). |
| Glass only on the navbar | The navbar floats over content, so blur solves a real legibility problem. Cards use flat translucency instead, keeping blur to one element (R-10), against `Design.md` which asked for glass everywhere. Owner approved this filter. |
| Pill reserved for the primary CTA | Radius variation carries hierarchy; one pill on the page means "this is the thing to press" (R-11). `Design.md` asked for all buttons pill; owner approved the filter. |
| Glow on two elements only | The character's aura and the primary CTA, plus hover/focus as a state. Not a permanent decoration on every card (R-13). Owner approved the filter. |
| No platform icons in "Find me" | A generic icon set would be exactly the library look R-04 warns about; the platform names are already unambiguous. |
| Section rhythm varies | Hero asymmetric two-column, About a narrow text column with a definition list, Content a darker full-bleed band, Schedule a plain list, Find me a centred two-column grid. Required by the RHYTHM 3 claim (R-05). |
| Bubbles are deterministic | A hash of the index, rounded to two decimals: random values differ across server and client and tear hydration; rounding also absorbs the `Math.sin` precision gap between Node and V8. |
| Footer year computed once | Reading the clock on both sides lets a visitor in a rolled-over timezone disagree with the server. |

## Placeholders (R-23, R-38)

Only Lori's name, species, and the fact that she is music-led are confirmed.
Everything else is `null` in `app/lib/profile.ts` and renders as a visible
placeholder: `[Not set]`, `[No stream set]`, "Coming soon", `[Character art]`.
No statistics, testimonials, or subscriber counts appear anywhere, because none
are real yet.

Social links are not anchors while their URL is null, so nothing is a link to
nowhere (R-24, R-26).

## Not built yet

Lore, Community, and the per-platform pages from `structure.md` are absent from
both the page and the navbar, rather than present as dead links.
