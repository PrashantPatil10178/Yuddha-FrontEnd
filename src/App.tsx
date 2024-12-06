import { Navbar } from "./components/Navbar";

import { ThemeProvider } from "./styles/theme-provider";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastProvider } from "./components/ui/toast";
import { Suspense, lazy } from "react";

// Lazy load components
const Home = lazy(() => import("./pages/Home.tsx"));
const Courses = lazy(() => import("./pages/Courses.tsx"));
const About = lazy(() => import("./pages/About.tsx"));
const Contact = lazy(() => import("./pages/Contact.tsx"));
const Profile = lazy(() => import("./pages/Profile.tsx"));
const Settings = lazy(() => import("./pages/Settings.tsx"));
const LoginForm = lazy(() => import("./pages/login-page.tsx"));

function App() {
  return (
    <Router>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Navbar />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/logout" element={<Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </ThemeProvider>
    </Router>
  );
}

export default App;
