import React from "react";
import Header from "./Header";
import HeroSection from "./HeroSection";
import { motion } from "framer-motion";

interface Props {
  doctorName?: string;
  tagline?: string;
  doctorImageUrl?: string;
  navigationItems?: Array<{
    title: string;
    href: string;
    items?: Array<{ title: string; href: string; description?: string }>;
  }>;
  emergencyPhone?: string;
}

const Home = ({
  doctorName = "Dr. Sarah Mitchell",
  tagline = "Expert Eye Care with a Personal Touch",
  doctorImageUrl = "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop",
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
  return (
    <motion.div
      className="min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header
        navigationItems={navigationItems}
        emergencyPhone={emergencyPhone}
      />
      <HeroSection
        doctorName={doctorName}
        tagline={tagline}
        doctorImageUrl={doctorImageUrl}
      />
    </motion.div>
  );
};

export default Home;
