"use client";

import { HeartMinus, HeartPlus } from "lucide-react";
import { Favorite, useFavorites } from "../hooks/useFavorites";

interface FavoritesProps {
  movie: Favorite;
  label?: boolean;
  className?: string;
}

const Favorites = ({ movie, label = false, className }: FavoritesProps) => {
  // const { toggleFavorite, movieAlreadyOnTheList, loading } = useFavorite(movie);
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleToggle = () => {
    toggleFavorite(movie);
  };

  return (
    <button
      onClick={() => handleToggle()}
      className={`mx-auto link flex gap-2 items-center justify-center ${className}`}
    >
      {!isFavorite(movie.id) && (
        <>
          <HeartPlus />
          {label && (<span>Add to Favorites</span>)}
        </>
      )}
      {isFavorite(movie.id) && (
        <>
          <HeartMinus />
          {label && (<span>Remove Favorite</span>)}
        </>
      )}
    </button>
  );
};

export default Favorites;
