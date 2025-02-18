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
import { Phone } from "lucide-react";
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
  logo = "Eye Care Clinic",
  navigationItems = [
    {
      title: "Services",
      href: "#",
      items: [
        {
          title: "Eye Examinations",
          href: "#",
          description: "Comprehensive eye health evaluations",
        },
        {
          title: "LASIK Surgery",
          href: "#",
          description: "Advanced laser vision correction",
        },
      ],
    },
    { title: "About", href: "#" },
    { title: "Contact", href: "#" },
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
        {/* Logo */}
        <div className="text-2xl font-bold text-[#0A2647]">{logo}</div>

        {/* Navigation */}
        <NavigationMenu>
          <NavigationMenuList>
            {navigationItems.map((item) => (
              <NavigationMenuItem key={item.title}>
                {item.items ? (
                  <>
                    <NavigationMenuTrigger className="text-[#0A2647]">
                      {item.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4">
                        {item.items.map((subItem) => (
                          <li key={subItem.title}>
                            <NavigationMenuLink asChild>
                              <a
                                href={subItem.href}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100"
                              >
                                <div className="text-sm font-medium leading-none text-[#0A2647]">
                                  {subItem.title}
                                </div>
                                {subItem.description && (
                                  <p className="line-clamp-2 text-sm leading-snug text-slate-500">
                                    {subItem.description}
                                  </p>
                                )}
                              </a>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <NavigationMenuLink asChild>
                    <a
                      href={item.href}
                      className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-[#0A2647] hover:bg-slate-100 focus:bg-slate-100"
                    >
                      {item.title}
                    </a>
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Emergency Contact Button */}
        <Button
          variant="default"
          className="bg-[#0A2647] hover:bg-[#0A2647]/90 text-white"
          onClick={() => (window.location.href = `tel:${emergencyPhone}`)}
        >
          <Phone className="mr-2 h-4 w-4" />
          Emergency: {emergencyPhone}
        </Button>
      </div>
    </motion.header>
  );
};

export default Header;
