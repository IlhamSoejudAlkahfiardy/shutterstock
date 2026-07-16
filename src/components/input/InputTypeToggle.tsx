import { Camera, Clapperboard } from "lucide-react";

import { cn } from "@/lib/utils";
import type { InputType } from "@/types/input";

interface InputTypeOption {
  value: InputType;
  label: string;
  description: string;
  icon: typeof Camera;
}

const OPTIONS: InputTypeOption[] = [
  {
    value: "PHOTO",
    label: "Photo",
    description: "Standalone photograph",
    icon: Camera,
  },
  {
    value: "VIDEO_FRAME",
    label: "Video Frame",
    description: "Still from footage",
    icon: Clapperboard,
  },
];

interface InputTypeToggleProps {
  value: InputType;
  onChange: (value: InputType) => void;
}

export function InputTypeToggle({ value, onChange }: InputTypeToggleProps) {
  return (
    <section
      aria-label="Input type selection"
      className="rounded-2xl border-2 border-black bg-white p-3 shadow-brutal transition-all duration-200 sm:p-4"
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-extrabold tracking-tight text-black sm:text-base">
            Input Type
          </h2>
          <p className="text-xs font-medium text-neutral-500 sm:text-sm">
            Choose how AI should interpret your image.
          </p>
        </div>
      </div>

      <div
        role="radiogroup"
        aria-label="Select input type"
        className="grid grid-cols-2 gap-2 sm:gap-3"
      >
        {OPTIONS.map((option) => {
          const Icon = option.icon;
          const isSelected = value === option.value;

          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange(option.value)}
              className={cn(
                "brutal-btn-base brutal-focus group relative flex flex-col items-start gap-2 rounded-2xl px-3 py-3 text-left sm:px-4 sm:py-4",
                "transition-all duration-200",
                isSelected
                  ? "brutal-shadow border-black bg-brand text-black"
                  : "border-neutral-300 bg-neutral-50 text-neutral-600 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:border-black hover:bg-brand-pastel hover:text-black hover:shadow-brutal-sm",
              )}
            >
              <div
                className={cn(
                  "flex size-9 items-center justify-center rounded-xl border-2 border-black transition-all duration-200 sm:size-10",
                  isSelected
                    ? "bg-white shadow-brutal-sm"
                    : "bg-white group-hover:bg-brand-pastel",
                )}
                aria-hidden="true"
              >
                <Icon className="size-4 sm:size-5" strokeWidth={2.25} />
              </div>

              <div className="space-y-0.5">
                <span className="block text-sm font-extrabold sm:text-base">
                  {option.label}
                </span>
                <span
                  className={cn(
                    "block text-xs font-medium sm:text-sm",
                    isSelected ? "text-black/70" : "text-neutral-500",
                  )}
                >
                  {option.description}
                </span>
              </div>

              {isSelected && (
                <span
                  className="absolute top-2.5 right-2.5 size-2.5 rounded-full border-2 border-black bg-black sm:top-3 sm:right-3"
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
