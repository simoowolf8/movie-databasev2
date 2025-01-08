import React, { useState, useEffect } from "react";
import { fetchMovies, fetchMovieDetails } from "./services/movieService";
import SearchBar from "./components/SearchBar";
import MovieDetails from "./components/MovieDetails";
import { useTranslation } from "react-i18next"; // Import
import LanguageSelector from "./components/LanguageSelector";
import Favorites from "./components/Favorites"; // Import Favorites Component

const App = () => {
  const { t } = useTranslation(); // Initialize translations
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0); // Track total results
  const [showFavorites, setShowFavorites] = useState(false); // Track whether to show favorites

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Fetch movies from the API
  const fetchMoviesFromAPI = async (searchTerm, page = 1) => {
    setError("");
    setQuery(searchTerm);
    setLoading(true);

    try {
      const results = await fetchMovies(searchTerm, page); // Include `page`
      setMovies(results || []);

      if (results?.totalResults) {
        setTotalResults(parseInt(results.totalResults, 10));
      } else {
        setTotalResults(results.length * 10); // Default for 10 results per page
      }

      setCurrentPage(page); // Update current page

      if (!results || results.length === 0) {
        setError(t("no_movies_found", { query }));
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle movie click to show details
  const handleMovieClick = async (id) => {
    try {
      const movie = await fetchMovieDetails(id);
      setSelectedMovie(movie);
    } catch (err) {
      console.error("Error fetching movie details:", err);
    }
  };

  // Handle clearing search results
  const handleClear = () => {
    setMovies([]);
    setQuery("");
    setError("");
  };

  // Add or remove favorite movies
  const toggleFavorite = (movie) => {
    if (favorites.some((fav) => fav.imdbID === movie.imdbID)) {
      setFavorites(favorites.filter((fav) => fav.imdbID !== movie.imdbID));
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  // Remove favorite movie (used in the Favorites component)
  const removeFavorite = (movie) => {
    setFavorites(favorites.filter((fav) => fav.imdbID !== movie.imdbID));
  };

  // Check if a movie is a favorite
  const isFavorite = (movie) => {
    return favorites.some((fav) => fav.imdbID === movie.imdbID);
  };

  // Pagination: Go to the next page
  const handleNextPage = () => {
    if (currentPage < Math.ceil(totalResults / 10)) {
      fetchMoviesFromAPI(query, currentPage + 1);
    }
  };

  // Pagination: Go to the previous page
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      fetchMoviesFromAPI(query, currentPage - 1);
    }
  };

  // Calculate total pages
  const totalPages = Math.ceil(totalResults / 10);

  return (
    <div className="relative min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {/* Language Selector positioned at the top-right */}
      <div className="absolute top-4 right-4 flex items-center space-x-2">
        <LanguageSelector />
      </div>

      {/* View Favorites Button */}
      <div className="absolute top-4 left-4">
        <button
          onClick={() => setShowFavorites(!showFavorites)}
          className={`px-4 py-2 rounded-md mb-4 ${
            showFavorites ? "bg-red-600 hover:bg-red-700" : "bg-red-700 hover:bg-red-700"
          } text-white`}
        >
          {showFavorites ? t("header") : t("favorites")}
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-6">{t("header")}</h1>

      {showFavorites ? (
        <Favorites favorites={favorites} onRemove={removeFavorite} />
      ) : (
        <>
          <SearchBar onSearch={fetchMoviesFromAPI} onClear={handleClear} />
          {loading && <p className="text-blue-500 mb-4">{t("loading_message")}</p>}
          {error && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              <strong className="font-bold">{t("error_label")}:</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {movies.map((movie) => (
              <div
                key={movie.imdbID}
                className="border p-4 rounded-md shadow-md hover:shadow-lg transition cursor-pointer"
                onClick={() => handleMovieClick(movie.imdbID)}
              >
                <img
                  src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder-image.jpg"}
                  alt={movie.Title}
                  className="w-full h-64 object-cover rounded-md"
                />
                <h3 className="mt-4 text-lg font-semibold">{movie.Title}</h3>
                <p className="text-gray-500">{movie.Year}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(movie);
                  }}
                  className={`mt-2 px-4 py-2 text-white rounded-md ${
                    isFavorite(movie) ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
                  }`}
                >
                  {isFavorite(movie) ? t("remove_favorite") : t("add_to_favorites")}
                </button>
              </div>
            ))}
          </div>
          {movies.length > 0 && totalPages > 1 && (
            <div className="flex justify-center items-center mt-6 space-x-2">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:bg-gray-200"
              >
                {t("pagination_previous")}
              </button>
              <span className="text-gray-700">
                {t("pagination_page", { currentPage, totalPages })}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:bg-gray-200"
              >
                {t("pagination_next")}
              </button>
            </div>
          )}
        </>
      )}
      {selectedMovie && (
        <MovieDetails movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
};

export default App;
