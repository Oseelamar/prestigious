import Accordion from "@/components/ui/Accordion";
import Photo from "@/components/ui/Photo";
import { ArrowLink } from "@/components/ui/bits";
import { field } from "@/lib/copy";

const S = "WHAT'S INCLUDED";

const items = [
  { key: "Your manager", photo: "17-keys" },
  { key: "Finances", photo: "18-statement" },
  { key: "Accounting", photo: "19-ledger" },
  { key: "Administration", photo: "20-envelopes" },
  { key: "Maintenance", photo: "21-frond" },
] as const;

const Body = ({ text }: { text: string }) => (
  <ul className="t-small space-y-2 text-text-muted">
    {text.split("; ").map((line) => (
      <li key={line}>{line}</li>
    ))}
  </ul>
);

export default function WhatsIncluded() {
  const headline = field(S, "Headline");
  const [before, after] = headline.split("plain");
  return (
    <section data-reveal className="sec bg-cream">
      <div className="wrap">
        <h2 className="t-h2-lg max-w-[900px]">
          {before}
          {/* The keys sit across the word, as the Oursins poster does with its objects */}
          <span className="relative inline-block">
            <em>plain</em>
            <span aria-hidden="true" className="absolute -right-1 -top-3 block w-[56px] rotate-[8deg] drop-shadow-[0_8px_8px_color-mix(in_srgb,var(--ink-maroon)_28%,transparent)] lg:right-0 lg:-top-5 lg:w-[104px]">
              <Photo name="17-keys" alt="" sizes="(min-width: 1024px) 104px, 56px" />
            </span>
          </span>
          {after}
        </h2>
        <p className="t-body-lg mt-6 max-w-[620px]">{field(S, "Intro")}</p>

        <ul data-stagger className="mt-16 hidden grid-cols-5 gap-6 lg:grid">
          {items.map((item) => (
            <li key={item.key} className="border-t border-hairline pt-6">
              <div className="flex h-[160px] items-center justify-start">
                <Photo name={item.photo} alt="" sizes="160px" className="max-h-[160px] w-auto" />
              </div>
              <h3 className="t-h4 mb-3 mt-6">{item.key}</h3>
              <Body text={field(S, item.key)} />
            </li>
          ))}
        </ul>

        <div className="mt-10 border-t border-hairline lg:hidden">
          <Accordion
            rowClass="border-b border-hairline"
            buttonClass="py-3"
            items={items.map((item) => ({
              title: (
                <span className="flex items-center gap-4">
                  <span className="flex h-14 w-14 flex-none items-center justify-center">
                    <Photo name={item.photo} alt="" sizes="96px" className="max-h-14 w-auto" />
                  </span>
                  <span className="t-h4">{item.key}</span>
                </span>
              ),
              body: (
                <div className="pb-5 pl-[72px]">
                  <Body text={field(S, item.key)} />
                </div>
              ),
            }))}
          />
        </div>

        <div className="mt-8">
          <ArrowLink>{field(S, "Link")}</ArrowLink>
        </div>
      </div>
    </section>
  );
}
