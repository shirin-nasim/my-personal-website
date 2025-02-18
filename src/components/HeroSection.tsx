import React from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Calendar, Phone } from "lucide-react";
import InteractiveEye from "./InteractiveEye";

interface Props {
  doctorName?: string;
  tagline?: string;
  doctorImageUrl?: string;
}

const HeroSection = ({
  doctorName = "Dr. Sarah Mitchell",
  tagline = "Expert Eye Care with a Personal Touch",
  doctorImageUrl = "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop",
}: Props) => {
  return (
    <div className="relative min-h-[800px] w-full bg-gradient-to-b from-blue-50 to-white overflow-hidden">
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(10, 38, 71, 0.1) 0%, transparent 70%)",
        }}
      />

      <div className="container mx-auto px-4 pt-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-[#0A2647] mb-4">
                {doctorName}
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8">
                {tagline}
              </p>
            </motion.div>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-[#0A2647] hover:bg-[#1B4B7A] text-white px-8 py-6 text-lg"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Appointment
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#0A2647] text-[#0A2647] px-8 py-6 text-lg"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Emergency Contact
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Right Content */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative z-20"
            >
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
                <InteractiveEye />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative z-10"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-xl">
                <img
                  src={doctorImageUrl}
                  alt={doctorName}
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A2647]/20 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
    </div>
  );
};

export default HeroSection;
