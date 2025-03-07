import React from 'react';
import { useParams } from 'react-router-dom';

const MovieDetails = ({ movies }) => {
  const { id } = useParams();
  const movie = movies.find((movie) => movie.id === parseInt(id));

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div className="movie-details text-white mt-3">
        <div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => window.history.back()}>Go Back</button>
        <h1>{movie.title}</h1>

        </div>
        
    <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : '/no-movie.png'} alt={movie.title}  className = "ml-2"/>
     
      <p>Rating: {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</p>
      <p>Language: {movie.original_language}</p>
      <p>Release Date: {movie.release_date ? movie.release_date : 'N/A'}</p>
      <p>Overview: {movie.overview}</p>
    </div>
  );
};

export default MovieDetails;