
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import MovieCard from "./MovieCard";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  overview: string;
}

interface MovieGridProps {
  movies: Movie[];
  title: string;
  showRanking?: boolean;
  onFavoriteChange?: () => void;
}

const MovieGrid = ({ movies, title, showRanking = false, onFavoriteChange }: MovieGridProps) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  if (!movies || movies.length === 0) {
    return null;
  }

  const scroll = (direction: 'left' | 'right') => {
    const container = document.getElementById(`scroll-container-${title.replace(/\s+/g, '')}`);
    if (container) {
      const scrollAmount = 320; // Width of card + gap
      const newPosition = direction === 'left' 
        ? Math.max(0, scrollPosition - scrollAmount)
        : Math.min(container.scrollWidth - container.clientWidth, scrollPosition + scrollAmount);
      
      container.scrollTo({ left: newPosition, behavior: 'smooth' });
      setScrollPosition(newPosition);
    }
  };

  return (
    <section className="py-6 md:py-8">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-white">{title}</h2>
          
          {/* Desktop Navigation Arrows */}
          <div className="hidden md:flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => scroll('left')}
              className="text-gray-400 hover:text-white p-2 h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => scroll('right')}
              className="text-gray-400 hover:text-white p-2 h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Horizontal Scrolling Container */}
        <div className="relative">
          <div
            id={`scroll-container-${title.replace(/\s+/g, '')}`}
            className="flex overflow-x-auto scrollbar-hide space-x-4 pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {movies.map((movie, index) => (
              <div key={movie.id} className="flex-none w-48 md:w-56">
                <MovieCard
                  movie={movie}
                  showRank={showRanking}
                  rank={showRanking ? index + 1 : undefined}
                  onFavoriteChange={onFavoriteChange}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieGrid;
