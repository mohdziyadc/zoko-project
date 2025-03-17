import "./App.css";
import SearchBar from "./components/SearchBar";
import { Search } from "lucide-react";
import { Button } from "./components/ui/button";
import MovieCard from "./components/MovieCard";

function App() {
  const movies = [
    {
      title: "Inception",
      year: "2010",
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
      rating: 8.8,
      genre: "Sci-Fi",
    },
    {
      title: "The Dark Knight",
      year: "2008",
      imageUrl: "https://m.media-amazon.com/images/I/81IfoBox2TL.jpg",
      rating: 9.0,
      genre: "Action",
    },
    {
      title: "Interstellar",
      year: "2014",
      imageUrl:
        "https://m.media-amazon.com/images/I/61wrhEawgQL._AC_UF1000,1000_QL80_.jpg",
      rating: 8.6,
      genre: "Adventure",
    },
    {
      title: "Pulp Fiction",
      year: "1994",
      imageUrl:
        "https://images-cdn.ubuy.co.in/653f9763c9fb060a774b8193-pulp-fiction-movie-poster-regular.jpg",
      rating: 7.2,
      genre: "Crime",
    },
  ];
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
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

        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie, index) => (
            <div
              key={index}
              className="transform transition-all duration-300 hover:-translate-y-2"
            >
              <MovieCard
                title={movie.title}
                year={movie.year}
                imageUrl={movie.imageUrl}
                rating={movie.rating}
                genre={movie.genre}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
