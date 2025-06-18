"use server";

// TODO: create helpfer function for defining stale time for cache, easier

export interface Genre {
  id: number;
  name: string;
}

export async function getGenresAction() {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZGQzNDc3YWI0MzRiZTQ5NzZmODBiNzFjODBiYTA3MSIsIm5iZiI6MTY5NTg0MjE4OS45ODUsInN1YiI6IjY1MTQ3ZjhkYTEwNzRiMDEwMDhmYjI3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6QxeHXdCxGYXoutvyDiTuuncrzeQmG3j1xZ-EvAWhHQ",
        },
        cache: 'force-cache',
      }
    );
    const data: { genres: Genre[] } = await res.json();
    return data.genres;
  } catch (error) {
    throw new Error(`There was an error fetching genres: ${error}`)
  }
}
