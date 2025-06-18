"use client";

import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Genre } from "../actions/getGenres";
import { getMoviesAction, Movie } from "../actions/getMovies";
import Filters from "../components/Filters";
import Loading from "../components/Loading";
import MovieCard from "../components/MovieCard";
import { useFilters } from "../hooks/useFilters";

interface Props {
  movies: Movie[];
  genres: Genre[];
}

interface FetchMovies {
  filters?: string;
  paginated?: boolean;
}

const MovieList = ({ movies: initialMovies, genres }: Props) => {
  const { filterString } = useFilters();
  const [movies, setMovies] = useState(initialMovies);
  const [hasMoreMovies, setHasMoreMovies] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchMovies({ filters: filterString });
  }, [filterString]);

  const fetchMovies = async ({ filters, paginated }: FetchMovies) => {
    const {
      results: newMovies,
      page,
      total_pages,
    } = await getMoviesAction({
      page: paginated ? currentPage + 1 : currentPage,
      filters,
    });
    setCurrentPage(page);

    if (paginated) {
      setHasMoreMovies(total_pages > page);
      setMovies((movies) => [...movies, ...newMovies]);
      return;
    }

    setMovies(newMovies);
  };

  return (
    <section className="container mx-auto">
      <Filters genres={genres} />

      <InfiniteScroll
        dataLength={movies.length}
        next={() => fetchMovies({ paginated: true })}
        hasMore={hasMoreMovies}
        loader={<Loading />}
      >
        <div className="grid gap-3.5 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
          {movies.map((movie, index) => (
            <MovieCard
              key={movie.id + index}
              id={movie.id}
              title={movie.title}
              imgUrl={movie.poster_path}
            />
          ))}
        </div>
      </InfiniteScroll>
    </section>
  );
};

export default MovieList;
