import Photo from "@/components/ui/Photo";
import { ArrowLink } from "@/components/ui/bits";
import { field, team } from "@/lib/copy";

const S = "LEADERSHIP";

const teamPhotos = [
  { photo: "14-team-placeholder", alt: "Portrait of a community manager in a navy polo." },
  { photo: "15-team-placeholder", alt: "Portrait of an accounting manager in a cream blouse." },
  { photo: "16-team-placeholder", alt: "Portrait of a resident services coordinator in a green shirt." },
] as const;

export default function Leadership() {
  const body = field(S, "Body");
  const cut = body.indexOf(" She leads");
  // Pull quote: the copy has no text for it yet, so nothing is shown until Angela supplies her own words.
  return (
    <>
      <section id="leadership" data-reveal className="on-dark sec bg-brand-maroon text-on-dark">
        <div className="wrap text-center">
          <p className="t-label">{field(S, "Eyebrow")}</p>
          <h2 className="t-stat mt-6">{field(S, "Headline")}</h2>
          {/* The middle column is one of the three the team portraits below are
              laid out on, so Angela's frame is exactly their width. */}
          <div className="mt-12 grid items-center gap-8 lg:mt-16 lg:grid-cols-[1fr_calc((100%-48px)/3)_1fr] lg:gap-16">
            <p className="t-small order-2 mx-auto max-w-[280px] lg:order-1 lg:mr-0 lg:text-right">{body.slice(0, cut + 1).trim()}</p>
            {/* The client's own photograph of Angela. Never generated. */}
            <div className="relative order-1 mx-auto aspect-[3/4] w-[82%] max-w-[320px] overflow-hidden lg:order-2 lg:w-full lg:max-w-none">
              <Photo name="24-angela-dean" fill sizes="(min-width: 1024px) 30vw, 82vw" className="object-cover" alt="Angela Dean, founder of Prestigious Property Management Services, standing with her arms folded in a white suit." />
            </div>
            <p className="t-small order-3 mx-auto max-w-[280px] lg:ml-0 lg:text-left">{body.slice(cut + 1).trim()}</p>
          </div>
        </div>
      </section>
      <div data-reveal className="bg-cream py-[72px] lg:py-24">
        <div className="wrap">
          <ul className="snap-row md:mx-0 md:grid md:grid-flow-row md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0">
            {team.map((person, i) => (
              <li key={person.name}>
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Photo name={teamPhotos[i].photo} fill sizes="(min-width: 768px) 30vw, 78vw" className="object-cover" position="50% 20%" alt={teamPhotos[i].alt} />
                </div>
                <h3 className="t-h4 mt-4">{person.name}</h3>
                <p className="t-small text-text-muted">{person.role}</p>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <ArrowLink>{field(S, "Link")}</ArrowLink>
          </div>
        </div>
      </div>
    </>
  );
}
