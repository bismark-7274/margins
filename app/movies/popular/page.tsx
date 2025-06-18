import { getGenresAction } from '@/app/actions/getGenres';
import { getMoviesAction } from '@/app/actions/getMovies';
import MovieList from '../MovieList';

const PopularMoviesPage = async () => {
  const { results: movies } = await getMoviesAction();
  const genres = await getGenresAction();

  return (
    <MovieList movies={movies} genres={genres} />
  )
}

export default PopularMoviesPage
