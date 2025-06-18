import { getMoviesAction } from "./actions/getMovies";
import CardSlider from "./components/CardSlider";

interface Props {
  filters: string;
  title: string;
  description: string;
}

const MovieSliderSection = async ({ filters, title, description }: Props) => {
  const { results: movies } = await getMoviesAction({ filters });
  return (
    <section className="lg:grid grid-cols-5 gap-11">
      <div className="max-lg:mb-10">
        <h2 className="text-2xl font-bold mb-5">{title}</h2>
        <p>{description}</p>
      </div>
      <div className="col-span-4">
        <CardSlider movies={movies.filter((_, index) => index < 10)} />
      </div>
    </section>
  );
};

export default MovieSliderSection;
