import { getGenresAction } from "@/app/actions/getGenres";
import { queryForMovieAction } from "@/app/actions/searchMovies";
import MovieList from "../MovieList";

const SearchResultsPage = async ({
  searchParams,
}: {
  searchParams: { q?: string };
}) => {
  const movieQuery = searchParams.q;

  if (!movieQuery) return <p>No movie query provided.</p>;

  const { results: movies } = await queryForMovieAction(movieQuery);
  const genres = await getGenresAction();

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-15 max-w">Your results for: ${movieQuery}</h1>
      <MovieList movies={movies} genres={genres} />;
    </div>
  )
};

export default SearchResultsPage;
