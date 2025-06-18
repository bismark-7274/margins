'use client';

import { createContext, ReactNode, useEffect, useState } from "react";
import { Favorite } from "../hooks/useFavorites";

interface FavoritesContextType {
  favorites: Favorite[];
  toggleFavorite: (movie: Favorite) => void;
  isFavorite: (id: number) => boolean;
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({children}: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  
  useEffect(() => {
    const favoritesFromStorage = localStorage.getItem('favorites') ?? '[]';
    setFavorites(JSON.parse(favoritesFromStorage));
  }, []);

  const toggleFavorite = (movie: Favorite) => {
    setFavorites(prev => {
      const alreadyFavoriteMovie = prev.some(m => m.id === movie.id);
      const updatedList = alreadyFavoriteMovie ? prev.filter(m => m.id !== movie.id) : [...prev, movie];

      localStorage.setItem('favorites', JSON.stringify(updatedList));
      return updatedList;
    })
  };

  const isFavorite = (id: number) => favorites.some(m => m.id === id);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}
