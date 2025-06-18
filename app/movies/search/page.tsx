// import { queryForMovieAction } from "@/app/actions/searchMovies";

const SearchResultsPage = async ({ searchParams }: { searchParams: { q?: string } }) => {
  const movieQuery = searchParams.q;

  if (!movieQuery) return <p>No movie query provided.</p>;
  // const movies = await queryForMovieAction(movieQuery);

  return (
    <div>
      Search for {movieQuery}
    </div>
  )
}

export default SearchResultsPage
