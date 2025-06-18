"use server";

export interface MoviesResult {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}


interface Options {
  page?: number;
  filters?: string;
}

export async function getMoviesAction(opt: Options) {
  const options = {
    page: 1,
    ...opt,
  };

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${options.page}${options.filters}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZGQzNDc3YWI0MzRiZTQ5NzZmODBiNzFjODBiYTA3MSIsIm5iZiI6MTY5NTg0MjE4OS45ODUsInN1YiI6IjY1MTQ3ZjhkYTEwNzRiMDEwMDhmYjI3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6QxeHXdCxGYXoutvyDiTuuncrzeQmG3j1xZ-EvAWhHQ",
        },
        next: {
          revalidate: 60 * 60,
        },
      }
    );
    const data: MoviesResult = await res.json();
    return data;
  } catch (error) {
    throw new Error(`There was an error fetching movies: ${error}`)
  }
}
