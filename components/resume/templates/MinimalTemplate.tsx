"use client";

import { ResumeData } from "../ResumeContext";

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

export function MinimalTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="capitalize text-3xl font-normal">{data.personalInfo.fullName}</h1>
        <div className="mt-2 text-sm text-gray-600 space-x-2">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && (
            <>
              <span>•</span>
              <span>{data.personalInfo.phone}</span>
            </>
          )}
          {data.personalInfo.location && (
            <>
              <span>•</span>
              <span>{data.personalInfo.location}</span>
            </>
          )}
        </div>
      </header>

      {data.experience.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold uppercase tracking-wide mb-3">
            Experience
          </h2>
          <div className="capitalize space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="capitalize flex justify-between">
                  <h3 className="capitalize font-medium">{exp.position}</h3>
                  <span className="capitalize text-sm text-gray-600">
                    {exp.startDate} {exp.endDate ? '-':''} {exp.endDate}
                  </span>
                </div>
                <p className="capitalize text-sm text-gray-600">{exp.company}</p>
                <div className="capitalize mt-2 space-y-1">
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
          <h2 className="text-lg font-semibold uppercase tracking-wide mb-3">
            Education
          </h2>
          <div className="capitalize space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="capitalize flex justify-between">
                  <h3 className="capitalize font-medium">{edu.school}</h3>
                  <span className="capitalize text-sm text-gray-600">
                    {edu.startDate} {edu.endDate ? '-' : ''} {edu.endDate}
                  </span>
                </div>
                <p className="capitalize text-sm text-gray-600">
                  {edu.degree} in {edu.fieldOfStudy}
                </p>
                {edu.gpa && (
                  <p className="capitalize text-sm text-gray-600">GPA: {edu.gpa}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.skillCategories.some((cat) => cat.skills.length > 0) && (
        <section className="capitalize col-span-2">
          <h2 className="text-lg font-semibold uppercase tracking-wide mb-3">Skills</h2>
          <div className="capitalize space-y-1">
            {data.skillCategories
              .filter((category) => category.skills.length > 0)
              .map((category) => (
                <div key={category.id}>
                  <div className="capitalize flex items-center gap-8">
                    <h3 className="capitalize font-medium">{category.name}</h3>

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
          <h2 className="text-lg font-semibold uppercase tracking-wide mb-3">
            Certifications
          </h2>
          <div className="capitalize space-y-2">
            {data.certifications.map((cert) => (
              <div key={cert.id} className="capitalize flex justify-between">
                <div>
                  <span className="capitalize font-medium">{cert.name}</span>
                  <span className="capitalize text-sm text-gray-600 ml-2">
                    by {cert.issuer}
                  </span>
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
