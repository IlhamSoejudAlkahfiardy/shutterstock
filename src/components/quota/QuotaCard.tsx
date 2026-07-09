import { Sparkles } from "lucide-react";

interface QuotaCardProps {
  remaining: number;
  total: number;
}

export function QuotaCard({ remaining, total }: QuotaCardProps) {
  return (
    <aside
      aria-label="Daily quota information"
      className="flex items-start gap-3 rounded-2xl border-2 border-black bg-lavender-pastel px-4 py-4 shadow-brutal transition-all duration-200 sm:px-5"
    >
      <div
        className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl border-2 border-black bg-white shadow-brutal-sm"
        aria-hidden="true"
      >
        <Sparkles className="size-5 text-black" />
      </div>

      <div className="space-y-1">
        <p className="text-sm font-bold text-black sm:text-base">
          Remaining quota:{" "}
          <span className="text-brand-dark">
            {remaining} / {total}
          </span>{" "}
          today
        </p>
        <p className="text-xs font-medium text-neutral-600 sm:text-sm">
          Quota resets every day.
        </p>
      </div>
    </aside>
  );
}
