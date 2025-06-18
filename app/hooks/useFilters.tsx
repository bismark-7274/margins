import { useContext } from "react";
import { FiltersContext } from "../context/FiltersContext";

export interface ActiveFilters {
  genres: {
    url: string;
    value: string[];
  };
  rating: {
    url: string;
    value: string;
  };
  releaseDate: {
    url: string;
    value: string;
  };
}

export const useFilters = () => {
  const context = useContext(FiltersContext);
  if (!context)
    throw new Error("useFilters must be used within FiltersProvider");
  return context;
};
