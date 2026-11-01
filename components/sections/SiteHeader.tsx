import SiteNav from "@/components/ui/SiteNav";
import { Icon, LogoPlaceholder } from "@/components/ui/bits";
import { announcement, field, label, mainMenu, split } from "@/lib/copy";

const NAV = "TOP BAR AND NAVIGATION";

// Sections 1 and 2: resident strip and navigation, plus the LCAM bar while a class date is set.
export default function SiteHeader() {
  const left = field(NAV, "Resident strip, left");
  const [lead, links] = left.split(": ");
  const phone = field(NAV, "Resident strip, right");
  const bar = announcement();
  return (
    <>
      <a href="#main" className="skip-link t-small">
        {label("Skip link")}
      </a>
      <div className="on-dark bg-ink-maroon text-on-dark">
        <div className="wrap t-small flex min-h-11 items-center justify-between md:min-h-9">
          <p className="hidden items-center gap-2 md:flex">
            <span>{lead}:</span>
            {split(links).map((link, i) => (
              <span key={link} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden="true">·</span>}
                <a href="#residents" className="underline-offset-4 hover:underline">
                  {link}
                </a>
              </span>
            ))}
          </p>
          <a href="#residents" className="flex min-h-11 items-center underline-offset-4 hover:underline md:hidden">
            {label("Residents short")}
          </a>
          <a href={`tel:${phone.replace(/\D/g, "")}`} className="flex min-h-11 items-center gap-2 underline-offset-4 hover:underline md:min-h-9" aria-label={`Call ${phone}`}>
            <Icon name="phone" className="!h-[18px] !w-[18px] md:hidden" />
            <span className="hidden md:inline">{phone}</span>
          </a>
        </div>
      </div>
      <SiteNav
        logo={<LogoPlaceholder />}
        menu={mainMenu}
        cta={field(NAV, "Nav button")}
        menuOpen={label("Menu open")}
        menuClose={label("Menu close")}
        phone={phone}
      />
      <p className="t-small bg-cream text-center">
        <span className="wrap block py-2.5">
          {bar.text}{" "}
          <a href="#lcam" className="font-medium text-brand-maroon underline underline-offset-4">
            {bar.cta}
          </a>
        </span>
      </p>
    </>
  );
}
