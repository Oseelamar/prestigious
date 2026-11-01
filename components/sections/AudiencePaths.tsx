import Photo from "@/components/ui/Photo";
import { Em, Icon } from "@/components/ui/bits";
import { field, withLink } from "@/lib/copy";

const S = "AUDIENCE PATHS";

const cards = [
  { key: "Board members", tag: "BOARDS", color: "bg-brand-maroon", photo: "02-boards-placeholder", offset: "md:mt-0", alt: "Board members and their community manager reviewing printed financial reports around a clubhouse table.", href: "#why-boards" },
  { key: "Residents and owners", tag: "RESIDENTS", color: "bg-tag-sage", photo: "03-residents-placeholder", offset: "md:mt-16", alt: "A resident glancing at her phone outside a low-rise condo building, carrying a tote bag.", href: "#residents" },
  { key: "Property investors", tag: "INVESTORS", color: "bg-tag-clay", photo: "04-investors-placeholder", offset: "md:mt-6", alt: "A rental property owner holding a ring of keys in the driveway of a stucco house, talking to someone out of frame.", href: "#property-types" },
  { key: "Future managers", tag: "LCAM", color: "bg-ink-maroon", photo: "05-lcam-placeholder", offset: "md:mt-[88px]", alt: "A student's hands on a thick study book and flash cards at a kitchen table at dusk, beside an open laptop and a mug.", href: "#lcam" },
] as const;

export default function AudiencePaths() {
  return (
    <section data-reveal className="sec bg-paper">
      <div className="wrap">
        <h2 className="t-h2 mb-12 text-center lg:mb-16">
          <Em text={field(S, "Headline")} word="start" />
        </h2>
        <ul data-stagger className="snap-row md:mx-0 md:grid md:grid-flow-row md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 lg:grid-cols-4">
          {cards.map((card) => {
            const { body, link } = withLink(field(S, card.key));
            return (
              <li key={card.key} className={card.offset}>
                <a href={card.href} className="group block">
                  <div className="tagged">
                    <span className={`tag t-label ${card.color}`}>{card.tag}</span>
                    <div data-zoom className="relative aspect-[4/5] overflow-hidden">
                      <Photo name={card.photo} fill sizes="(min-width: 1024px) 22vw, (min-width: 768px) 44vw, 78vw" className="object-cover" alt={card.alt} />
                    </div>
                  </div>
                  <div className="pl-7">
                    <h3 className="t-h4 mt-4">{card.key}</h3>
                    <p className="t-body mt-2 text-text-muted">{body}</p>
                    <span className="link-arrow mt-2">
                      {link}
                      <Icon name="arrow" className="!h-5 !w-5" />
                    </span>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
