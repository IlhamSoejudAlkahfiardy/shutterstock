import { Copy } from "lucide-react";
import { useCallback } from "react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { copyToClipboard } from "@/utils/copyToClipboard";

interface ResultCardProps {
  result: string;
}

export function ResultCard({ result }: ResultCardProps) {
  const hasResult = result.trim().length > 0;

  const handleCopy = useCallback(async () => {
    if (!hasResult) return;

    const success = await copyToClipboard(result);
    if (!success) {
      toast.error("Failed to copy to clipboard.");
      return;
    }

    toast.success("Copied!", { duration: 2000 });
  }, [hasResult, result]);

  return (
    <section
      aria-label="Generated description result"
      className="rounded-2xl border-2 border-black bg-white p-4 shadow-brutal transition-all duration-200 sm:p-6"
    >
      <h2 className="mb-4 text-xl font-extrabold text-black sm:text-2xl">
        Generated Result
      </h2>

      <div className="relative">
        <textarea
          readOnly
          value={result}
          placeholder="Your generated description will appear here."
          rows={10}
          aria-label="Generated description text"
          className={cn(
            "min-h-60 w-full resize-none rounded-2xl border-2 border-black bg-mint-pastel/40 px-4 py-4 text-base leading-relaxed font-medium whitespace-pre-wrap text-black transition-all duration-200",
            "placeholder:text-neutral-400",
            "focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:outline-none",
            !hasResult && "text-center placeholder:text-neutral-400",
          )}
        />

        <button
          type="button"
          onClick={handleCopy}
          disabled={!hasResult}
          className={cn(
            "brutal-btn-base brutal-shadow-sm brutal-hover-off brutal-hover-on brutal-active brutal-focus brutal-disabled",
            "absolute right-1 bottom-3 flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-bold text-black",
            "disabled:opacity-40",
          )}
          aria-label="Copy description to clipboard"
        >
          <Copy className="size-4" aria-hidden="true" />
          <span>Copy</span>
        </button>
      </div>
    </section>
  );
}
