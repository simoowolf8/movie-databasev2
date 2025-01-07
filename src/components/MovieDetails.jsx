import React from "react";

const MovieDetails = ({ movie, onClose }) => {
  if (!movie) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg max-w-lg w-full shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Close
        </button>
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder-image.jpg"}
          alt={movie.Title}
          className="w-full h-64 object-cover rounded-md mb-4"
        />
        <h2 className="text-2xl font-bold mb-2">{movie.Title}</h2>
        <p className="text-gray-700 mb-4">{movie.Plot}</p>
        <p className="mb-2">
          <strong>Genre:</strong> {movie.Genre}
        </p>
        <p className="mb-2">
          <strong>Actors:</strong> {movie.Actors}
        </p>
        <p className="mb-2">
          <strong>IMDb Rating:</strong> {movie.imdbRating}
        </p>
      </div>
    </div>
  );
};

export default MovieDetails;
