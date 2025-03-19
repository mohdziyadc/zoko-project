import { useEffect } from "react";
import { Input } from "./ui/input";
import { useMovieSearch } from "@/hooks/useMovieSearch";

const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useMovieSearch();

  useEffect(() => {
    console.log("Redux searchTerm:", searchTerm);
  });
  return (
    <div>
      <Input
        type={"text"}
        placeholder="Search for movies"
        value={searchTerm}
        className="rounded-lg p-4"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
