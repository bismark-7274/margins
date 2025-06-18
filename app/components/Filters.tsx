import RangeSlider from './RangeSlider'
import GenresFilter from './GenresFilter';
import { Genre } from '../actions/getGenres';
import { useFilters } from '../hooks/useFilters';

interface FiltersProps {
  genres: Genre[];
}

const Filters = ({ genres }: FiltersProps) => {
  const { toggleRatingFilter, toggleGenresFilter, toggleReleaseYearFilter } = useFilters();

  return (
    <div className="flex gap-10 items-end mt-5 mb-10">
      <GenresFilter genres={genres} onChange={toggleGenresFilter} />
      <RangeSlider
        label="Rating"
        onChange={toggleRatingFilter}
        step="1"
        min="1"
        max="10"
        defaultValue="0"
      />
      <RangeSlider
        label="Release Year"
        onChange={toggleReleaseYearFilter}
        step="1"
        min="1900"
        max={new Date().getFullYear().toString()}
        defaultValue=""
      />
    </div>
  )
}

export default Filters
