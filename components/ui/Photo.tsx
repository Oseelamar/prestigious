import Image from "next/image";
import sizes from "@/lib/image-sizes.json";

type Props = {
  name: keyof typeof sizes;
  alt: string;
  sizes: string;
  className?: string;
  fill?: boolean;
  priority?: boolean;
  position?: string;
  /** Marks the hero photograph, which the stylesheet drifts on scroll. */
  drift?: boolean;
};

export default function Photo({ name, alt, sizes: sizesAttr, className, fill, priority, position, drift }: Props) {
  const { width, height } = sizes[name];
  return (
    <Image
      src={`/images/${name}@2x.webp`}
      alt={alt}
      sizes={sizesAttr}
      className={className}
      style={position ? { objectPosition: position } : undefined}
      {...(fill ? { fill: true } : { width, height })}
      {...(priority ? { preload: true, fetchPriority: "high" as const } : {})}
      {...(drift ? { "data-hero-photo": "" } : {})}
    />
  );
}
