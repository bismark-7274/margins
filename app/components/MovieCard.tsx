import Link from "next/link";
import Favorites from "./Favorites";
import MarginImage from "./Image";

interface MovieCardProps {
  id: number;
  title: string;
  imgUrl: string;
}

const MovieCard = ({ id, title, imgUrl }: MovieCardProps) => {
  return (
    <div className="card bg-base-100 shadow-sm overflow-hidden group">
      <Favorites
        className="absolute top-3 left-3 text-white opacity-50 bg-slate-800 p-2 rounded-full z-10 group-hover:opacity-100"
        movie={{ id, title, coverUrl: imgUrl }}
      />
      <Link href={`/movies/${id}`} className="group-hover:opacity-85">
        <MarginImage
          src={`https://image.tmdb.org/t/p/w500/${imgUrl}`}
          alt={title}
        />
      </Link>
    </div>
  );
};

export default MovieCard;
