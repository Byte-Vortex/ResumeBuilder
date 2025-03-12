"use client";

import { useResume } from "./ResumeContext";
import { Card } from "@/components/ui/card";
import { ModernTemplate } from "./templates/ModernTemplate";
import { MinimalTemplate } from "./templates/MinimalTemplate";
import { ProfessionalTemplate } from "./templates/ProfessionalTemplate";
import { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Button } from "../ui/button";

const templates = {
  modern: ModernTemplate,
  minimal: MinimalTemplate,
  professional: ProfessionalTemplate,
};

export function ResumePreview({ template }: { template: string }) {
  const { resumeData } = useResume();
  const TemplateComponent = templates[template as keyof typeof templates];
  const previewRef = useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    if (previewRef.current) {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2, // Higher resolution for better quality
        useCORS: true, // Handles cross-origin issues if styles/images are external
      });

      const pdf = new jsPDF("p", "mm", "a4"); // Portrait, A4 size
      const imgWidth = 210; // A4 page width in mm
      const pageHeight = 297; // A4 page height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const imgData = canvas.toDataURL("image/png");

      let heightLeft = imgHeight;
      let position = 0;

      // Add the first page
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add remaining pages if content exceeds one page
      while (heightLeft > 0) {
        position -= pageHeight; // Move the position up for the next page
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("resume.pdf");
    }
  };

  return (
    <div>
      <div className="mt-4 text-center">
        <Button
          onClick={downloadPDF}
          className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
        >
          Download PDF
        </Button>
      </div>
      <Card
        className="h-auto w-[800px] mx-auto bg-white shadow-lg"
        ref={previewRef}
        style={{
          margin: "0 auto",
          padding: "70px",
          width: "210mm",
          minHeight: "297mm",
          boxSizing: "border-box",
        }}
      >
        <div className="h-full overflow-auto">
          <TemplateComponent data={resumeData} />
        </div>
      </Card>
      
    </div>
  );
}
