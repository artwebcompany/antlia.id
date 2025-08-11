
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LoadingScreen from "./LoadingScreen";

const MainLayout = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <Navbar />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
};

export default MainLayout;
