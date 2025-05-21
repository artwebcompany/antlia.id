
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Produk & Layanan", path: "/produk-layanan" },
    { name: "Tentang Kami", path: "/tentang-kami" },
    // { name: "Solusi", path: "/solusi" },
    { name: "Klien", path: "/klien" },
    { name: "Artikel", path: "/artikel" },
    { name: "Kontak", path: "/kontak" },

  ];

  // Check if the current route is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-white/80 backdrop-blur-sm py-3'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <div className="flex items-center">
              <img 
                src="/assets/antlia-logo.png" 
                alt="ANTLIA Logo" 
                className="h-10 mr-3"
              />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-antlia-blue to-antlia-cyan bg-clip-text text-transparent">
                  ANTLIA
                </h1>
                <p className="text-xs text-gray-500 -mt-1">Inclusive by Design, Powerful by Nature</p>
              </div>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm lg:text-base font-medium transition-colors ${
                  isActive(item.path) 
                    ? 'text-antlia-blue bg-blue-50' 
                    : 'text-gray-700 hover:text-antlia-blue hover:bg-blue-50/50'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="ml-2">
              <Button className="bg-antlia-blue hover:bg-antlia-blue/80" size="sm">
                <a 
                  href="https://wa.me/6287762877273" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <Phone className="w-4 h-4 mr-2" /> Hubungi Kami
                </a>
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-antlia-blue focus:outline-none p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100 py-4' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="flex flex-col space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  isActive(item.path) 
                    ? 'text-antlia-blue bg-blue-50' 
                    : 'text-gray-700 hover:text-antlia-blue hover:bg-blue-50/50'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Button className="bg-antlia-blue hover:bg-antlia-blue/80 mt-4">
              <a 
                href="https://wa.me/6287762877273" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full"
              >
                <Phone className="w-4 h-4 mr-2" /> Hubungi Kami
              </a>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
