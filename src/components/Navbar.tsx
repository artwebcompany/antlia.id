import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next"; 


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation(); 

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const menuItems = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.products_services"), path: "/produk-layanan" },
    { name: t("nav.about_us"), path: "/tentang-kami" },
    { name: t("nav.clients"), path: "/klien" },
    { name: t("nav.articles"), path: "/artikel" },
    { name: t("nav.contact"), path: "/kontak" },
  ];

  const languages = [
    { code: "id", name: "ID" },
    { code: "en", name: "EN" },
  ];

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
                <p className="text-xs text-gray-500 -mt-1">{t("slogan")}</p>
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <span>{i18n.language.toUpperCase()}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {languages.map((lang) => (
                    <DropdownMenuItem 
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`cursor-pointer ${i18n.language === lang.code ? 'font-bold' : ''}`}
                    >
                      {lang.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="ml-2">
              <Button className="bg-antlia-blue hover:bg-antlia-blue/80" size="sm">
                <a 
                  href="https://wa.me/6285846612211" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <Phone className="w-4 h-4 mr-2" /> {t("nav.contact_us")}
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
            <hr className="my-2 border-gray-200" />
            <div className="flex justify-around items-center">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    changeLanguage(lang.code);
                    setIsMenuOpen(false); 
                  }}
                  className={`px-4 py-2 rounded-md font-medium transition-colors ${
                    i18n.language === lang.code 
                      ? 'bg-blue-50 text-antlia-blue' 
                      : 'text-gray-700 hover:text-antlia-blue hover:bg-blue-50/50'
                  }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
            <Button className="bg-antlia-blue hover:bg-antlia-blue/80 mt-4">
              <a 
                href="https://wa.me/6285846612211" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full"
              >
                <Phone className="w-4 h-4 mr-2" /> {t("nav.contact_us")}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
