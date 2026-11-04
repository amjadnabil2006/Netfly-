import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, ThemeMode } from '../types';
import { translations } from '../translations';

interface ThemeContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  t: (key: keyof typeof translations.ar) => string;
  isRtl: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('sama_capital_lang');
    return (saved === 'en' ? 'en' : 'ar') as Language;
  });

  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('sama_capital_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return 'light'; // Clean luxury marine default
  });

  useEffect(() => {
    localStorage.setItem('sama_capital_lang', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  useEffect(() => {
    localStorage.setItem('sama_capital_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleLanguage = () => {
    setLanguageState(prev => (prev === 'ar' ? 'en' : 'ar'));
  };

  const toggleTheme = () => {
    setThemeState(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode);
  };

  const t = (key: keyof typeof translations.ar): string => {
    const dict = (translations[language] || translations.ar) as any;
    const fallback = (translations.ar as any)[key];
    const val = dict[key] ?? fallback;
    return typeof val === 'string' ? val : '';
  };

  const isRtl = language === 'ar';

  return (
    <ThemeContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        theme,
        setTheme,
        toggleTheme,
        t,
        isRtl
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
