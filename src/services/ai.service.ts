import { createGroq } from "@ai-sdk/groq";
import { generateText } from "ai";
import imageCompression from "browser-image-compression";

import { imageToBase64, toImageDataUrl } from "@/utils/imageToBase64";
import prompts from "@/assets/prompts";

const groq = createGroq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
});

const prompt = prompts[1];

export async function generateDescription(image: File): Promise<string> {
  const compressed = await imageCompression(image, {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    initialQuality: 0.85,
  });

  const imagePayload = await imageToBase64(compressed);
  const dataUrl = toImageDataUrl(imagePayload);

  const { text } = await generateText({
    model: groq("meta-llama/llama-4-scout-17b-16e-instruct"),
    temperature: 1,
    maxOutputTokens: 512,
    topP: 1,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: prompt,
          },
          {
            type: "image",
            image: dataUrl,
          },
        ],
      },
    ],
  });

  return text;
}
