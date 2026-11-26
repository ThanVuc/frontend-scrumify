import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locates/en.json";
import vi from "./locates/vi.json";

export const SUPPORTED_LANGUAGES = ["en", "vi"] as const;
export type AppLanguage = (typeof SUPPORTED_LANGUAGES)[number];

const STORAGE_KEY = "scrumify_lang";

const isSupportedLanguage = (value: string | null): value is AppLanguage => {
  return value !== null && (SUPPORTED_LANGUAGES as readonly string[]).includes(value);
};

const getInitialLanguage = (): AppLanguage => {
  if (typeof window === "undefined") {
    return "en";
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return isSupportedLanguage(stored) ? stored : "en";
  } catch {
    return "en";
  }
};

const initialLanguage = getInitialLanguage();

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    vi: { translation: vi },
  },
  lng: initialLanguage,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

if (typeof document !== "undefined") {
  document.documentElement.lang = initialLanguage;
}

i18n.on("languageChanged", (lng) => {
  if (!isSupportedLanguage(lng)) {
    return;
  }

  if (typeof document !== "undefined") {
    document.documentElement.lang = lng;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, lng);
  } catch {
    // Ignore storage access errors in restricted environments
  }
});

export default i18n;
