/**
 * Main configuration file for the medical booking application.
 * Update these values when deploying for a different doctor/clinic.
 */

import { services } from "./services";

export const config = {
  // Doctor/Clinic Information
  doctor: {
    name: "Dr. Shirin Nasimudeen",
    title: "Senior Ophthalmologist",
    qualifications: "MBBS, MS (Ophthalmology), FRCS",
    specialization: "Expert Ophthalmologist",
    experience: "15+ years",
    image: {
      path: "/doctor-profile.jpeg", // This should be in the public folder
      ratio: "16/12",
      fit: "cover",
    },
  },

  // Contact & Location
  contact: {
    email: "shirin.nasim@gmail.com",
    phone: "+91 9606136078",
    location: "Raysal khaima, Dubai",
    website: "www.shirinnasim.com",
  },

  // Appointment Settings
  appointments: {
    consultationFee: 50, // in USD
    maxBookingDays: 30, // How many days in advance can book
    timeSlots: [
      "09:00",
      "09:30",
      "10:00",
      "10:30",
      "11:00",
      "11:30",
      "14:00",
      "14:30",
      "15:00",
      "15:30",
      "16:00",
      "16:30",
    ],
    workingDays: {
      sunday: false,
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
    },
  },

  // API Keys & External Services
  services: {
    supabase: {
      url: "https://ayvzrtsqdcqplfdhsmep.supabase.co",
      anonKey:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5dnpydHNxZGNxcGxmZGhzbWVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAyNTM3MDksImV4cCI6MjA1NTgyOTcwOX0.nYQc-pGalmSeI9bIG5osS3zK1fm08vlAV8vRp7JjPx8",
    },
    email: {
      resendApiKey: "re_hYuzweVq_FkVK8nEJgfFxjuvA8S9KonCj",
      fromEmail: "appointments@drshirin.com",
      fromName: "Dr. Shirin",
    },
    payment: {
      // Add payment gateway credentials here
      // stripe: {
      //   publicKey: 'pk_test_....',
      //   secretKey: 'sk_test_....' // Should be in backend only
      // }
    },
  },

  // Doctor's Professional Details
  professional: {
    education: [
      {
        degree: "Fellowship in Advanced Ophthalmology",
        school: "Yenepoya University",
        years: "2016-2022",
      },
      {
        degree: "MD in Ophthalmology",
        school: "Harvard Medical School",
        years: "2005-2009",
      },
      {
        degree: "MBBS",
        school: "Stanford University",
        years: "2000-2004",
      },
    ],
    specializations: [
      "Cataract Surgery",
      "LASIK",
      "Glaucoma Treatment",
      "Pediatric Ophthalmology",
      "Retinal Disorders",
      "Corneal Transplantation",
    ],
    languages: [
      { language: "English", level: "Native" },
      { language: "Malyalam", level: "Professional" },
      { language: "Hindi", level: "Intermediate" },
    ],
    stats: {
      experience: "15+",
      patients: "10,000+",
      awards: "5+",
      successRate: "98%",
    },
  },

  // Theme & Styling
  theme: {
    colors: {
      primary: "#0A2647",
      secondary: "#1B4B7A",
    },
    fonts: {
      heading: "Source Sans Pro, sans-serif",
      body: "Roboto, sans-serif",
    },
  },

  // Services offered by the clinic
  services,
};
