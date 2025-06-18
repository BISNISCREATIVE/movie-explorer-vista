
import { useState } from 'react';
import { Link } from "react-router-dom";
import { Star, Heart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/useFavorites";
import { tmdbApi } from "@/services/tmdb";
import PlayCircleIcon from "@/components/PlayCircleIcon";

const EmptyState = () => (
  <div className="flex flex-col items-center text-center px-4">
    <img src="/lovable-uploads/d5817bef-ac81-4d0e-9b45-4d019a2560c6.png" alt="Data Empty" className="w-32 h-32 mb-6" />
    <div className="text-white font-bold text-2xl mb-2">Data Empty</div>
    <div className="text-gray-400 mb-6">You don't have a favorite movie yet</div>
    <Link to="/">
      <Button
        className="bg-[#9A1E0C] hover:bg-[#6c1308] px-10 py-4 text-base rounded-full font-semibold transition-colors duration-150"
        style={{ minWidth: 180 }}
      >
        Explore Movie
      </Button>
    </Link>
  </div>
);

const getTrailerKey = async (movieId: number): Promise<string|null> => {
  try {
    const res = await tmdbApi.getMovieVideos(movieId);
    const trailers = (res.results || []).filter(
      (vid: any) => vid.type === "Trailer" && vid.site === "YouTube"
    );
    return trailers.length > 0 ? trailers[0].key : null;
  } catch {
    return null;
  }
};

const FavoriteMovieCard = ({
  movie,
  isFavorite,
  onToggleFavorite,
  onWatchTrailer,
  watchingTrailerId,
}: any) => (
  <div className="px-4">
    <div className="relative flex flex-col bg-[#181b21] rounded-2xl overflow-hidden shadow-lg border border-[#232831] w-full">
      {/* Movie poster and content section */}
      <div className="flex p-4 gap-4">
        <img
          src={tmdbApi.getImageUrl(movie.poster_path)}
          alt={movie.title}
          className="w-20 h-28 rounded-xl object-cover flex-shrink-0"
          draggable={false}
        />
        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-white font-bold text-lg line-clamp-2 flex-1 pr-2">
              {movie.title}
            </h3>
            <button
              onClick={() => onToggleFavorite(movie)}
              className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-[#241316]/50 transition-colors flex-shrink-0"
              aria-label={isFavorite ? 'Unfavorite' : 'Favorite'}
            >
              {isFavorite ? (
                <Heart className="text-[#9A1E0C] fill-[#9A1E0C] w-5 h-5" />
              ) : (
                <Heart className="text-zinc-400 w-5 h-5" />
              )}
            </button>
          </div>
          
          <div className="flex items-center text-yellow-400 font-medium text-sm mb-3">
            <Star size={16} className="text-yellow-400 fill-yellow-400 mr-1" />
            <span className="text-white text-sm">{movie.vote_average.toFixed(1)}/10</span>
          </div>
          
          <p className="text-gray-300 text-sm mb-4 line-clamp-2">
            {movie.overview}
          </p>
        </div>
      </div>
      
      {/* Watch Trailer Button */}
      <div className="px-4 pb-4">
        <button
          onClick={() => onWatchTrailer(movie.id)}
          className={`
            flex items-center justify-center
            rounded-full
            px-6 py-3
            bg-[#9A1E0C] hover:bg-[#6c1308]
            transition-colors font-semibold
            text-base text-white
            shadow
            w-full
            gap-3
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#9A1E0C]
          `}
        >
          <span>{watchingTrailerId === movie.id ? 'Close Trailer' : 'Watch Trailer'}</span>
          {watchingTrailerId === movie.id ? (
            <X size={20} className="text-white" />
          ) : (
            <PlayCircleIcon size={24} />
          )}
        </button>
      </div>
    </div>
    
    {/* Trailer Player */}
    {watchingTrailerId === movie.id && movie._trailerKey && (
      <div className="w-full mt-4 px-4 animate-fadeIn">
        <div className="aspect-video rounded-xl overflow-hidden border border-[#232831] shadow-md">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${movie._trailerKey}?autoplay=1&controls=1&showinfo=0&rel=0`}
            title={`Trailer ${movie.title}`}
            className="w-full h-full"
            allowFullScreen
            allow="autoplay; encrypted-media"
          />
        </div>
      </div>
    )}
  </div>
);

const Favorites = () => {
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const [watchingTrailerId, setWatchingTrailerId] = useState<number | null>(null);
  const [loadingTrailerId, setLoadingTrailerId] = useState<number | null>(null);
  const [trailerKeys, setTrailerKeys] = useState<Record<number, string>>({});

  const handleWatchTrailer = async (movieId: number) => {
    if (watchingTrailerId === movieId) {
      setWatchingTrailerId(null);
      return;
    }
    
    if (loadingTrailerId) return;
    setLoadingTrailerId(movieId);
    if (!trailerKeys[movieId]) {
      const key = await getTrailerKey(movieId);
      setTrailerKeys((prev) => ({ ...prev, [movieId]: key || "" }));
      setLoadingTrailerId(null);
      setWatchingTrailerId(key ? movieId : null);
    } else {
      setLoadingTrailerId(null);
      setWatchingTrailerId(trailerKeys[movieId] ? movieId : null);
    }
  };

  // Attach trailer key to each movie if available
  const moviesWithTrailer = favorites.map((movie) => ({
    ...movie,
    _trailerKey: trailerKeys[movie.id] ?? "",
  }));

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-12">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8 px-4">
          Favorites
        </h1>

        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center h-[50vh]">
            <EmptyState />
          </div>
        ) : (
          <div className="space-y-6">
            {moviesWithTrailer.map((movie) => (
              <FavoriteMovieCard
                key={movie.id}
                movie={movie}
                isFavorite={isFavorite(movie.id)}
                onToggleFavorite={toggleFavorite}
                onWatchTrailer={handleWatchTrailer}
                watchingTrailerId={watchingTrailerId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
