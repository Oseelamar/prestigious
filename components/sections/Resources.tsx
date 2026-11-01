import Photo from "@/components/ui/Photo";
import { ArrowLink, Em } from "@/components/ui/bits";
import { field } from "@/lib/copy";

const S = "RESOURCES";

const cards = [
  { key: "Card 1 (BOARDS)", tag: "BOARDS", color: "bg-brand-maroon", photo: "02-boards-placeholder", position: "20% 30%", offset: "" },
  { key: "Card 2 (OWNERS)", tag: "OWNERS", color: "bg-tag-sage", photo: "09-keys-handover-placeholder", position: "20% 90%", offset: "lg:mt-16" },
  { key: "Card 3 (LCAM)", tag: "LCAM", color: "bg-ink-maroon", photo: "05-lcam-placeholder", position: "50% 90%", offset: "lg:mt-6" },
] as const;

export default function Resources() {
  return (
    <section id="resources" data-reveal className="sec bg-paper">
      <div className="wrap">
        <h2 className="t-h2 mb-12 max-w-[760px] lg:mb-16">
          <Em text={field(S, "Headline")} word="Guides" />
        </h2>
        <ul className="snap-row md:mx-0 md:grid md:grid-flow-row md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0">
          {cards.map((card) => (
            <li key={card.key} className={card.offset}>
              <a href="#" className="block">
                <div className="tagged">
                  <span className={`tag t-label ${card.color}`}>{card.tag}</span>
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <Photo name={card.photo} fill sizes="(min-width: 768px) 30vw, 78vw" className="object-cover" position={card.position} alt="" />
                  </div>
                </div>
                <h3 className="t-h4 mt-4 pl-7">{field(S, card.key)}</h3>
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <ArrowLink>{field(S, "Link")}</ArrowLink>
        </div>
      </div>
    </section>
  );
}
