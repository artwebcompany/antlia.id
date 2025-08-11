import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import AdminLayout from "./components/admin/AdminLayout";
import HomePage from "./pages/HomePage";
import ArticlesPage from "./pages/ArticlesPage";
import ArticleDetailPage from "./pages/ArticleDetailPage";
import NotFound from "./pages/NotFound";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminArticlesPage from "./pages/admin/AdminArticlesPage";
import ArticleFormPage from "./pages/admin/ArticleFormPage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ServicesPage from "./pages/ServicesPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import AboutUsPage from "./pages/AboutUsPage";
import SolutionsPage from "./pages/SolutionsPage";
import ClientsPage from "./pages/ClientsPage";
import ContactPage from "./pages/ContactPage";
import AnalyticsPage from "./pages/admin/AnalyticsPage"; // Import page baru
import './i18n';

const queryClient = new QueryClient();

const App = () => (
 <QueryClientProvider client={queryClient}>
  <TooltipProvider>
   <Toaster />
   <Sonner />
   <BrowserRouter>
    <Routes>
     {/* Main Site Routes */}
     <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="produk-layanan" element={<ProductsPage />} />
      <Route path="produk/:slug" element={<ProductDetailPage />} />
      <Route path="layanan" element={<ServicesPage />} />
      <Route path="layanan/:slug" element={<ServiceDetailPage />} />
      <Route path="tentang-kami" element={<AboutUsPage />} />
      <Route path="solusi" element={<SolutionsPage />} />
      <Route path="klien" element={<ClientsPage />} />
      <Route path="kontak" element={<ContactPage />} />
      <Route path="artikel" element={<ArticlesPage />} />
      <Route path="artikel/:slug" element={<ArticleDetailPage />} />
     </Route>

     {/* Admin Routes */}
     <Route path="/admin" element={<AdminLoginPage />} />
     <Route path="/admin" element={<AdminLayout />}>
      <Route path="dashboard" element={<AdminDashboardPage />} />
      <Route path="articles" element={<AdminArticlesPage />} />
      <Route path="articles/new" element={<ArticleFormPage />} />
      <Route path="articles/edit/:id" element={<ArticleFormPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
     </Route>

     {/* 404 Route */}
     <Route path="*" element={<NotFound />} />
    </Routes>
   </BrowserRouter>
  </TooltipProvider>
 </QueryClientProvider>
);

export default App;
