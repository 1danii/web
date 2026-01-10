// https://x.com/Gur__vi/status/1998093167011532815

import { Accordion } from "@base-ui-components/react/accordion";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { type CSSProperties, type PropsWithChildren } from "react";

const items = [
  {
    title: "How do I get started?",
    content: "Eu elit nulla culpa et incididunt Lorem est laboris deserunt.",
  },
  {
    title: "Is support available?",
    content: "Ut duis cupidatat et est magna.",
  },
  {
    title: "Can I cancel anytime?",
    content: "Laborum dolor enim ullamco deserunt ea incididunt.",
  },

  {
    title: "Do you offer a free trial?",
    content:
      "Occaecat duis ullamco ad ut proident reprehenderit id elit et ea elit.",
  },
];

const springEasing =
  "linear(0 0%, 0.005927 1%, 0.022466 2%, 0.047872 3%, 0.080554 4%, 0.119068 5%, 0.162116 6%, 0.208536 7%, 0.2573 8%, 0.3075 9%, 0.358346 10%, 0.409157 11%, 0.45935 12%, 0.508438 13%, 0.556014 14%, 0.601751 15%, 0.645389 16%, 0.686733 17%, 0.72564 18%, 0.762019 19%, 0.795818 20%, 0.827026 21%, 0.855662 22%, 0.881772 23%, 0.905423 24%, 0.926704 25%, 0.945714 26%, 0.962568 27%, 0.977386 28%, 0.990295 29%, 1.001426 30%, 1.010911 31%, 1.018881 32%, 1.025465 33%, 1.030792 34%, 1.034982 35%, 1.038155 36%, 1.040423 37%, 1.041892 38%, 1.042662 39%, 1.042827 40%, 1.042473 41%, 1.04168 42%, 1.040522 43%, 1.039065 44%, 1.037371 45%, 1.035493 46%, 1.03348 47%, 1.031376 48%, 1.029217 49%, 1.027037 50%, 1.024864 51%, 1.022722 52%, 1.020631 53%, 1.018608 54%, 1.016667 55%, 1.014817 56%, 1.013067 57%, 1.011422 58%, 1.009887 59%, 1.008462 60%, 1.007148 61%, 1.005944 62%, 1.004847 63%, 1.003855 64%, 1.002964 65%, 1.002169 66%, 1.001466 67%, 1.000848 68%, 1.000311 69%, 0.999849 70%, 0.999457 71%, 0.999128 72%, 0.998858 73%, 0.99864 74%, 0.99847 75%, 0.998342 76%, 0.998253 77%, 0.998196 78%, 0.998169 79%, 0.998167 80%, 0.998186 81%, 0.998224 82%, 0.998276 83%, 0.998341 84%, 0.998415 85%, 0.998497 86%, 0.998584 87%, 0.998675 88%, 0.998768 89%, 0.998861 90%, 0.998954 91%, 0.999045 92%, 0.999134 93%, 0.99922 94%, 0.999303 95%, 0.999381 96%, 0.999455 97%, 0.999525 98%, 0.999589 99%, 0.99965 100%)";

export function Accordions() {
  return (
    <div className="flex size-full items-center justify-center">
      <Accordion.Root
        style={{ "--spring": springEasing } as CSSProperties}
        className="flex w-56 flex-col [&>:has(+[data-open])]:rounded-b-2xl [&>[data-open]+*]:rounded-t-2xl"
      >
        {items.map((item) => (
          <AccordionItem key={item.title} {...item} />
        ))}
      </Accordion.Root>
    </div>
  );
}

function AccordionItem(props: { title: string; content: string }) {
  return (
    <Accordion.Item className="text-foreground bg-white duration-550 ease-(--spring) first:rounded-t-2xl last:rounded-b-2xl data-open:rounded-2xl data-open:not-first:mt-2 data-open:not-last:mb-2">
      <Accordion.Header>
        <Accordion.Trigger className="group flex h-9 w-full items-center justify-between px-3 text-left text-sm font-medium text-(--dark)">
          {props.title}
          <ChevronDownIcon className="size-3 stroke-(--dark) stroke-1 transition-transform duration-200 ease-in-out group-data-panel-open:rotate-180" />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Panel className="h-(--accordion-panel-height) overflow-hidden text-sm text-neutral-500 transition-[height] duration-550 ease-(--spring) data-ending-style:h-0 data-starting-style:h-0">
        <div className="px-3 pb-2">{props.content}</div>
      </Accordion.Panel>
    </Accordion.Item>
  );
}
