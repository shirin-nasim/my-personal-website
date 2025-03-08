import { jsPDF } from "jspdf";
import { config } from "@/config";
import { doctorInfo } from "../config/doctor";

export const generatePDF = () => {
  const doc = new jsPDF();

  // Helper function for section backgrounds
  const addSectionBackground = (y: number, height: number) => {
    doc.setFillColor(249, 250, 251); // Very light gray
    doc.rect(10, y, 190, height, "F");
  };

  // Add blue header background with gradient
  doc.setFillColor(10, 38, 71); // Primary color #0A2647
  doc.rect(0, 0, 210, 60, "F");

  // Add subtle pattern overlay
  doc.setGState(new doc.GState({ opacity: 0.1 }));
  for (let i = 0; i < 210; i += 5) {
    for (let j = 0; j < 60; j += 5) {
      doc.setFillColor(255, 255, 255);
      doc.circle(i, j, 0.5, "F");
    }
  }
  doc.setGState(new doc.GState({ opacity: 1 }));

  // Add profile image
  try {
    // Calculate dimensions based on ratio
    const ratio = doctorInfo.image.ratio.split("/").map(Number);
    const width = 30;
    const height = (width * ratio[1]) / ratio[0];
    doc.addImage(doctorInfo.image.url, "JPEG", 15, 7, width, height);
  } catch (error) {
    console.error("Error adding image to PDF:", error);
    // Add a placeholder if image fails
    doc.setFillColor(200, 200, 200);
    doc.rect(15, 7, 30, 30, "F");
  }

  // Header text in white
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.text(doctorInfo.name, 50, 20);
  doc.setFontSize(16);
  doc.text(doctorInfo.title, 50, 30);
  doc.setFontSize(12);
  doc.text(doctorInfo.qualifications || config.doctor.qualifications, 50, 40);

  // Reset text color to black
  doc.setTextColor(0, 0, 0);

  // Contact Info with icons and background
  addSectionBackground(65, 35);
  doc.setFontSize(11);
  doc.text(`✉ ${doctorInfo.contact.email}`, 20, 77);
  doc.text(`📞 ${doctorInfo.contact.phone}`, 120, 77);
  doc.text(`📍 ${doctorInfo.contact.location}`, 20, 87);
  doc.text(`🌐 ${doctorInfo.contact.website}`, 120, 87);

  // Stats Grid
  let currentY = 110;
  doc.setFillColor(240, 247, 255); // Light blue

  // Stats header
  doc.setFontSize(14);
  doc.setFont(undefined, "bold");
  doc.text("Key Statistics", 15, currentY);
  currentY += 10;

  // Stats boxes
  const stats = [
    { value: doctorInfo.stats.experience, label: "Years Experience" },
    { value: doctorInfo.stats.patients, label: "Patients" },
    { value: doctorInfo.stats.awards, label: "Awards" },
    { value: doctorInfo.stats.successRate, label: "Success Rate" },
  ];

  stats.forEach((stat, index) => {
    const x = index % 2 === 0 ? 15 : 110;
    const y = currentY + Math.floor(index / 2) * 30;
    doc.setFillColor(240, 247, 255);
    doc.roundedRect(x, y, 85, 25, 3, 3, "F");
    doc.setFont(undefined, "bold");
    doc.setFontSize(14);
    doc.text(stat.value, x + 5, y + 10);
    doc.setFont(undefined, "normal");
    doc.setFontSize(10);
    doc.text(stat.label, x + 5, y + 20);
  });

  currentY += 65;

  // Experience Section
  doc.setFontSize(14);
  doc.setFont(undefined, "bold");
  doc.text("Professional Experience", 15, currentY);
  doc.setFont(undefined, "normal");
  currentY += 10;

  doctorInfo.experience.forEach((exp, index) => {
    addSectionBackground(currentY, 40);
    doc.setFontSize(12);
    doc.setFont(undefined, "bold");
    doc.text(`${exp.title} - ${exp.company}`, 20, currentY + 10);
    doc.setFont(undefined, "normal");
    doc.setFontSize(10);
    doc.text(exp.period, 20, currentY + 18);

    exp.achievements.forEach((achievement, i) => {
      doc.text(`• ${achievement}`, 25, currentY + 28 + i * 7);
    });

    currentY += 50;
  });

  // Add a new page
  doc.addPage();
  currentY = 20;

  // Add a header to the second page
  doc.setFillColor(10, 38, 71); // Primary color #0A2647
  doc.rect(0, 0, 210, 20, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont(undefined, "bold");
  doc.text(doctorInfo.name, 15, 13);
  doc.setFont(undefined, "normal");
  doc.setFontSize(10);
  doc.text("Curriculum Vitae", 150, 13);
  doc.setTextColor(0, 0, 0);

  // Education Section
  doc.setFontSize(14);
  doc.setFont(undefined, "bold");
  doc.text("Education & Qualifications", 15, currentY + 10);
  doc.setFont(undefined, "normal");
  currentY += 20;

  doctorInfo.education.forEach((edu, index) => {
    addSectionBackground(currentY, 25);
    doc.setFontSize(12);
    doc.setFont(undefined, "bold");
    doc.text(edu.degree, 20, currentY + 10);
    doc.setFont(undefined, "normal");
    doc.setFontSize(10);
    doc.text(`${edu.school}, ${edu.years}`, 20, currentY + 18);
    currentY += 30;
  });

  // Publications Section
  doc.setFontSize(14);
  doc.setFont(undefined, "bold");
  doc.text("Publications & Research", 15, currentY);
  doc.setFont(undefined, "normal");
  currentY += 10;

  doctorInfo.publications.forEach((pub, index) => {
    addSectionBackground(currentY, 25);
    doc.setFontSize(11);
    doc.setFont(undefined, "bold");
    doc.text(pub.title, 20, currentY + 10);
    doc.setFont(undefined, "normal");
    doc.setFontSize(9);
    doc.text(`${pub.journal}, ${pub.year}`, 20, currentY + 18);
    currentY += 30;
  });

  // Languages Section
  doc.setFontSize(14);
  doc.setFont(undefined, "bold");
  doc.text("Languages", 15, currentY);
  doc.setFont(undefined, "normal");
  currentY += 10;

  addSectionBackground(currentY, 25);
  doc.setFontSize(10);
  let langX = 20;
  let langY = currentY + 15;

  doctorInfo.languages.forEach((lang, index) => {
    doc.text(`• ${lang.language}: ${lang.level}`, langX, langY);
    if ((index + 1) % 2 === 0) {
      langX = 20;
      langY += 10;
    } else {
      langX = 100;
    }
  });
  currentY += 30;

  // Specializations
  doc.setFontSize(14);
  doc.setFont(undefined, "bold");
  doc.text("Specializations", 15, currentY);
  doc.setFont(undefined, "normal");
  currentY += 10;

  addSectionBackground(currentY, 35);
  doc.setFontSize(10);
  let specX = 20;
  let specY = currentY + 15;

  doctorInfo.specializations.forEach((spec, index) => {
    doc.text(`• ${spec}`, specX, specY);
    if ((index + 1) % 2 === 0) {
      specX = 20;
      specY += 10;
    } else {
      specX = 100;
    }
  });

  // Add footer with page numbers
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(
      `Page ${i} of ${totalPages}`,
      doc.internal.pageSize.getWidth() / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: "center" },
    );
  }

  return doc;
};
