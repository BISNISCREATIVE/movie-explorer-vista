
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import MovieGrid from "@/components/MovieGrid";
import LoadingSpinner from "@/components/LoadingSpinner";
import { tmdbApi } from "@/lib/tmdb";

const Index = () => {
  const navigate = useNavigate();

  const { data: trendingData, isLoading: trendingLoading } = useQuery({
    queryKey: ["trending"],
    queryFn: tmdbApi.getTrending,
  });

  const { data: popularData, isLoading: popularLoading } = useQuery({
    queryKey: ["popular"],
    queryFn: tmdbApi.getPopular,
  });

  const { data: upcomingData, isLoading: upcomingLoading } = useQuery({
    queryKey: ["upcoming"],
    queryFn: tmdbApi.getUpcoming,
  });

  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const heroMovie = trendingData?.results?.[0];

  return (
    <div className="min-h-screen bg-black">
      <Navigation onSearch={handleSearch} />
      
      <div className="pt-20">
        {heroMovie && <HeroSection movie={heroMovie} />}

        {trendingLoading ? (
          <LoadingSpinner />
        ) : (
          trendingData?.results && (
            <MovieGrid
              movies={trendingData.results.slice(0, 12)}
              title="Trending Now"
              showRanking={true}
            />
          )
        )}

        {upcomingLoading ? (
          <LoadingSpinner />
        ) : (
          upcomingData?.results && (
            <MovieGrid
              movies={upcomingData.results.slice(0, 12)}
              title="New Release"
            />
          )
        )}

        {popularLoading ? (
          <LoadingSpinner />
        ) : (
          popularData?.results && (
            <MovieGrid
              movies={popularData.results.slice(0, 12)}
              title="Popular Movies"
            />
          )
        )}
      </div>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-8 mt-12">
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

export default Index;
