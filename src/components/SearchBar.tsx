import { useState } from "react";
import { Input } from "./ui/input";

const SearchBar = () => {
  const [searchTerm, setSearchTime] = useState("");
  return (
    <div>
      <Input
        type={"text"}
        placeholder="Search for movies"
        value={searchTerm}
        onChange={(e) => setSearchTime(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
