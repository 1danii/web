import { Popover } from "@base-ui/react/popover";
import { Slider } from "@base-ui/react/slider";
import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";

export function ModelSwitch() {
  const [popoverContainer, setPopoverContainer] =
    useState<HTMLDivElement | null>(null);
  const [popoverOpen, setPopoverOpen] = useState(false);

  return (
    <div
      ref={setPopoverContainer}
      className="absolute right-[calc(50%-var(--popover-width)/2)]"
      style={{ "--popover-width": "224px" } as CSSProperties}
    >
      <Popover.Root open={popoverOpen} onOpenChange={setPopoverOpen}>
        <Popover.Trigger className="flex h-7 w-auto items-center justify-between rounded-full px-2 text-xs text-black transition-[width] duration-150 ease-in-out [interpolate-size:allow-keywords] hover:bg-gray-100 data-popup-open:w-(--popover-width) data-popup-open:bg-gray-100">
          <div />
          <div>
            5.6 Sol<span className="text-gray-500">&nbsp;Medium</span>
          </div>
          <svg
            className="ml-1 size-3 text-gray-500"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </Popover.Trigger>
        <Popover.Portal container={popoverContainer} keepMounted>
          <Popover.Positioner
            collisionAvoidance={{
              side: "none",
              align: "none",
              fallbackAxisSide: "none",
            }}
            align="end"
            side="top"
            sideOffset={8}
          >
            <ModelSwitchPopover open={popoverOpen} />
          </Popover.Positioner>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}

export function ModelSwitchPopover({ open }: { open: boolean }) {
  const [mode, setMode] = useState<"simple" | "advanced">("simple");
  const [sliderValue, setSliderValue] = useState(3);

  const rootRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);
  const switchRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const [simpleHeight, setSimpleHeight] = useState<number | null>(null);
  const [advancedHeight, setAdvancedHeight] = useState<number | null>(null);
  const [offsetHeight, setOffsetHeight] = useState<number | null>(null);
  const ready = simpleHeight && advancedHeight && offsetHeight;

  useLayoutEffect(() => {
    if (!open) {
      return undefined;
    }

    const measurementFrame = requestAnimationFrame(() => {
      if (modelRef.current && switchRef.current && sliderRef.current) {
        const modelHeight = modelRef.current.offsetHeight;
        const switchHeight = switchRef.current.offsetHeight;
        const sliderHeight = sliderRef.current.offsetHeight;

        setSimpleHeight(sliderHeight + switchHeight);
        setAdvancedHeight(modelHeight + switchHeight);
        setOffsetHeight(sliderHeight);
      }
    });

    return () => cancelAnimationFrame(measurementFrame);
  }, [open]);

  return (
    <Popover.Popup
      data-ready={ready ? true : undefined}
      data-mode={mode}
      style={
        {
          "--simple-height": `${simpleHeight}px`,
          "--advanced-height": `${advancedHeight}px`,
          "--offset-height": `${offsetHeight}px`,
        } as CSSProperties
      }
      className="group relative w-(--popover-width) origin-bottom-right overflow-hidden rounded-2xl bg-white p-1 font-light text-black shadow-md/6 outline-[0.5px] outline-gray-300 transition-[height,opacity,scale] duration-[250ms,150ms,150ms] ease-[cubic-bezier(0.19,1,0.22,1),ease-out,ease-out] not-data-ready:invisible data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:scale-[0.98] data-starting-style:opacity-0 data-[mode=advanced]:h-[calc(var(--advanced-height)+_--spacing(2))] data-[mode=simple]:h-[calc(var(--simple-height)+_--spacing(2))]"
    >
      <div
        ref={rootRef}
        className="absolute inset-x-1 bottom-1 flex flex-col transition-transform duration-250 ease-[cubic-bezier(0.19,1,0.22,1)] group-data-[mode=advanced]:translate-y-(--offset-height)"
      >
        <div
          ref={modelRef}
          inert={mode === "simple"}
          aria-hidden={mode === "simple"}
        >
          <button className="flex h-7 w-full items-center justify-between rounded-xl px-3 text-xs outline-0 hover:bg-gray-100 focus:bg-gray-100">
            Model
            <span className="text-gray-500">GPT-5.6</span>
          </button>
          <button className="flex h-7 w-full items-center justify-between rounded-xl px-3 text-xs outline-0 hover:bg-gray-100 focus:bg-gray-100">
            Effort
            <span className="text-gray-500">Medium</span>
          </button>
          <button className="flex h-7 w-full items-center justify-between rounded-xl px-3 text-xs outline-0 hover:bg-gray-100 focus:bg-gray-100">
            Speed
            <span className="text-gray-500">Standard</span>
          </button>
          <div className="mx-2 mb-1 border-b-[0.5px] border-gray-200 pb-0.5 group-data-[mode=simple]:border-transparent" />
        </div>
        <div className="px-2 py-1" ref={switchRef}>
          <button
            onClick={() => {
              setMode((v) => (v === "simple" ? "advanced" : "simple"));
            }}
            className="flex h-5 items-center justify-between rounded-lg px-1 text-[0.625rem] leading-none text-gray-500 outline-0 hover:bg-gray-100 focus:bg-gray-100"
          >
            Advanced
            <svg
              className="ml-1 size-3 transition-transform duration-250 ease-in-out group-data-[mode=advanced]:-rotate-90"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>

        <div
          className="px-2 pt-1 pb-2"
          ref={sliderRef}
          inert={mode === "advanced"}
          aria-hidden={mode === "advanced"}
        >
          <Slider.Root
            min={0}
            max={4}
            value={sliderValue}
            onValueChange={setSliderValue}
            className="h-6 opacity-100 transition-opacity duration-150 ease-out group-data-[mode=advanced]:opacity-0"
          >
            <Slider.Control className="flex size-full touch-none items-center select-none">
              <div className="relative size-full rounded-full bg-gray-200 outline-[0.5px] outline-gray-300">
                <div className="absolute inset-0 overflow-hidden rounded-full">
                  <div className="absolute inset-y-0 right-3 left-3 h-full">
                    <Slider.Indicator className="absolute right-3 left-3 box-content -translate-x-3 bg-blue-500 pl-3 transition-[width] duration-250 ease-in-out select-none" />
                  </div>
                </div>
                <div
                  style={
                    {
                      "--mask-length": `${((4 - sliderValue) / 4) * 100}%`,
                    } as CSSProperties
                  }
                  className="absolute inset-0 mx-2.5 flex items-center justify-between mask-l-from-(--mask-length) mask-l-to-(--mask-length) transition-[--mask-length] duration-250 ease-in-out"
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="size-1 rounded-full bg-gray-400" />
                  ))}
                </div>

                <div className="absolute inset-0 mx-2.5 flex items-center justify-between">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="size-1 rounded-full bg-white/50" />
                  ))}
                </div>

                <Slider.Track className="absolute! inset-x-3 inset-y-0 h-full select-none">
                  <Slider.Thumb className="aspect-square h-full scale-120 rounded-full border-[0.5px] border-gray-200 bg-white transition-[scale,inset-inline-start] duration-250 ease-in-out select-none hover:scale-140 data-dragging:scale-140 data-focused:scale-140" />
                </Slider.Track>
              </div>
            </Slider.Control>
          </Slider.Root>
        </div>
      </div>
    </Popover.Popup>
  );
}
