import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css'

const Moviecard = ({ movie }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className="movie-card movie-card-animation" onClick={handleClick} >
      <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : '/no-movie.png'} alt={movie.title} />
      <div className="mt-4">
        <h3>{movie.title}</h3>
        <div className="content">
          <div className="rating">
            <img src="star.svg" alt="" />
            <p>{movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</p>
          </div>
          <span>•</span>
          <p className="lang">{movie.original_language}</p>
          <span>•</span>
          <p className="year">{movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default Moviecard;