import { createDialKit, createDialRoot, type TransitionConfig } from "dialkit/vanilla";
import "dialkit/vanilla/styles.css";

/** Design px of the 512px frame → cqw of the folder's .stage container. */
const cqw = (px: number) => `${(px / 5.12).toFixed(3)}cqw`;

type Slider = [number, number, number, number];

const card = (x: number, y: number, rotate: number, delay: number) => ({
  x: [x, -200, 200, 1] as Slider,
  y: [y, -300, 100, 1] as Slider,
  rotate: [rotate, -45, 45, 1] as Slider,
  delay: [delay, 0, 400, 5] as Slider,
});

const kit = createDialKit("Folder", {
  holdOpen: false,
  showHitboxes: false,
  inline: {
    folderSize: [20, 8, 64, 1] as Slider,
    iconsSize: [36, 8, 64, 1] as Slider,
    gap: [6, 0, 24, 1] as Slider,
    cardSize: [32, 4, 64, 1] as Slider,
    lift: [1.6, 1, 3, 0.05] as Slider,
  },
  front: {
    tilt: [-24, -89, 0, 1],
    perspective: [1400, 300, 4000, 10],
    transition: { type: "easing", duration: 0.4, ease: [0.215, 0.61, 0.355, 1] },
  },
  cards: {
    transition: { type: "spring", stiffness: 151, damping: 19, mass: 1.2 },
    // Inline icons only: the cards growing to cardSize. Starts as the movement spring.
    scaleTransition: { type: "spring", stiffness: 151, damping: 19, mass: 1.2 },
    left: card(-26, -96, -9, 70),
    center: card(0, -132, 2, 30),
    right: card(26, -108, 9, 110),
  },
  close: {
    // Cards going back in (move and shrink together). Their order and gaps mirror the opening delays.
    transition: { type: "easing", duration: 0.4, ease: [0.215, 0.61, 0.355, 1] },
    // Front panel shutting (same as before the split: 60ms after the cards start, 400ms ease-out).
    flapDelay: [60, 0, 400, 5] as Slider,
    flapTransition: { type: "easing", duration: 0.4, ease: [0.215, 0.61, 0.355, 1] },
  },
});

createDialRoot({ position: "top-right", defaultOpen: false });

kit.subscribe((v) => {
  const root = document.documentElement.style;
  const set = (name: string, value: string) => root.setProperty(`--${name}`, value);

  document.querySelectorAll(".folder").forEach((el) => el.classList.toggle("is-open", v.holdOpen));
  document.documentElement.classList.toggle("show-hitboxes", v.showHitboxes);

  set("inline-folder-size", `${v.inline.folderSize}px`);
  set("inline-icons-size", `${v.inline.iconsSize}px`);
  set("inline-gap", `${v.inline.gap}px`);
  // A card is 33.2% of the stage width.
  set("inline-folder-card-scale", `${v.inline.cardSize / (v.inline.folderSize * 0.332)}`);
  set("inline-icons-card-scale", `${v.inline.cardSize / (v.inline.iconsSize * 0.332)}`);
  set("inline-lift", `${v.inline.lift}`);

  set("front-tilt", `${v.front.tilt}deg`);
  set("front-perspective", cqw(v.front.perspective));
  const front = toCss(v.front.transition);
  set("front-duration", front.duration);
  set("front-ease", front.ease);

  const cards = toCss(v.cards.transition);
  set("cards-duration", cards.duration);
  set("cards-ease", cards.ease);
  const cardsScale = toCss(v.cards.scaleTransition);
  set("cards-scale-duration", cardsScale.duration);
  set("cards-scale-ease", cardsScale.ease);
  set("close-flap-delay", `${v.close.flapDelay}ms`);
  const closeFlap = toCss(v.close.flapTransition);
  set("close-flap-duration", closeFlap.duration);
  set("close-flap-ease", closeFlap.ease);
  const close = toCss(v.close.transition);
  set("close-duration", close.duration);
  set("close-ease", close.ease);
  // Closing reverses the opening stagger: the last card out is the first back in, same gaps.
  const lastOut = Math.max(...(["left", "center", "right"] as const).map((n) => v.cards[n].delay));

  for (const name of ["left", "center", "right"] as const) {
    const c = v.cards[name];
    set(`${name}-x`, cqw(c.x));
    set(`${name}-y`, cqw(c.y));
    set(`${name}-r`, `${c.rotate}deg`);
    set(`${name}-delay`, `${c.delay}ms`);
    set(`${name}-close-delay`, `${lastOut - c.delay}ms`);
  }
});

/** DialKit transition → CSS duration + timing function. Springs are sampled into linear(). */
function toCss(t: TransitionConfig): { duration: string; ease: string } {
  if (t.type === "easing") {
    return { duration: `${t.duration * 1000}ms`, ease: `cubic-bezier(${t.ease.join(", ")})` };
  }

  let stiffness = t.stiffness ?? 100;
  let damping = t.damping ?? 10;
  const mass = t.mass ?? 1;
  // Same mapping motion uses for visualDuration + bounce.
  if (t.visualDuration !== undefined) {
    const root = (2 * Math.PI) / (t.visualDuration * 1.2);
    stiffness = root * root;
    damping = 2 * Math.min(Math.max(1 - (t.bounce ?? 0.25), 0.05), 1) * Math.sqrt(stiffness);
  }

  // Integrate from 0 → 1 until it settles.
  const dt = 1 / 120;
  let x = 0;
  let vel = 0;
  const samples = [0];
  for (let i = 0; i < 120 * 4; i++) {
    const acc = (-stiffness * (x - 1) - damping * vel) / mass;
    vel += acc * dt;
    x += vel * dt;
    samples.push(x);
    if (Math.abs(x - 1) < 0.001 && Math.abs(vel) < 0.01) break;
  }
  samples[samples.length - 1] = 1;

  const step = Math.max(1, Math.floor(samples.length / 60));
  const points = samples.filter((_, i) => i % step === 0 || i === samples.length - 1);
  return {
    duration: `${Math.round(samples.length * dt * 1000)}ms`,
    ease: `linear(${points.map((p) => +p.toFixed(4)).join(", ")})`,
  };
}
