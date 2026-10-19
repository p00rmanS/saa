import type { LucideIcon } from "lucide-react";
import { cn } from "cn";

type Tone = "brand" | "info" | "success" | "warning" | "danger" | "muted";

const TONE_CLASSES: Record<Tone, string> = {
  brand: "border-primary/50 text-primary",
  info: "border-info/50 text-info",
  success: "border-success/50 text-success",
  warning: "border-warning/60 text-warning",
  danger: "border-danger/50 text-danger",
  muted: "border-border text-foreground",
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
  const toneClasses = TONE_CLASSES[tone];
  return (
    <div className={cn("flex items-start gap-2.5 border-l-2 py-1 pl-4 text-sm", toneClasses.split(" ")[0], className)}>
      {Icon && <Icon className={cn("mt-0.5 size-4 shrink-0", toneClasses.split(" ")[1])} />}
      <div className="min-w-0 flex-1">
        {title && <p className={cn("mb-1 font-semibold", toneClasses.split(" ")[1])}>{title}</p>}
        <div className="text-foreground/85">{children}</div>
      </div>
    </div>
  );
}
