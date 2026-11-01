import { ArrowLink, Em } from "@/components/ui/bits";
import { cities, field } from "@/lib/copy";

const S = "SERVICE AREA";

export default function ServiceArea() {
  return (
    <section data-reveal className="sec bg-paper">
      <div className="wrap grid12">
        <div className="col-span-4 md:col-span-8 lg:col-span-7">
          <h2 className="t-h2">
            <Em text={field(S, "Headline")} word="Palm Beach" />
          </h2>
          <p className="t-body-lg mt-6">{field(S, "Body")}</p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {cities.map((city) => (
              <li key={city} className="t-small border border-text/40 px-3 py-1.5">
                {city}
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <ArrowLink href="#proposal">{field(S, "Link")}</ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}
