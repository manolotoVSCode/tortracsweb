import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/hooks/useLanguage";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Jobs from "./pages/Jobs";
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/AdminDashboard";
import DownloadHero from "./pages/DownloadHero";
import ImageGallery from "./pages/ImageGallery";
import HeroImageSelector from "./pages/HeroImageSelector";
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <LanguageProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/bolsa-de-trabajo" element={<Jobs />} />
            <Route path="/admin" element={<Auth />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/download-hero" element={<DownloadHero />} />
            <Route path="/imagenes" element={<ImageGallery />} />
            <Route path="/hero-selector" element={<HeroImageSelector />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
