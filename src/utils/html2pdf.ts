import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { doctorInfo } from "../config/doctor";

export const generateProfilePDF = async () => {
  try {
    // Directly use the generatePDF method as the primary approach
    const { generatePDF } = await import("./generatePDF");
    return generatePDF();
  } catch (error) {
    console.error("Primary PDF generation failed:", error);

    // Fallback to html2canvas approach
    try {
      // Get the profile component from the DOM
      const profileElement = document.querySelector(
        ".min-h-screen",
      ) as HTMLElement;

      if (!profileElement) {
        throw new Error("Profile element not found");
      }

      // Create a new PDF document
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4",
      });

      // Calculate PDF dimensions
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = doc.internal.pageSize.getHeight();

      // Create canvas from HTML
      const canvas = await html2canvas(profileElement, {
        scale: 1.5,
        useCORS: true,
        logging: false,
        allowTaint: true,
        backgroundColor: "#f0f9ff",
      });

      // Get canvas data as an image
      const imgData = canvas.toDataURL("image/jpeg", 1.0);

      // Calculate the number of pages
      const imgHeight = canvas.height;
      const imgWidth = canvas.width;
      const ratio = imgWidth / imgHeight;
      const pageHeight = pdfWidth / ratio;
      const totalPages = Math.ceil(imgHeight / pageHeight);

      // Add image to PDF, potentially across multiple pages
      let heightLeft = imgHeight;
      let position = 0;
      let page = 1;

      // Add first page
      doc.addImage(imgData, "JPEG", 0, position, pdfWidth, pageHeight);
      heightLeft -= pageHeight;

      // Add subsequent pages if needed
      while (heightLeft > 0 && page < totalPages) {
        position = -page * pageHeight;
        doc.addPage();
        doc.addImage(imgData, "JPEG", 0, position, pdfWidth, pageHeight);
        heightLeft -= pageHeight;
        page++;
      }

      // Add title to the PDF
      for (let i = 1; i <= doc.getNumberOfPages(); i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text(
          `${doctorInfo.name} - Curriculum Vitae - Page ${i} of ${doc.getNumberOfPages()}`,
          doc.internal.pageSize.getWidth() / 2,
          doc.internal.pageSize.getHeight() - 10,
          { align: "center" },
        );
      }

      return doc;
    } catch (fallbackError) {
      console.error("Fallback PDF generation failed:", fallbackError);
      throw error;
    }
  }
};
