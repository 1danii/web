import { DialRoot, useDialKit, type DialConfig } from "dialkit";
import { motion } from "motion/react";
import type { CSSProperties } from "react";

const bookDialConfig = {
  depth: [64, 12, 96, 1],
  transition: {
    type: "easing",
    duration: 0.3,
    ease: [0.4, 0, 0.2, 1],
  },
  scale: [1.1, 1, 1.5, 0.01],
  rotateY: [-22, -90, 0, 1],
  width: [256, 16, 368, 1],
} satisfies DialConfig;

export function BookWithDials() {
  const bookControls = useDialKit("Book", bookDialConfig);

  return (
    <>
      <div className="perspective-midrange">
        <motion.div
          className="@container-size flex aspect-2/3 w-(--book-width) items-center transform-3d"
          whileHover={{
            scale: bookControls.scale,
            rotateY: bookControls.rotateY,
            x: -8,
          }}
          transition={
            bookControls.transition.type === "easing"
              ? {
                  type: "tween",
                  duration: bookControls.transition.duration,
                  ease: bookControls.transition.ease,
                }
              : bookControls.transition
          }
          style={
            {
              "--book-width": `${bookControls.width}px`,
              "--book-depth": `20cqw`,
              "--book-page-inset": "1.5cqw",
            } as CSSProperties
          }
        >
          <div className="h-[100cqh] w-[100cqw] rounded-xs bg-[#FC4720] px-[8cqw] pt-[7cqh] pb-[10cqh] [box-shadow:#ffffff40_0px_0px_1px_1px_inset]">
            <div className="absolute inset-y-0 left-0 w-[3.5cqw] bg-linear-[to_right,#fff0_40%,#ffffff40_50%,#9A0F01_70%,#fff0]" />
            <div className="relative grid size-full grid-cols-[1fr_2cqw_1fr_2cqw_1fr_2cqw_1fr] grid-rows-[repeat(7,minmax(0,1fr)_2cqw)_minmax(0,1fr)] gap-px bg-white/30 p-px">
              {Array.from({ length: 7 * 15 }, (_, i) => (
                <div key={i} className="bg-[#FC4720]" />
              ))}
              <div className="absolute inset-0 grid size-full grid-cols-[1fr_2cqw_1fr_2cqw_1fr_2cqw_1fr] grid-rows-[repeat(7,minmax(0,1fr)_2cqw)_minmax(0,1fr)] gap-px p-px">
                <h1 className="col-span-full row-start-5 indent-[-0.055em] text-[11.7cqw] leading-[0.65] font-bold">
                  Grid systems
                </h1>
                <h1 className="col-span-full row-start-9 indent-[-0.055em] text-[11.7cqw] leading-[0.65] font-bold whitespace-nowrap">
                  Raster systeme
                </h1>
              </div>
            </div>
          </div>
          <div className="absolute top-(--book-page-inset) aspect-2/3 h-[calc(100%-var(--book-page-inset)*2)] w-[calc(var(--book-depth)-2px)] transform-[translateX(calc(var(--book-width)-var(--book-depth)/2-var(--book-page-inset)))_rotateY(90deg)_translateX(calc(var(--book-depth)/2))] bg-white" />
          <div className="absolute left-0 size-full -translate-z-(--book-depth) rounded-xs bg-[#FC4720]" />
        </motion.div>
      </div>
      <DialRoot position="top-right" defaultOpen={false} productionEnabled />
    </>
  );
}
