import { Input } from "./ui/input";
import { useMovieSearch } from "@/hooks/useMovieSearch";

const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useMovieSearch();
  return (
    <div>
      <Input
        type={"text"}
        placeholder="Search for movies"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
