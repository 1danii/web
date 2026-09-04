import { motion } from "motion/react";

type FadeInTextProps = {
  text: string;
};

/** Animates each word in a plain text string with a staggered fade-in effect. */
export function FadeInText({ text }: FadeInTextProps) {
  return [
    ...new Intl.Segmenter(undefined, { granularity: "word" }).segment(text),
  ].map((segment, segmentIndex) => (
    <motion.span
      className="inline-block whitespace-pre-wrap will-change-transform"
      transition={{
        delay: segmentIndex * 0.03,
        duration: 0.5,
        ease: "easeOut",
      }}
      initial={{ filter: "blur(8px)", opacity: 0, y: "20%" }}
      animate={{ filter: "blur(0px)", opacity: 1, y: "0%" }}
      key={segment.index}
    >
      {segment.segment}
    </motion.span>
  ));
}
