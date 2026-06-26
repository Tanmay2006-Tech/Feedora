import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Leaf, LogOut, BarChart2 } from "lucide-react";

export function Nav() {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    logout();
    setLocation("/");
  };

  const roleLinks = {
    donor: { href: "/donor", label: "My Posts" },
    ngo: { href: "/ngo", label: "Available Food" },
    volunteer: { href: "/volunteer", label: "My Pickups" },
    admin: { href: "/", label: "Home" },
  };

  return (
    <header className="sticky top-0 z-50 bg-card/80 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-primary font-bold text-xl tracking-tight">
          <Leaf className="w-6 h-6" />
          <span>Feedora</span>
        </Link>

        <nav className="flex items-center gap-4">
          <Link href="/impact" className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <BarChart2 className="w-4 h-4" />
            Impact
          </Link>

          {user ? (
            <>
              {user.role in roleLinks && (
                <Link href={roleLinks[user.role as keyof typeof roleLinks].href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  {roleLinks[user.role as keyof typeof roleLinks].label}
                </Link>
              )}
              <div className="flex items-center gap-2 ml-2">
                <div className="text-sm">
                  <div className="font-medium">{user.name}</div>
                  <div className="text-xs text-muted-foreground capitalize">{user.role}</div>
                </div>
                <Button variant="ghost" size="icon" onClick={handleLogout} className="h-8 w-8">
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground">Sign in</Link>
              <Link href="/register">
                <Button size="sm" className="rounded-full">Join Network</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
