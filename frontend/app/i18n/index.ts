// Internationalization (i18n) configuration
import { en } from '../components/locales/en';
import { fa } from '../components/locales/fa';

export const languages = {
  en: 'English',
  fa: 'فارسی'
};

export const defaultLanguage = 'en';

export const translations = {
  en,
  fa
};

/**
 * Get browser's preferred language
 * @returns Supported language code (default: 'en')
 */
export const getBrowserLanguage = (): string => {
  const userLang = navigator.language.split('-')[0];
  return userLang in languages ? userLang : defaultLanguage;
};