import { Loader2, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

interface GenerateButtonProps {
  disabled: boolean;
  isLoading: boolean;
  onClick: () => void;
}

export function GenerateButton({
  disabled,
  isLoading,
  onClick,
}: GenerateButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || isLoading}
      className={cn(
        "brutal-btn-base brutal-shadow brutal-hover-off brutal-hover-on brutal-active brutal-focus brutal-disabled",
        "flex w-full items-center justify-center gap-3 rounded-2xl bg-brand px-6 py-4 text-lg font-extrabold text-black",
        "disabled:opacity-50 cursor-pointer",
      )}
      aria-label={isLoading ? "Generating description" : "Generate description"}
      aria-busy={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2
            className="size-5 animate-spin"
            aria-hidden="true"
          />
          <span>Generating...</span>
        </>
      ) : (
        <>
          <Sparkles className="size-5" aria-hidden="true" />
          <span>Generate Description</span>
        </>
      )}
    </button>
  );
}
