import LeadForm from "@/components/ui/LeadForm";
import Photo from "@/components/ui/Photo";
import { Em } from "@/components/ui/bits";
import { field, formFields, label } from "@/lib/copy";

const S = "FINAL CALL TO ACTION AND FORM";

export default function FinalCta() {
  const side = field(S, "Side note");
  const phone = side.match(/\(\d{3}\) \d{3}-\d{4}/)![0];
  const [before, after] = side.split(phone);
  return (
    <section id="proposal" data-reveal className="on-dark overflow-x-clip bg-ink-maroon pb-[72px] pt-[72px] text-on-dark lg:pb-24 lg:pt-32">
      <div className="wrap grid12 gap-y-14">
        <div className="col-span-4 md:col-span-12 lg:col-span-5">
          <h2 className="t-h2-lg">
            <Em text={field(S, "Headline")} word="talk" />
          </h2>
          <p className="t-body-lg mt-6">{field(S, "Body")}</p>
          <p className="t-body mt-6">
            {before}
            <a href={`tel:${phone.replace(/\D/g, "")}`} className="whitespace-nowrap underline underline-offset-4">
              {phone}
            </a>
            {after}
          </p>
        </div>
        <div className="relative col-span-4 md:col-span-12 lg:col-span-6 lg:col-start-7">
          <div className="relative overflow-hidden bg-cream text-text">
            <Photo name="23-paper" fill sizes="(min-width: 1024px) 48vw, 100vw" alt="" className="object-cover opacity-50" />
            <div className="relative p-6 pt-14 md:p-10">
              <LeadForm
                fields={formFields}
                text={{
                  button: field(S, "Button"),
                  note: field(S, "Under the button"),
                  success: field(S, "Success message"),
                  selectPrompt: label("Select prompt"),
                  optional: label("Optional marker"),
                  requiredError: label("Required error"),
                  emailError: label("Email error"),
                  phoneError: label("Phone error"),
                  summary: label("Error summary"),
                }}
              />
            </div>
          </div>
          {/* Wax seal over the card's top-right corner, about 40% of it past the edge */}
          <div className="pointer-events-none absolute -right-3 -top-12 w-[104px] rotate-6 drop-shadow-[0_10px_10px_color-mix(in_srgb,var(--ink-maroon)_55%,transparent)] md:-right-8 md:-top-14 md:w-[140px] lg:-right-14">
            <Photo name="22-seal" sizes="(min-width: 768px) 140px, 104px" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}
