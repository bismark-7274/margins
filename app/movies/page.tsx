import React from 'react'
import MovieList from './MovieList'
import { getMoviesAction } from '../actions/getMovies';
import { getGenresAction } from '../actions/getGenres';

const MoviesListing = async () => {
  const { results: movies } = await getMoviesAction({});
  const genres = await getGenresAction();

  return (
    <MovieList movies={movies} genres={genres} />
  )
}

export default MoviesListing
