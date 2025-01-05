import React, { useState } from "react";
import { fetchMovies } from "./services/movieService";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState(""); // State for error messages

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    try {
      const results = await fetchMovies(query);
      setMovies(results || []);
    } catch (err) {
      setError(err.message); // Set error message
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Search Movies</h1>
      <form onSubmit={handleSearch} className="flex space-x-4 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter movie title..."
          className="px-4 py-2 border rounded-md"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Search
        </button>
      </form>
      {error && <p className="text-red-500 mb-4">{error}</p>} {/* Display errors */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="border p-4 rounded-md">
            <img
            src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder-image.jpg"}
            alt={movie.Title}
            className="w-full h-64 object-cover"
            />
            <h3 className="mt-2 font-bold">{movie.Title}</h3>
            <p>{movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
