import { BlossomCarousel } from "@blossom-carousel/react";
import "@blossom-carousel/react/style.css";

/** Horizontally scrolling row of cards that breaks out of the page container to the viewport edges. */
export function FrameCarousel({ count = 6 }: { count?: number }) {
  return (
    <BlossomCarousel className="-my-10 ml-[calc(50%-50vw)] flex w-screen gap-3 px-[calc(50vw-50%)] py-10">
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className="bg-background-elevated outline-border-transparent aspect-video w-[min(calc(100vw-2rem),calc(var(--breakpoint-sm)-2rem))] shrink-0 overflow-clip rounded-md outline-[0.5px] transition-shadow duration-200 ease-out hover:shadow-[0_8px_32px_rgba(0,0,0,0.02)] motion-reduce:transition-none"
        />
      ))}
    </BlossomCarousel>
  );
}
