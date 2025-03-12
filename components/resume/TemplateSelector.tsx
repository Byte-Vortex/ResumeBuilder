"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const templates = [
  {
    id: "modern",
    name: "Modern",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&q=80",
  },
  {
    id: "minimal",
    name: "Minimal",
    image: "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?w=400&q=80",
  },
  {
    id: "professional",
    name: "Professional",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&q=80",
  },
];

export function TemplateSelector({
  selectedTemplate,
  onSelectTemplate,
}: {
  selectedTemplate: string;
  onSelectTemplate: (template: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map((template) => (
        <Card
          key={template.id}
          className={`relative overflow-hidden cursor-pointer transition-all ${
            selectedTemplate === template.id
              ? "ring-2 ring-primary"
              : "hover:ring-2 hover:ring-primary/50"
          }`}
          onClick={() => onSelectTemplate(template.id)}
        >
          <div className="aspect-[210/297] relative">
            <Image
              src={template.image}
              alt={template.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-background/90 p-4">
            <h3 className="font-semibold">{template.name}</h3>
            <Button
              variant={selectedTemplate === template.id ? "default" : "outline"}
              className="mt-2 w-full"
            >
              {selectedTemplate === template.id ? "Selected" : "Use Template"}
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}