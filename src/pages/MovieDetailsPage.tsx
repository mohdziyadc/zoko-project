import { ChevronLeft, Heart, Loader2, Star } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Movie } from "../types";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { fetchMovieDetails } from "../store/slices/moviesSlice";
import { Button } from "../components/ui/button";
import {
  addToFavorites,
  removeFromFavorites,
} from "../store/slices/favoritesSlice";

const MovieDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedMovie } = useAppSelector((state) => state.movies);
  const { isLoading } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();
  const { favorites } = useAppSelector((state) => state.favorites);
  const [imageError, setImageError] = useState(false);

  const placeholderImage =
    "https://betravingknows.com/wp-content/uploads/2017/06/video-movie-placeholder-image-grey.png";

  const rating = selectedMovie?.Ratings[0]?.Value;

  const isFavorited = useMemo(() => {
    return favorites.some((movie) => movie.imdbID === selectedMovie?.imdbID);
  }, [favorites, selectedMovie]);

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieDetails(id));
    }
  }, [id, dispatch]);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleFavoritesToggle = () => {
    if (isFavorited && selectedMovie) {
      dispatch(removeFromFavorites(selectedMovie.imdbID));
    } else {
      dispatch(addToFavorites(selectedMovie as Movie));
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }
  return (
    <>
      {selectedMovie && (
        <div className="min-h-screen w-full">
          <div className="absolute top-5 left-5 cursor-pointer">
            <ChevronLeft className="w-10 h-10" onClick={() => navigate(-1)} />
          </div>
          <div className="grid grid-cols-1 container mx-auto mt-16 md:grid-cols-[300px_1fr] lg:grid-cols-[400px_1fr] h-screen">
            {/* Movie Poster */}
            <div className="relative  w-full h-[500px] md:h-screen  mb-2  flex items-start justify-center overflow-hidden">
              <img
                src={!imageError ? selectedMovie.Poster : placeholderImage}
                alt={`${selectedMovie.Title} poster`}
                onError={handleImageError}
                className="object-cover h-[500px] rounded-lg shadow-lg border-primary border-2"
              />
            </div>

            {/* Movie Details */}
            <div className=" flex flex-col p-6 md:px-8 md:py-0 lg:px-12 h-full bg-background">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                    {selectedMovie.Title}
                  </h1>

                  <div className="mt-1 text-muted-foreground">
                    {selectedMovie.Year} • {selectedMovie.Runtime}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Button
                    className="rounded-full inline-flex items-center justify-center w-12 h-12"
                    variant={"default"}
                    onClick={handleFavoritesToggle}
                  >
                    <Heart
                      className="w-10 h-10"
                      fill={isFavorited ? "white" : "transparent"}
                    />
                  </Button>
                  <div className="flex items-center gap-1.5 mt-2 md:mt-0">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(parseInt(rating!, 10) / 2)
                            ? "fill-orange-400 text-orange-400"
                            : "text-orange-800"
                        }`}
                      />
                    ))}
                    <span className="text-lg text-primary font-bold ">
                      {rating ? rating : "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-8">
                {selectedMovie.Genre.split(",").map((genre) => {
                  return (
                    <div className="bg-gray-200 rounded-full text-sm px-3 py-1">
                      {genre}
                    </div>
                  );
                })}
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3">Plot</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {selectedMovie.Plot}
                </p>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-3">Details</h2>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                  <div className="flex gap-2">
                    <dt className="font-medium">Director:</dt>
                    <dd className="text-muted-foreground">
                      {selectedMovie.Director}
                    </dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="font-medium">Release Year:</dt>
                    <dd className="text-muted-foreground">
                      {selectedMovie.Year}
                    </dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="font-medium">Runtime:</dt>
                    <dd className="text-muted-foreground">
                      {selectedMovie.Runtime}
                    </dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="font-medium">Rating:</dt>
                    <dd className="text-muted-foreground">{rating}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieDetailsPage;
