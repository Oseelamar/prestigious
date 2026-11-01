import Photo from "@/components/ui/Photo";
import { Em, Eyebrow } from "@/components/ui/bits";
import { field, split } from "@/lib/copy";

const S = "LCAM TRAINING";

export default function LcamTraining() {
  const rows = ["Format", "Price", "Includes", "Next class"];
  return (
    <section id="lcam" data-reveal className="sec bg-cream">
      <div className="wrap grid12 items-start gap-y-10">
        <div className="relative col-span-4 aspect-[4/5] overflow-hidden md:col-span-6">
          <Photo name="05-lcam-placeholder" fill sizes="(min-width: 768px) 44vw, 90vw" className="object-cover" alt="A student's hands on a study book and flash cards at a kitchen table in warm lamp light, with dusk through the window behind." />
        </div>
        <div className="col-span-4 md:col-span-6 lg:col-span-5 lg:col-start-8">
          <Eyebrow>{field(S, "Eyebrow")}</Eyebrow>
          <h2 className="t-h2 mt-6">
            <Em text={field(S, "Headline")} word="licensed" />
          </h2>
          <p className="t-body-lg mt-6">{field(S, "Body")}</p>
          <dl className="mt-8 border-t border-text/20">
            {rows.map((row) => (
              <div key={row} className="grid grid-cols-[96px_1fr] gap-4 border-b border-text/20 py-3 md:grid-cols-[120px_1fr]">
                <dt className="t-label pt-1 text-text-muted">{row}</dt>
                <dd className="t-small">
                  {split(field(S, row)).map((part) => (
                    <span key={part} className="block">
                      {part}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#proposal" className="btn btn-primary">
              {field(S, "Primary button")}
            </a>
            <a href="#" className="btn btn-outline">
              {field(S, "Secondary button")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
