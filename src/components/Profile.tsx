import React from "react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { doctorInfo } from "../config/doctor";
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
      doc.save(`${doctorInfo.name.replace(" ", "_")}_CV.pdf`);
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
                  src={doctorInfo.image.url}
                  alt={doctorInfo.name}
                  className={`w-full h-full object-${doctorInfo.image.fit}`}
                  style={{ aspectRatio: doctorInfo.image.ratio }}
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
                  {doctorInfo.name}
                </h1>
                <p className="text-lg text-blue-600">{doctorInfo.title}</p>
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
                <Mail className="h-5 w-5" /> {doctorInfo.contact.email}
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="h-5 w-5" /> {doctorInfo.contact.phone}
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-5 w-5" /> {doctorInfo.contact.location}
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Globe className="h-5 w-5" /> {doctorInfo.contact.website}
              </div>
            </div>

            {/* Experience Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Briefcase className="h-5 w-5" /> Professional Experience
              </h2>
              <div className="space-y-4">
                {doctorInfo.experience.map((exp, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-sm border p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-lg">{exp.title}</h3>
                        <p className="text-blue-600">{exp.company}</p>
                      </div>
                      <span className="text-sm text-gray-500">
                        {exp.period}
                      </span>
                    </div>
                    <ul className="mt-2 space-y-1 text-sm text-gray-600">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i}>• {achievement}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <Clock className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold text-gray-900">
                  {doctorInfo.stats.experience}
                </div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <Users className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold text-gray-900">
                  {doctorInfo.stats.patients}
                </div>
                <div className="text-sm text-gray-600">Patients</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <Trophy className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold text-gray-900">
                  {doctorInfo.stats.awards}
                </div>
                <div className="text-sm text-gray-600">Awards</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <Stethoscope className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold text-gray-900">
                  {doctorInfo.stats.successRate}
                </div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </div>

            {/* Qualifications */}
            <div className="mb-8 bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <GraduationCap className="h-5 w-5" /> Education & Qualifications
              </h2>
              <ul className="space-y-4">
                {doctorInfo.education.map((edu, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <Award className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <div className="font-medium">{edu.degree}</div>
                      <div className="text-sm text-gray-600">
                        {edu.school}, {edu.years}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Publications & Research */}
            <div className="mb-8 bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5" /> Publications & Research
              </h2>
              <ul className="space-y-4">
                {doctorInfo.publications.map((pub, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <FileText className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <div className="font-medium">{pub.title}</div>
                      <div className="text-sm text-gray-600">
                        {pub.journal}, {pub.year}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Languages */}
            <div className="mb-8 bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Languages className="h-5 w-5" /> Languages
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {doctorInfo.languages.map((lang, index) => (
                  <div key={index} className="bg-blue-50 p-3 rounded-lg">
                    <div className="font-medium">{lang.language}</div>
                    <div className="text-sm text-gray-600">{lang.level}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Specializations */}
            <div className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Stethoscope className="h-5 w-5" /> Specializations
              </h2>
              <div className="flex flex-wrap gap-2">
                {doctorInfo.specializations.map((spec, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                  >
                    {spec}
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
