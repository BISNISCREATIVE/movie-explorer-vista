
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
  <div className="w-full">
    {/* Desktop Layout */}
    <div className="hidden md:block">
      <div className="w-full flex flex-row items-start justify-between gap-0 text-left text-2xl text-gray-100 font-poppins">
        <div className="flex flex-row items-start justify-start gap-6 flex-1">
          <img
            src={tmdbApi.getImageUrl(movie.poster_path)}
            alt={movie.title}
            className="w-[182px] rounded-xl h-[270px] object-cover"
            draggable={false}
          />
          <div className="flex-1 flex flex-col items-start justify-start gap-6">
            <div className="self-stretch flex flex-col items-start justify-start gap-3">
              <h3 className="self-stretch font-bold leading-9 text-white text-2xl">
                {movie.title}
              </h3>
              <div className="self-stretch flex flex-row items-center justify-start gap-1 text-lg">
                <Star size={24} className="text-yellow-400 fill-yellow-400" />
                <div className="w-48 leading-8 font-medium inline-block shrink-0 text-white">
                  {movie.vote_average.toFixed(1)}/10
                </div>
              </div>
              <div className="self-stretch text-base leading-[30px] text-gray-400 [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                {movie.overview}
              </div>
            </div>
            <div className="flex flex-row items-center justify-start text-base">
              <button
                onClick={() => onWatchTrailer(movie.id)}
                className="w-[200px] rounded-[9999px] bg-[#9A1E0C] hover:bg-[#6c1308] h-[52px] flex flex-row items-center justify-center p-2 box-border gap-2 transition-colors"
              >
                <span className="leading-[30px] font-semibold text-white">
                  {watchingTrailerId === movie.id ? 'Close Trailer' : 'Watch Trailer'}
                </span>
                {watchingTrailerId === movie.id ? (
                  <X size={24} className="text-white" />
                ) : (
                  <PlayCircleIcon size={24} />
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-start justify-start">
          <button
            onClick={() => onToggleFavorite(movie)}
            className="w-14 backdrop-blur-[40px] rounded-[9999px] bg-gray-300/20 border-gray-200/30 border border-solid h-14 flex flex-row items-center justify-center p-2 hover:bg-gray-300/30 transition-colors"
            aria-label={isFavorite ? 'Unfavorite' : 'Favorite'}
          >
            {isFavorite ? (
              <Heart className="text-[#9A1E0C] fill-[#9A1E0C] w-6 h-6" />
            ) : (
              <Heart className="text-zinc-400 w-6 h-6" />
            )}
          </button>
        </div>
      </div>
    </div>

    {/* Mobile Layout */}
    <div className="block md:hidden">
      <div className="w-full flex flex-col items-center justify-start gap-6 text-left text-sm text-gray-100 font-poppins">
        <div className="self-stretch flex flex-row items-start justify-start gap-4">
          <img
            src={tmdbApi.getImageUrl(movie.poster_path)}
            alt={movie.title}
            className="w-[104px] rounded-lg h-[156px] object-cover"
            draggable={false}
          />
          <div className="self-stretch w-[218px] flex flex-col items-start justify-start gap-1">
            <h3 className="self-stretch font-bold text-base leading-[30px] text-white">
              {movie.title}
            </h3>
            <div className="w-[173px] flex flex-row items-center justify-start gap-1">
              <Star size={18} className="text-yellow-400 fill-yellow-400" />
              <div className="flex-1 leading-7 font-medium text-gray-200">
                {movie.vote_average.toFixed(1)}/10
              </div>
            </div>
            <div className="self-stretch leading-7 text-gray-400 [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
              {movie.overview}
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-row items-center justify-start gap-4">
          <button
            onClick={() => onWatchTrailer(movie.id)}
            className="flex-1 rounded-[9999px] bg-[#9A1E0C] hover:bg-[#6c1308] h-11 flex flex-row items-center justify-center p-2 box-border gap-2 transition-colors"
          >
            <span className="leading-7 font-semibold text-white">
              {watchingTrailerId === movie.id ? 'Close Trailer' : 'Watch Trailer'}
            </span>
            {watchingTrailerId === movie.id ? (
              <X size={18} className="text-white" />
            ) : (
              <PlayCircleIcon size={18} />
            )}
          </button>
          <div className="flex flex-row items-start justify-start">
            <button
              onClick={() => onToggleFavorite(movie)}
              className="w-11 backdrop-blur-[40px] rounded-[8147.33px] bg-gray-300/20 border-gray-200/30 border-solid border-[0.8px] box-border h-11 flex flex-row items-center justify-center p-[6.3px] hover:bg-gray-300/30 transition-colors"
              aria-label={isFavorite ? 'Unfavorite' : 'Favorite'}
            >
              {isFavorite ? (
                <Heart className="text-[#9A1E0C] fill-[#9A1E0C] w-[18.9px] h-[18.9px]" />
              ) : (
                <Heart className="text-zinc-400 w-[18.9px] h-[18.9px]" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
    
    {/* Trailer Player */}
    {watchingTrailerId === movie.id && movie._trailerKey && (
      <div className="w-full mt-6 animate-fadeIn">
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
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">
          Favorites
        </h1>

        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center h-[50vh]">
            <EmptyState />
          </div>
        ) : (
          <div className="space-y-8 md:space-y-12">
            {moviesWithTrailer.map((movie, index) => (
              <div key={movie.id}>
                <FavoriteMovieCard
                  movie={movie}
                  isFavorite={isFavorite(movie.id)}
                  onToggleFavorite={toggleFavorite}
                  onWatchTrailer={handleWatchTrailer}
                  watchingTrailerId={watchingTrailerId}
                />
                {index < moviesWithTrailer.length - 1 && (
                  <div className="border-b border-gray-800 mt-8 md:mt-12"></div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
