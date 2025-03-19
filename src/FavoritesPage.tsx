import React from "react";
import { useAppSelector } from "./hooks/reduxHooks";
import MovieCard from "./components/MovieCard";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";

type Props = {};

const FavoritesPage = (props: Props) => {
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
      <div className="container min-h-screen mx-auto  flex flex-col">
        <div>
          {favorites.length === 0 ? (
            <div>No Favorites. Add movies to your favorites</div>
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
