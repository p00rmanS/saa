"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, Sparkles } from "lucide-react";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { Topbar } from "@/components/layout/topbar";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ReadinessRing } from "@/components/readiness-ring";
import { useProgressStore } from "@/lib/store";
import { useHasMounted } from "@/lib/use-has-mounted";
import { computeDomainScores, computeOverallReadiness } from "@/lib/readiness";

function BrandMark() {
  return (
    <Link href="/" className="flex items-center gap-2 px-3 py-4">
      <span className="flex size-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
        <Sparkles className="size-4" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-sm font-semibold tracking-tight">SAA Mentor</span>
        <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          SAA-C03 Prep
        </span>
      </span>
    </Link>
  );
}

function SidebarReadiness() {
  const mounted = useHasMounted();
  const lessons = useProgressStore((s) => s.lessons);
  const questionAttempts = useProgressStore((s) => s.questionAttempts);

  const overall = mounted
    ? computeOverallReadiness(computeDomainScores(lessons, questionAttempts))
    : 0;

  return (
    <div className="mx-3 mb-3 flex items-center gap-3 rounded-xl border border-sidebar-border bg-sidebar-accent/40 p-3">
      <ReadinessRing value={overall} size={44} strokeWidth={4} />
      <div className="min-w-0">
        <p className="text-[11px] font-medium text-sidebar-foreground/60">Readiness</p>
        <p className="truncate text-xs text-sidebar-foreground/80">
          {mounted ? "Keep going!" : "Loading…"}
        </p>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <div className="terminal-bg min-h-screen">
      <div className="flex min-h-screen">
        {/* Desktop sidebar */}
        <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
          <BrandMark />
          <div className="flex-1 overflow-y-auto scrollbar-thin pb-4">
            <SidebarNav />
          </div>
          <SidebarReadiness />
        </aside>

        {/* Mobile sidebar */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent side="left" className="w-72 bg-sidebar p-0">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <BrandMark />
            <div className="flex-1 overflow-y-auto pb-4">
              <SidebarNav onNavigate={() => setMobileOpen(false)} />
            </div>
            <SidebarReadiness />
          </SheetContent>
        </Sheet>

        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar
            mobileTrigger={
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden"
                onClick={() => setMobileOpen(true)}
              >
                <Menu className="size-4" />
              </Button>
            }
          />
          <main className="flex-1">
            <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
