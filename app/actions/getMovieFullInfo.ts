"use server";

import { Genre } from "./getGenres";

export interface FullMovieDetailsResponse {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Productioncompany[];
  production_countries: Productioncountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: Spokenlanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  videos: Videos;
  images: Images;
  credits: Credits;
}

interface Spokenlanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

interface Productioncountry {
  iso_3166_1: string;
  name: string;
}

interface Productioncompany {
  id: number;
  logo_path: null | string;
  name: string;
  origin_country: string;
}

interface Credits {
  cast: Cast[];
  crew: Crew[];
}

interface Crew {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: null | string;
  credit_id: string;
  department: string;
  job: string;
}

interface Cast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: null | string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

interface Images {
  backdrops: Backdrop[];
  logos: Logo[];
  posters: Backdrop[];
}

interface Logo {
  aspect_ratio: number;
  height: number;
  iso_639_1: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

interface Backdrop {
  aspect_ratio: number;
  height: number;
  iso_639_1: null | string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

interface Videos {
  results: Result[];
}

interface Result {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export async function getFullMovieDetailAction(movie_id: number) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}?append_to_response=videos,credits`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZGQzNDc3YWI0MzRiZTQ5NzZmODBiNzFjODBiYTA3MSIsIm5iZiI6MTY5NTg0MjE4OS45ODUsInN1YiI6IjY1MTQ3ZjhkYTEwNzRiMDEwMDhmYjI3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6QxeHXdCxGYXoutvyDiTuuncrzeQmG3j1xZ-EvAWhHQ",
        },
        cache: "force-cache",
      }
    );
    const data: FullMovieDetailsResponse = await res.json();
    return data;
  } catch (error) {
    throw new Error(`There was an error fetching movie details: ${error}`);
  }
}
