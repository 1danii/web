import type { PropsWithChildren } from "react";

export function Tool({ children }: PropsWithChildren) {
  return (
    <div className="inline-flex items-center gap-x-1.5 rounded-full border border-muted px-2 py-0.5 text-sm text-foreground [&_img]:size-3 [&_svg]:size-3">
      {children}
    </div>
  );
}
