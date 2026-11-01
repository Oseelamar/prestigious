import { asset } from "@/lib/base-path";
import { label } from "@/lib/copy";

const iconStyle = (name: string) => ({ "--icon": `url(${asset(`/svg/icon-${name}.svg`)})` }) as React.CSSProperties;

export function Icon({ name, className = "" }: { name: string; className?: string }) {
  return <span aria-hidden="true" className={`icon ${className}`} style={iconStyle(name)} />;
}

/** Sets one word of a headline in Kalice Italic. */
export function Em({ text, word }: { text: string; word: string }) {
  const i = text.indexOf(word);
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <em>{word}</em>
      {text.slice(i + word.length)}
    </>
  );
}

export function ArrowLink({ href = "#", children }: { href?: string; children: React.ReactNode }) {
  return (
    <a href={href} className="link-arrow">
      {children}
      <Icon name="arrow" className="!w-5 !h-5" />
    </a>
  );
}

export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`eyebrow t-label ${className}`}>{children}</p>;
}

export function FloatCard({ text, className = "" }: { text: string; className?: string }) {
  const [title, detail] = text.split(" · ");
  return (
    <div data-float className={`float-card ${className}`} aria-hidden="true">
      <p className="t-small font-medium">{title}</p>
      <p className="t-label mt-1 text-text-muted">{detail}</p>
    </div>
  );
}

export function LogoPlaceholder({ dark = false }: { dark?: boolean }) {
  // PLACEHOLDER: replace with the client's logo file.
  return (
    <span className="inline-flex flex-col">
      <span className="t-h4 !text-[24px] !leading-none">Prestigious PM</span>
      <span className={`t-label !text-[9px] mt-1 ${dark ? "" : "text-text-muted"}`}>{label("Logo placeholder")}</span>
    </span>
  );
}
