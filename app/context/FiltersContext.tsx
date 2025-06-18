'use client';

import { createContext, ReactNode, useEffect, useState } from "react";
import { ActiveFilters } from "../hooks/useFilters";

interface FiltersContextType {
  filterString: string;
  activeFilters: ActiveFilters;
  toggleRatingFilter: (value: string) => void;
  toggleGenresFilter: (value: string[]) => void;
  toggleReleaseYearFilter: (value: string) => void;
}

export const FiltersContext = createContext<FiltersContextType | undefined>(
  undefined
);

export const FiltersProvider = ({ children }: { children: ReactNode }) => {
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    genres: {
      url: "&with_genres=",
    },
    rating: {
      url: "&vote_average.lte=",
    },
    releaseDate: {
      url: "&release_date.gte=",
    },
  } as ActiveFilters);

  const [filterString, setFilterString] = useState('');

  useEffect(() => {
    setFilterString(Object.values(activeFilters).filter(f => f?.value).map(f => f.url + f.value).join(''));
  }, [activeFilters])

  const toggleRatingFilter = async (ratingValue: string) => {
    setActiveFilters((prev) => {
      const newActiveFilter = { ...prev };
      newActiveFilter.rating.value = ratingValue;
      return newActiveFilter;
    });
  };

  const toggleGenresFilter = async (list: string[]) => {
    setActiveFilters((prev) => {
      const newActiveFilter = { ...prev };
      newActiveFilter.genres.value = list;
      return newActiveFilter;
    });
  };

  const toggleReleaseYearFilter = async (releaseYear: string) => {
    setActiveFilters((prev) => {
      const newActiveFilter = { ...prev };
      newActiveFilter.releaseDate.value = new Date(releaseYear).toISOString().split('T')[0];
      return newActiveFilter;
    });
  };

  return (
    <FiltersContext.Provider
      value={{ filterString, activeFilters, toggleGenresFilter, toggleRatingFilter, toggleReleaseYearFilter}}
    >
      {children}
    </FiltersContext.Provider>
  );
};
