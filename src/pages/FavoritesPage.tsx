import { useAppSelector } from "../hooks/reduxHooks";
import MovieCard from "../components/MovieCard";
import { ChevronLeft, Heart } from "lucide-react";
import { useNavigate } from "react-router";

const FavoritesPage = () => {
  const { favorites } = useAppSelector((state) => state.favorites);
  const navigate = useNavigate();
  return (
    <>
      <div className="mx-4 mt-6 flex items-center">
        <div className="cursor-pointer" onClick={() => navigate(-1)}>
          <ChevronLeft className="h-8 w-8" />
        </div>
        <div className="text-3xl ml-4 font-bold text-gray-800 ">
          Your Favorites
        </div>
      </div>
      <div className="container min-h-screen mx-auto px-6  flex flex-col">
        <div>
          {favorites.length === 0 ? (
            <div className="flex flex-col gap-2 min-h-[60vh] text-center flex-grow justify-center items-center text-2xl text-primary font-light">
              <Heart className="h-16 w-16" />
              <div>No Favorites. Add movies to your favorites</div>
            </div>
          ) : (
            <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {favorites.map((movie) => (
                <div key={movie.imdbID}>
                  <MovieCard movie={movie} rating={8.5} genre={movie.Type} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FavoritesPage;
