import { ArrowDown } from "lucide-react";
import { Tag } from "@/components/ui/Tag";
import type { Architecture } from "@/data/projects/types";

/**
 * Layered architecture diagram built from real markup, so text stays readable
 * and selectable at every width. Only the layers a project uses are listed.
 */
export function ArchitectureDiagram({
  architecture,
  title,



  
}: {
  architecture: Architecture;
  title: string;
}) {
  return (
    <figure>
      <ol
        aria-label={`${title} architecture, layers from top to bottom`}
        className="border border-rule bg-grid"
      >
        {architecture.layers.map((layer, index) => (
          <li key={layer.label}>
            {index > 0 ? (
              <div aria-hidden className="flex justify-center text-muted">
                <ArrowDown className="size-4" />
              </div>
            ) : null}
            <div className="grid gap-3 p-4 sm:grid-cols-[8rem_1fr]">
              <p className="pt-2 font-mono text-label text-muted">{layer.label}</p>
              <ul className="flex flex-wrap gap-2">
                {layer.nodes.map((node) => (
                  <li
                    key={node.name}
                    className="min-w-0 border border-rule bg-background px-3 py-2"
                  >
                    <p className="font-medium">{node.name}</p>
                    {node.detail ? (
                      <p className="font-mono text-label text-muted">{node.detail}</p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
      <figcaption className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-muted">
        {architecture.status === "draft" ? <Tag tone="accent">Draft</Tag> : null}
        <span>
          {architecture.caption}
          {architecture.status === "draft"
            ? " To be checked against the repository."
            : ""}
        </span>
      </figcaption>
    </figure>
  );
}
