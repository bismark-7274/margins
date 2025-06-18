import MovieSliderSection from "./MovieSliderSection";

export default async function Home() {
  return (
    <main>
      <div
        className="hero min-h-[50vh]"
        style={{
          backgroundImage: "url(/home_bg.webp)",
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-center">
          <div className="max-w-3/4">
            <h1 className="mb-5 text-5xl font-bold">
              Your streaming guide for movies, TV shows & sports
            </h1>
            <p className="mb-5">
              Find where to stream new, popular & upcoming entertainment with
              JustWatch.
            </p>
            <button className="btn btn-primary">Discover more</button>
          </div>
        </div>
      </div>

      <div className="container mx-auto">
        <div className="grid gap-y-36 my-36">
          <MovieSliderSection
            filters="&sort_by=popularity.desc&with_genres=28"
            title="Top 10 Action movies & TV shows"
            description="Explore this week's most popular Action movies & TV shows streaming right now."
          />

          <MovieSliderSection
            filters="&sort_by=popularity.desc&with_genres=12"
            title="Top 10 Adventure movies & TV shows"
            description="Explore this week's most popular Adventure movies & TV shows streaming right now."
          />

          <MovieSliderSection
            filters="&sort_by=popularity.desc&with_genres=35"
            title="Top 10 Comedy movies & TV shows"
            description="Explore this week's most popular Comedy movies & TV shows streaming right now."
          />

          <MovieSliderSection
            filters="&sort_by=popularity.desc&with_genres=80"
            title="Top 10 Crime movies & TV shows"
            description="Explore this week's most popular Crime movies & TV shows streaming right now."
          />
        </div>
      </div>
    </main>
  );
}
