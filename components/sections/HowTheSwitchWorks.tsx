import Photo from "@/components/ui/Photo";
import { Em, Eyebrow } from "@/components/ui/bits";
import { field, lines } from "@/lib/copy";

const S = "HOW THE SWITCH WORKS";

export default function HowTheSwitchWorks() {
  const steps = lines(S)
    .filter((l) => /^0\d /.test(l))
    .map((l) => {
      const m = l.match(/^(0\d) (.*?): (.*)$/)!;
      return { n: m[1], title: m[2], text: m[3] };
    });
  return (
    <section id="switch" data-reveal className="sec bg-cream">
      <div className="wrap">
        {/* An empty column between the copy and the photo, which otherwise sit
            24px apart and read as one block. */}
        <div className="grid12 gap-y-12 md:gap-y-16">
          <div className="col-span-4 md:col-span-5">
            <Eyebrow>{field(S, "Eyebrow")}</Eyebrow>
            <h2 className="t-h2 mt-6">
              <Em text={field(S, "Headline")} word="simpler" />
            </h2>
            <p className="t-body-lg mt-6">{field(S, "Intro")}</p>
            <a href="#proposal" className="btn btn-primary mt-8">
              {field(S, "Button")}
            </a>
          </div>
          <div className="relative col-span-4 aspect-[3/2] overflow-hidden md:col-span-6 md:col-start-7">
            <Photo name="09-keys-handover-placeholder" fill sizes="(min-width: 1024px) 44vw, (min-width: 768px) 46vw, 90vw" className="object-cover" alt="One person passing a ring of brass keys to another across a wooden table, beside a signed document and a pen." />
          </div>
        </div>
        <ol className="mt-16 grid gap-0 lg:mt-20 lg:grid-cols-5 lg:gap-6">
          {steps.map((step, i) => (
            <li key={step.n} className="relative grid grid-cols-[72px_1fr] gap-x-4 pb-10 last:pb-0 lg:block lg:pb-0">
              {/* 1px line joining the numerals: down the side on mobile, across on desktop */}
              {i < steps.length - 1 && <span aria-hidden="true" className="absolute bottom-0 left-[28px] top-16 w-px bg-brand-maroon/40 lg:bottom-auto lg:left-[88px] lg:right-[-24px] lg:top-8 lg:h-px lg:w-auto" />}
              <span className="t-step text-brand-maroon">{step.n}</span>
              <div className="lg:mt-5">
                <h3 className="t-h4">{step.title}</h3>
                <p className="t-small mt-2 text-text-muted">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
