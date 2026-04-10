import type { PropsWithChildren } from "react";

export function Tool({ children }: PropsWithChildren) {
  return (
    <div className="text-foreground border-border outline-border-transparent bg-background-elevated inline-flex items-center gap-x-1.5 rounded-full px-2 py-0.5 text-sm outline not-dark:shadow-xs [&_img]:size-3 [&_svg]:size-3">
      {children}
    </div>
  );
}
