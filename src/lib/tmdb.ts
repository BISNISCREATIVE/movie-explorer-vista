
const TMDB_API_KEY = "YOUR_TMDB_API_KEY";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  adult: boolean;
}

export interface MovieDetail extends Movie {
  genres: { id: number; name: string }[];
  runtime: number;
  status: string;
  tagline: string;
  production_companies: { id: number; name: string; logo_path: string }[];
  credits?: {
    cast: CastMember[];
    crew: CrewMember[];
  };
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string;
}

export interface TMDBResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const apiRequest = async <T>(endpoint: string): Promise<T> => {
  const response = await fetch(`${TMDB_BASE_URL}${endpoint}?api_key=${TMDB_API_KEY}`);
  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }
  return response.json();
};

export const tmdbApi = {
  getTrending: () => apiRequest<TMDBResponse>("/trending/movie/week"),
  
  getPopular: () => apiRequest<TMDBResponse>("/movie/popular"),
  
  getNowPlaying: () => apiRequest<TMDBResponse>("/movie/now_playing"),
  
  getUpcoming: () => apiRequest<TMDBResponse>("/movie/upcoming"),
  
  getMovieDetail: (id: number) => 
    apiRequest<MovieDetail>(`/movie/${id}?append_to_response=credits`),
  
  searchMovies: (query: string) => 
    apiRequest<TMDBResponse>(`/search/movie?query=${encodeURIComponent(query)}`),
  
  getImageUrl: (path: string, size: string = "w500") => 
    path ? `${TMDB_IMAGE_BASE_URL}/${size}${path}` : "/placeholder.svg",
  
  getBackdropUrl: (path: string, size: string = "w1280") => 
    path ? `${TMDB_IMAGE_BASE_URL}/${size}${path}` : "/placeholder.svg",
};
