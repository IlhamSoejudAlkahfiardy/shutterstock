import { useCallback, useState } from "react";

import { GenerateButton } from "@/components/button/GenerateButton";
import { Header } from "@/components/header/Header";
import { InputTypeToggle } from "@/components/input/InputTypeToggle";
// import { QuotaCard } from "@/components/quota/QuotaCard";
import { ResultCard } from "@/components/result/ResultCard";
import { ImageUploader } from "@/components/uploader/ImageUploader";
import {
  // DAILY_QUOTA_LIMIT,
  DAILY_QUOTA_REMAINING,
} from "@/constants/quota";
import { useImageUpload } from "@/hooks/useImageUpload";
import { generateDescription } from "@/services/ai.service";
import type { InputType } from "@/types/input";

export function HomePage() {
  const {
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
  } = useImageUpload();

  const [isLoading, setIsLoading] = useState(false);
  const [generatedText, setGeneratedText] = useState("");
  const [remainingQuota, setRemainingQuota] = useState(DAILY_QUOTA_REMAINING);
  const [inputType, setInputType] = useState<InputType>("PHOTO");

  const handleGenerate = useCallback(async () => {
    if (!image || isLoading || remainingQuota <= 0) return;

    setIsLoading(true);

    try {
      const description = await generateDescription(image, inputType);
      setGeneratedText(description);
      setRemainingQuota((current) => Math.max(current - 1, 0));
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to generate description. Please try again.";
      setGeneratedText(message);
    } finally {
      setIsLoading(false);
    }
  }, [image, inputType, isLoading, remainingQuota]);

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      <Header />

      <InputTypeToggle value={inputType} onChange={setInputType} />

      <ImageUploader
        image={image}
        previewUrl={previewUrl}
        isDragging={isDragging}
        error={error}
        inputRef={inputRef}
        onOpenFilePicker={openFilePicker}
        onFileChange={handleFileChange}
        onDelete={handleDelete}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onPaste={handlePaste}
      />

      <GenerateButton
        disabled={!image || remainingQuota <= 0}
        isLoading={isLoading}
        onClick={handleGenerate}
      />

      {/* <QuotaCard remaining={remainingQuota} total={DAILY_QUOTA_LIMIT} /> */}

      <ResultCard result={generatedText} />
    </div>
  );
}
