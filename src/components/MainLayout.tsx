import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LoadingScreen from "./LoadingScreen";
import { useAnalyticsTracker } from "@/hooks/useAnalyticsTracker"; // Impor hook pelacak

const MainLayout = () => {
 const [loading, setLoading] = useState(true);

  // Panggil hook pelacak analitik di sini.
  // Ini akan melacak setiap perubahan halaman (route).
  useAnalyticsTracker();

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
