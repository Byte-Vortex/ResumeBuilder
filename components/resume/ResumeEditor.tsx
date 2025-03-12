"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useResume } from "./ResumeContext";
import { Plus, Trash2 } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ScrollArea } from "../ui/scroll-area";

export function ResumeEditor() {
  const {
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
  } = useResume();

  const handleSkillInput = (
    e: React.KeyboardEvent<HTMLInputElement>,
    categoryId: string,
    inputValue: string
  ) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const skills = inputValue
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean);

      skills.forEach((skillName) => {
        updateResumeData({
          skillCategories: resumeData.skillCategories.map((cat) =>
            cat.id === categoryId
              ? {
                  ...cat,
                  skills: [
                    ...cat.skills,
                    {
                      id: Math.random().toString(36).substr(2, 9),
                      name: skillName,
                    },
                  ],
                }
              : cat
          ),
        });
      });

      // Clear the input
      (e.target as HTMLInputElement).value = "";
    }
  };

  return (
    <div className="space-y-6 w-full">
      <Card>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
            </AccordionTrigger>
            <AccordionContent>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={resumeData.personalInfo.fullName}
                      onChange={(e) =>
                        updateResumeData({
                          personalInfo: {
                            ...resumeData.personalInfo,
                            fullName: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={resumeData.personalInfo.email}
                      onChange={(e) =>
                        updateResumeData({
                          personalInfo: {
                            ...resumeData.personalInfo,
                            email: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={resumeData.personalInfo.phone}
                      onChange={(e) =>
                        updateResumeData({
                          personalInfo: {
                            ...resumeData.personalInfo,
                            phone: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={resumeData.personalInfo.location}
                      onChange={(e) =>
                        updateResumeData({
                          personalInfo: {
                            ...resumeData.personalInfo,
                            location: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      value={resumeData.personalInfo.linkedin}
                      onChange={(e) =>
                        updateResumeData({
                          personalInfo: {
                            ...resumeData.personalInfo,
                            linkedin: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={resumeData.personalInfo.website}
                      onChange={(e) =>
                        updateResumeData({
                          personalInfo: {
                            ...resumeData.personalInfo,
                            website: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Education</CardTitle>
              </CardHeader>
            </AccordionTrigger>
            <AccordionContent>
              <CardContent className="space-y-4">
                <Button onClick={addEducation} variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Education
                </Button>
                <Accordion type="single" collapsible className="mt-4">
                  {resumeData.education.map((edu) => (
                    <AccordionItem key={edu.id} value={edu.id}>
                      <AccordionTrigger>
                        {edu.school || "Untitled Experience"}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div
                          key={edu.id}
                          className="space-y-4 p-4 border rounded-lg relative"
                        >
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-2 right-2"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Remove Education
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to remove this education
                                  entry?
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => removeEducation(edu.id)}
                                >
                                  Remove
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>College / School</Label>
                              <Input
                                value={edu.school}
                                onChange={(e) =>
                                  updateResumeData({
                                    education: resumeData.education.map(
                                      (item) =>
                                        item.id === edu.id
                                          ? { ...item, school: e.target.value }
                                          : item
                                    ),
                                  })
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Degree</Label>
                              <Input
                                value={edu.degree}
                                onChange={(e) =>
                                  updateResumeData({
                                    education: resumeData.education.map(
                                      (item) =>
                                        item.id === edu.id
                                          ? { ...item, degree: e.target.value }
                                          : item
                                    ),
                                  })
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Field of Study</Label>
                              <Input
                                value={edu.fieldOfStudy}
                                onChange={(e) =>
                                  updateResumeData({
                                    education: resumeData.education.map(
                                      (item) =>
                                        item.id === edu.id
                                          ? {
                                              ...item,
                                              fieldOfStudy: e.target.value,
                                            }
                                          : item
                                    ),
                                  })
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>GPA (Optional)</Label>
                              <Input
                                value={edu.gpa}
                                onChange={(e) =>
                                  updateResumeData({
                                    education: resumeData.education.map(
                                      (item) =>
                                        item.id === edu.id
                                          ? { ...item, gpa: e.target.value }
                                          : item
                                    ),
                                  })
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Start Date</Label>
                              <Input
                                type="date"
                                value={edu.startDate}
                                onChange={(e) =>
                                  updateResumeData({
                                    education: resumeData.education.map(
                                      (item) =>
                                        item.id === edu.id
                                          ? {
                                              ...item,
                                              startDate: e.target.value,
                                            }
                                          : item
                                    ),
                                  })
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>End Date</Label>
                              <Input
                                type="date"
                                value={edu.endDate}
                                onChange={(e) =>
                                  updateResumeData({
                                    education: resumeData.education.map(
                                      (item) =>
                                        item.id === edu.id
                                          ? { ...item, endDate: e.target.value }
                                          : item
                                    ),
                                  })
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Work Experience</CardTitle>
              </CardHeader>
            </AccordionTrigger>
            <AccordionContent>
              <CardContent>
                <Button onClick={addExperience} variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Experience
                </Button>
                <Accordion type="single" collapsible className="mt-4">
                  {resumeData.experience.map((exp) => (
                    <AccordionItem key={exp.id} value={exp.id}>
                      <AccordionTrigger>
                        {exp.company || "Untitled Experience"}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 p-4 border rounded-lg relative">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-2 right-2"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Remove Experience
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to remove this work
                                  experience? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => removeExperience(exp.id)}
                                >
                                  Remove
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Company</Label>
                              <Input
                                value={exp.company}
                                onChange={(e) =>
                                  updateResumeData({
                                    experience: resumeData.experience.map(
                                      (item) =>
                                        item.id === exp.id
                                          ? { ...item, company: e.target.value }
                                          : item
                                    ),
                                  })
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Position</Label>
                              <Input
                                value={exp.position}
                                onChange={(e) =>
                                  updateResumeData({
                                    experience: resumeData.experience.map(
                                      (item) =>
                                        item.id === exp.id
                                          ? {
                                              ...item,
                                              position: e.target.value,
                                            }
                                          : item
                                    ),
                                  })
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Location</Label>
                              <Input
                                value={exp.location}
                                onChange={(e) =>
                                  updateResumeData({
                                    experience: resumeData.experience.map(
                                      (item) =>
                                        item.id === exp.id
                                          ? {
                                              ...item,
                                              location: e.target.value,
                                            }
                                          : item
                                    ),
                                  })
                                }
                              />
                            </div>
                            <div className="col-span-2">
                              <Label>Description</Label>
                              <Textarea
                                value={exp.description}
                                onChange={(e) =>
                                  updateResumeData({
                                    experience: resumeData.experience.map(
                                      (item) =>
                                        item.id === exp.id
                                          ? {
                                              ...item,
                                              description: e.target.value,
                                            }
                                          : item
                                    ),
                                  })
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Start Date</Label>
                              <Input
                                type="date"
                                value={exp.startDate}
                                onChange={(e) =>
                                  updateResumeData({
                                    experience: resumeData.experience.map(
                                      (item) =>
                                        item.id === exp.id
                                          ? {
                                              ...item,
                                              startDate: e.target.value,
                                            }
                                          : item
                                    ),
                                  })
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>End Date</Label>
                              <Input
                                type="date"
                                value={exp.endDate}
                                onChange={(e) =>
                                  updateResumeData({
                                    experience: resumeData.experience.map(
                                      (item) =>
                                        item.id === exp.id
                                          ? { ...item, endDate: e.target.value }
                                          : item
                                    ),
                                  })
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Skills</CardTitle>
              </CardHeader>
            </AccordionTrigger>
            <AccordionContent>
              <CardContent className="space-y-6">
                {resumeData.skillCategories.map((category) => (
                  <div key={category.id} className="space-y-3">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">{category.name}</h3>
                      <div className="flex gap-2">
                        <Input
                          placeholder={`Add ${category.name.toLowerCase()} (comma or enter to add)`}
                          className="flex-1"
                          onKeyDown={(e) =>
                            handleSkillInput(
                              e,
                              category.id,
                              (e.target as HTMLInputElement).value
                            )
                          }
                        />
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {category.skills.map((skill) => (
                          <div
                            key={skill.id}
                            className="group flex items-center gap-2 bg-secondary py-1.5 pl-4 rounded-full"
                          >
                            <span>{skill.name}</span>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="-ml-2 h-4 w-4 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Remove Skill
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to remove this skill?
                                    This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() =>
                                      removeSkill(category.id, skill.id)
                                    }
                                  >
                                    Remove
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Certifications</CardTitle>
              </CardHeader>
            </AccordionTrigger>
            <AccordionContent>
              <CardContent>
                <Button onClick={addCertification} variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Certification
                </Button>
                <Accordion type="single" collapsible className="mt-4">
                  <div className="space-y-4">
                    {resumeData.certifications.map((cert) => (
                      <AccordionItem key={cert.id} value={cert.id}>
                        <AccordionTrigger>
                          {cert.name || "Untitled"}
                        </AccordionTrigger>
                        <AccordionContent>
                          <div
                            key={cert.id}
                            className="grid grid-cols-3 gap-4 p-4 border rounded-lg relative"
                          >
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="absolute top-2 right-2"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Remove Certification
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to remove this
                                    certification?
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => removeCertification(cert.id)}
                                  >
                                    Remove
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                            <div className="space-y-2">
                              <Label>Name</Label>
                              <Input
                                value={cert.name}
                                onChange={(e) =>
                                  updateResumeData({
                                    certifications:
                                      resumeData.certifications.map((item) =>
                                        item.id === cert.id
                                          ? { ...item, name: e.target.value }
                                          : item
                                      ),
                                  })
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Issuer</Label>
                              <Input
                                value={cert.issuer}
                                onChange={(e) =>
                                  updateResumeData({
                                    certifications:
                                      resumeData.certifications.map((item) =>
                                        item.id === cert.id
                                          ? { ...item, issuer: e.target.value }
                                          : item
                                      ),
                                  })
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Date</Label>
                              <Input
                                type="date"
                                value={cert.date}
                                onChange={(e) =>
                                  updateResumeData({
                                    certifications:
                                      resumeData.certifications.map((item) =>
                                        item.id === cert.id
                                          ? { ...item, date: e.target.value }
                                          : item
                                      ),
                                  })
                                }
                              />
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </div>
                </Accordion>
              </CardContent>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    </div>
  );
}
