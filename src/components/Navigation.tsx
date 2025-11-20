import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Zap, Settings, Trophy, TrendingUp, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import robertAvatar from "@/assets/robert-avatar.jpg";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const getInitials = (email: string | undefined) => {
    if (!email) return "U";
    return email.substring(0, 2).toUpperCase();
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
    { name: "Projects", path: "/projects" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-primary/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Zap className="h-8 w-8 text-primary animate-glow-pulse" />
              <div className="absolute inset-0 blur-xl bg-primary/30 animate-glow-pulse" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              AI RUNNER 2033
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative font-medium transition-all duration-300 ${
                  isActive(link.path)
                    ? "text-primary"
                    : "text-foreground/70 hover:text-primary"
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary glow-turquoise" />
                )}
              </Link>
            ))}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="relative h-10 w-10 rounded-full border-2 border-primary/50 hover:border-primary transition-all duration-300 hover:glow-turquoise">
                    <Avatar className="h-full w-full">
                      <AvatarImage src={user.user_metadata?.avatar_url || robertAvatar} alt={user.email || "User"} />
                      <AvatarFallback className="bg-primary/20 text-primary font-bold">
                        {user.email ? getInitials(user.email) : "U"}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 glass-card border-primary/30">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.email}</p>
                      <p className="text-xs leading-none text-muted-foreground">My Account</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/achievements" className="cursor-pointer">
                      <Trophy className="mr-2 h-4 w-4" />
                      Achievements
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/progression" className="cursor-pointer">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Progression
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="outline"
                className="border-primary/50 hover:bg-primary/10 hover:border-primary hover:glow-turquoise transition-all duration-300"
                asChild
              >
                <Link to="/login">Login</Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="block md:hidden text-primary p-2 hover:bg-primary/10 rounded-lg transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 animate-slide-in">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block py-3 px-4 rounded-lg mb-2 transition-all ${
                  isActive(link.path)
                    ? "bg-primary/20 text-primary border border-primary/30"
                    : "text-foreground/70 hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {link.name}
              </Link>
            ))}
            {user ? (
              <div className="mt-4 space-y-2">
                <Link
                  to="/settings"
                  className="block py-3 px-4 rounded-lg text-foreground/70 hover:bg-primary/10 hover:text-primary transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  Settings
                </Link>
                <Link
                  to="/achievements"
                  className="block py-3 px-4 rounded-lg text-foreground/70 hover:bg-primary/10 hover:text-primary transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  Achievements
                </Link>
                <Link
                  to="/progression"
                  className="block py-3 px-4 rounded-lg text-foreground/70 hover:bg-primary/10 hover:text-primary transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  Progression
                </Link>
                <Button
                  variant="outline"
                  className="w-full mt-4 border-destructive/50 hover:bg-destructive/10 hover:border-destructive text-destructive"
                  onClick={handleSignOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                className="w-full mt-4 border-primary/50 hover:bg-primary/10 hover:border-primary"
                asChild
              >
                <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
