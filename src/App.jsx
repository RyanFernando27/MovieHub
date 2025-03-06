import react from 'react'
import Search from './components/Search';
import{useDebounce} from 'react-use';
import { useState,useEffect } from 'react';
import { BounceLoader } from 'react-spinners';
import MovieCard from './components/MovieCard';


const API_BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers:{
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`

  }

}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const [movieList , setMovieList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // Debounce the search term so that it only gives us the final value after the user has stopped typing
  useDebounce(() => {
    setDebouncedSearchTerm(searchTerm);
  }, 1000, [searchTerm]);

  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    setErrorMessage('');
    try {

      const endPoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`:`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`
      const response = await fetch(endPoint, API_OPTIONS);


      if(!response.ok){
        throw new Error('Something went wrong while fetching the data');
      }
      const data = await response.json();
      console.log(data);

      if(data.Response === 'False'){
        setErrorMessage(data.Error || 'Error fetching movies');
        setMovieList([]);
        return;
      } 
      setMovieList(data.results || []); // Fixed typo here

    }catch(error){
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage('Error fetching movies');
    } finally {
      setIsLoading(false);
    }
    
  }

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm ]); // Added empty dependency array to ensure it runs only once

  return (
    <>
   <main>
    <div className="pattern" />
    <div className = "wrapper">
      <header>
        <img src="./hero.png" alt="hero" />
        <h1>Find <span className = "text-gradient"> Movies</span> You'll enjoy without the Hassle</h1>
        <Search searchTerm = {searchTerm} setSearchTerm= {setSearchTerm}/> 
      </header>
      <section className = "all-movies">
        <h2 className  = "mt-[40px]">All Movies</h2>
        {isLoading ?(
          <BounceLoader
          className="text-center"
          color="#8C00FF"
          size={100}
        />
        ):errorMessage?(
          <p className = "text-red-600"></p>
        ):(
          <ul>
            {movieList.map((movie) => (
             <MovieCard key = {movie.id} movie = {movie}  />
            ))}

          </ul>
        )}

      </section>
     
      <h1 className = "text-white ">{errorMessage}</h1>
    </div>
   </main>
   </>
  )

}

export default App
