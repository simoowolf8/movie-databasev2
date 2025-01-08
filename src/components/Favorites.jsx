// src/components/Favorites.jsx
import React from "react";
import { useTranslation } from "react-i18next";

const Favorites = ({ favorites, onRemove }) => {
  const { t } = useTranslation();
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{t("favorites")}</h2>
      {favorites.length === 0 ? (
        <p className="text-gray-500">No {t("favorites")}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favorites.map((movie) => (
            <div
              key={movie.imdbID}
              className="border p-4 rounded-md shadow-md hover:shadow-lg transition cursor-pointer"
            >
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder-image.jpg"}
                alt={movie.Title}
                className="w-full h-64 object-cover rounded-md"
              />
              <h3 className="mt-4 text-lg font-semibold">{movie.Title}</h3>
              <p className="text-gray-500">{movie.Year}</p>
              <button
                onClick={() => onRemove(movie)}
                className="mt-2 px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
              >
                {t("remove_favorite")}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
