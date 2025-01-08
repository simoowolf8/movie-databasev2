import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="absolute top-4 right-4 flex items-center space-x-3">
          <button
          onClick={() => changeLanguage("en")} // Change to English
          className="flex items-center px-7 py-1 bg-gray-200 rounded-full hover:bg-gray-300"
        >
        <img
          src="flags/us.png"
          alt="English"
          className="w-4 h-4 mr-1"
        />
        English
      </button>
      <button
          onClick={() => changeLanguage("fr")} // Change to fr
          className="flex items-center px-7 py-1 bg-gray-200 rounded-full hover:bg-gray-300"
        >
        <img
          src="flags/fr.png"
          alt="Français"
          className="w-4 h-4 mr-1"
        />
        Français
      </button>
      <button
          onClick={() => changeLanguage("es")} // Change to English
          className="flex items-center px-7 py-1 bg-gray-200 rounded-full hover:bg-gray-300"
        >
        <img
          src="flags/es.png"
          alt="Español"
          className="w-4 h-4 mr-1"
        />
        Español
      </button>
    </div>
  );
};

export default LanguageSelector;
