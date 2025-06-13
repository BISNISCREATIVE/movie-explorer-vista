
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
    <div className="relative h-[45vh] md:h-[60vh] lg:h-[70vh] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${tmdbApi.getBackdropUrl(movie.backdrop_path)})`,
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-lg lg:max-w-xl">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight">
              {movie.title}
            </h1>
            
            {releaseYear && (
              <div className="flex items-center text-gray-300 mb-3">
                <span className="text-sm md:text-base">📅 {releaseYear}</span>
              </div>
            )}

            <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-4 md:mb-6 line-clamp-3">
              {movie.overview}
            </p>

            <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
              <Button 
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white px-4 md:px-6 py-2 text-sm md:text-base"
              >
                ▶ Watch Trailer
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 px-4 md:px-6 py-2 text-sm md:text-base"
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
