import type { PropsWithChildren } from "react";

export function Tool({ children }: PropsWithChildren) {
  return (
    <div className="border-muted text-foreground inline-flex items-center gap-x-1.5 rounded-full border px-2 py-0.5 text-sm [&_img]:size-3 [&_svg]:size-3">
      {children}
    </div>
  );
}
