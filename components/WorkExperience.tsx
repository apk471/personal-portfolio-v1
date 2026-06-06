import { ExternalLink } from "lucide-react";
import React from "react";

interface WorkExperienceItem {
  startDate: string;
  endDate?: string;
  companyName: string;
  companyLogo?: string;
  jobTitle: string;
  description: string[];
  companyLink?: string;
}

const workExperienceData: WorkExperienceItem[] = [
  {
    startDate: "Dec 2025",
    endDate: "Currently Working",
    companyName: "TIFIN (MyFi)",
    jobTitle: "Automation QA and Developer Intern,",
    description: [
      "MyFi by TIFIN is building a next-generation investment advisory platform powered by AI, combining automation, reliability, and conversational intelligence to transform how users make financial decisions",
    ],
  },
  {
    startDate: "May 2025",
    endDate: "July 2025",
    companyName: "Accenture",
    jobTitle: "Advanced App Engineering Analyst (AEH) Intern, ATCI Department",
    description: [
      "I worked on a project for Google titled Google Automation Arcade. My primary responsibilities included backend integration with testing to ensure system reliability and performance, along with the creation of functional and technical documentation to support development and QA teams.",
    ],
  },
  {
    startDate: "May 2024",
    endDate: "July 2024",
    companyName: "Pyro Holdings Pvt Ltd",
    jobTitle: "Trainee Intern, SDE Department",
    description: [
      "Contributed to the development of a RAG (Retrieval-Augmented Generation) application.",
    ],
  },
  {
    startDate: "December 2023",
    endDate: "June 2024",
    companyName: "TAM - AIML Club",
    jobTitle: "AIML Club Member - Tech Volunteer",
    description: [
      "Helped the club organize a hackathon for 300+ college students. Also made the main website for the club.",
    ],
    companyLink: "https://google.com/",
  },
  {
    startDate: "September 2024",
    endDate: "Oct 2024",
    companyName: "Gravitas: Tech Fest",
    jobTitle: "Coordinator - Documentation Team",
    description: [
      "Was a part of the documentation team for the college technical fest and helped manage various documentation of different events during the fest.",
    ],
  },
];

const WorkExperience: React.FC = () => {
  return (
    <div className="flex w-full flex-col gap-4">
      <h1 className="text-2xl font-bold">Work Experience</h1>

      <ol className="relative border-s border-gray-200 dark:border-gray-700">
        {workExperienceData.map((item, index) => (
          <li
            key={index}
            className={`mb-10 ms-4 ${
              index === workExperienceData.length - 1 ? "mb-0" : ""
            }`}>
            {/* Dot logic same as Education */}
            <div
              className={`absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white dark:border-gray-900 ${
                index === 0
                  ? "bg-green-500 dark:bg-green-600"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
            />
            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              {item.startDate} - {item.endDate || "Present"}
            </time>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {item.jobTitle} at {item.companyName}
            </h3>
            <div className="mb-4 text-base font-normal text-gray-700 dark:text-gray-400">
              <ul>
                {item.description.map((desc, index) => (
                  <li key={index}>{desc}</li>
                ))}
              </ul>
              {item.companyLink && (
                <a
                  href={item.companyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-blue-600 underline underline-offset-4 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                  Visit website
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
            {/* //TODO: Add link for TAM */}
            {/* {item.companyLink && (
              <a
                href={item.companyLink}
                className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:text-blue-700 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
              >
               Link
              </a>
            )} */}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default WorkExperience;
