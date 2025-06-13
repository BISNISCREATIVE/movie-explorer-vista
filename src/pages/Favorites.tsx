
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import MovieCard from "@/components/MovieCard";
import EmptyState from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { favoritesManager } from "@/lib/favorites";

const Favorites = () => {
  const [favorites, setFavorites] = useState(favoritesManager.getFavorites());

  const refreshFavorites = () => {
    setFavorites(favoritesManager.getFavorites());
  };

  useEffect(() => {
    refreshFavorites();
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Favorites</h1>

          {favorites.length === 0 ? (
            <EmptyState
              title="Data Empty"
              description="You don't have a favorite movie yet"
              action={
                <Link to="/">
                  <Button className="bg-red-600 hover:bg-red-700 text-white">
                    Explore Movie
                  </Button>
                </Link>
              }
            />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
              {favorites.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onFavoriteChange={refreshFavorites}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-8 mt-auto">
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

export default Favorites;
