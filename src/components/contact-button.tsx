import { buttonVariants } from "@/components/button";
import { motion, type Variants } from "framer-motion";

const textVariants: Variants = {
  initial: {
    top: 0,
  },
  hover: {
    top: "-100%",
  },
};

export function ContactButton() {
  return (
    <motion.a
      href="mailto:danielpallares@email.cz"
      className={buttonVariants + " print:hidden"}
      initial="initial"
      whileHover="hover"
    >
      <motion.span
        variants={textVariants}
        className="relative flex h-[200%] w-full flex-col self-start *:flex *:h-1/2 *:items-center *:justify-center"
      >
        <span>contact</span>
        <span aria-hidden>→</span>
      </motion.span>
    </motion.a>
  );
}
