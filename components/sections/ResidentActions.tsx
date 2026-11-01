import { Em, Icon } from "@/components/ui/bits";
import { field, withLink } from "@/lib/copy";

const S = "RESIDENT QUICK ACTIONS";

const tiles = [
  { key: "Report a maintenance issue", icon: "wrench" },
  { key: "Request an estoppel certificate", icon: "document" },
  { key: "Log in to your portal", icon: "key" },
  { key: "Contact the office", icon: "phone" },
];

export default function ResidentActions() {
  return (
    <section id="residents" data-reveal className="sec bg-paper">
      <div className="wrap">
        <h2 className="t-h2">
          <Em text={field(S, "Headline")} word="Residents" />
        </h2>
        <p className="t-body-lg mt-4">{field(S, "Intro")}</p>
        <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {tiles.map((tile) => {
            const { body, link } = withLink(field(S, tile.key));
            return (
              <li key={tile.key}>
                <a href="#" className="flex h-full flex-col border border-hairline p-6 outline outline-2 -outline-offset-2 outline-transparent transition-[outline-color] duration-150 hover:outline-brand-maroon focus-visible:outline-brand-maroon">
                  <Icon name={tile.icon} className="text-brand-maroon" />
                  <h3 className="t-h4 mt-6">{tile.key}</h3>
                  <p className="t-small mb-4 mt-2 break-words text-text-muted">{body}</p>
                  <span className="link-arrow mt-auto">
                    {link}
                    <Icon name="arrow" className="!h-5 !w-5" />
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
        <p className="t-body mt-6 border-l-4 border-brand-maroon bg-cream px-6 py-4">{field(S, "Emergency note")}</p>
      </div>
    </section>
  );
}
