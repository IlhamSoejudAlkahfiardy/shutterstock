import { ACCEPTED_IMAGE_EXTENSIONS } from "@/types/image";
import { cn } from "@/lib/utils";

import { ImagePreview } from "./ImagePreview";
import { UploadPlaceholder } from "./UploadPlaceholder";

interface ImageUploaderProps {
  image: File | null;
  previewUrl: string | null;
  isDragging: boolean;
  error: string | null;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onOpenFilePicker: () => void;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete: () => void;
  onDragEnter: (event: React.DragEvent<HTMLElement>) => void;
  onDragLeave: (event: React.DragEvent<HTMLElement>) => void;
  onDragOver: (event: React.DragEvent<HTMLElement>) => void;
  onDrop: (event: React.DragEvent<HTMLElement>) => void;
  onPaste: (event: React.ClipboardEvent<HTMLElement>) => void;
}

export function ImageUploader({
  image,
  previewUrl,
  isDragging,
  error,
  inputRef,
  onOpenFilePicker,
  onFileChange,
  onDelete,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
  onPaste,
}: ImageUploaderProps) {
  const hasImage = Boolean(image && previewUrl);

  return (
    <section
      data-image-uploader
      aria-label="Image upload"
      className="rounded-2xl border-2 border-black bg-white p-4 shadow-brutal transition-all duration-200 sm:p-6"
    >
      <div
        role="button"
        tabIndex={0}
        onClick={onOpenFilePicker}
        onPaste={onPaste}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onOpenFilePicker();
          }
        }}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
        className={cn(
          "cursor-pointer rounded-2xl border-2 border-dashed border-neutral-300 bg-neutral-50 transition-all duration-200 hover:border-black hover:bg-brand-pastel/50 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:outline-none",
          isDragging && "border-brand bg-brand/10",
          hasImage && "border-solid border-black bg-white p-2 hover:bg-white",
        )}
        aria-label={
          hasImage
            ? "Replace image by dragging a new file, clicking to browse, or pasting with Ctrl+V"
            : "Upload image by dragging and dropping, clicking to browse, or pasting with Ctrl+V"
        }
      >
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_IMAGE_EXTENSIONS}
          onChange={onFileChange}
          className="sr-only"
          aria-hidden="true"
          tabIndex={-1}
        />

        {hasImage && previewUrl && image ? (
          <ImagePreview
            previewUrl={previewUrl}
            fileName={image.name}
            isDragging={isDragging}
            onDelete={onDelete}
          />
        ) : (
          <UploadPlaceholder isDragging={isDragging} />
        )}
      </div>

      {error && (
        <p
          role="alert"
          className="mt-3 text-sm font-semibold text-red-600"
        >
          {error}
        </p>
      )}
    </section>
  );
}
