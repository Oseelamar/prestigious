import { field, label, split } from "@/lib/copy";

const S = "PROOF STRIP";

export default function ProofStrip() {
  const [communities, homes, licensed, counties] = split(field(S, "Stats"));
  const number = (s: string) => {
    const i = s.indexOf(" ");
    return { figure: s.slice(0, i), caption: s.slice(i + 1) };
  };
  const a = number(communities);
  const b = number(homes);
  const badges = split(field(S, "Badges"));
  return (
    <section data-reveal className="on-dark bg-ink-maroon py-[72px] text-on-dark lg:py-24">
      <div className="wrap">
        <dl className="grid grid-cols-[0.8fr_1.2fr] gap-y-10 lg:grid-cols-[1fr_1.45fr_1fr_1fr]">
          {[a, b].map((s, i) => (
            <div key={s.caption} className={`flex flex-col justify-end pr-4 ${i ? "border-l border-[var(--on-dark-20)] pl-4 lg:pl-6" : ""}`}>
              <dd data-count className="t-stat order-1">{s.figure}</dd>
              <dt className="t-label order-2 mt-3">{s.caption}</dt>
            </div>
          ))}
          <div className="flex flex-col justify-end border-[var(--on-dark-20)] pr-4 lg:border-l lg:pl-6">
            <dd className="t-h3">{licensed.replace(" on every account", "")}</dd>
            <dt className="t-label mt-3">on every account</dt>
          </div>
          <div className="flex flex-col justify-end border-l border-[var(--on-dark-20)] pl-4 lg:pl-6">
            <dd className="t-h3">{counties.replace(" counties", "")}</dd>
            <dt className="t-label mt-3">counties</dt>
          </div>
        </dl>
        <ul className="mt-12 flex flex-wrap gap-3 border-t border-[var(--on-dark-20)] pt-8">
          <li className="t-label border border-[var(--on-dark-20)] px-4 py-3">{badges[0]}</li>
          {/* PLACEHOLDER: two industry-association logo slots. The rating badge stays out until there is a strong rating. */}
          {[0, 1].map((i) => (
            <li key={i} className="t-label border border-dashed border-[var(--on-dark-20)] px-4 py-3">
              {label("Membership placeholder")}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
