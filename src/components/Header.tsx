import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import InteractiveEye from "./InteractiveEye";
import { motion } from "framer-motion";

interface Props {
  logo?: string;
  navigationItems?: Array<{
    title: string;
    href: string;
    items?: Array<{ title: string; href: string; description?: string }>;
  }>;
  emergencyPhone?: string;
}

const Header = ({
  logo = "Dr Shirin's",
  navigationItems = [
    { title: "Home", href: "#home" },
    { title: "Services", href: "#services" },
  ],
  emergencyPhone = "1-800-EYE-CARE",
}: Props) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md transition-all duration-300 ${isScrolled ? "shadow-lg" : ""}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo with Interactive Eye */}
        <div className="flex items-center gap-3">
          <div className="text-xl md:text-2xl font-bold text-[#0A2647]">
            {logo}
          </div>
          <div className="w-[40px] h-[40px] md:w-[60px] md:h-[60px] opacity-90">
            <InteractiveEye size={50} trackingSpeed={0.9} />
          </div>
        </div>

        {/* Navigation - Hidden on mobile, visible on desktop */}
        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuLink asChild>
                    <a
                      href={item.href}
                      className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-[#0A2647] hover:bg-slate-100 focus:bg-slate-100"
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.querySelector(item.href);
                        element?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      {item.title}
                    </a>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="sm"
            className="text-[#0A2647]"
            onClick={() => {
              const menu = document.createElement("div");
              menu.className =
                "fixed inset-0 bg-white z-50 flex flex-col items-center justify-center space-y-4";
              navigationItems.forEach((item) => {
                const link = document.createElement("a");
                link.href = item.href;
                link.className = "text-xl text-[#0A2647] py-2";
                link.textContent = item.title;
                link.onclick = (e) => {
                  e.preventDefault();
                  const element = document.querySelector(item.href);
                  element?.scrollIntoView({ behavior: "smooth" });
                  document.body.removeChild(menu);
                };
                menu.appendChild(link);
              });
              const closeBtn = document.createElement("button");
              closeBtn.className = "absolute top-4 right-4 text-[#0A2647]";
              closeBtn.textContent = "✕";
              closeBtn.onclick = () => document.body.removeChild(menu);
              menu.appendChild(closeBtn);
              document.body.appendChild(menu);
            }}
          >
            ☰
          </Button>
        </div>

        {/* Emergency Contact Button - Hidden on mobile */}
        <div className="hidden md:block">
          <Button
            variant="default"
            className="bg-[#0A2647] hover:bg-[#0A2647]/90 text-white"
            onClick={() => (window.location.href = "/profile")}
          >
            View My Profile
          </Button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
