export interface ImageBase64Result {
  base64: string;
  mimeType: string;
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result !== "string") {
        reject(new Error("Failed to read image file."));
        return;
      }

      resolve(reader.result);
    };

    reader.onerror = () => {
      reject(new Error("Failed to read image file."));
    };

    reader.readAsDataURL(file);
  });
}

export async function imageToBase64(image: File): Promise<ImageBase64Result> {
  if (!image.type.startsWith("image/")) {
    throw new Error("Invalid file type. Please upload an image.");
  }

  const dataUrl = await readFileAsDataUrl(image);
  const base64 = dataUrl.split(",")[1];

  if (!base64) {
    throw new Error("Failed to convert image to base64.");
  }

  return {
    base64,
    mimeType: image.type,
  };
}

export function toImageDataUrl({ base64, mimeType }: ImageBase64Result): string {
  return `data:${mimeType};base64,${base64}`;
}
