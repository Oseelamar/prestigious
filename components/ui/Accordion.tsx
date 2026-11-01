"use client";

import { useId, useState } from "react";
import { asset } from "@/lib/base-path";

type Item = { title: React.ReactNode; body: React.ReactNode };

/** Single-open accordion. Height animation lives in .acc-panel. */
export default function Accordion({
  items,
  initialOpen = -1,
  buttonClass = "",
  rowClass = "",
  dark = false,
}: {
  items: Item[];
  initialOpen?: number;
  buttonClass?: string;
  rowClass?: string;
  dark?: boolean;
}) {
  const [open, setOpen] = useState(initialOpen);
  const id = useId();
  return (
    <div>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className={rowClass}>
            <h3>
              <button
                type="button"
                id={`${id}-b${i}`}
                aria-expanded={isOpen}
                aria-controls={`${id}-p${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className={`flex w-full min-h-11 items-center justify-between gap-4 text-left ${buttonClass}`}
              >
                <span className="min-w-0 flex-1">{item.title}</span>
                <span
                  aria-hidden="true"
                  className="icon"
                  style={{ "--icon": `url(${asset(`/svg/icon-${isOpen ? "minus" : "plus"}.svg`)})` } as React.CSSProperties}
                />
              </button>
            </h3>
            <div id={`${id}-p${i}`} role="region" aria-labelledby={`${id}-b${i}`} className="acc-panel" data-open={isOpen} data-dark={dark}>
              <div>{item.body}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
