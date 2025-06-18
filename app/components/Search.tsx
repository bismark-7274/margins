"use client";

import React, { useState, useRef, useEffect } from "react";
import { Movie } from "../actions/getMovies";
import { TMDB_CONFIGURATION } from "../constants";
import MarginImage from "./Image";
import { useRouter } from "next/navigation";

const { images } = TMDB_CONFIGURATION;

export default function Search() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<Movie[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  const queryForMovies = async (value: string) => {
    try {
      const response = await fetch(`/api/movies/search?q=${value}`);
      const data = await response.json();
      setFilteredSuggestions(data);
    } catch {
      throw new Error("Error querying for movies");
    }
  };

  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const hasMounted = useRef(false);
  useEffect(() => {
    if (hasMounted.current) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        queryForMovies(inputValue);
        setActiveIndex(null);
      }, 1500);

      return () => {
        clearTimeout(timeoutRef.current);
      };
    } else {
      hasMounted.current = true;
    }
  }, [inputValue]);

  useEffect(() => {
    if (activeIndex !== null && itemRefs.current[activeIndex]) {
      itemRefs.current[activeIndex]?.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [activeIndex]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // if (!showSuggestions || filteredSuggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prevIndex) =>
        prevIndex === null || prevIndex === filteredSuggestions.length - 1
          ? 0
          : prevIndex + 1
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prevIndex) =>
        prevIndex === null || prevIndex === 0
          ? filteredSuggestions.length - 1
          : prevIndex - 1
      );
    } else if (e.key === "Enter" && activeIndex !== null) {
      e.preventDefault();
      selectSuggestion(filteredSuggestions[activeIndex]);
    } else if (e.key === "Enter") {
      e.preventDefault();
      router.push(`/movies/search?q=${inputValue}`);
      setShowSuggestions(false);
      setActiveIndex(null);
    }
  };

  const selectSuggestion = (suggestedMovie: Movie) => {
    setInputValue("");
    setShowSuggestions(false);
    setActiveIndex(null);
    router.push(`/movies/${suggestedMovie.id}`);
  };

  return (
    <div className="relative w-64">
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          setShowSuggestions(true);
        }}
        onKeyDown={handleKeyDown}
        className="w-full border border-gray-300 rounded px-3 py-2"
        placeholder="Search for movies..."
      />
      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul className="absolute bg-neutral z-11 border border-gray-300 rounded w-full mt-1 max-h-48 overflow-y-auto">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={suggestion.id}
              ref={(el) => (itemRefs.current[index] = el)}
              className={`px-3 py-2 cursor-pointer flex items-start gap-5 ${
                index === activeIndex ? "bg-blue-500 text-white" : ""
              }`}
              onMouseDown={() => selectSuggestion(suggestion)}
            >
              <div className="w-12 rounded shrink-0">
                <MarginImage
                  src={`${images.base_url}w92${suggestion.poster_path}`}
                  alt={suggestion.title}
                />
              </div>
              <small>
                <span className="line-clamp-2">{suggestion.title}</span>
                <br />
                {new Date(suggestion.release_date).getFullYear()}
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
