import React from "react";
import Header from "./Header";
import HeroSection from "./HeroSection";
import { motion } from "framer-motion";
import { doctorInfo } from "../config/doctor";

interface Props {
  navigationItems?: Array<{
    title: string;
    href: string;
    items?: Array<{ title: string; href: string; description?: string }>;
  }>;
  emergencyPhone?: string;
}

const Home = ({
  navigationItems = [
    { title: "Home", href: "#home" },
    { title: "Services", href: "#services" },
    { title: "Profile", href: "/profile" },
  ],
  emergencyPhone = "1-800-EYE-CARE",
}: Props) => {
  return (
    <motion.div
      className="w-full bg-gradient-to-b from-blue-50 via-white to-blue-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header
        navigationItems={navigationItems}
        emergencyPhone={emergencyPhone}
      />
      <HeroSection
        doctorName={doctorInfo.name}
        tagline="Expert Eye Care with a Personal Touch"
        doctorImageUrl={doctorInfo.image.url}
        imageRatio={doctorInfo.image.ratio}
        imageFit={doctorInfo.image.fit}
      />

      {/* Services Section */}
      <section id="services" className="pt-4 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0A2647] opacity-5 pattern-grid-lg"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#0A2647] mb-6">
              Comprehensive Eye Care Services
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                title: "Advanced Eye Examinations",
                description:
                  "State-of-the-art diagnostics for precise eye health evaluation",
                icon: "🔍",
              },
              {
                title: "Modern LASIK Surgery",
                description:
                  "Cutting-edge laser technology for vision correction",
                icon: "⚡",
              },
              {
                title: "Specialized Pediatric Care",
                description: "Gentle and comprehensive care for young eyes",
                icon: "👶",
              },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-[180px] flex flex-col">
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-[#0A2647] mb-3 line-clamp-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm line-clamp-3 flex-grow">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
