import { ImageIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface UploadPlaceholderProps {
  isDragging: boolean;
}

export function UploadPlaceholder({ isDragging }: UploadPlaceholderProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 px-6 py-16 text-center transition-all duration-200",
        isDragging && "bg-brand/10",
      )}
    >
      <div
        className={cn(
          "flex size-16 items-center justify-center rounded-2xl border-2 border-black bg-brand-pastel shadow-brutal transition-all duration-200",
          isDragging && "scale-105 bg-brand/20",
        )}
        aria-hidden="true"
      >
        <ImageIcon className="size-8 text-black" strokeWidth={2} />
      </div>

      <div className="space-y-1">
        <p className="text-lg font-bold text-black sm:text-xl">
          Drag &amp; Drop your image here
        </p>
        <p className="text-sm font-medium text-neutral-500 sm:text-base">
          or click to browse, or press Ctrl+V to paste
        </p>
      </div>
    </div>
  );
}
