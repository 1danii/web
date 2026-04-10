import { motion } from "motion/react";
import { type PropsWithChildren } from "react";

export function FadeIn(props: PropsWithChildren<{ delay?: number }>) {
  return (
    <motion.span
      className="inline-block will-change-transform"
      transition={{
        duration: 0.6,
        ease: "easeOut",
        delay: props.delay,
      }}
      initial={{ y: "20%", opacity: 0, filter: "blur(8px)" }}
      animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
    >
      {props.children}
    </motion.span>
  );
}

export function FadeInText(props: PropsWithChildren<{ delay?: number }>) {
  // @ts-expect-error astro child props idk
  return [...new Intl.Segmenter().segment(props.children.props.value)].map(
    (segment) => (
      <motion.span
        className="inline-block whitespace-pre"
        transition={{
          duration: 0.5,
          ease: "easeOut",
          delay: (props.delay ?? 0) + segment.index * 0.03,
        }}
        initial={{ y: "4px", opacity: 0, filter: "blur(4px)" }}
        animate={{ y: "0px", opacity: 1, filter: "blur(0px)" }}
        key={segment.index}
      >
        {segment.segment}
      </motion.span>
    ),
  );
}
