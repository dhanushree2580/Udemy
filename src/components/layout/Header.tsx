import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, Menu, X, Globe, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

const categories = [
  "Development", "Business", "Finance & Accounting", "IT & Software",
  "Office Productivity", "Personal Development", "Design", "Marketing",
  "Health & Fitness", "Music",
];

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="border-b bg-background sticky top-0 z-50" style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.08)" }}>
      <div className="flex items-center h-[72px] px-4 lg:px-6 gap-2">
        <button className="lg:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <Link to="/" className="flex-shrink-0 mr-2">
          <span className="text-2xl font-black tracking-tight text-primary">LearnFlair</span>
        </Link>

        <div className="hidden lg:block relative group">
          <button className="text-sm text-muted-foreground hover:text-primary px-3 py-2">Categories</button>
          <div className="absolute left-0 top-full pt-2 hidden group-hover:block z-50">
            <div className="bg-background border shadow-lg w-64 py-2 rounded-md">
              {categories.map((cat) => (
                <Link key={cat} to={`/courses?category=${encodeURIComponent(cat)}`}
                  className="block px-4 py-2 text-sm hover:bg-accent text-foreground">
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl mx-4">
          <div className="flex w-full border rounded-full overflow-hidden bg-secondary">
            <div className="flex items-center pl-4">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <Input type="text" placeholder="Search for anything"
              className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-sm"
              value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
        </form>

        <div className="flex items-center gap-1 ml-auto">
          <Link to="/instructor" className="hidden lg:block text-sm text-muted-foreground hover:text-primary px-3 py-2">
            Teach on LearnFlair
          </Link>
          <Link to="/cart" className="p-2 relative">
            <ShoppingCart className="h-5 w-5 text-foreground" />
          </Link>

          {user ? (
            <div className="flex items-center gap-2 ml-2">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm" className="gap-2">
                  <User className="h-4 w-4" /> My Learning
                </Button>
              </Link>
              <Button variant="ghost" size="icon" onClick={handleSignOut} title="Sign out">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2 ml-2">
              <Link to="/login">
                <Button variant="udemy-outline" size="sm" className="text-sm h-10 px-4">Log in</Button>
              </Link>
              <Link to="/register">
                <Button variant="udemy" size="sm" className="text-sm h-10 px-4">Sign up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t bg-background px-4 py-4 space-y-3">
          <form onSubmit={handleSearch} className="flex md:hidden">
            <div className="flex w-full border rounded-full overflow-hidden bg-secondary">
              <div className="flex items-center pl-4"><Search className="h-4 w-4 text-muted-foreground" /></div>
              <Input type="text" placeholder="Search for anything"
                className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-sm"
                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
          </form>
          <div className="space-y-1">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-2">Categories</p>
            {categories.slice(0, 6).map((cat) => (
              <Link key={cat} to={`/courses?category=${encodeURIComponent(cat)}`}
                className="block px-2 py-1.5 text-sm text-foreground hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}>
                {cat}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
