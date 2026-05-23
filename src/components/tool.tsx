import type { PropsWithChildren } from "react";

export function Tool({ children }: PropsWithChildren) {
  return (
    <div className="text-foreground bg-background-elevated border-border-transparent inline-flex items-center gap-x-1.5 rounded-full border bg-clip-padding px-2 py-0.5 text-sm not-dark:shadow-xs [&_img]:size-3 [&_svg]:size-3">
      {children}
    </div>
  );
}
