import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { Genre } from "../actions/getGenres";

interface GenresFilterProps {
  onChange: (list: string[]) => void;
  genres: Genre[];
}

const GenresFilter = ({ onChange, genres }: GenresFilterProps) => {
  const genreRef = useRef(null);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const handleSelection = (e: SyntheticEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    if (selectedGenres.includes(value)) {
      setSelectedGenres(selectedGenres.filter((s) => s !== value));
    } else {
      setSelectedGenres([...selectedGenres, value]);
    }
  };

  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const hasMounted = useRef(false);
  useEffect(() => {
    if (hasMounted.current) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        onChange(selectedGenres);
      }, 1500);

      return () => {
        clearTimeout(timeoutRef.current);
      };
    } else {
      hasMounted.current = true;
    }
  }, [selectedGenres]);

  return (
    <div>
      <button
        className="btn btn-soft"
        popoverTarget="genre-anchor"
        style={{ anchorName: "--anchor-1" } as React.CSSProperties}
      >
        Genres
      </button>
      <ul
        className="dropdown min-w-max menu grid grid-cols-2 p-6 rounded-box bg-base-100 shadow-sm"
        popover="auto"
        id="genre-anchor"
        style={{ positionAnchor: "--anchor-1" } as React.CSSProperties}
      >
        {genres?.map((genre) => (
          <li key={genre.id}>
            <label className="label">
              <input
                type="checkbox"
                defaultValue={genre.id}
                className="checkbox"
                name="genres"
                onChange={(e) => handleSelection(e)}
                ref={genreRef}
              />
              {genre.name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GenresFilter;
