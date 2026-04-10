import type { PropsWithChildren } from "react";

export function Tool({ children }: PropsWithChildren) {
  return (
    <div className="text-foreground border-border dark:bg-graydark-2 inline-flex items-center gap-x-1.5 rounded-full border bg-white px-2 py-0.5 text-sm shadow-xs [&_img]:size-3 [&_svg]:size-3">
      {children}
    </div>
  );
}
