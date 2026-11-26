import { useTranslation } from "react-i18next";
import { GlobeIcon } from "lucide-react";
import { SUPPORTED_LANGUAGES, type AppLanguage } from "@/i18n";
import { cn } from "@/lib/utils";

const LANGUAGE_LABELS: Record<AppLanguage, string> = {
  en: "EN",
  vi: "VN",
};

export const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const activeLanguage: AppLanguage = i18n.language.startsWith("vi")
    ? "vi"
    : "en";

  return (
    <div
      role="group"
      aria-label={t("common.language")}
      className="inline-flex items-center gap-1 rounded-full border border-white/[0.08] bg-[#18191e] p-0.5 pl-2.5"
    >
      <GlobeIcon
        aria-hidden="true"
        className="mr-0.5 size-3.5 shrink-0 text-[#8a8b98]"
      />
      {SUPPORTED_LANGUAGES.map((lang) => {
        const isActive = activeLanguage === lang;

        return (
          <button
            key={lang}
            type="button"
            onClick={() => void i18n.changeLanguage(lang)}
            className={cn(
              "cursor-pointer rounded-full border px-2.5 py-0.5 text-[11px] tracking-wider transition-colors",
              isActive
                ? "border-white/[0.08] bg-white/[0.08] font-semibold text-[#c7d2fe]"
                : "border-transparent font-medium text-[#8a8b98] hover:text-white",
            )}
          >
            {LANGUAGE_LABELS[lang]}
          </button>
        );
      })}
    </div>
  );
};
