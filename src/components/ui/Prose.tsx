import { cn } from "@/lib/utils";

/** Long-form reading text: serif, 65-character measure, even paragraph rhythm. */
export function Prose({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "max-w-measure font-serif text-body [&>p+p]:mt-5 [&>h3]:mt-10 [&>h3]:mb-3 [&>h3]:font-sans [&>h3]:text-h3 [&>h3]:font-semibold",
        className,
      )}
      {...props}
    />
  );
}
