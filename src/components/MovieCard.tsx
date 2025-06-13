
import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { tmdbApi } from "@/lib/tmdb";
import { favoritesManager, type FavoriteMovie } from "@/lib/favorites";
import { useToast } from "@/hooks/use-toast";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  overview: string;
}

interface MovieCardProps {
  movie: Movie;
  showRank?: boolean;
  rank?: number;
  onFavoriteChange?: () => void;
}

const MovieCard = ({ movie, showRank, rank, onFavoriteChange }: MovieCardProps) => {
  const [isFavorite, setIsFavorite] = useState(favoritesManager.isFavorite(movie.id));
  const { toast } = useToast();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const favoriteMovie: FavoriteMovie = {
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      vote_average: movie.vote_average,
      release_date: movie.release_date,
      overview: movie.overview,
    };

    const isNowFavorite = favoritesManager.toggleFavorite(favoriteMovie);
    setIsFavorite(isNowFavorite);

    toast({
      title: isNowFavorite ? "Added to Favorites" : "Removed from Favorites",
      description: `${movie.title} has been ${isNowFavorite ? "added to" : "removed from"} your favorites.`,
      duration: 2000,
    });

    if (onFavoriteChange) {
      onFavoriteChange();
    }
  };

  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : "";
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

  return (
    <Link to={`/movie/${movie.id}`} className="group block">
      <div className="relative rounded-lg overflow-hidden bg-gray-900 transition-transform duration-300 group-hover:scale-105 h-full">
        {showRank && rank && (
          <div className="absolute top-2 left-2 z-10 bg-black/80 text-white text-xs font-bold px-2 py-1 rounded flex items-center">
            <span className="text-yellow-400 mr-1">⭐</span>
            {rank}
          </div>
        )}
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleFavoriteClick}
          className={`absolute top-2 right-2 z-10 p-2 rounded-full backdrop-blur-sm transition-colors ${
            isFavorite 
              ? "bg-red-500/80 text-white hover:bg-red-600/80" 
              : "bg-black/50 text-white hover:bg-black/70"
          }`}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
        </Button>

        {/* Movie Poster */}
        <div className="aspect-[2/3] overflow-hidden">
          <img
            src={tmdbApi.getImageUrl(movie.poster_path)}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
        </div>

        {/* Movie Info */}
        <div className="p-3">
          <h3 className="font-semibold text-white text-sm line-clamp-2 mb-2 min-h-[2.5rem]">
            {movie.title}
          </h3>
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center text-yellow-400">
              <span className="mr-1">⭐</span>
              <span className="text-white">{rating}/10</span>
            </div>
            {releaseYear && <span className="text-gray-400">{releaseYear}</span>}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
