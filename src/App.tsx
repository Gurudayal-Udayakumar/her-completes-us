import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Memory1 from "./pages/Memory1";
import Memory2 from "./pages/Memory2";
import Memory3 from "./pages/Memory3";
import Memory4 from "./pages/Memory4";
import Memory5 from "./pages/Memory5";
import Memory6 from "./pages/Memory6";
import FinalPage from "./pages/FinalPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/memory/1" element={<Memory1 />} />
          <Route path="/memory/2" element={<Memory2 />} />
          <Route path="/memory/3" element={<Memory3 />} />
          <Route path="/memory/4" element={<Memory4 />} />
          <Route path="/memory/5" element={<Memory5 />} />
          <Route path="/memory/6" element={<Memory6 />} />
          <Route path="/final" element={<FinalPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
