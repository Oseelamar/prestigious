import Photo from "@/components/ui/Photo";
import { Em } from "@/components/ui/bits";
import { field } from "@/lib/copy";

const S = "HERO";

const ink = (alpha: number) => `color-mix(in srgb, var(--ink-maroon) ${alpha}%, transparent)`;

export default function Hero() {
  // "Your board sets the direction." / "We handle the rest."
  const headline = field(S, "Headline").split(/(?<=\.)\s+/);
  return (
    <section data-float-root className="on-dark relative isolate flex min-h-[840px] flex-col overflow-hidden text-on-dark [--hero-x:24%] md:min-h-[860px] md:[--hero-x:100%]">
      <Photo
        name="01-hero"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
        position="var(--hero-x) 50%"
        alt="Two-storey cream stucco townhomes with terracotta roofs and arched loggias behind tall royal palms in late-afternoon sun, with a resident walking a dog far down the street."
      />
      {/* Scrim. The brief's lower 40% leaves the headline's top lines over bright stucco, so it runs higher, weighted to the lower left under the copy, and only as dark as AA needs. */}
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-[76%] md:hidden"
        style={{ background: `linear-gradient(to top, ${ink(86)} 0%, ${ink(78)} 58%, ${ink(74)} 80%, transparent 100%)` }}
      />
      <div
        className="absolute inset-0 -z-10 hidden md:block"
        style={{
          background: [
            // Behind the subhead at the far right, which otherwise sits on open sky.
            `radial-gradient(ellipse 44% 34% at 88% 82%, ${ink(74)} 0%, ${ink(58)} 52%, transparent 100%)`,
            `radial-gradient(ellipse 114% 86% at 0% 100%, ${ink(72)} 0%, ${ink(63)} 58%, ${ink(52)} 82%, transparent 100%)`,
            `linear-gradient(to top, ${ink(68)} 0%, ${ink(40)} 12%, transparent 30%)`,
          ].join(", "),
        }}
      />
      <div className="wrap flex flex-1 flex-col">
        <div className="grid12 mt-auto pb-6 pt-16 md:pb-8">
          <div className="col-span-4 md:col-span-8">
            <p className="t-label mb-4">{field(S, "Eyebrow")}</p>
            {/* One sentence per line. The copy is written to break there, so the
                size is set to let the longer of the two sit on a single line. */}
            <h1 className="t-hero">
              {headline.map((line, i) => (
                <span key={line} className="block">
                  {i === headline.length - 1 ? <Em text={line} word="rest" /> : line}
                </span>
              ))}
            </h1>
            <p className="t-body mt-4 md:hidden">{field(S, "Subhead")}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
              <a href="#proposal" className="btn btn-cream">
                {field(S, "Primary button")}
              </a>
              <a href="#residents" className="t-button flex min-h-11 items-center underline underline-offset-4">
                {field(S, "Secondary link")}
              </a>
            </div>
          </div>
          {/* Far right, sitting on the headline's last line. Stacks under it on a phone. */}
          <div className="hidden md:col-span-4 md:flex md:items-end md:pb-1">
            <p className="t-body">{field(S, "Subhead")}</p>
          </div>
        </div>

        <p className="t-label border-t border-[var(--on-dark-20)] py-4">{field(S, "Trust line")}</p>
      </div>
    </section>
  );
}
