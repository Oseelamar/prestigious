import { asset } from "@/lib/base-path";
import Image from "next/image";
import Photo from "@/components/ui/Photo";
import { Em, Eyebrow, FloatCard } from "@/components/ui/bits";
import { children, field } from "@/lib/copy";

const S = "WHY BOARDS SWITCH";

export default function WhyBoardsSwitch() {
  const rows = children(S, "Rows").map((row) => row.split(" → "));
  return (
    <section id="why-boards" data-reveal data-float-root className="sec overflow-hidden bg-cream">
      <Image src={asset("/svg/corner-pattern.svg")} alt="" unoptimized width={384} height={384} sizes="(min-width: 1024px) 384px, 220px" className="pointer-events-none absolute right-0 top-0 w-[220px] opacity-10 lg:w-[384px]" />
      <div className="wrap grid12 relative gap-y-12">
        <div className="col-span-4 md:col-span-12 lg:col-span-5">
          <Eyebrow>{field(S, "Eyebrow")}</Eyebrow>
          <h2 className="t-h2 mt-6">
            <Em text={field(S, "Headline")} word="small" />
          </h2>
          <p className="t-body-lg mt-6">{field(S, "Intro")}</p>
          <a href="#switch" className="btn btn-primary mt-8">
            {field(S, "Button")}
          </a>
          <div className="relative mt-12 mb-8 lg:mb-0">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Photo
                name="02-boards-placeholder"
                fill
                sizes="(min-width: 1024px) 38vw, 90vw"
                className="object-cover"
                position="50% 42%"
                alt="A board member pointing to a line in a printed report while others around the table follow along."
              />
            </div>
            <FloatCard text={field("FLOATING CARDS", "Financials")} className="absolute -bottom-6 left-4" />
            <FloatCard text={field("FLOATING CARDS", "Board packet")} className="absolute -right-3 top-6 hidden md:block" />
          </div>
        </div>
        <ul className="col-span-4 self-end border-t border-text/20 md:col-span-12 lg:col-span-6 lg:col-start-7">
          {rows.map(([problem, answer]) => (
            <li key={problem} className="border-b border-text/20 py-6">
              <p className="t-body text-text-muted">{problem}</p>
              <p className="t-body-lg mt-2">{answer}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
