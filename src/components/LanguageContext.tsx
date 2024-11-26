import React from "react";

export const LanguageContext = React.createContext({
    language: "en",
    setLanguage: (language: string) => {},
});