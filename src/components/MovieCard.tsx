import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Heart, Play, Star } from "lucide-react";

type MovieCardProps = {
  title: string;
  year: string;
  imageUrl: string;
  rating?: number;
  genre?: string;
};

const MovieCard = (props: MovieCardProps) => {
  const { title, year, imageUrl, rating, genre } = props;

  return (
    <Card className="group p-0 relative overflow-hidden w-full max-w-xs rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(255,165,0,0.5)]  bg-gradient-to-br from-orange-950 to-black">
      {/* Rating Badge */}
      <div className="absolute top-3 right-3 z-20  font-bold  shadow-lg">
        <Button
          className="rounded-full w-12 h-12"
          onClick={() => console.log("Hear Button Clicked")}
        >
          <Heart className="w-10 h-10" />
        </Button>
      </div>

      {/* Image Container */}
      <div className="relative aspect-[11/12] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-orange-950 via-transparent to-transparent z-10 opacity-80"></div>
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={`${title} movie poster`}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
        />

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-16 h-16 rounded-full bg-orange-500/80 flex items-center justify-center backdrop-blur-sm">
            <Play className="h-6 w-6 text-white fill-amber-100" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 relative">
        {/* Title and Year */}
        <div className="mb-2">
          <h3 className="font-bold text-xl text-white tracking-wide">
            {title}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-orange-400 font-medium">{year}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
            <span className="text-orange-300">{genre}</span>
          </div>
        </div>

        {/* Rating Stars */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(rating! / 2)
                  ? "fill-orange-400 text-orange-400"
                  : "text-orange-800"
              }`}
            />
          ))}
          <span className="ml-2 text-xs text-orange-300 font-medium">
            {rating}/10
          </span>
        </div>

        {/* Decorative Element */}
        <div className="absolute -bottom-3 -right-3 w-24 h-24 bg-gradient-to-tl from-orange-500/20 to-transparent rounded-full blur-xl"></div>
      </div>
    </Card>
  );
};

export default MovieCard;
