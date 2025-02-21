import React from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import InteractiveEye from "./InteractiveEye";

interface Props {
  doctorName?: string;
  tagline?: string;
  doctorImageUrl?: string;
  imageRatio?: string;
  imageFit?: "cover" | "contain" | "fill";
}

const HeroSection = ({
  doctorName = "Dr. Shirin Nasimudeen",
  tagline = "Expert Eye Care with a Personal Touch",
  doctorImageUrl = "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop",
  imageRatio = "16/9",
  imageFit = "contain",
}: Props) => {
  const navigate = useNavigate();

  return (
    <div id="home" className="relative bg-white pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Text Content */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {doctorName}
              <span className="block text-xl font-medium text-blue-600 mt-2">
                MBBS, MS (Ophthalmology), FRCS
              </span>
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Expert Ophthalmologist with 15+ years of experience in
              comprehensive eye care, specializing in cataract surgery and
              retinal treatments.
            </p>
            <div className="flex gap-4">
              <Button
                onClick={() => navigate("/book")}
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                Book Appointment
              </Button>
              <Button
                onClick={() => navigate("/services")}
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                Our Services
              </Button>
            </div>
            {/* Trust Indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8 md:mt-12">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">15+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">10,000+</div>
                <div className="text-sm text-gray-600">Patients Treated</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">98%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <img
              src={doctorImageUrl}
              alt={doctorName}
              className={`rounded-lg shadow-xl w-full max-w-md mx-auto object-${imageFit}`}
              style={{ aspectRatio: imageRatio }}
            />
            {/* Interactive Eye Badge */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-full p-2 shadow-lg">
              <InteractiveEye size={58} trackingSpeed={0.9} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
