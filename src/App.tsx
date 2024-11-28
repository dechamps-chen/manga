import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from "@mantine/modals";
import { Router } from './Router';
import { useEffect, useState } from 'react';
import { LanguageContext } from './components/LanguageContext';
import { LANGUAGES } from './core/constants';

export default function App() {
  const [language, setLanguage] = useState("en");
  const value = { language, setLanguage };

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language");
    if (!storedLanguage) {
      const defaultLanguage = LANGUAGES.find(l => l.navigator === navigator.language)?.value ?? "en";
      localStorage.setItem("language", defaultLanguage);
      setLanguage(defaultLanguage);
    }
    else {
      setLanguage(storedLanguage);
    }
  }, []);

  return (
    <MantineProvider>
      <LanguageContext.Provider value={value}>
        <ModalsProvider>
          <Router />
        </ModalsProvider>
      </LanguageContext.Provider>
    </MantineProvider>
  );
}
