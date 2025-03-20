import { useMemo, useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Heart, Play } from "lucide-react";
import { useNavigate } from "react-router";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useDispatch } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
} from "@/store/slices/favoritesSlice";
import { Movie } from "@/types";

type MovieCardProps = {
  movie: Movie;
  rating: number;
  genre: string;
};

const MovieCard = (props: MovieCardProps) => {
  const { movie, genre } = props;

  const { imdbID: movieId, Title: title, Year: year, Poster: imageUrl } = movie;

  const [imageError, setImageError] = useState(false);

  const { favorites } = useAppSelector((state) => state.favorites);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const placeholderImage =
    "https://betravingknows.com/wp-content/uploads/2017/06/video-movie-placeholder-image-grey.png";

  const isFavorited = useMemo(() => {
    return favorites.some((movie) => movie.imdbID === movieId);
  }, [favorites, movieId]);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleMovieClick = (movieId: string) => {
    navigate(`/movie/${movieId}`);
  };

  const handleFavoritesToggle = () => {
    if (isFavorited) {
      dispatch(removeFromFavorites(movieId));
    } else {
      dispatch(addToFavorites(movie));
    }
  };

  return (
    <Card className="group p-0 relative overflow-hidden w-full max-w-xs rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(255,110,0,0.8)]  bg-gradient-to-br from-orange-950 to-black">
      {/* Favorite Button */}
      <div className="absolute top-3 right-3 z-20  font-bold  shadow-lg">
        <Button
          className="rounded-full w-12 h-12"
          variant={"default"}
          onClick={handleFavoritesToggle}
        >
          <Heart
            className="w-10 h-10"
            fill={isFavorited ? "white" : "transparent"}
          />
        </Button>
      </div>

      {/* Image Container */}
      <div
        className="relative  aspect-[11/12] w-full overflow-hidden cursor-pointer"
        onClick={() => handleMovieClick(movieId)}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-orange-950 via-transparent to-transparent z-10 opacity-80"></div>
        <img
          src={!imageError ? imageUrl : placeholderImage}
          alt={`${title} movie poster`}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
          onError={handleImageError}
        />

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-16 h-16 rounded-full bg-orange-500/70 flex items-center justify-center backdrop-blur-sm">
            <Play className="h-6 w-6 text-white fill-amber-100" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 relative">
        {/* Title and Year */}
        <div className="mb-2">
          <h3 className="font-bold text-xl line-clamp-1 text-white tracking-wide">
            {title}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-orange-400 font-medium">{year}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
            <span className="text-orange-300">
              {genre?.charAt(0).toLocaleUpperCase()}
              {genre?.slice(1, genre.length)}
            </span>
          </div>
        </div>

        {/* Decorative Element */}
        <div className="absolute -bottom-3 -right-3 w-24 h-24 bg-gradient-to-tl from-orange-500/20 to-transparent rounded-full blur-xl"></div>
      </div>
    </Card>
  );
};

export default MovieCard;
