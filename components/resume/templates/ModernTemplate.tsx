"use client";

import * as React from "react";
import type { ResumeData } from "../ResumeContext";

const formatDescription = (description: string) => {
  if (!description) return [];

  return description
    .split("\n")
    .map((line) => {
      line = line.trim();
      if (!line) return null;

      const isBullet = line.startsWith("-");
      const text = isBullet ? line.substring(1).trim() : line;

      // Process bold text
      const formattedText = text.replace(
        /\*\*(.*?)\*\*/g,
        "<strong>$1</strong>"
      );

      return {
        isBullet,
        text: formattedText,
      };
    })
    .filter((line): line is NonNullable<typeof line> => Boolean(line));
};

export function ModernTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="space-y-4">
      <header className="text-center pb-4 space-y-2">
        <h1 className="capitalize text-4xl font-bold">{data.personalInfo.fullName}</h1>
        <div className="flex justify-center space-x-4 text-sm text-gray-600">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && (
            <span>{data.personalInfo.location}</span>
          )}
        </div>
        <div className="flex justify-center space-x-4 text-sm text-blue-600">
          {data.personalInfo.linkedin && (
            <a
              href={data.personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          )}
          {data.personalInfo.website && (
            <a
              href={data.personalInfo.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              Website
            </a>
          )}
        </div>
      </header>

      {data.experience.length > 0 && (
        <section>
          <h2 className="capitalize text-2xl font-bold mb-4 pb-2 border-b">Experience</h2>
          <div className="capitalize space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="capitalize flex justify-between items-start">
                  <div>
                    <h3 className="capitalize text-lg font-semibold">{exp.position}</h3>
                    <p className="capitalize text-gray-600">{exp.company}</p>
                  </div>
                  <div className="capitalize text-sm text-gray-600">
                    {exp.startDate} {exp.endDate ? '-':''} {exp.endDate}
                  </div>
                </div>
                <div className="capitalize mt-2 space-y-2">
                  {formatDescription(exp.description).map((line, index) => (
                    <div key={index} className="capitalize flex text-sm">
                      {line.isBullet && <span className="capitalize mr-2 ml-4">•</span>}
                      <div
                        dangerouslySetInnerHTML={{ __html: line.text }}
                        className="capitalize flex-1"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.education.length > 0 && (
        <section>
          <h2 className="capitalize text-2xl font-bold mb-4 pb-2 border-b">Education</h2>
          <div className="capitalize space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="capitalize flex justify-between items-start">
                  <div>
                    <h3 className="capitalize text-lg font-semibold">{edu.school}</h3>
                    <p className="capitalize text-gray-600">
                      {edu.degree} in {edu.fieldOfStudy}
                    </p>
                  </div>
                  <div className="capitalize text-sm text-gray-600">
                    {edu.startDate} {edu.endDate ? '-' : ''} {edu.endDate}
                  </div>
                </div>
                {edu.gpa && <p className="capitalize text-sm">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.skillCategories.some((cat) => cat.skills.length > 0) && (
        <section className="capitalize col-span-2">
          <h2 className="capitalize text-2xl font-bold mb-4 pb-2 border-b">Skills</h2>
          <div className="capitalize space-y-1">
            {data.skillCategories
              .filter((category) => category.skills.length > 0)
              .map((category) => (
                <div key={category.id}>
                  <div className="capitalize flex items-center gap-8">
                    <h3 className="capitalize font-semibold">{category.name}</h3>

                    <div className="capitalize flex flex-wrap items-center justify-end">
                      {category.skills.map((skill, index) => (
                        <span
                          key={skill.id}
                          className="capitalize pt-1 text-sm rounded-full text-gray-600"
                        >
                          {skill.name}
                          {index < category.skills.length - 1 && (
                            <span>,&nbsp;</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </section>
      )}

      {data.certifications.length > 0 && (
        <section>
          <h2 className="capitalize text-2xl font-bold mb-4 pb-2 border-b">
            Certifications
          </h2>
          <div className="capitalize space-y-4">
            {data.certifications.map((cert) => (
              <div key={cert.id} className="capitalize flex justify-between items-start">
                <div>
                  <h3 className="capitalize font-semibold">{cert.name}</h3>
                  <p className="capitalize text-sm text-gray-600">{cert.issuer}</p>
                </div>
                <span className="capitalize text-sm text-gray-600">{cert.date}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
