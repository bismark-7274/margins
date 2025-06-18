import { TMDB_CONFIGURATION } from "@/app/constants";
import CastSlider from "../CastSlider";
import { getFullMovieDetailAction } from "@/app/actions/getMovieFullInfo";
import MarginImage from "@/app/components/Image";
import Favorites from "@/app/components/Favorites";
import { Suspense } from "react";

const { images } = TMDB_CONFIGURATION;

interface MovieDetailProps {
  params: {
    id: number;
  };
}

const MovieDetailPage = async ({ params }: MovieDetailProps) => {
  const { id } = await params;
  const { videos, credits, ...details } = await getFullMovieDetailAction(id);
  const officialTrailer =
    videos.results.find((video) => video.name === "Official Trailer") ||
    videos.results[0];
  const releaseYear = new Date(details.release_date).getFullYear();
  const director = credits.crew.find((c) => c.job === "Director")!.name;

  const titleStyle = `uppercase tracking-tighter mb-5 font-bold text-2xl`;

  return (
    <>
      <section className="relative">
        <div className="relative min-h-52 mb-16 bg-[linear-gradient(90deg,#131c23,#131c23,transparent)]">
          <div className="container mx-auto">
            <div className="w-3/6">
              <h1 className="text-4xl uppercase tracking-tighter">
                {details.title}{" "}
                <small className="text-neutral-600">({releaseYear})</small>
              </h1>
            </div>
            <div className="flex flex-row-reverse absolute inset-0 z-[-1] overflow-hidden ml-auto w-full">
              <picture className="w-3/6">
                <MarginImage
                  className="object-cover w-full h-full object-[50%15%]"
                  src={`${images.base_url}original/${details.backdrop_path}`}
                  alt=""
                />
              </picture>
            </div>
          </div>
        </div>

        <div className="container mx-auto">
          <div className="lg:grid lg:grid-cols-12 gap-20">
            <div className="lg:col-span-9">
              <div className="mx-auto">
                <div className="prose lg:prose-xl mb-15">
                  <blockquote>{details.tagline}</blockquote>
                </div>

                <div className="mb-20">
                  <h2 className={titleStyle}>Plot</h2>
                  <div className="prose lg:prose-xl">
                    <p className="prose lg:prose-xl">{details.overview}</p>
                  </div>
                </div>

                {officialTrailer && (
                  <div className="mb-20">
                    <h2 className={titleStyle}>Trailer</h2>
                    <div className="aspect-video relative">
                      <iframe
                        className="w-full h-full absolute top-0 left-0"
                        src={`https://www.youtube.com/embed/${officialTrailer.key}`}
                        title={officialTrailer.name}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      ></iframe>
                    </div>
                  </div>
                )}

                <h2 className={titleStyle}>Cast</h2>
                <CastSlider cast={credits.cast} />
              </div>
            </div>

            <aside className="lg:col-span-3 relative hidden lg:block">
              <div className="sticky top-4">
                <MarginImage
                  src={`${images.base_url}w500${details.poster_path}`}
                />

                <Suspense>
                  <div className="text-center my-5">
                    <Favorites
                      label={true}
                      movie={{
                        id: details.id,
                        title: details.title,
                        coverUrl: details.poster_path,
                      }}
                    />
                  </div>
                </Suspense>

                <ul className="list bg-base-100 rounded-box shadow-md">
                  <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
                    {details.title} is not available for streaming.
                  </li>

                  <li className="list-row">
                    <div>
                      <div>Genre</div>
                      <div className="text-xs font-semibold opacity-60">
                        {details.genres.map((g) => g.name).join(", ")}
                      </div>
                    </div>
                  </li>
                  <li className="list-row">
                    <div>
                      <div>Director</div>
                      <div className="text-xs uppercase font-semibold opacity-60">
                        {director}
                      </div>
                    </div>
                  </li>
                  <li className="list-row">
                    <div>
                      <div>Status</div>
                      <div className="text-xs uppercase font-semibold opacity-60">
                        <span className="badge badge-outline">
                          {details.status}
                        </span>
                      </div>
                    </div>
                  </li>
                  <li className="list-row">
                    <div>
                      <div>Country</div>
                      <div className="text-xs font-semibold opacity-60">
                        {details.production_countries
                          .map((p) => p.name)
                          .join(", ")}
                      </div>
                    </div>
                  </li>
                  <li className="list-row">
                    <div>
                      <div>Runtime</div>
                      <div className="text-xs uppercase font-semibold opacity-60">
                        {convertTime(details.runtime)}
                      </div>
                    </div>
                  </li>
                  <li className="list-row">
                    <div>
                      <div>Rating</div>
                      <div className="text-xs uppercase font-semibold opacity-60">
                        {details.vote_average.toFixed(1)}
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

export default MovieDetailPage;

function convertTime(n: number) {
  const hours = Math.floor(n / 60);
  const minutes = n % 60;
  return `${hours}h, ${minutes}m`;
}
