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

export function ProfessionalTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="space-y-6">
      <header className="border-b-2 border-gray-900 pb-4">
        <h1 className="capitalize text-4xl font-bold tracking-tight">
          {data.personalInfo.fullName}
        </h1>
        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          {data.personalInfo.email && (
            <div>
              <span>{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo.phone && (
            <div>
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo.location && (
            <div>
              <span>{data.personalInfo.location}</span>
            </div>
          )}
          <div className="flex gap-6">
            {data.personalInfo.linkedin && (
              <div>
                <a
                  href={data.personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </div>
            )}
            {data.personalInfo.website && (
              <div>
                <a
                  href={data.personalInfo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Website
                </a>
              </div>
            )}
          </div>
        </div>
      </header>

      {data.education.length > 0 && (
        <section>
          <h2 className="capitalize text-2xl font-bold border-b mb-4">Education</h2>
          <div className="capitalize space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="capitalize flex justify-between items-baseline mb-1">
                  <h3 className="capitalize text-xl font-semibold">{edu.school}</h3>
                  <p className="capitalize text-gray-600 italic">
                    {edu.startDate} {edu.endDate ? '-' : ''} {edu.endDate}
                  </p>
                </div>
                <p className="capitalize text-lg text-gray-700">
                  {edu.degree} in {edu.fieldOfStudy}
                </p>
                {edu.gpa && <p className="capitalize text-gray-600">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.experience.length > 0 && (
        <section>
          <h2 className="capitalize text-2xl font-bold border-b mb-4">
            Professional Experience
          </h2>
          <div className="capitalize space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="capitalize flex justify-between items-baseline mb-2">
                  <div>
                    <h3 className="capitalize text-xl font-semibold">{exp.position}</h3>
                    <p className="capitalize text-lg text-gray-700">{exp.company}</p>
                    <span className="capitalize  text-sm text-gray-500">
                      {exp.location}
                    </span>
                  </div>
                  <p className="capitalize text-gray-600 italic">
                    {exp.startDate} {exp.endDate ? '-':''} {exp.endDate}
                  </p>
                </div>
                <div className="capitalize space-y-1">
                  {formatDescription(exp.description).map((line, index) => (
                    <div key={index} className="capitalize flex text-gray-800">
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

      <div className="capitalize grid grid-cols-2 gap-6">
        {data.skillCategories.some((cat) => cat.skills.length > 0) && (
          <section className="capitalize col-span-2">
            <h2 className="capitalize text-2xl font-bold border-b mb-4">Skills</h2>
            <div className="capitalize space-y-1">
              {data.skillCategories
                .filter((category) => category.skills.length > 0)
                .map((category) => (
                  <div key={category.id}>
                    <div className="capitalize flex items-center gap-8">
                      <h3 className="capitalize text-lg font-semibold">
                        {category.name}
                      </h3>

                      <div className="capitalize flex flex-wrap items-center justify-end">
                        {category.skills.map((skill, index) => (
                          <span
                            key={skill.id}
                            className="capitalize pt-1 text-sm rounded-full"
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
            <h2 className="capitalize text-2xl font-bold border-b mb-4">Certifications</h2>
            <div className="capitalize space-y-3">
              {data.certifications.map((cert) => (
                <div key={cert.id}>
                  <h3 className="capitalize font-semibold">{cert.name}</h3>
                  <p className="capitalize text-sm text-gray-600">
                    {cert.issuer} {cert.date ? "|" : ""} {cert.date}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
