import { asset } from "@/lib/base-path";
import Image from "next/image";
import { ArrowLink, Em } from "@/components/ui/bits";
import { cities, field } from "@/lib/copy";

const S = "SERVICE AREA";

// Dot heights in the 900x760 map SVG. Labels start at x in the ocean, clear of the coastline, except Wellington, which runs left of its dot. nudge: px, keeps tight labels apart.
const pins: Record<string, { x: number; y: number; side?: "left"; nudge?: number }> = {
  "West Palm Beach": { x: 588, y: 213.5 },
  Wellington: { x: 446.7, y: 252.7, side: "left" },
  "Lake Worth": { x: 588, y: 282.1, nudge: -4 },
  Lantana: { x: 588, y: 303.8, nudge: 3 },
  "Boynton Beach": { x: 588, y: 346.5 },
  "Delray Beach": { x: 588, y: 391.3 },
  "Boca Raton": { x: 570, y: 456.4 },
  "Fort Lauderdale": { x: 550, y: 628.6 },
};

export default function ServiceArea() {
  return (
    <section data-reveal className="sec bg-sage">
      <div className="wrap grid12 items-center gap-y-10">
        <div className="col-span-4 md:col-span-5">
          <h2 className="t-h2">
            <Em text={field(S, "Headline")} word="Palm Beach" />
          </h2>
          <p className="t-body-lg mt-6">{field(S, "Body")}</p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {cities.map((city) => (
              <li key={city} className="t-small border border-text/40 px-3 py-1.5">
                {city}
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <ArrowLink href="#proposal">{field(S, "Link")}</ArrowLink>
          </div>
        </div>
        <div className="relative col-span-4 md:col-span-7">
          {/* Decorative schematic. The city labels below are HTML text. */}
          <Image src={asset("/svg/service-area-map.svg")} alt="" unoptimized width={900} height={760} sizes="(min-width: 768px) 55vw, 90vw" className="block h-auto w-full" />
          {cities.map((city) => {
            const pin = pins[city];
            return (
              <span
                key={city}
                className="absolute whitespace-nowrap text-[11px] font-medium leading-none md:text-[14px]"
                style={{
                  top: `calc(${(pin.y / 760) * 100}% + ${pin.nudge ?? 0}px)`,
                  transform: "translateY(-50%)",
                  ...(pin.side === "left"
                    ? { right: `calc(${100 - (pin.x / 900) * 100}% + 10px)` }
                    : { left: `calc(${(pin.x / 900) * 100}% + 0px)` }),
                }}
              >
                {city}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
