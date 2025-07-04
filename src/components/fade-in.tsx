import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";

export function FadeIn(props: PropsWithChildren<{ delay?: number }>) {
  return (
    <motion.div
      transition={{
        duration: 0.4,
        ease: "easeOut",
        delay: props.delay,
      }}
      initial={{ y: -4, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      {props.children}
    </motion.div>
  );
}
