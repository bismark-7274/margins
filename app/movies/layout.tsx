import { ReactNode } from "react";
import { FiltersProvider } from "../context/FiltersContext";

interface Props {
  children: ReactNode;
}

const MoviesLayout = ({ children }: Props) => {
  return (
    <FiltersProvider>
      { children }
    </FiltersProvider>
  );
};

export default MoviesLayout;
