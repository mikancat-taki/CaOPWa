import { apiRequest } from "./queryClient";

export interface TranslationResult {
  originalText: string;
  translatedText: string;
  fromLang: string;
  toLang: string;
}

export async function translateText(
  text: string, 
  fromLang: string, 
  toLang: string
): Promise<TranslationResult> {
  const response = await apiRequest("POST", "/api/translate", {
    text,
    fromLang,
    toLang
  });
  
  return response.json();
}
