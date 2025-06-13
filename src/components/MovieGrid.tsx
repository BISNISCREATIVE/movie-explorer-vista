
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
  showLoadMore?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
}

const MovieGrid = ({ 
  movies, 
  title, 
  showRanking = false, 
  onFavoriteChange,
  showLoadMore = false,
  onLoadMore,
  hasMore = false
}: MovieGridProps) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  if (!movies || movies.length === 0) {
    return null;
  }

  const scroll = (direction: 'left' | 'right') => {
    const container = document.getElementById(`scroll-container-${title.replace(/\s+/g, '')}`);
    if (container) {
      const scrollAmount = 280;
      const newPosition = direction === 'left' 
        ? Math.max(0, scrollPosition - scrollAmount)
        : Math.min(container.scrollWidth - container.clientWidth, scrollPosition + scrollAmount);
      
      container.scrollTo({ left: newPosition, behavior: 'smooth' });
      setScrollPosition(newPosition);
    }
  };

  return (
    <section className="mb-8">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg md:text-xl font-semibold text-white">{title}</h2>
          
          {/* Desktop Navigation Arrows - only for horizontal scroll sections */}
          {!showLoadMore && (
            <div className="hidden md:flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => scroll('left')}
                className="text-gray-400 hover:text-white p-1 h-7 w-7"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => scroll('right')}
                className="text-gray-400 hover:text-white p-1 h-7 w-7"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Movie Grid */}
        {showLoadMore ? (
          // Grid layout for New Release section
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 mb-6">
            {movies.map((movie, index) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                showRank={showRanking}
                rank={showRanking ? index + 1 : undefined}
                onFavoriteChange={onFavoriteChange}
              />
            ))}
          </div>
        ) : (
          // Horizontal Scrolling Container for other sections
          <div className="relative">
            <div
              id={`scroll-container-${title.replace(/\s+/g, '')}`}
              className="flex overflow-x-auto scrollbar-hide space-x-3 pb-2"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {movies.map((movie, index) => (
                <div key={movie.id} className="flex-none w-36 md:w-44">
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
        )}

        {/* Load More Button */}
        {showLoadMore && hasMore && (
          <div className="text-center mt-4">
            <Button
              onClick={onLoadMore}
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 px-6 py-2 text-sm"
            >
              Load More
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default MovieGrid;
