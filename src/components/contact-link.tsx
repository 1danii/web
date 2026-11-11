import { Tooltip } from "@base-ui/react/tooltip";
import { useEffect, useState } from "react";

const EMAIL = "danielpallares@email.cz";

/**
 * Footer `@ contact` mailto link. Clicking also copies the address to the clipboard and shows a
 * "Copied!" tooltip above it; hovering alone shows nothing.
 */
export function ContactLink() {
  // Time of the last copy; a new click restarts the countdown.
  const [copiedAt, setCopiedAt] = useState<number | null>(null);

  useEffect(() => {
    if (copiedAt === null) return;
    const timeout = setTimeout(() => setCopiedAt(null), 2000);
    return () => clearTimeout(timeout);
  }, [copiedAt]);

  return (
    // Fully controlled: hover, pointer leave and Escape are ignored, only the timer closes it.
    <Tooltip.Root open={copiedAt !== null}>
      <Tooltip.Trigger
        closeOnClick={false}
        onClick={() => {
          // The mailto link still opens; copying is a fallback for people without a mail client.
          navigator.clipboard?.writeText(EMAIL).then(
            () => setCopiedAt(Date.now()),
            () => {},
          );
        }}
        render={
          <a
            href={`mailto:${EMAIL}`}
            className="hover:text-foreground inline-flex items-center gap-1 transition-colors duration-200 ease-[ease]"
          />
        }
      >
        {/* The 16px `@` sets the link's height (and hit area) to match the footer icons. */}
        <span
          aria-hidden="true"
          className="-translate-y-px text-[16px] leading-none"
        >
          @
        </span>
        {/* Trimmed to the x-height so the lowercase word centres optically with the icons. */}
        <span className="[text-box:trim-both_ex_alphabetic]">contact</span>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Positioner
          sideOffset={4}
          collisionAvoidance={{ side: "none", align: "none" }}
        >
          <Tooltip.Popup className="bg-foreground text-background rounded px-2 py-1 text-xs shadow-xs transition-opacity duration-200 ease-out select-none data-ending-style:opacity-0 data-starting-style:opacity-0">
            Copied!
            <Tooltip.Arrow className="bg-foreground -bottom-0.5 size-2 rotate-45" />
          </Tooltip.Popup>
        </Tooltip.Positioner>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}
