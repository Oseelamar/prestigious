import Accordion from "@/components/ui/Accordion";
import { LogoPlaceholder } from "@/components/ui/bits";
import { field, split } from "@/lib/copy";

const S = "FOOTER";

const columns = ["Associations", "Residents", "Company"];

const LinkList = ({ items }: { items: string[] }) => (
  <ul className="t-small">
    {items.map((item) => (
      <li key={item}>
        <a href="#" className="flex min-h-11 items-center underline-offset-4 hover:underline md:min-h-9">
          {item}
        </a>
      </li>
    ))}
  </ul>
);

export default function SiteFooter() {
  const contact = split(field(S, "Contact"));
  const contactList = (
    <ul className="t-small space-y-2">
      {contact.map((line) => (
        <li key={line}>{line.includes("@") ? <a href={`mailto:${line}`} className="underline underline-offset-4">{line}</a> : line}</li>
      ))}
    </ul>
  );
  const bottom = split(field(S, "Bottom line"));
  return (
    <footer className="on-dark overflow-hidden bg-ink-maroon text-on-dark">
      <div className="wrap">
        <div className="border-t border-[var(--on-dark-15)] pt-12 lg:pt-16">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(3,1fr)_1.4fr] lg:gap-8">
            <div>
              <LogoPlaceholder dark />
              <p className="t-small mt-4 max-w-[300px]">{field(S, "Brand line under the logo")}</p>
            </div>
            {columns.map((name) => (
              <nav key={name} aria-label={name} className="hidden lg:block">
                <h2 className="t-label mb-3">{name}</h2>
                <LinkList items={field(S, name).split(", ")} />
              </nav>
            ))}
            <div className="hidden lg:block">
              <h2 className="t-label mb-3">Contact</h2>
              {contactList}
            </div>
            <div className="border-t border-[var(--on-dark-15)] lg:hidden">
              <Accordion
                dark
                rowClass="border-b border-[var(--on-dark-15)]"
                buttonClass="py-2"
                items={[
                  ...columns.map((name) => ({
                    title: <span className="t-label">{name}</span>,
                    body: (
                      <div className="pb-3">
                        <LinkList items={field(S, name).split(", ")} />
                      </div>
                    ),
                  })),
                  { title: <span className="t-label">Contact</span>, body: <div className="pb-4">{contactList}</div> },
                ]}
              />
            </div>
          </div>
          <ul className="t-small mt-12 flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-[var(--on-dark-15)] py-5">
            {bottom.map((item, i) =>
              i < 2 ? (
                <li key={item}>{item}</li>
              ) : (
                <li key={item}>
                  <a href="#" className="flex min-h-11 items-center underline underline-offset-4 md:min-h-0">
                    {item}
                  </a>
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
      <p aria-hidden="true" className="t-wordmark -mb-[0.16em] ml-[-0.02em] whitespace-nowrap px-[var(--gutter)] opacity-90">
        Prestigious
      </p>
    </footer>
  );
}
