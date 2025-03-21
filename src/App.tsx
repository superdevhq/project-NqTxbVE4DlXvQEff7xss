
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Companies from "./pages/Companies";
import Contacts from "./pages/Contacts";
import Deals from "./pages/Deals";
import Settings from "./pages/Settings";
import Calendar from "./pages/Calendar";
import { CompanyDetailPage } from "./components/companies/CompanyDetailPage";
import { ContactDetailPage } from "./components/contacts/ContactDetailPage";
import { DealDetailPage } from "./components/deals/DealDetailPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/companies/:id" element={<Layout><CompanyDetailPage /></Layout>} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/contacts/:id" element={<Layout><ContactDetailPage /></Layout>} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/deals/:id" element={<Layout><DealDetailPage /></Layout>} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

// Layout component for detail pages
function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto p-6">
      {children}
    </div>
  );
}

export default App;
