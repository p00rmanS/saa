import type { LucideIcon } from "lucide-react";
import { cn } from "cn";

type Tone = "brand" | "info" | "success" | "warning" | "danger" | "muted";

const TONE_CLASSES: Record<Tone, string> = {
  brand: "border-primary/30 bg-primary/5 text-primary",
  info: "border-info/30 bg-info/5 text-info",
  success: "border-success/30 bg-success/5 text-success",
  warning: "border-warning/30 bg-warning/5 text-warning",
  danger: "border-danger/30 bg-danger/5 text-danger",
  muted: "border-border bg-muted/40 text-foreground",
};

export function Callout({
  icon: Icon,
  title,
  tone = "brand",
  children,
  className,
}: {
  icon?: LucideIcon;
  title?: string;
  tone?: Tone;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-start gap-2.5 rounded-xl border p-3.5 text-sm", TONE_CLASSES[tone], className)}>
      {Icon && <Icon className="mt-0.5 size-4 shrink-0" />}
      <div className="min-w-0 flex-1 text-foreground/90">
        {title && <p className={cn("mb-1 font-medium", TONE_CLASSES[tone].split(" ").pop())}>{title}</p>}
        <div className="text-muted-foreground [&>*]:text-muted-foreground">{children}</div>
      </div>
    </div>
  );
}
