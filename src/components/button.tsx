import { type ComponentProps, forwardRef } from "react";

export const buttonVariants =
  "h-10 px-4 inline-flex items-center overflow-hidden relative rounded-lg bg-foreground text-background";

export const Button = forwardRef<HTMLButtonElement, ComponentProps<"button">>(
  ({ children, ...props }, ref) => {
    return (
      <button ref={ref} className={buttonVariants} {...props}>
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
