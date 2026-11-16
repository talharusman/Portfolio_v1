import Image from "next/image";
import { cn } from "@/lib/utils";

type ProjectFigureProps = {
  /** Public path of the real asset. Leave unset until it exists. */
  src?: string;
  alt: string;
  /** Label shown on the placeholder, top left. */
  label: string;
  /** Responsive `sizes` hint for the real image. */
  sizes?: string;
  className?: string;
};

/**
 * Image frame. Shows the real asset when `src` is set; until then it is an
 * honest, labeled placeholder, never a fake screenshot.
 */
export function ProjectFigure({
  src,
  alt,
  label,
  sizes = "(min-width: 1024px) 58vw, 100vw",
  className,
}: ProjectFigureProps) {
  return (
    <div
      className={cn(
        "relative aspect-4/3 overflow-hidden border border-rule bg-grid",
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover object-top"
        />
      ) : (
        <div className="flex h-full flex-col justify-between p-4 font-mono text-label text-muted">
          <span>{label}</span>
          <span>Screenshot to be added</span>
        </div>
      )}
    </div>
  );
}
