import { ArrowDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Illustrative fragment of alpha-beta pruning (not taken from a repository).
const codeFragment = `def alphabeta(s, d, a, b, max_turn):
    if d == 0 or s.terminal():
        return s.score()
    for m in s.moves():
        v = alphabeta(s.play(m), d - 1, a, b, not max_turn)
        a, b = (max(a, v), b) if max_turn else (a, min(b, v))
        if a >= b:
            break  # prune
    return a if max_turn else b`;

const metadata = [
  "BS Artificial Intelligence",
  "FAST-NUCES",
  "FastAPI / Next.js",
];

function Node({
  title,
  lines,
  emphasis,
  className,
}: {
  title: string;
  lines?: string[];
  emphasis?: boolean;
  className?: string;
}) {
  return (
    <li
      className={cn(
        "border bg-background p-3",
        emphasis ? "border-accent" : "border-rule",
        className,
      )}
    >
      <p className={cn("font-medium", emphasis && "text-accent")}>{title}</p>
      {lines ? (
        <ul className="mt-2 space-y-0.5 font-mono text-label text-muted">
          {lines.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      ) : null}
    </li>
  );
}

function Connector() {
  return (
    <li aria-hidden className="flex items-center justify-center text-muted">
      <ArrowDown className="size-4 sm:hidden" />
      <ArrowRight className="hidden size-4 sm:block" />
    </li>
  );
}

/**
 * Hero visual: a small request-path diagram, one code fragment and metadata on
 * a faint architectural grid. Supporting detail, not the main attraction.
 */
export function HeroVisual() {
  return (
    <div className="border border-rule bg-grid">
      <div className="flex items-center justify-between gap-4 border-b border-rule bg-background px-4 py-2 font-mono text-label text-muted">
        <span>Secure AI Banking Gateway</span>
        <span>request path, simplified</span>
      </div>

      <div className="space-y-6 p-4 sm:p-6">
        <ol
          aria-label="Request path through the gateway"
          className="grid items-stretch gap-2 sm:grid-cols-[1fr_auto_1.35fr_auto_1.1fr]"
        >
          <Node title="Client" lines={["request"]} />
          <Connector />
          <Node
            title="Gateway"
            lines={["JWT", "rate limiting", "redaction"]}
            emphasis
          />
          <Connector />
          <Node title="Model" lines={["Qwen2.5", "GGUF", "llama.cpp"]} />
        </ol>

        <figure>
          <pre
            tabIndex={0}
            role="region"
            aria-label="Illustrative alpha-beta pruning code"
            className="overflow-x-auto border border-rule bg-background p-4 font-mono text-label leading-relaxed"
          >
            <code>{codeFragment}</code>
          </pre>
          <figcaption className="mt-2 font-mono text-label text-muted">
            alpha-beta pruning, illustrative
          </figcaption>
        </figure>
      </div>

      <ul className="flex flex-wrap gap-x-6 gap-y-1 border-t border-rule bg-background px-4 py-2 font-mono text-label text-muted">
        {metadata.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
