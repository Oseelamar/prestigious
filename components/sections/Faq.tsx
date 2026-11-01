import Accordion from "@/components/ui/Accordion";
import { Em } from "@/components/ui/bits";
import { field, lines } from "@/lib/copy";

const S = "FAQ";

export default function Faq() {
  const items = lines(S)
    .filter((l) => !l.startsWith("Headline"))
    .map((l) => {
      const i = l.indexOf("? ");
      return { q: l.slice(0, i + 1), a: l.slice(i + 2) };
    });
  return (
    <section id="faq" data-reveal className="sec bg-cream">
      <div className="wrap grid12 gap-y-10">
        <h2 className="t-h2 col-span-4 md:col-span-12 lg:col-span-4">
          <Em text={field(S, "Headline")} word="boards" />
        </h2>
        <div className="col-span-4 border-t border-text/20 md:col-span-12 lg:col-span-7 lg:col-start-6">
          <Accordion
            initialOpen={0}
            rowClass="border-b border-text/20"
            buttonClass="py-5 text-[18px] font-medium leading-snug md:text-[20px]"
            items={items.map((item) => ({
              title: item.q,
              body: <p className="t-body pb-6 pr-10 text-text-muted">{item.a}</p>,
            }))}
          />
        </div>
      </div>
    </section>
  );
}
