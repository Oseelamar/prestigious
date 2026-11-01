import Photo from "@/components/ui/Photo";
import { Em, FloatCard } from "@/components/ui/bits";
import { field } from "@/lib/copy";

const S = "PORTAL AND COMMUNICATION";

export default function PortalCommunication() {
  return (
    <section data-reveal data-float-root className="sec bg-cream">
      <div className="wrap grid12 items-center gap-y-12">
        <div className="relative col-span-4 md:col-span-6">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Photo name="10-portal-placeholder" fill sizes="(min-width: 768px) 44vw, 90vw" className="object-cover" alt="A woman on her condo balcony at golden hour reading a message on her phone, with the Intracoastal and boats blurred behind her." />
          </div>
          <FloatCard text={field("FLOATING CARDS", "Hurricane")} className="absolute -right-3 top-8 md:-right-10" />
          <FloatCard text={field("FLOATING CARDS", "Work order")} className="absolute -bottom-6 left-4" />
        </div>
        <div className="col-span-4 md:col-span-5 md:col-start-8">
          <h2 className="t-h2">
            <Em text={field(S, "Headline")} word="see" />
          </h2>
          <p className="t-body-lg mt-6">{field(S, "Body")}</p>
          <a href="#residents" className="btn btn-primary mt-8">
            {field(S, "Button")}
          </a>
        </div>
      </div>
    </section>
  );
}
