import Photo from "@/components/ui/Photo";
import { Em, FloatCard } from "@/components/ui/bits";
import { field } from "@/lib/copy";

const S = "HERO";

const ink = (alpha: number) => `color-mix(in srgb, var(--ink-maroon) ${alpha}%, transparent)`;

export default function Hero() {
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
        style={{ background: `radial-gradient(ellipse 114% 86% at 0% 100%, ${ink(72)} 0%, ${ink(63)} 58%, ${ink(52)} 82%, transparent 100%), linear-gradient(to top, ${ink(68)} 0%, ${ink(40)} 12%, transparent 30%)` }}
      />
      {/* Pale haze behind the top-right subhead, so dark text stays readable over any palm fronds. */}
      <div
        className="absolute inset-0 -z-10 hidden md:block"
        style={{ background: "radial-gradient(ellipse 44% 40% at 84% 12%, color-mix(in srgb, var(--paper) 76%, transparent) 0%, color-mix(in srgb, var(--paper) 52%, transparent) 55%, transparent 100%)" }}
      />

      <div className="wrap flex flex-1 flex-col">
        <div className="grid12 hidden pt-16 md:grid">
          <p className="t-body-lg col-span-5 col-start-8 text-text xl:col-span-4 xl:col-start-9 xl:pl-6">{field(S, "Subhead")}</p>
        </div>

        <div className="grid12 mt-auto pb-6 pt-16 md:pb-8">
          <div className="col-span-4 md:col-span-10 xl:col-span-8">
            <p className="t-label mb-4">{field(S, "Eyebrow")}</p>
            <h1 className="t-hero">
              <Em text={field(S, "Headline")} word="rest" />
            </h1>
            <p className="t-body-lg mt-4 md:hidden">{field(S, "Subhead")}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
              <a href="#proposal" className="btn btn-cream">
                {field(S, "Primary button")}
              </a>
              <a href="#residents" className="t-button flex min-h-11 items-center underline underline-offset-4">
                {field(S, "Secondary link")}
              </a>
            </div>
          </div>
          <div className="col-span-4 hidden items-end justify-end md:col-span-2 xl:col-span-4 xl:flex">
            <FloatCard text={field("FLOATING CARDS", "Hero")} />
          </div>
        </div>

        <p className="t-label border-t border-[var(--on-dark-20)] py-4">{field(S, "Trust line")}</p>
      </div>
    </section>
  );
}
