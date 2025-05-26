import React from 'react';
import { languages } from '@/i18n';

interface LanguageToggleProps {
  currentLang: string;
  onLanguageChange: (lang: string) => void;
}

export default function LanguageToggle({ currentLang, onLanguageChange }: LanguageToggleProps) {
  return (
    <div className="language-toggle">
      {Object.entries(languages).map(([langCode, langName]) => (
        <button
          key={langCode}
          onClick={() => onLanguageChange(langCode)}
          className={currentLang === langCode ? 'active' : ''}
        >
          {langName}
        </button>
      ))}
    </div>
  );
}