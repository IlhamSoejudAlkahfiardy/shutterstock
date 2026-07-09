import { useCallback, useEffect, useRef, useState } from "react";

import { ACCEPTED_IMAGE_TYPES } from "@/types/image";

interface UseImageUploadReturn {
  image: File | null;
  previewUrl: string | null;
  isDragging: boolean;
  error: string | null;
  inputRef: React.RefObject<HTMLInputElement | null>;
  openFilePicker: () => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDelete: () => void;
  handleDragEnter: (event: React.DragEvent<HTMLElement>) => void;
  handleDragLeave: (event: React.DragEvent<HTMLElement>) => void;
  handleDragOver: (event: React.DragEvent<HTMLElement>) => void;
  handleDrop: (event: React.DragEvent<HTMLElement>) => void;
  handlePaste: (event: React.ClipboardEvent<HTMLElement>) => void;
}

function isValidImageFile(file: File): boolean {
  return ACCEPTED_IMAGE_TYPES.includes(
    file.type as (typeof ACCEPTED_IMAGE_TYPES)[number],
  );
}

function getImageFromClipboard(
  clipboardData: DataTransfer | null,
): File | null {
  if (!clipboardData) return null;

  const imageItem = Array.from(clipboardData.items).find((item) =>
    item.type.startsWith("image/"),
  );

  return imageItem?.getAsFile() ?? null;
}

function isEditableTextTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;

  if (target.isContentEditable) return true;

  if (target instanceof HTMLInputElement) {
    return target.type !== "file" && !target.readOnly && !target.disabled;
  }

  if (target instanceof HTMLTextAreaElement) {
    return !target.readOnly && !target.disabled;
  }

  return false;
}

export function useImageUpload(): UseImageUploadReturn {
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dragCounterRef = useRef(0);

  const revokePreviewUrl = useCallback((url: string | null) => {
    if (url) {
      URL.revokeObjectURL(url);
    }
  }, []);

  const setImageFile = useCallback(
    (file: File | null) => {
      if (!file) return;

      if (!isValidImageFile(file)) {
        setError("Please upload a valid image file (JPG, PNG, WEBP, or GIF).");
        return;
      }

      setError(null);
      setPreviewUrl((currentUrl) => {
        revokePreviewUrl(currentUrl);
        return URL.createObjectURL(file);
      });
      setImage(file);
    },
    [revokePreviewUrl],
  );

  const handleDelete = useCallback(() => {
    setPreviewUrl((currentUrl) => {
      revokePreviewUrl(currentUrl);
      return null;
    });
    setImage(null);
    setError(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }, [revokePreviewUrl]);

  const openFilePicker = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        setImageFile(file);
      }
    },
    [setImageFile],
  );

  const handleDragEnter = useCallback(
    (event: React.DragEvent<HTMLElement>) => {
      event.preventDefault();
      event.stopPropagation();
      dragCounterRef.current += 1;
      setIsDragging(true);
    },
    [],
  );

  const handleDragLeave = useCallback(
    (event: React.DragEvent<HTMLElement>) => {
      event.preventDefault();
      event.stopPropagation();
      dragCounterRef.current -= 1;

      if (dragCounterRef.current <= 0) {
        dragCounterRef.current = 0;
        setIsDragging(false);
      }
    },
    [],
  );

  const handleDragOver = useCallback((event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLElement>) => {
      event.preventDefault();
      event.stopPropagation();
      dragCounterRef.current = 0;
      setIsDragging(false);

      const file = event.dataTransfer.files?.[0];
      if (file) {
        setImageFile(file);
      }
    },
    [setImageFile],
  );

  const handlePaste = useCallback(
    (event: React.ClipboardEvent<HTMLElement>) => {
      const file = getImageFromClipboard(event.clipboardData);
      if (!file) return;

      event.preventDefault();
      event.stopPropagation();
      setImageFile(file);
    },
    [setImageFile],
  );

  const handleDocumentPaste = useCallback(
    (event: ClipboardEvent) => {
      const file = getImageFromClipboard(event.clipboardData);
      if (!file) return;

      if (isEditableTextTarget(event.target)) return;

      event.preventDefault();
      setImageFile(file);
    },
    [setImageFile],
  );

  useEffect(() => {
    document.addEventListener("paste", handleDocumentPaste);
    return () => document.removeEventListener("paste", handleDocumentPaste);
  }, [handleDocumentPaste]);

  useEffect(() => {
    return () => {
      revokePreviewUrl(previewUrl);
    };
  }, [previewUrl, revokePreviewUrl]);

  return {
    image,
    previewUrl,
    isDragging,
    error,
    inputRef,
    openFilePicker,
    handleFileChange,
    handleDelete,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handlePaste,
  };
}
