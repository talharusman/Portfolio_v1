import { useId } from "react";
import { CircleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

type FieldProps = {
  label: string;
  hint?: string;
  error?: string;
};

const control =
  "block w-full rounded-control border bg-background px-3 py-2.5 text-body text-foreground placeholder:text-muted focus-visible:border-accent focus-visible:outline-offset-0";

// Errors never rely on color alone: heavier border, icon and an "Error:" prefix.
const controlState = (error?: string) =>
  error ? "border-2 border-foreground" : "border-muted";

function Shell({
  id,
  label,
  hint,
  error,
  children,
}: FieldProps & { id: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block font-medium">
        {label}
      </label>
      {hint ? (
        <p id={`${id}-hint`} className="text-muted">
          {hint}
        </p>
      ) : null}
      {children}
      {error ? (
        <p id={`${id}-error`} className="flex items-start gap-2 font-medium">
          <CircleAlert aria-hidden className="mt-0.5 size-4 shrink-0" />
          <span>Error: {error}</span>
        </p>
      ) : null}
    </div>
  );
}

const describedBy = (id: string, { hint, error }: FieldProps) =>
  [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") ||
  undefined;

type TextFieldProps = FieldProps &
  Omit<React.ComponentProps<"input">, "id" | "className">;

export function TextField({ label, hint, error, ...props }: TextFieldProps) {
  const id = useId();
  return (
    <Shell id={id} label={label} hint={hint} error={error}>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, { label, hint, error })}
        className={cn(control, controlState(error))}
        {...props}
      />
    </Shell>
  );
}

type TextAreaFieldProps = FieldProps &
  Omit<React.ComponentProps<"textarea">, "id" | "className">;

export function TextAreaField({
  label,
  hint,
  error,
  rows = 6,
  ...props
}: TextAreaFieldProps) {
  const id = useId();
  return (
    <Shell id={id} label={label} hint={hint} error={error}>
      <textarea
        id={id}
        rows={rows}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, { label, hint, error })}
        className={cn(control, controlState(error), "resize-y")}
        {...props}
      />
    </Shell>
  );
}
