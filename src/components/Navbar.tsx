import { useState } from "react";
import { Link } from "react-router-dom";
import { ModeToggle } from "@/components/common/mode-toggle";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const NavItems = () => (
  <>
    <Link
      to="/"
      className="text-base font-semibold transition-colors hover:text-primary focus:text-primary dark:hover:text-primary dark:focus:text-primary"
    >
      Home
    </Link>
    <Link
      to="/about"
      className="text-base font-semibold transition-colors hover:text-primary focus:text-primary dark:hover:text-primary dark:focus:text-primary"
    >
      About
    </Link>
    <Link
      to="/contact"
      className="text-base font-semibold transition-colors hover:text-primary focus:text-primary dark:hover:text-primary dark:focus:text-primary"
    >
      Contact
    </Link>
  </>
);

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:bg-black dark:border-gray-300">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        <div className="mr-4 flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl sm:text-2xl text-gray-900 dark:text-white">
              MyApp
            </span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-800 dark:text-white">
          <NavItems />
        </nav>
        <div className="flex items-center space-x-4">
          <ModeToggle />
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="mr-2 px-0 text-lg hover:bg-transparent focus-visible:ring-0 dark:hover:bg-transparent dark:focus-visible:ring-0 md:hidden"
              >
                <Menu className="h-6 w-6 text-gray-800 dark:text-gray-200" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-4">
              <MobileNav />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function MobileNav() {
  return (
    <div className="flex flex-col space-y-4">
      <Link
        to="/"
        className="text-lg font-semibold hover:text-primary focus:text-primary dark:hover:text-primary dark:focus:text-primary"
      >
        Home
      </Link>
      <Link
        to="/about"
        className="text-lg font-semibold hover:text-primary focus:text-primary dark:hover:text-primary dark:focus:text-primary"
      >
        About
      </Link>
      <Link
        to="/contact"
        className="text-lg font-semibold hover:text-primary focus:text-primary dark:hover:text-primary dark:focus:text-primary"
      >
        Contact
      </Link>
    </div>
  );
}
