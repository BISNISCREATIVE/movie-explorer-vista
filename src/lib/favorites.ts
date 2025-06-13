
export interface FavoriteMovie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  overview: string;
}

const FAVORITES_KEY = "movie_favorites";

export const favoritesManager = {
  getFavorites: (): FavoriteMovie[] => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  addFavorite: (movie: FavoriteMovie): void => {
    const favorites = favoritesManager.getFavorites();
    const exists = favorites.some(fav => fav.id === movie.id);
    
    if (!exists) {
      const newFavorites = [...favorites, movie];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    }
  },

  removeFavorite: (movieId: number): void => {
    const favorites = favoritesManager.getFavorites();
    const filtered = favorites.filter(fav => fav.id !== movieId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered));
  },

  isFavorite: (movieId: number): boolean => {
    const favorites = favoritesManager.getFavorites();
    return favorites.some(fav => fav.id === movieId);
  },

  toggleFavorite: (movie: FavoriteMovie): boolean => {
    const isFav = favoritesManager.isFavorite(movie.id);
    
    if (isFav) {
      favoritesManager.removeFavorite(movie.id);
      return false;
    } else {
      favoritesManager.addFavorite(movie);
      return true;
    }
  }
};
