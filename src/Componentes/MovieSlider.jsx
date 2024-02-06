import React, { useState, useEffect } from 'react';
import '/src/MovieSlider.css'; 

const MovieSlider = ({ apiKey, onMovieClick }) => {
  const [searchTerm, setSearchTerm] = useState('Batman');
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(searchTerm)}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.results) {
          setMovies(data.results);
        } else {
          setMovies([]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setMovies([]);
      }
    };

    fetchMovies();
  }, [apiKey, searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleMovieClick = (movieId) => {
    onMovieClick(movieId);
  };

  return (
    <div className="flex flex-col items-end mr-5 mt-2">
      <input
        className="p-2 bg-buscador rounded-md input-buscador"
        type="text"
        placeholder="Buscar"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-item" onClick={() => handleMovieClick(movie.id)}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster"
            />
            <h2 className="movie-title">{movie.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSlider;
