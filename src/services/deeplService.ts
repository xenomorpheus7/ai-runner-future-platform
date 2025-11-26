/**
 * DeepL Translation Service
 * Translates text from English to Slovenian using DeepL API
 */

const DEEPL_API_KEY = import.meta.env.VITE_DEEPL_API_KEY;
const DEEPL_API_URL = 'https://api-free.deepl.com/v2/translate';

interface DeepLResponse {
  translations: Array<{
    detected_source_language: string;
    text: string;
  }>;
}

// Cache for translations to avoid redundant API calls
const translationCache = new Map<string, string>();

/**
 * Translate text from English to Slovenian using DeepL API
 * Falls back to cached translations or returns original text if API fails
 */
export const translateToSlovenian = async (text: string): Promise<string> => {
  // Return original if empty
  if (!text || text.trim() === '') {
    return text;
  }

  // Check cache first
  const cacheKey = `en-sl-${text}`;
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey)!;
  }

  // If no API key, return original text
  if (!DEEPL_API_KEY) {
    console.warn('DeepL API key not found. Add VITE_DEEPL_API_KEY to your .env file for translations.');
    return text;
  }

  try {
    const response = await fetch(DEEPL_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `DeepL-Auth-Key ${DEEPL_API_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        text: text,
        target_lang: 'SL',
        source_lang: 'EN',
      }),
    });

    if (!response.ok) {
      throw new Error(`DeepL API error: ${response.status}`);
    }

    const data: DeepLResponse = await response.json();
    const translatedText = data.translations[0]?.text || text;

    // Cache the translation
    translationCache.set(cacheKey, translatedText);

    return translatedText;
  } catch (error) {
    console.error('DeepL translation error:', error);
    // Return original text on error
    return text;
  }
};

/**
 * Translate an object recursively (for nested translation objects)
 */
export const translateObject = async (obj: any, targetLang: 'sl'): Promise<any> => {
  if (targetLang !== 'sl') {
    return obj;
  }

  if (typeof obj === 'string') {
    return await translateToSlovenian(obj);
  }

  if (Array.isArray(obj)) {
    return Promise.all(obj.map(item => translateObject(item, targetLang)));
  }

  if (obj && typeof obj === 'object') {
    const translated: any = {};
    for (const key in obj) {
      translated[key] = await translateObject(obj[key], targetLang);
    }
    return translated;
  }

  return obj;
};

/**
 * Clear translation cache
 */
export const clearTranslationCache = () => {
  translationCache.clear();
};



