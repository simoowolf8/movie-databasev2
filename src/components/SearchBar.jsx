import React, { useState } from "react";
import { useTranslation } from "react-i18next"; // Import

const SearchBar = ({ onSearch, onClear }) => {  
  const { t } = useTranslation(); // Initialize translations
  const [query, setQuery] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    } else {
      alert("Please enter a search term.");
    }
  };

  const handleClearClick = () => {
    setQuery(""); // Clear the input field
    onClear(); // Clear the movies from App state
  };

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t("search_placeholder")}
        className="px-4 py-2 w-full md:w-auto border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
      >
        {t("search_button")}
      </button>
      <button
        type="button"
        onClick={handleClearClick}
        className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition"
      >
        {t("clear_button")}
      </button>
    </form>
  );
};

export default SearchBar;