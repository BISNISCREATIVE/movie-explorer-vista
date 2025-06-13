
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import LoadingSpinner from "@/components/LoadingSpinner";
import { tmdbApi, type MovieDetail } from "@/lib/tmdb";
import { favoritesManager } from "@/lib/favorites";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [isFavorite, setIsFavorite] = useState(
    id ? favoritesManager.isFavorite(parseInt(id)) : false
  );

  const { data: movie, isLoading } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => tmdbApi.getMovieDetail(parseInt(id!)),
    enabled: !!id,
  });

  const handleFavoriteClick = () => {
    if (!movie) return;

    const favoriteMovie = {
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
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black">
        <Navigation />
        <div className="pt-20">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Movie not found</h1>
          <Link to="/">
            <Button>Go back to home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : "";
  const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : "";

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative h-[70vh] md:h-[80vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${tmdbApi.getBackdropUrl(movie.backdrop_path)})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

        {/* Back Button */}
        <div className="absolute top-24 left-4 z-10">
          <Link to="/">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
        </div>

        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-start gap-8">
              {/* Poster */}
              <div className="w-64 md:w-80 flex-shrink-0">
                <img
                  src={tmdbApi.getImageUrl(movie.poster_path, "w500")}
                  alt={movie.title}
                  className="w-full rounded-lg shadow-2xl"
                />
              </div>

              {/* Movie Info */}
              <div className="flex-1 max-w-2xl">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                  {movie.title}
                </h1>
                
                <div className="flex items-center text-gray-300 mb-4 space-x-4">
                  {releaseYear && <span>📅 {releaseYear}</span>}
                  {runtime && <span>🕐 {runtime}</span>}
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <Button 
                    size="lg"
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    ▶ Watch Trailer
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleFavoriteClick}
                    className={`border-white/30 transition-colors ${
                      isFavorite 
                        ? "bg-red-500/80 text-white border-red-500/80 hover:bg-red-600/80" 
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    <Heart className={`h-5 w-5 mr-2 ${isFavorite ? "fill-current" : ""}`} />
                    {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                  </Button>
                </div>

                {/* Rating & Genre */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-black/50 rounded-lg p-4 text-center">
                    <div className="text-yellow-400 mb-1">⭐</div>
                    <div className="text-white font-semibold">Rating</div>
                    <div className="text-white text-2xl font-bold">{movie.vote_average.toFixed(1)}/10</div>
                  </div>
                  <div className="bg-black/50 rounded-lg p-4 text-center">
                    <div className="text-blue-400 mb-1">🎭</div>
                    <div className="text-white font-semibold">Genre</div>
                    <div className="text-white text-sm">{movie.genres?.[0]?.name || "Action"}</div>
                  </div>
                  <div className="bg-black/50 rounded-lg p-4 text-center">
                    <div className="text-green-400 mb-1">👥</div>
                    <div className="text-white font-semibold">Age Limit</div>
                    <div className="text-white text-2xl font-bold">{movie.adult ? "18+" : "13"}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Overview */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
          <p className="text-gray-300 leading-relaxed text-lg">{movie.overview}</p>
        </section>

        {/* Cast & Crew */}
        {movie.credits?.cast && movie.credits.cast.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Cast & Crew</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {movie.credits.cast.slice(0, 10).map((member) => (
                <div key={member.id} className="text-center">
                  <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden bg-gray-800">
                    {member.profile_path ? (
                      <img
                        src={tmdbApi.getImageUrl(member.profile_path, "w185")}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        👤
                      </div>
                    )}
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-1">{member.name}</h3>
                  <p className="text-gray-400 text-xs">{member.character}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="text-2xl">🎬</div>
            <span className="text-xl font-bold text-white">Movie</span>
          </div>
          <p className="text-gray-400 text-sm">Copyright ©2025 Movie Explorer</p>
        </div>
      </footer>
    </div>
  );
};

export default MovieDetail;
