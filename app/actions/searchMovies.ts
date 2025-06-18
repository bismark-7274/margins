"use server";

import { MoviesResult } from "./getMovies";

export async function queryForMovieAction(query: string) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZGQzNDc3YWI0MzRiZTQ5NzZmODBiNzFjODBiYTA3MSIsIm5iZiI6MTY5NTg0MjE4OS45ODUsInN1YiI6IjY1MTQ3ZjhkYTEwNzRiMDEwMDhmYjI3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6QxeHXdCxGYXoutvyDiTuuncrzeQmG3j1xZ-EvAWhHQ",
        },
      },
    );
    const data: MoviesResult = await res.json();
    console.log(data)
    return data;
  } catch (error) {
    throw new Error(`There was an error fetching movies: ${error}`);
  }
}
