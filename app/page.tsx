"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResumeEditor } from "@/components/resume/ResumeEditor";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { TemplateSelector } from "@/components/resume/TemplateSelector";
import { ResumeProvider } from "@/components/resume/ResumeContext";

export default function Home() {
  const [selectedTemplate, setSelectedTemplate] = useState("professional");

  return (
    <ResumeProvider>
      <main className="min-h-full min-w-sreen bg-background overflow-hidden">


        <div className="container mx-auto px-4 pt-6 pb-6">
          <Tabs defaultValue="editor" className="space-y-4">
            <TabsList>
              <TabsTrigger value="templates">Choose Template</TabsTrigger>
              <TabsTrigger value="editor">Edit Resume</TabsTrigger>
            </TabsList>

            <TabsContent value="templates">
              <TemplateSelector
                selectedTemplate={selectedTemplate}
                onSelectTemplate={setSelectedTemplate}
              />
            </TabsContent>

            <TabsContent value="editor" className="space-y-4">
              <div className="flex space-x-4">
                <ResumeEditor />
                <div className="">
                  <ResumePreview template={selectedTemplate} />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </ResumeProvider>
  );
}