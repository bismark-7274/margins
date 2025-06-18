"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import MovieCard from "./MovieCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Movie } from "../actions/getMovies";

interface Props {
  movies: Movie[];
}

const options = {
  loop: false, // --> 419px screens and down will apply { loop: false }
  slidesToScroll: 2,
  breakpoints: {
    "(min-width: 768px)": { slidesToScroll: 3 },
    "(min-width: 1200px)": { slidesToScroll: 5 },
  },
};

const CardSlider = ({ movies }: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="embla relative">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {movies.map((movie, index) => (
            <div
              key={movie.id}
              className="embla__slide flex items-end leading-0 tracking-[-20px]"
            >
              <span className="text-9xl font-bold">{index + 1}</span>
              <MovieCard
                id={movie.id}
                title={movie.title}
                imgUrl={movie.poster_path}
              />
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={scrollPrev}
        className="group embla__prev cursor-pointer flex items-center justify-center absolute left-0 top-0 bottom-0 my-auto hover:bg-black/25"
      >
        <ChevronLeft
          className="group-hover:opacity-100 opacity-35"
          size="2rem"
        />
      </button>
      <button
        onClick={scrollNext}
        className="group embla__next cursor-pointer flex items-center justify-center absolute right-0 top-0 bottom-0 my-auto hover:bg-black/25"
      >
        <ChevronRight
          className="group-hover:opacity-100 opacity-35"
          size="2rem"
        />
      </button>
    </section>
  );
};

export default CardSlider;
