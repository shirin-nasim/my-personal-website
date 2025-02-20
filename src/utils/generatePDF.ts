import { jsPDF } from "jspdf";

export const generatePDF = () => {
  const doc = new jsPDF();

  // Add blue header background
  doc.setFillColor(10, 38, 71); // #0A2647
  doc.rect(0, 0, 210, 40, "F");

  // Add profile image
  doc.addImage(
    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop",
    "JPEG",
    20,
    15,
    30,
    30,
  );

  // Header text in white
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.text("Dr. Sarah Mitchell", 60, 25);
  doc.setFontSize(16);
  doc.text("Senior Ophthalmologist", 60, 35);

  // Reset text color to black for rest of the content
  doc.setTextColor(0, 0, 0);

  // Contact Info with icons
  doc.setFontSize(12);
  doc.setDrawColor(220, 220, 220);
  doc.setFillColor(245, 245, 245);
  doc.roundedRect(15, 45, 180, 40, 3, 3, "FD");
  doc.text("✉ Email: sarah.mitchell@eyecare.com", 20, 60);
  doc.text("📞 Phone: +1 (555) 123-4567", 20, 70);
  doc.text("📍 Location: New York, NY", 20, 80);
  doc.text("🌐 Website: www.drsarahmitchell.com", 120, 60);

  // Stats in a grid
  doc.setFillColor(240, 247, 255);
  doc.roundedRect(15, 90, 85, 25, 3, 3, "F");
  doc.roundedRect(110, 90, 85, 25, 3, 3, "F");
  doc.roundedRect(15, 120, 85, 25, 3, 3, "F");
  doc.roundedRect(110, 120, 85, 25, 3, 3, "F");

  doc.setFontSize(14);
  doc.setFont(undefined, "bold");
  doc.text("Key Statistics", 15, 105);
  doc.setFont(undefined, "normal");
  doc.setFontSize(12);
  doc.text("15+ Years Experience", 20, 130);
  doc.text("10k+ Patients", 115, 130);
  doc.text("50+ Awards", 20, 140);
  doc.text("98% Success Rate", 115, 140);

  // Experience
  doc.setFontSize(14);
  doc.setFont(undefined, "bold");
  doc.text("Professional Experience", 15, 160);
  doc.setFont(undefined, "normal");
  doc.setFontSize(12);
  doc.text("Chief of Ophthalmology", 20, 170);
  doc.setFontSize(10);
  doc.text("New York Eye Center (2018 - Present)", 20, 175);
  doc.text("• Led a team of 15+ eye care professionals", 25, 182);
  doc.text("• Performed 500+ successful cataract surgeries annually", 25, 187);
  doc.text(
    "• Implemented new LASIK protocols improving success rates by 15%",
    25,
    192,
  );

  doc.setFontSize(12);
  doc.text("Senior Ophthalmologist", 20, 205);
  doc.setFontSize(10);
  doc.text("Boston Vision Institute (2012 - 2018)", 20, 210);
  doc.text("• Specialized in pediatric ophthalmology", 25, 217);
  doc.text("• Conducted research on innovative eye treatment methods", 25, 222);
  doc.text("• Mentored 12 ophthalmology residents", 25, 227);

  // Education
  doc.setFontSize(14);
  doc.setFont(undefined, "bold");
  doc.text("Education & Qualifications", 15, 245);
  doc.setFont(undefined, "normal");
  doc.setFontSize(12);
  doc.text("Fellowship in Advanced Ophthalmology", 20, 255);
  doc.setFontSize(10);
  doc.text("Johns Hopkins University, 2010-2012", 20, 260);

  // Add a new page
  doc.addPage();

  doc.setFontSize(12);
  doc.text("MD in Ophthalmology", 20, 20);
  doc.setFontSize(10);
  doc.text("Harvard Medical School, 2005-2009", 20, 25);

  doc.setFontSize(12);
  doc.text("MBBS", 20, 35);
  doc.setFontSize(10);
  doc.text("Stanford University, 2000-2004", 20, 40);

  // Publications
  doc.setFontSize(14);
  doc.setFont(undefined, "bold");
  doc.text("Publications & Research", 15, 60);
  doc.setFont(undefined, "normal");
  doc.setFontSize(12);
  doc.text("Advanced Techniques in Laser Eye Surgery", 20, 70);
  doc.setFontSize(10);
  doc.text("Journal of Ophthalmology, 2021", 20, 75);

  doc.setFontSize(12);
  doc.text("Pediatric Vision Care: A Comprehensive Study", 20, 85);
  doc.setFontSize(10);
  doc.text("International Eye Research, 2020", 20, 90);

  // Professional Memberships
  doc.setFontSize(14);
  doc.setFont(undefined, "bold");
  doc.text("Professional Memberships", 15, 110);
  doc.setFont(undefined, "normal");
  doc.setFontSize(12);
  doc.text("American Academy of Ophthalmology", 20, 120);
  doc.setFontSize(10);
  doc.text("Fellow Member since 2010", 20, 125);

  doc.setFontSize(12);
  doc.text("International Council of Ophthalmology", 20, 135);
  doc.setFontSize(10);
  doc.text("Active Member since 2012", 20, 140);

  // Languages
  doc.setFontSize(14);
  doc.setFont(undefined, "bold");
  doc.text("Languages", 15, 160);
  doc.setFont(undefined, "normal");
  doc.setFontSize(10);
  doc.text("• English: Native", 20, 170);
  doc.text("• Spanish: Professional", 20, 175);
  doc.text("• French: Intermediate", 20, 180);

  // Specializations
  doc.setFontSize(14);
  doc.setFont(undefined, "bold");
  doc.text("Specializations", 15, 200);
  doc.setFont(undefined, "normal");
  doc.setFontSize(10);
  const specializations = [
    "Cataract Surgery",
    "LASIK",
    "Glaucoma Treatment",
    "Pediatric Ophthalmology",
    "Retinal Disorders",
    "Corneal Transplantation",
  ];
  specializations.forEach((spec, index) => {
    doc.text(`• ${spec}`, 20, 210 + index * 7);
  });

  return doc;
};
