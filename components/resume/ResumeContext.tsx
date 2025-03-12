"use client";

import React, { createContext, useContext, useState } from "react";

export interface SkillCategory {
  id: string;
  name: string;
  skills: Array<{
    id: string;
    name: string;
  }>;
}

export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    website: string;
  };
  education: Array<{
    id: string;
    school: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate: string;
    gpa?: string;
  }>;
  experience: Array<{
    id: string;
    company: string;
    position: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  skillCategories: SkillCategory[];
  certifications: Array<{
    id: string;
    name: string;
    issuer: string;
    date: string;
  }>;
}

const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    website: "",
  },
  education: [],
  experience: [],
  skillCategories: [
    { id: "languages", name: "Languages", skills: [] },
    { id: "frameworks", name: "Libraries/Frameworks", skills: [] },
    { id: "tools", name: "Tools/Platforms", skills: [] },
    { id: "databases", name: "Databases", skills: [] },
  ],
  certifications: [],
};

interface ResumeContextType {
  resumeData: ResumeData;
  updateResumeData: (data: Partial<ResumeData>) => void;
  addEducation: () => void;
  removeEducation: (id: string) => void;
  addExperience: () => void;
  removeExperience: (id: string) => void;
  addSkill: (categoryId: string) => void;
  removeSkill: (categoryId: string, skillId: string) => void;
  addCertification: () => void;
  removeCertification: (id: string) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);

  const updateResumeData = (data: Partial<ResumeData>) => {
    setResumeData((prev) => ({ ...prev, ...data }));
  };

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const addEducation = () => {
    setResumeData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: generateId(),
          school: "",
          degree: "",
          fieldOfStudy: "",
          startDate: "",
          endDate: "",
        },
      ],
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  const addExperience = () => {
    setResumeData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: generateId(),
          company: "",
          position: "",
          location: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }));
  };

  const addSkill = (categoryId: string) => {
    setResumeData((prev) => ({
      ...prev,
      skillCategories: prev.skillCategories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              skills: [
                ...category.skills,
                {
                  id: generateId(),
                  name: "",
                },
              ],
            }
          : category
      ),
    }));
  };

  const removeSkill = (categoryId: string, skillId: string) => {
    setResumeData((prev) => ({
      ...prev,
      skillCategories: prev.skillCategories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              skills: category.skills.filter((skill) => skill.id !== skillId),
            }
          : category
      ),
    }));
  };

  const addCertification = () => {
    setResumeData((prev) => ({
      ...prev,
      certifications: [
        ...prev.certifications,
        {
          id: generateId(),
          name: "",
          issuer: "",
          date: "",
        },
      ],
    }));
  };

  const removeCertification = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((cert) => cert.id !== id),
    }));
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        updateResumeData,
        addEducation,
        removeEducation,
        addExperience,
        removeExperience,
        addSkill,
        removeSkill,
        addCertification,
        removeCertification,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
}