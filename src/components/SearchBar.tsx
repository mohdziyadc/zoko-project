import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { Input } from "./ui/input";
import { fetchMoviesBySearch, setSearchTerm } from "@/store/slices/moviesSlice";
import { useEffect, useRef, useState } from "react";

const SearchBar = () => {
  const dispatch = useAppDispatch();
  const { searchTerm } = useAppSelector((state) => state.movies);
  const [localSearchTerm, setLocalSearchTerm] = useState("");

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = (value: string, delay: number = 500) => {
    setLocalSearchTerm(value);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      dispatch(setSearchTerm(value));
      if (value.trim()) {
        dispatch(fetchMoviesBySearch({ searchTerm: value.trim(), page: 1 }));
      }
    }, delay);
  };

  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div>
      <Input
        type={"text"}
        placeholder="Search for movies"
        value={localSearchTerm}
        className="rounded-lg p-4"
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
