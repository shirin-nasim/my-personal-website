import { jsPDF } from "jspdf";
import { doctorInfo } from "../config/doctor";

export const generatePDF = () => {
  const doc = new jsPDF();

  // Helper function for section backgrounds
  const addSectionBackground = (y: number, height: number) => {
    doc.setFillColor(249, 250, 251); // Very light gray
    doc.rect(10, y, 190, height, "F");
  };

  // Add blue header background
  doc.setFillColor(10, 38, 71); // #0A2647
  doc.rect(0, 0, 210, 45, "F");

  // Add profile image
  // Calculate dimensions based on ratio
  const ratio = doctorInfo.image.ratio.split("/").map(Number);
  const width = 30;
  const height = (width * ratio[1]) / ratio[0];
  doc.addImage(doctorInfo.image.url, "JPEG", 15, 7, width, height);

  // Header text in white
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.text(doctorInfo.name, 50, 20);
  doc.setFontSize(16);
  doc.text(doctorInfo.title, 50, 30);

  // Reset text color to black
  doc.setTextColor(0, 0, 0);

  // Contact Info with icons and background
  addSectionBackground(50, 35);
  doc.setFontSize(11);
  doc.text(`✉ ${doctorInfo.contact.email}`, 20, 62);
  doc.text(`📞 ${doctorInfo.contact.phone}`, 120, 62);
  doc.text(`📍 ${doctorInfo.contact.location}`, 20, 72);
  doc.text(`🌐 ${doctorInfo.contact.website}`, 120, 72);

  // Stats Grid
  let currentY = 95;
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
  doctorInfo.experience.forEach((exp, index) => {
    addSectionBackground(currentY, 80);
    doc.setFontSize(14);
    doc.setFont(undefined, "bold");
    if (index === 0) {
      doc.text("Professional Experience", 15, currentY + 10);
    }
    doc.setFont(undefined, "normal");

    doc.setFontSize(12);
    doc.text(`${exp.title} - ${exp.company}`, 20, currentY + 25);
    doc.setFontSize(10);
    doc.text(exp.period, 20, currentY + 32);

    exp.achievements.forEach((achievement, i) => {
      doc.text(`• ${achievement}`, 25, currentY + 42 + i * 7);
    });

    currentY += 90;
  });

  // Add a new page
  doc.addPage();
  currentY = 20;

  // Education Section
  addSectionBackground(currentY, 90);
  doc.setFontSize(14);
  doc.setFont(undefined, "bold");
  doc.text("Education & Qualifications", 15, currentY + 10);
  doc.setFont(undefined, "normal");

  doctorInfo.education.forEach((edu, index) => {
    doc.setFontSize(12);
    doc.text(edu.degree, 20, currentY + 25 + index * 20);
    doc.setFontSize(10);
    doc.text(`${edu.school}, ${edu.years}`, 20, currentY + 32 + index * 20);
  });

  currentY += 100;

  // Publications Section
  addSectionBackground(currentY, 60);
  doc.setFontSize(14);
  doc.setFont(undefined, "bold");
  doc.text("Publications & Research", 15, currentY + 10);
  doc.setFont(undefined, "normal");

  doctorInfo.publications.forEach((pub, index) => {
    doc.setFontSize(11);
    doc.text(pub.title, 20, currentY + 25 + index * 15);
    doc.setFontSize(9);
    doc.text(`${pub.journal}, ${pub.year}`, 20, currentY + 30 + index * 15);
  });

  currentY += 70;

  // Languages Section
  addSectionBackground(currentY, 40);
  doc.setFontSize(14);
  doc.setFont(undefined, "bold");
  doc.text("Languages", 15, currentY + 10);
  doc.setFont(undefined, "normal");
  doc.setFontSize(10);

  doctorInfo.languages.forEach((lang, index) => {
    doc.text(
      `• ${lang.language}: ${lang.level}`,
      20,
      currentY + 25 + index * 7,
    );
  });

  // Specializations
  currentY += 50;
  addSectionBackground(currentY, 50);
  doc.setFontSize(14);
  doc.setFont(undefined, "bold");
  doc.text("Specializations", 15, currentY + 10);
  doc.setFont(undefined, "normal");
  doc.setFontSize(10);

  let specX = 20;
  let specY = currentY + 25;
  doctorInfo.specializations.forEach((spec, index) => {
    doc.text(`• ${spec}`, specX, specY);
    if ((index + 1) % 2 === 0) {
      specX = 20;
      specY += 7;
    } else {
      specX = 100;
    }
  });

  return doc;
};
