import Link from "next/link";
import { Clock, FlaskConical } from "lucide-react";
import { labs } from "@/data/labs";

export const metadata = { title: "Labs — SAA Mentor" };

export default function LabsPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Labs</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        {labs.length} hands-on, guided labs. Each one includes a goal, architecture, steps, expected
        result, and cleanup instructions — always clean up to avoid unexpected AWS charges.
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {labs.map((lab) => (
          <Link
            key={lab.id}
            href={`/labs/${lab.id}`}
            className="group flex flex-col gap-2 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-muted/30"
          >
            <div className="flex items-center gap-2">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <FlaskConical className="size-4" />
              </span>
              <p className="text-sm font-medium group-hover:text-primary">{lab.title}</p>
            </div>
            <p className="line-clamp-2 text-xs text-muted-foreground">{lab.goal}</p>
            <span className="mt-auto flex items-center gap-1 pt-1 text-xs text-muted-foreground">
              <Clock className="size-3" /> {lab.estimatedTime}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
