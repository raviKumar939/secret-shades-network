import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useLocation } from "react-router-dom";
import { Menu, Network, Users, Settings, Home, Shield } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: "Dashboard", icon: Home, href: "/dashboard" },
    { label: "Network", icon: Users, href: "/network" },
    { label: "Privacy", icon: Shield, href: "/privacy" },
    { label: "Settings", icon: Settings, href: "/settings" }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-muted/20">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Network className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg text-foreground">PrivateGraph</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Button
                key={item.label}
                variant="ghost"
                asChild
                className={`gap-2 transition-smooth ${
                  isActive 
                    ? "bg-cyber-blue/20 text-cyber-blue" 
                    : "hover:bg-cyber-blue/10 hover:text-cyber-blue"
                }`}
              >
                <Link to={item.href}>
                  <IconComponent className="w-4 h-4" />
                  {item.label}
                </Link>
              </Button>
            );
          })}
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="sm">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-surface-dark border-l border-muted/20">
            <div className="flex flex-col gap-4 mt-8">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Button
                    key={item.label}
                    variant="ghost"
                    asChild
                    className={`justify-start gap-3 text-left transition-smooth ${
                      isActive 
                        ? "bg-cyber-blue/20 text-cyber-blue" 
                        : "hover:bg-cyber-blue/10 hover:text-cyber-blue"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Link to={item.href}>
                      <IconComponent className="w-5 h-5" />
                      {item.label}
                    </Link>
                  </Button>
                );
              })}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navigation;