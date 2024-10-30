import { motion, type Variants } from "framer-motion";
import { buttonVariants } from "./Button";

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
      className={buttonVariants}
      initial="initial"
      whileHover="hover"
    >
      <motion.span
        variants={textVariants}
        className="w-full flex flex-col *:h-1/2 *:flex *:items-center *:justify-center relative h-[200%] self-start"
      >
        <span>contact</span>
        <span>→</span>
      </motion.span>
    </motion.a>
  );
}
