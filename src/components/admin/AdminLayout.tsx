
import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Home, Layout, LogOut, Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const AdminLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      const { data } = await supabase.auth.getSession();
      
      if (!data.session) {
        navigate("/admin");
        return;
      }
      
      setIsAuthenticated(true);
      setIsLoading(false);
    };

    // Set up auth listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_OUT") {
          setIsAuthenticated(false);
          navigate("/admin");
        } else if (event === "SIGNED_IN" && session) {
          setIsAuthenticated(true);
        }
      }
    );

    checkAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logout berhasil",
        description: "Anda telah keluar dari sistem.",
        variant: "default",
      });
      navigate("/admin");
    } catch (error) {
      toast({
        title: "Logout gagal",
        description: "Terjadi kesalahan saat mencoba keluar.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-antlia-blue"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const menuItems = [
    { label: "Dashboard", icon: <Home className="h-5 w-5" />, path: "/admin/dashboard" },
    { label: "Artikel", icon: <FileText className="h-5 w-5" />, path: "/admin/articles" },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Sidebar Toggle Button */}
      {isMobile && (
        <button 
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 bg-white p-2 rounded-md shadow-md"
          aria-label="Toggle Sidebar"
        >
          {isSidebarOpen ? (
            <X className="h-6 w-6 text-gray-500" />
          ) : (
            <Menu className="h-6 w-6 text-gray-500" />
          )}
        </button>
      )}

      {/* Sidebar */}
      <aside 
        className={`${
          isMobile ? (isSidebarOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"
        } transition-transform duration-300 ease-in-out fixed z-40 bg-white min-h-screen w-64 border-r border-gray-200 flex flex-col`}
      >
       {/* Logo */}
        <div className="px-3 py-3.5 flex items-center border-b border-gray-200">
          <Link to="/admin/dashboard" className="flex items-center">
            <img
              src="/assets/logo.png"
              alt="Antlia Admin Logo"
              className="h-10 w-auto"
            />
          </Link>
        </div>


        {/* Navigation */}
        <nav className="py-6 flex flex-col flex-1">
          <ul className="space-y-1 px-3">
            {menuItems.map((item) => (
              <li key={item.label}>
                <Link 
                  to={item.path}
                  className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-antlia-blue transition-colors"
                  onClick={() => isMobile && setIsSidebarOpen(false)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full justify-start text-gray-700 hover:text-red-600 hover:bg-red-50"
          >
            <LogOut className="mr-2 h-5 w-5" />
            Keluar
          </Button>
        </div>
      </aside>

      {/* Backdrop (for mobile) */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-30"
          onClick={() => setIsSidebarOpen(false)} 
          aria-hidden="true"
        />
      )}

      {/* Main Content */}
      <div className={`flex-1 overflow-auto ${isMobile ? "ml-0" : "ml-64"}`}>
        <header className="bg-white border-b border-gray-200 py-4 px-6 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Layout className="h-6 w-6 text-antlia-blue" />
            <h2 className="text-xl font-semibold">Panel Admin</h2>
          </div>
          <div>
            <Button 
              variant="ghost"
              size="sm"
              className="text-gray-700 hover:text-antlia-blue"
              onClick={() => navigate("/")}
            >
              Lihat Situs
            </Button>
          </div>
        </header>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
