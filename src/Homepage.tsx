import { useCallback, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import { Button } from "./components/ui/button";
import { Ban, ChevronDown, Eye, Loader2, Search } from "lucide-react";
import MovieCard from "./components/MovieCard";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import { fetchMoviesBySearch, resetSearch } from "./store/slices/moviesSlice";

// type Props = {};

const HomePage = () => {
  const { searchResults, totalResults, currentPage, searchTerm, error } =
    useAppSelector((state) => state.movies);
  const { isLoading } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();

  const hasMoreResults = searchResults.length < totalResults;

  const handleLoadMore = useCallback(() => {
    if (searchTerm && hasMoreResults) {
      dispatch(
        fetchMoviesBySearch({
          searchTerm: searchTerm.trim(),
          page: currentPage + 1,
        })
      );
    }
  }, [dispatch, searchTerm, hasMoreResults, currentPage]);

  useEffect(() => {
    if (searchTerm === "") {
      dispatch(resetSearch());
    }
  }, [searchTerm, dispatch]);

  return (
    <>
      <div className="container min-h-screen mx-auto px-4 py-8 flex flex-col">
        <h1 className="text-3xl text-center font-bold text-gray-800 mb-6">
          Movie Explorer
        </h1>
        <div className="flex gap-2 w-full justify-center items-center">
          <div className="flex-[95%]">
            <SearchBar />
          </div>
          <Button className=" flex-[5%] bg-primary px-4 py-2">
            <Search className="font-extrabold" />
          </Button>
        </div>

        {error && searchTerm && !isLoading && (
          <div className="flex flex-col flex-grow justify-center items-center w-full">
            <div>
              <Ban className="w-32 h-32 text-primary" />
            </div>
            <div className="text-2xl font-light mt-2">{error}</div>
          </div>
        )}

        {!error && !searchTerm && !isLoading && (
          <div className="flex flex-col flex-grow justify-center items-center w-full">
            <div>
              <Eye className="h-32 w-32 text-primary/90" />
            </div>
            <div className="text-2xl font-light">
              Seek and you shall find...
            </div>
          </div>
        )}

        {isLoading && searchResults.length === 0 ? (
          <div className="flex flex-grow items-center  justify-center w-full">
            <Loader2 className="h-10 w-10 text-primary animate-spin" />
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {searchResults.map((movie) => (
              <div
                key={movie.imdbID}
                className="transform transition-all duration-300 hover:-translate-y-2"
              >
                <MovieCard
                  id={movie.imdbID}
                  title={movie.Title}
                  year={movie.Year}
                  imageUrl={movie.Poster}
                  rating={8.5}
                  genre={movie.Type}
                />
              </div>
            ))}
          </div>
        )}

        {hasMoreResults && searchResults.length > 0 && (
          <div className="mt-8 flex justify-center">
            <Button
              onClick={handleLoadMore}
              disabled={isLoading}
              className="rounded-full px-4 py-5"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <div className="flex justify-between items-center">
                  <span className="text-lg">Load More</span>
                  <ChevronDown className="ml-1" />
                </div>
              )}
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
