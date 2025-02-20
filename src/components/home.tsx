import React from "react";
import Header from "./Header";
import InteractiveEye from "./InteractiveEye";
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
  doctorName = "Dr. Shirin Nasimudeen",
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
      className="min-h-screen w-full bg-gradient-to-b from-blue-50 via-white to-blue-50"
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

      {/* Services Section */}
      <section id="services" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0A2647] opacity-5 pattern-grid-lg"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-center text-[#0A2647] mb-16">
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
                <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-[#0A2647] mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
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
