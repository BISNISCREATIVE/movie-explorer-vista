
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import MovieGrid from "@/components/MovieGrid";
import LoadingSpinner from "@/components/LoadingSpinner";
import { tmdbApi } from "@/lib/tmdb";

const Index = () => {
  const navigate = useNavigate();
  const [showAllUpcoming, setShowAllUpcoming] = useState(false);

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

  const handleLoadMore = () => {
    setShowAllUpcoming(true);
  };

  const heroMovie = trendingData?.results?.[0];

  // Limit movies for initial display
  const displayedUpcoming = showAllUpcoming 
    ? upcomingData?.results 
    : upcomingData?.results?.slice(0, 12);

  return (
    <div className="min-h-screen bg-black">
      <Navigation onSearch={handleSearch} />
      
      <div className="pt-16">
        {heroMovie && <HeroSection movie={heroMovie} />}

        <div className="py-6 space-y-6">
          {/* Trending Now Section */}
          {trendingLoading ? (
            <LoadingSpinner />
          ) : (
            trendingData?.results && (
              <MovieGrid
                movies={trendingData.results.slice(0, 20)}
                title="Trending Now"
                showRanking={true}
              />
            )
          )}

          {/* New Release Section */}
          {upcomingLoading ? (
            <LoadingSpinner />
          ) : (
            displayedUpcoming && (
              <MovieGrid
                movies={displayedUpcoming}
                title="New Release"
                showLoadMore={true}
                onLoadMore={handleLoadMore}
                hasMore={!showAllUpcoming && upcomingData?.results && upcomingData.results.length > 12}
              />
            )
          )}

          {/* Popular Movies Section */}
          {popularLoading ? (
            <LoadingSpinner />
          ) : (
            popularData?.results && (
              <MovieGrid
                movies={popularData.results.slice(0, 20)}
                title="Popular Movies"
              />
            )
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-6 mt-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <div className="text-xl">🎬</div>
            <span className="text-lg font-bold text-white">Movie</span>
          </div>
          <p className="text-gray-400 text-sm">Copyright ©2025 Movie Explorer</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
