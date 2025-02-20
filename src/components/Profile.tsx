import React from "react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import {
  Download,
  Mail,
  Phone,
  MapPin,
  Globe,
  Award,
  GraduationCap,
  Stethoscope,
  Clock,
  Users,
  Trophy,
  BookOpen,
  FileText,
  Users2,
  Building2,
  Languages,
  Briefcase,
} from "lucide-react";

const Profile = () => {
  const handleDownload = async () => {
    try {
      const { generatePDF } = await import("../utils/generatePDF");
      const doc = generatePDF();
      doc.save("Dr_Sarah_Mitchell_CV.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 pt-24">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="relative h-48 bg-[#0A2647]">
            <div className="absolute -bottom-20 left-8">
              <div className="w-40 h-40 rounded-full border-4 border-white overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop"
                  alt="Dr. Sarah Mitchell"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="pt-24 px-8 pb-8">
            {/* Basic Info */}
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Dr. Sarah Mitchell
                </h1>
                <p className="text-lg text-blue-600">Senior Ophthalmologist</p>
              </div>
              <Button
                onClick={handleDownload}
                className="bg-[#0A2647] hover:bg-[#0A2647]/90"
              >
                <Download className="mr-2 h-4 w-4" /> Download CV
              </Button>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="h-5 w-5" /> sarah.mitchell@eyecare.com
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="h-5 w-5" /> +1 (555) 123-4567
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-5 w-5" /> New York, NY
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Globe className="h-5 w-5" /> www.drsarahmitchell.com
              </div>
            </div>

            {/* Experience Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Briefcase className="h-5 w-5" /> Professional Experience
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-xl shadow-sm border p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-lg">
                        Chief of Ophthalmology
                      </h3>
                      <p className="text-blue-600">New York Eye Center</p>
                    </div>
                    <span className="text-sm text-gray-500">
                      2018 - Present
                    </span>
                  </div>
                  <ul className="mt-2 space-y-1 text-sm text-gray-600">
                    <li>• Led a team of 15+ eye care professionals</li>
                    <li>
                      • Performed 500+ successful cataract surgeries annually
                    </li>
                    <li>
                      • Implemented new LASIK protocols improving success rates
                      by 15%
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl shadow-sm border p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-lg">
                        Senior Ophthalmologist
                      </h3>
                      <p className="text-blue-600">Boston Vision Institute</p>
                    </div>
                    <span className="text-sm text-gray-500">2012 - 2018</span>
                  </div>
                  <ul className="mt-2 space-y-1 text-sm text-gray-600">
                    <li>• Specialized in pediatric ophthalmology</li>
                    <li>
                      • Conducted research on innovative eye treatment methods
                    </li>
                    <li>• Mentored 12 ophthalmology residents</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <Clock className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold text-gray-900">15+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <Users className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold text-gray-900">10k+</div>
                <div className="text-sm text-gray-600">Patients</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <Trophy className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold text-gray-900">50+</div>
                <div className="text-sm text-gray-600">Awards</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <Stethoscope className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold text-gray-900">98%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </div>

            {/* Qualifications */}
            <div className="mb-8 bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <GraduationCap className="h-5 w-5" /> Education & Qualifications
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <Award className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <div className="font-medium">
                      Fellowship in Advanced Ophthalmology
                    </div>
                    <div className="text-sm text-gray-600">
                      Johns Hopkins University, 2010-2012
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Award className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <div className="font-medium">MD in Ophthalmology</div>
                    <div className="text-sm text-gray-600">
                      Harvard Medical School, 2005-2009
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Award className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <div className="font-medium">MBBS</div>
                    <div className="text-sm text-gray-600">
                      Stanford University, 2000-2004
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            {/* Publications & Research */}
            <div className="mb-8 bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5" /> Publications & Research
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <FileText className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <div className="font-medium">
                      Advanced Techniques in Laser Eye Surgery
                    </div>
                    <div className="text-sm text-gray-600">
                      Journal of Ophthalmology, 2021
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <FileText className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <div className="font-medium">
                      Pediatric Vision Care: A Comprehensive Study
                    </div>
                    <div className="text-sm text-gray-600">
                      International Eye Research, 2020
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            {/* Professional Memberships */}
            <div className="mb-8 bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Users2 className="h-5 w-5" /> Professional Memberships
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <Building2 className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <div className="font-medium">
                      American Academy of Ophthalmology
                    </div>
                    <div className="text-sm text-gray-600">
                      Fellow Member since 2010
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Building2 className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <div className="font-medium">
                      International Council of Ophthalmology
                    </div>
                    <div className="text-sm text-gray-600">
                      Active Member since 2012
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            {/* Languages */}
            <div className="mb-8 bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Languages className="h-5 w-5" /> Languages
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="font-medium">English</div>
                  <div className="text-sm text-gray-600">Native</div>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="font-medium">Spanish</div>
                  <div className="text-sm text-gray-600">Professional</div>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="font-medium">French</div>
                  <div className="text-sm text-gray-600">Intermediate</div>
                </div>
              </div>
            </div>

            {/* Specializations */}
            <div className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Stethoscope className="h-5 w-5" /> Specializations
              </h2>
              <div className="flex flex-wrap gap-2">
                {[
                  "Cataract Surgery",
                  "LASIK",
                  "Glaucoma Treatment",
                  "Pediatric Ophthalmology",
                  "Retinal Disorders",
                  "Corneal Transplantation",
                ].map((item) => (
                  <span
                    key={item}
                    className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
