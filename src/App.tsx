import { Navbar } from "./components/Navbar";
import { LoginForm } from "./pages/login-page";
import { ThemeProvider } from "./styles/theme-provider";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Navbar />
        <div className="h-screen w-full flex justify-center items-center dark:bg-black">
          <LoginForm />
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
