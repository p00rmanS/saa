"use client";

import { Check, X } from "lucide-react";
import { cn } from "cn";
import type { Question } from "@/lib/types";

export function QuestionOptions({
  question,
  selected,
  onChange,
  revealed,
  disabled,
}: {
  question: Question;
  selected: string[];
  onChange: (next: string[]) => void;
  revealed: boolean;
  disabled?: boolean;
}) {
  const isMultiple = question.type === "multiple";

  function toggle(optionId: string) {
    if (disabled) return;
    if (isMultiple) {
      onChange(
        selected.includes(optionId)
          ? selected.filter((id) => id !== optionId)
          : [...selected, optionId]
      );
    } else {
      onChange([optionId]);
    }
  }

  return (
    <div className="flex flex-col gap-2" role={isMultiple ? "group" : "radiogroup"}>
      {question.options.map((opt) => {
        const isSelected = selected.includes(opt.id);
        const isCorrect = question.correctAnswers.includes(opt.id);
        const showCorrect = revealed && isCorrect;
        const showIncorrect = revealed && isSelected && !isCorrect;

        return (
          <button
            key={opt.id}
            type="button"
            role={isMultiple ? "checkbox" : "radio"}
            aria-checked={isSelected}
            disabled={disabled}
            onClick={() => toggle(opt.id)}
            className={cn(
              "flex items-start gap-3 rounded-lg border px-3 py-2.5 text-left text-sm transition-colors",
              !revealed && isSelected && "border-primary/50 bg-primary/5",
              !revealed && !isSelected && "border-border hover:bg-muted/50",
              showCorrect && "border-success/50 bg-success/10",
              showIncorrect && "border-danger/50 bg-danger/10",
              revealed && !isSelected && !isCorrect && "border-border opacity-60",
              disabled && !revealed && "cursor-default"
            )}
          >
            <span
              className={cn(
                "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border text-[10px]",
                isMultiple && "rounded-[4px]",
                !revealed && isSelected && "border-primary bg-primary text-primary-foreground",
                !revealed && !isSelected && "border-muted-foreground/40",
                showCorrect && "border-success bg-success text-success-foreground",
                showIncorrect && "border-danger bg-danger text-danger-foreground"
              )}
            >
              {showCorrect && <Check className="size-3" />}
              {showIncorrect && <X className="size-3" />}
              {!revealed && isSelected && !isMultiple && <span className="size-1.5 rounded-full bg-current" />}
            </span>
            <span className="flex-1">
              <span className="block">{opt.text}</span>
              {revealed && question.optionExplanations[opt.id] && (
                <span
                  className={cn(
                    "mt-1 block text-xs",
                    showCorrect ? "text-success" : showIncorrect ? "text-danger" : "text-muted-foreground"
                  )}
                >
                  {question.optionExplanations[opt.id]}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
