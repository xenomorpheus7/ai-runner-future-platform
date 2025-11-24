import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import enTranslations from '../locales/en.json';
import slTranslations from '../locales/sl.json';
import { translateToSlovenian } from '../services/deeplService';

type Language = 'en' | 'sl';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  translateText: (text: string) => Promise<string>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: enTranslations,
  sl: slTranslations,
};

// Cache for dynamically translated text
const dynamicTranslationCache = new Map<string, string>();

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Get language from localStorage or default to 'en'
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage && (savedLanguage === 'en' || savedLanguage === 'sl') ? savedLanguage : 'en';
  });

  // Update html class based on language
  useEffect(() => {
    document.documentElement.classList.remove('lang-en', 'lang-sl');
    document.documentElement.classList.add(`lang-${language}`);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  // Translation function that supports nested keys (e.g., "nav.home")
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to English if key not found
        value = translations.en;
        for (const k2 of keys) {
          if (value && typeof value === 'object' && k2 in value) {
            value = value[k2];
          } else {
            return key; // Return key if not found even in English
          }
        }
        break;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  // Function to translate dynamic text using DeepL
  const translateText = useCallback(async (text: string): Promise<string> => {
    if (language === 'en' || !text || text.trim() === '') {
      return text;
    }

    // Check cache first
    const cacheKey = `dynamic-${text}`;
    if (dynamicTranslationCache.has(cacheKey)) {
      return dynamicTranslationCache.get(cacheKey)!;
    }

    // Use DeepL to translate
    const translated = await translateToSlovenian(text);
    dynamicTranslationCache.set(cacheKey, translated);
    return translated;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translateText }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

