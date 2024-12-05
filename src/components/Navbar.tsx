import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "./common/mode-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Search, User } from "lucide-react";
import { api } from "@/services/AxiosInterceptor";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

interface UserData {
  user: User;
}

interface User {
  id: number;
  name: string;
  email: string;
  avatarUrl: string | "";
  phoneNumber: number | null;
  googleId: string;
  role: string;
  isActive: boolean;
}

const NavItems = ({ className }: { className?: string }) => (
  <div className={`flex flex-col md:flex-row md:space-x-6 ${className}`}>
    {["Home", "Courses", "About", "Contact"].map((item) => (
      <Link
        key={item}
        to={`/${item.toLowerCase()}`}
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        {item}
      </Link>
    ))}
  </div>
);

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get<UserData>("/auth/me");
        setUserData(response.user);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setUserData(null);
      }
    };
    console.log(api.getToken());
    if (api.getToken()) {
      fetchUserData();
    }
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-lg dark:bg-background/75">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-lg font-bold text-primary">EduApp</span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex">
          <NavItems />
        </nav>

        {/* Right Section: Search + User Actions */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <form className="relative hidden md:block">
            <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              className="h-10 w-[200px] pl-10 pr-4 rounded-md"
            />
          </form>

          {/* Mode Toggle */}
          <ModeToggle />

          {/* User Menu or Login Button */}
          {userData ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-lg border hover:border-primary"
                >
                  <User className="h-5 w-5 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-60 bg-background shadow-lg"
                align="end"
              >
                <DropdownMenuLabel className="font-medium">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage
                        src={userData.avatarUrl}
                        alt={userData.name}
                      />
                      <AvatarFallback className="rounded-lg">
                        {userData.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {userData.name}
                      </span>
                      <span className="truncate text-xs">{userData.email}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/profile" className="w-full text-left">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/settings" className="w-full text-left">
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/logout" className="w-full text-left">
                    Log out
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="outline" size="sm">
              <Link to="/login">Login</Link>
            </Button>
          )}

          {/* Mobile Menu Trigger */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4">
                <NavItems className="space-y-4" />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
