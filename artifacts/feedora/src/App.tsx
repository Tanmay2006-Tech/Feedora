import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router, Route } from "wouter";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import DonorPage from "./pages/donor";
import NGOPage from "./pages/ngo";
import VolunteerPage from "./pages/volunteer";
import ImpactPage from "./pages/impact";
import NotFoundPage from "./pages/not-found";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <Router>
          <div className="min-h-screen bg-background">
            <Route path="/">
              <HomePage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/register">
              <RegisterPage />
            </Route>
            <Route path="/donor">
              <DonorPage />
            </Route>
            <Route path="/ngo">
              <NGOPage />
            </Route>
            <Route path="/volunteer">
              <VolunteerPage />
            </Route>
            <Route path="/impact">
              <ImpactPage />
            </Route>
            <Route>
              <NotFoundPage />
            </Route>
          </div>
        </Router>
        <Toaster position="top-right" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
