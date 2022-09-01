import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./en/translationEN.json";
import translatealert from "./en/translatealert.json";
import translatevalidate from "./en/translatevalidate.json";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  "en-GB": {
    translation: translationEN,
    translation1: translatealert,
    translation2: translatevalidate,
  },
  en: {
    translation: translationEN,
    translation1: translatealert,
    translation2: translatevalidate,
  },
};

// initialize i18n
i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    lng: localStorage.getItem("i18nextLng"),
    fallbackLng: "en",
    resources,
    debug: false,
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
