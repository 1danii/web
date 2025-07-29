import { AnimatePresence, motion } from "framer-motion";
import { useState, type ComponentProps } from "react";

export function Button({
  children,
  className,
  ...props
}: ComponentProps<"button">) {
  return (
    <button
      className="relative flex h-10 items-center justify-center rounded-full bg-gray-100 px-4 text-center text-sm text-black transition-[background-color] duration-100 not-disabled:hover:bg-gray-200 disabled:cursor-not-allowed [&_svg]:size-6"
      {...props}
    >
      {children}
    </button>
  );
}

const MotionButton = motion.create(Button);

export function LoadingButton({
  children,
  ...props
}: ComponentProps<typeof MotionButton> & {}) {
  const [isLoaderAnimating, setIsLoaderAnimating] = useState(false);

  function handleClick() {
    setIsLoaderAnimating(true);
    setTimeout(() => {
      setIsLoaderAnimating(false);
    }, 1500);
  }

  return (
    <MotionButton
      onClick={handleClick}
      disabled={isLoaderAnimating}
      style={{
        borderRadius: "9999px",
      }}
      layout="position"
      {...props}
    >
      <motion.span layout>{children}</motion.span>

      <motion.div
        animate={isLoaderAnimating ? "visible" : "hidden"}
        variants={{
          visible: {
            width: "1rem",
            marginLeft: "0.5rem",
          },
          hidden: {
            width: 0,
            marginLeft: 0,
            transition: {
              delay: 0.1,
            },
          },
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <AnimatePresence>
          {isLoaderAnimating && (
            <motion.svg
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { delay: 0.3, ease: "easeInOut" },
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              className="size-4! animate-spin"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/10000/svg"
            >
              <path
                className="fill-gray-200"
                d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
              />
              <path
                className="fill-black"
                d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
              ></path>
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.div>
    </MotionButton>
  );
}
