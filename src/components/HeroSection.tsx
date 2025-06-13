
import { Button } from "@/components/ui/button";
import { tmdbApi } from "@/lib/tmdb";

interface Movie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  release_date: string;
}

interface HeroSectionProps {
  movie: Movie;
}

const HeroSection = ({ movie }: HeroSectionProps) => {
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : "";

  return (
    <div className="relative h-[70vh] md:h-[80vh] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${tmdbApi.getBackdropUrl(movie.backdrop_path)})`,
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
              {movie.title}
            </h1>
            
            {releaseYear && (
              <div className="flex items-center text-gray-300 mb-4">
                <span className="text-sm">📅 {releaseYear}</span>
              </div>
            )}

            <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-8 line-clamp-3">
              {movie.overview}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3"
              >
                ▶ Watch Trailer
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-3"
              >
                See Detail
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
