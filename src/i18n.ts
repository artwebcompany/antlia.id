import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

i18n
  .use(HttpApi) 
  .use(LanguageDetector) 
  .use(initReactI18next) 
  .init({
 
    fallbackLng: "id", 
    supportedLngs: ["id", "en"], 
    detection: {
      order: ["path", "cookie", "htmlTag", "localStorage", "subdomain"],
      caches: ["cookie"],
    },
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    react: {
      useSuspense: true, 
    },
    // NAMESPACE 
    ns: ["home", "navbar", "homepage", "products", "about", 
         "clients", "contact", "articles", "services", 
         "service_detail", "solutions", "hero", "footer"], 
    defaultNS: "navbar", 
    debug: true,
  });

export default i18n;
