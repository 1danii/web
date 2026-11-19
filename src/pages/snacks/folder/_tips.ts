/*
 * Tooltip timing, like Base UI's Tooltip.Provider (same as src/components/tool-fan.astro, copied so
 * the snack stays self-contained):
 * - data-settled on the folder once every card's opening transition has finished, cleared on close.
 * - data-instant on a card entered within 400ms of leaving another card's shown tooltip, so moving
 *   along the fan swaps tooltips without fading each one in again.
 * Open means hovered or held open by DialKit (.is-open).
 */
const INSTANT_TIMEOUT = 400;

for (const folder of document.querySelectorAll<HTMLElement>(".folder")) {
  const cards = [...folder.querySelectorAll<HTMLElement>(".card")];
  let opening = 0;
  let lastTipClosed = -Infinity;

  const open = () => {
    const run = ++opening;
    // Next frame, so the opening transitions have started. With reduced motion there are none.
    requestAnimationFrame(() => {
      const transitions = cards.flatMap((card) => card.getAnimations());
      Promise.all(transitions.map((t) => t.finished)).then(
        () => {
          if (run === opening) folder.dataset.settled = "";
        },
        () => {}, // Interrupted by closing; the next open starts over.
      );
    });
  };

  const close = () => {
    opening++;
    lastTipClosed = -Infinity;
    delete folder.dataset.settled;
  };

  folder.addEventListener("pointerenter", () => {
    if (!folder.classList.contains("is-open")) open();
  });
  folder.addEventListener("pointerleave", () => {
    if (!folder.classList.contains("is-open")) close();
  });

  // DialKit's "hold open" toggles .is-open.
  let held = folder.classList.contains("is-open");
  new MutationObserver(() => {
    const now = folder.classList.contains("is-open");
    if (now === held) return;
    held = now;
    if (folder.matches(":hover")) return;
    if (now) open();
    else close();
  }).observe(folder, { attributes: true, attributeFilter: ["class"] });
  if (held) open();

  for (const card of cards) {
    card.addEventListener("pointerenter", () => {
      card.toggleAttribute("data-instant", performance.now() - lastTipClosed < INSTANT_TIMEOUT);
    });
    card.addEventListener("pointerleave", () => {
      // Removed now, so this tooltip still fades out normally.
      card.removeAttribute("data-instant");
      if ("settled" in folder.dataset) lastTipClosed = performance.now();
    });
  }
}
