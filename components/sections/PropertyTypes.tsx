import Photo from "@/components/ui/Photo";
import { ArrowLink, Em } from "@/components/ui/bits";
import { field } from "@/lib/copy";

const S = "PROPERTY TYPES";

function CardText({ name }: { name: string }) {
  const m = field(S, name).match(/^(.*?) Bullets: (.*?)\. Link: (.*)$/)!;
  return (
    <div>
      <h3 className="t-h3">{name}</h3>
      <p className="t-body mt-3">{m[1]}</p>
      <ul className="t-small mt-4 space-y-1.5">
        {m[2].split(" / ").map((b) => (
          <li key={b} className="flex gap-2">
            {/* A real hyphen rather than a list marker, so wrapped lines hang. */}
            <span aria-hidden="true">-</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <div className="mt-3">
        <ArrowLink href="#proposal">{m[3]}</ArrowLink>
      </div>
    </div>
  );
}

export default function PropertyTypes() {
  return (
    <section id="property-types" data-reveal className="sec bg-paper">
      <div className="wrap grid12 gap-y-12">
        <div className="col-span-4 md:col-span-6 lg:col-span-5">
          <h2 className="t-h2 mb-12 lg:mb-16">
            <Em text={field(S, "Headline")} word="built" />
          </h2>
          <div className="relative mb-6 aspect-[3/4] overflow-hidden">
            <Photo name="06-hoa" fill sizes="(min-width: 768px) 40vw, 90vw" className="object-cover" alt="A quiet residential street of barrel-tile roofed homes with sidewalks and sabal palms in early-morning light." />
          </div>
          <CardText name="Homeowners associations" />
        </div>
        <div className="col-span-4 md:col-span-6 lg:col-span-6 lg:col-start-7 lg:mt-12">
          <div className="relative mb-6 aspect-[4/5] overflow-hidden">
            <Photo name="07-condo" fill sizes="(min-width: 768px) 44vw, 90vw" className="object-cover" alt="A mid-rise condominium with white balconies seen from its pool deck, with lounge chairs and palms in late-day haze." />
          </div>
          <CardText name="Condominium associations" />
        </div>
        <div className="col-span-4 md:col-span-6 md:col-start-2 lg:col-span-4 lg:col-start-3 lg:mt-12">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Photo name="08-investment" fill sizes="(min-width: 1024px) 30vw, (min-width: 768px) 44vw, 90vw" className="object-cover" alt="A single-storey pale yellow ranch house with white shutters, a carport and a mango tree in the front yard." />
          </div>
        </div>
        <div className="col-span-4 -mt-6 md:col-span-5 md:mt-0 lg:col-span-5 lg:col-start-7 lg:mt-12">
          <CardText name="Investment properties" />
        </div>
      </div>
    </section>
  );
}
