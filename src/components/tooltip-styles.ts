/**
 * Shared look for tooltips: the dark bubble and its arrow. Used by the Base UI tooltip in
 * contact-link.tsx and by the static tooltip.astro, so both stay the same.
 */
export const tooltipPopup =
  "bg-foreground text-background rounded px-2 py-1 text-xs shadow-xs select-none";

export const tooltipArrow = "bg-foreground size-2 rotate-45";

/**
 * Show/hide motion: opacity and scale, 150ms on a strong ease-out. The hidden state is opacity 0 at
 * scale 0.97, grown from the arrow; each tooltip sets that state its own way.
 */
export const tooltipMotion =
  "transition-[opacity,scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]";
