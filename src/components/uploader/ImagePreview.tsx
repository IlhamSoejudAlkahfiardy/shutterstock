import { Trash2 } from "lucide-react";

import { cn } from "@/lib/utils";

interface ImagePreviewProps {
  previewUrl: string;
  fileName: string;
  isDragging: boolean;
  onDelete: () => void;
}

export function ImagePreview({
  previewUrl,
  fileName,
  isDragging,
  onDelete,
}: ImagePreviewProps) {
  return (
    <div
      className={cn(
        "group relative aspect-[16/10] w-full overflow-hidden rounded-2xl border-2 border-black transition-all duration-200",
        isDragging && "border-brand bg-brand/10",
      )}
    >
      <img
        src={previewUrl}
        alt={`Preview of ${fileName}`}
        className="size-full animate-in fade-in object-contain duration-200"
      />

      <div
        className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-200 group-hover:bg-black/40 group-hover:opacity-100 group-focus-within:bg-black/40 group-focus-within:opacity-100"
        aria-hidden="true"
      />

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onDelete();
        }}
        className="brutal-btn-base brutal-hover-off-centered brutal-hover-on-centered brutal-active-centered brutal-focus absolute top-1/2 left-1/2 flex items-center gap-2 rounded-2xl bg-red-500 px-5 py-3 text-sm font-bold text-white opacity-0 hover:bg-red-600 focus-visible:opacity-100 group-hover:opacity-100"
        aria-label="Remove uploaded image"
      >
        <Trash2 className="size-5" aria-hidden="true" />
        Delete
      </button>
    </div>
  );
}
