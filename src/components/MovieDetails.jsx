import React from 'react';
import { useParams } from 'react-router-dom';

import '../App.css'

const MovieDetails = ({ movies }) => {
  const { id } = useParams();
  const movie = movies.find((movie) => movie.id === parseInt(id));


  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div className="movie-details text-white mt-3 ">
         <button className="p-2 text-white cursor-pointer transition delay-150 duration-300 ease-in-out hover:bg-indigo-900 border-1 border-indigo-900 rounded-xl position-" onClick={() => window.history.back()} >Go Back</button>
      <div className="flex justify-between  ">
       
        <h1>{movie.title} | {movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</h1>
      </div>
      <div className="details-container flex mt-4 m-10 movie-card-animation">
        <div className="image-container mr-4">
          <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : '/no-movie.png'} alt={movie.title} className="border-2" />
        </div>
        <div className="info-container">
          <h2>Rating : <span className = 'text-amber-200'>{movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</span></h2>
          <h2>Language: {movie.original_language}</h2>
          <h2>Release Date: <span className = 'text-blue-400'>{movie.release_date}</span></h2><br />
          <h2>Overview: </h2>
          <p>{movie.overview}</p>
          <img src="star.svg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;