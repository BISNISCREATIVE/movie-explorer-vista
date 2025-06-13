
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NavigationProps {
  onSearch?: (query: string) => void;
}

const Navigation = ({ onSearch }: NavigationProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const location = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && onSearch) {
      onSearch(searchQuery.trim());
    }
  };

  const isActive = (path: string) => location.pathname === path;

  const closeMobileMenu = () => {
    setShowMobileMenu(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="text-2xl">🎬</div>
              <span className="text-xl font-bold text-white">Movie</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                to="/" 
                className={`text-sm font-medium transition-colors ${
                  isActive("/") ? "text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                Home
              </Link>
              <Link 
                to="/favorites" 
                className={`text-sm font-medium transition-colors ${
                  isActive("/favorites") ? "text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                Favorites
              </Link>
            </div>

            {/* Desktop Search */}
            <div className="hidden md:flex items-center space-x-4">
              {showSearch ? (
                <form onSubmit={handleSearch} className="flex items-center space-x-2">
                  <Input
                    type="text"
                    placeholder="Search movies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 bg-black/50 border-white/20 text-white placeholder:text-gray-400"
                    autoFocus
                  />
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setShowSearch(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    ✕
                  </Button>
                </form>
              ) : (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowSearch(true)}
                  className="text-gray-400 hover:text-white"
                >
                  <Search className="h-5 w-5" />
                </Button>
              )}
            </div>

            {/* Mobile Controls */}
            <div className="flex md:hidden items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowSearch(!showSearch)}
                className="text-gray-400 hover:text-white"
              >
                <Search className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="text-gray-400 hover:text-white"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {showSearch && (
            <div className="md:hidden mt-4">
              <form onSubmit={handleSearch} className="flex items-center space-x-2">
                <Input
                  type="text"
                  placeholder="Search movies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-black/50 border-white/20 text-white placeholder:text-gray-400"
                  autoFocus
                />
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowSearch(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </Button>
              </form>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Floating Menu Overlay */}
      {showMobileMenu && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={closeMobileMenu}
          />
          
          {/* Menu Content */}
          <div className="relative bg-black w-full h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <Link to="/" className="flex items-center space-x-2" onClick={closeMobileMenu}>
                <div className="text-2xl">🎬</div>
                <span className="text-xl font-bold text-white">Movie</span>
              </Link>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={closeMobileMenu}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            {/* Menu Items */}
            <div className="flex flex-col py-8 px-4 space-y-8">
              <Link 
                to="/" 
                onClick={closeMobileMenu}
                className={`text-2xl font-medium transition-colors ${
                  isActive("/") ? "text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                Home
              </Link>
              <Link 
                to="/favorites" 
                onClick={closeMobileMenu}
                className={`text-2xl font-medium transition-colors ${
                  isActive("/favorites") ? "text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                Favorites
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
