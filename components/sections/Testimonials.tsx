import Photo from "@/components/ui/Photo";
import { Em } from "@/components/ui/bits";
import { field, results, testimonials } from "@/lib/copy";

const S = "TESTIMONIALS AND RESULTS";

const quoteCards = [
  { tag: "BOARD", color: "bg-brand-maroon", photo: "11-testimonial-placeholder", alt: "Portrait of a laughing woman with short grey hair." },
  { tag: "CONDO", color: "bg-tag-sage", photo: "12-testimonial-placeholder", alt: "Portrait of a laughing man with a trimmed beard." },
  { tag: "INVESTOR", color: "bg-tag-clay", photo: "13-testimonial-placeholder", alt: "Portrait of a laughing woman with curly hair." },
] as const;

// Varsity-style scatter on the 12-column grid: varied offsets, no overlaps.
const place = {
  q0: "lg:col-span-4 lg:col-start-1",
  r0: "lg:col-span-4 lg:col-start-5 lg:mt-24",
  q1: "lg:col-span-4 lg:col-start-9 lg:mt-8",
  r1: "lg:col-span-4 lg:col-start-1 lg:mt-12",
  q2: "lg:col-span-4 lg:col-start-5 lg:mt-12",
  r2: "lg:col-span-4 lg:col-start-9 lg:mt-20",
};

function Quote({ i }: { i: 0 | 1 | 2 }) {
  const t = testimonials[i];
  const c = quoteCards[i];
  return (
    <figure className={`${place[`q${i}`]}`}>
      <div className="tagged">
        <span className={`tag t-label ${c.color}`}>{c.tag}</span>
        <div className="relative aspect-square overflow-hidden">
          <Photo name={c.photo} fill sizes="(min-width: 1024px) 28vw, 78vw" className="object-cover" alt={c.alt} />
        </div>
      </div>
      <blockquote className="t-body-lg mt-4 pl-7">&ldquo;{t.quote}&rdquo;</blockquote>
      <figcaption className="t-label mt-3 pl-7 text-text-muted">
        {t.name}, {t.detail}
      </figcaption>
    </figure>
  );
}

function Result({ i }: { i: 0 | 1 | 2 }) {
  const r = results[i];
  const [communityLabel, cityLabel] = field("RESULT CARDS", "Labels").split(" · ");
  const rows = [
    [communityLabel, r.community],
    ...(r.city ? [[cityLabel, r.city]] : []),
    [r.rowLabel, r.rowValue],
  ];
  return (
    <article className={`bg-paper p-6 md:p-8 ${place[`r${i}`]}`}>
      <p className="t-h2 text-brand-maroon">{r.figure}</p>
      <p className="t-body mt-4 first-letter:uppercase">{r.text}</p>
      <dl className="mt-6 border-t border-hairline">
        {rows.map(([k, v]) => (
          <div key={k} className="t-label flex justify-between gap-4 border-b border-hairline py-2.5">
            <dt className="text-text-muted">{k}</dt>
            <dd className="text-right">{v}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

export default function Testimonials() {
  return (
    <section data-reveal className="sec bg-cream">
      <div className="wrap">
        <h2 className="t-h2 mb-12 lg:mb-16">
          <Em text={field(S, "Headline")} word="communities" />
        </h2>
        <div className="snap-row items-start lg:mx-0 lg:grid lg:grid-flow-row lg:grid-cols-12 lg:gap-x-6 lg:overflow-visible lg:px-0">
          <Quote i={0} />
          <Result i={0} />
          <Quote i={1} />
          <Result i={1} />
          <Quote i={2} />
          <Result i={2} />
        </div>
      </div>
    </section>
  );
}
