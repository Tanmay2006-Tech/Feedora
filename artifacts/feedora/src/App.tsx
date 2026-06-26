import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";
import HomePage from "./pages/home";
import "./index.css";

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="min-h-screen bg-background">
        <HomePage />
      </div>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
