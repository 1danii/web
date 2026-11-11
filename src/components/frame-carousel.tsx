import { BlossomCarousel } from "@blossom-carousel/react";
import "@blossom-carousel/react/style.css";

/**
 * Horizontally scrolling row of cards that breaks out of the page container to the viewport edges.
 * The vertical padding only gives the hover shadow room, so it ignores the pointer. Each slide pads
 * its card by half the gap, so the gaps between cards still drag but the area above and below doesn't.
 */
export function FrameCarousel({ count = 6 }: { count?: number }) {
  return (
    <BlossomCarousel className="pointer-events-none -my-10 ml-[calc(50%-50vw)] flex w-screen px-[calc(50vw-50%-0.375rem)] py-10 outline-none">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="pointer-events-auto shrink-0 px-1.5">
          <div className="bg-background-elevated outline-border-transparent aspect-video w-[min(calc(100vw-2rem),calc(var(--breakpoint-sm)-2rem))] overflow-clip rounded-md outline-[0.5px] transition-shadow duration-200 ease-out hover:shadow-[0_8px_32px_rgba(0,0,0,0.02)] motion-reduce:transition-none" />
        </div>
      ))}
    </BlossomCarousel>
  );
}
