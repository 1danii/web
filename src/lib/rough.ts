/** Shared helpers for hand-drawn (rough.js) decorations that draw themselves on screen. */

export const reduceMotion = matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

/** Resolves CSS custom properties, which SVG stroke attributes can't. */
export function resolveColor(el: HTMLElement, color: string) {
  el.style.setProperty("--rough-color", color);
  const resolved = getComputedStyle(el).getPropertyValue("--rough-color");
  el.style.removeProperty("--rough-color");
  return resolved.trim() || color;
}

/** Waits for entrance animations on ancestors so the drawing doesn't land mid-transform. */
export function ancestorAnimationsDone(el: HTMLElement) {
  return Promise.all(
    document
      .getAnimations()
      .filter((animation) => {
        const target = (animation.effect as KeyframeEffect | null)?.target;
        return target instanceof Element && target.contains(el);
      })
      .map((animation) => animation.finished.catch(() => {})),
  );
}

/**
 * Calls `draw` once per element when it is fully on screen, after ancestor entrance animations
 * and an optional `delay` (ms) have passed.
 */
export function drawWhenVisible(
  elements: Iterable<HTMLElement>,
  draw: (el: HTMLElement) => void,
  getDelay: (el: HTMLElement) => number = () => 0,
) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        const el = entry.target as HTMLElement;
        void (async () => {
          await ancestorAnimationsDone(el);
          const delay = getDelay(el);
          if (delay && !reduceMotion)
            await new Promise((r) => setTimeout(r, delay));
          draw(el);
        })();
      }
    },
    { threshold: 1 },
  );
  for (const el of elements) observer.observe(el);
}
