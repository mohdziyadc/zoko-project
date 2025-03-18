import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "./reduxHooks";
import {
  fetchMoviesBySearch,
  setSearchTerm as setReduxSearchTerm,
} from "@/store/slices/moviesSlice";

export function useMovieSearch(delay: number = 500) {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = (value: string) => {
    setSearchTerm(value);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      dispatch(setReduxSearchTerm(value));

      if (value.trim()) {
        dispatch(fetchMoviesBySearch({ searchTerm: value, page: 1 }));
      }
    }, delay);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    searchTerm,
    setSearchTerm: handleSearch,
  };
}
