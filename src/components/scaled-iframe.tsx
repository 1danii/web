import { useEffect, useRef, type ComponentPropsWithoutRef } from "react";

type ScaledIframeProps = Omit<
  ComponentPropsWithoutRef<"iframe">,
  "height" | "style" | "width"
> & {
  renderWidth: number;
};

/** Renders a 16:9 iframe at a fixed pixel width and scales it to the width of its parent preview container. */
export function ScaledIframe({
  renderWidth,
  className = "",
  ...iframeProps
}: ScaledIframeProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const renderHeight = Math.round((renderWidth * 9) / 16);

  useEffect(() => {
    const iframe = iframeRef.current;
    const preview = iframe?.offsetParent as HTMLElement | null;

    if (!preview || !iframe) return;

    const scaleIframeToPreview = () => {
      const scale = preview.clientWidth / renderWidth;
      iframe.style.transform = `scale(${scale})`;
      iframe.style.visibility = "visible";
    };

    scaleIframeToPreview();

    const previewResizeObserver = new ResizeObserver(scaleIframeToPreview);
    previewResizeObserver.observe(preview);

    return () => previewResizeObserver.disconnect();
  }, [renderWidth]);

  return (
    <iframe
      {...iframeProps}
      ref={iframeRef}
      width={renderWidth}
      height={renderHeight}
      className={`absolute top-0 left-0 max-w-none origin-top-left border-0 ${className}`}
      style={{
        width: renderWidth,
        height: renderHeight,
        visibility: "hidden",
      }}
    />
  );
}
