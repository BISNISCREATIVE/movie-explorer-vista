
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/Navigation";
import MovieCard from "@/components/MovieCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import EmptyState from "@/components/EmptyState";
import { tmdbApi } from "@/lib/tmdb";

const Search = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialQuery = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ["search", initialQuery],
    queryFn: () => tmdbApi.searchMovies(initialQuery),
    enabled: !!initialQuery,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  useEffect(() => {
    setSearchQuery(initialQuery);
  }, [initialQuery]);

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/")}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            
            <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
              <Input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-900 border-gray-700 text-white placeholder:text-gray-400 text-lg py-6"
                autoFocus
              />
            </form>
          </div>

          {/* Results */}
          {isLoading ? (
            <LoadingSpinner />
          ) : initialQuery && searchResults ? (
            searchResults.results.length > 0 ? (
              <>
                <h2 className="text-xl text-gray-400 mb-6">
                  Search results for "{initialQuery}" ({searchResults.total_results} results)
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                  {searchResults.results.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </div>
              </>
            ) : (
              <EmptyState
                title="No Results Found"
                description={`Sorry, we couldn't find any movies matching "${initialQuery}". Try searching with different keywords.`}
              />
            )
          ) : (
            <EmptyState
              title="Search Movies"
              description="Enter a movie title in the search box above to find your favorite films."
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
