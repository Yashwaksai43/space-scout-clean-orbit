
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { Capacitor } from "@capacitor/core";

import AppLayout from "./components/layout/AppLayout";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import AppsAnalysis from "./pages/AppsAnalysis";
import PhotosAnalysis from "./pages/PhotosAnalysis";
import AICleanup from "./pages/AICleanup";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { StorageProvider } from "./contexts/StorageContext";
import "./App.css";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Initialize and check Capacitor platform
    const platform = Capacitor.getPlatform();
    console.log('Running on platform:', platform);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <StorageProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
              <Route path="/apps" element={<AppLayout><AppsAnalysis /></AppLayout>} />
              <Route path="/photos" element={<AppLayout><PhotosAnalysis /></AppLayout>} />
              <Route path="/ai-cleanup" element={<AppLayout><AICleanup /></AppLayout>} />
              <Route path="/settings" element={<AppLayout><Settings /></AppLayout>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </StorageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
