import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";

export function FadeIn(props: PropsWithChildren<{ delay?: number }>) {
  return (
    <motion.div
      transition={{
        duration: 0.6,
        ease: "easeOut",
        delay: props.delay,
      }}
      initial={{ y: 8, opacity: 0, filter: "blur(6px)" }}
      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
    >
      {props.children}
    </motion.div>
  );
}
