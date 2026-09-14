"use client";

import * as React from "react";
import { Download, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/callout";
import { useProgressStore } from "@/lib/store";
import { useHasMounted } from "@/lib/use-has-mounted";
import type { TaglishMode } from "@/lib/types";
import { cn } from "cn";
import { StudyPlanCard } from "@/components/study-plan-card";

const TAGLISH_OPTIONS: { value: TaglishMode; label: string; description: string }[] = [
  { value: "english", label: "English", description: "Explanations in English only" },
  { value: "taglish", label: "Taglish", description: "Explanations in Taglish only" },
  { value: "both", label: "Both", description: "Show English and Taglish side by side" },
];

function SettingRow({
  title,
  description,
  checked,
  onCheckedChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-border bg-card p-4">
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}

export default function SettingsPage() {
  const mounted = useHasMounted();
  const settings = useProgressStore((s) => s.settings);
  const updateSettings = useProgressStore((s) => s.updateSettings);
  const resetProgress = useProgressStore((s) => s.resetProgress);
  const [confirmingReset, setConfirmingReset] = React.useState(false);

  function exportProgress() {
    const state = useProgressStore.getState();
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "saa-mentor-progress.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  if (!mounted) return <div className="h-96" />;

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Settings</h1>
        <p className="mt-2 text-muted-foreground">Tune how lessons are taught and how you study.</p>
      </div>

      <div>
        <h2 className="mb-3 text-lg font-semibold tracking-tight">Language</h2>
        <div className="grid gap-2 sm:grid-cols-3">
          {TAGLISH_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => updateSettings({ taglishMode: opt.value })}
              className={cn(
                "rounded-xl border p-4 text-left transition-colors",
                settings.taglishMode === opt.value
                  ? "border-primary/50 bg-primary/5"
                  : "border-border hover:bg-muted/30"
              )}
            >
              <p className={cn("text-sm font-medium", settings.taglishMode === opt.value && "text-primary")}>
                {opt.label}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">{opt.description}</p>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-3 text-lg font-semibold tracking-tight">Learning Modes</h2>
        <div className="flex flex-col gap-2">
          <SettingRow
            title="Mentor Mode"
            description="Show extra Mentor Tip callouts throughout lessons"
            checked={settings.mentorMode}
            onCheckedChange={(v) => updateSettings({ mentorMode: v })}
          />
          <SettingRow
            title="Beginner Mode"
            description="Lead with the analogy before the technical explanation"
            checked={settings.beginnerMode}
            onCheckedChange={(v) => updateSettings({ beginnerMode: v })}
          />
          <SettingRow
            title="Exam Mode"
            description="Collapse long teaching text; keep keywords, traps, and quizzes front and center"
            checked={settings.examMode}
            onCheckedChange={(v) => updateSettings({ examMode: v })}
          />
        </div>
      </div>

      <div>
        <h2 className="mb-3 text-lg font-semibold tracking-tight">Study Plan Generator</h2>
        <StudyPlanCard />
      </div>

      <div>
        <h2 className="mb-3 text-lg font-semibold tracking-tight">Your Data</h2>
        <Callout tone="muted" className="mb-3">
          <p>
            All your progress (completed lessons, quiz history, flashcard status, mock exam results) is
            stored locally in this browser — nothing is sent to a server.
          </p>
        </Callout>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={exportProgress}>
            <Download className="size-4" /> Export progress as JSON
          </Button>
          {!confirmingReset ? (
            <Button variant="destructive" onClick={() => setConfirmingReset(true)}>
              <Trash2 className="size-4" /> Reset all progress
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-sm text-danger">Are you sure? This can&apos;t be undone.</span>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  resetProgress();
                  setConfirmingReset(false);
                }}
              >
                Yes, reset
              </Button>
              <Button variant="outline" size="sm" onClick={() => setConfirmingReset(false)}>
                Cancel
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
