import "./App.css";
import SearchBar from "./components/SearchBar";
import { Search } from "lucide-react";
import { Button } from "./components/ui/button";

function App() {
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
      </div>
    </>
  );
}

export default App;
