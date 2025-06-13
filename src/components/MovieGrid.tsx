
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
  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">{title}</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
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
      </div>
    </section>
  );
};

export default MovieGrid;
