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
    startDate: "May 2024",
    endDate: "July 2024",
    companyName: "Pyro Holdings Pvt Ltd",
    jobTitle: "Trainee Intern, SDE Department",
    description: [
      "Contributed to the development of a RAG (Retrieval-Augmented Generation) application",
    ],
  },
  {
    startDate: "December 2023",
    endDate: "June 2024",
    companyName: "TAM - AIML Club",
    jobTitle: "AIML Club Member - Tech Volunteer",
    description: [
      "Helped the club organize a hackathon for 300+ college students also made the main website for the club",
    ],
    companyLink: "https://google.com/"
  },
  {
    startDate: "September 2024",
    endDate: "Oct 2024",
    companyName: "Gravitas: Tech Fest",
    jobTitle: "Coordinator - Documentation Team",
    description: [
      "Was a part of documentation team for our college technical fest and helped manage various documentation of different events during the fest",
    ],
  },
];

const WorkExperience: React.FC = () => {
  return (
    <div className="-z-10 flex w-full flex-col gap-4">
      <h1 className="text-2xl font-bold">Work Experience</h1>

      <ol className="relative border-s border-gray-200 dark:border-gray-700">
        {workExperienceData.map((item, index) => (
          <li
            key={index}
            className={`mb-10 ms-4 ${
              index === workExperienceData.length - 1 ? "mb-0" : ""
            }`}
          >
            <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700"></div>
            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              {item.startDate} - {item.endDate || "Present"}
            </time>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {item.jobTitle} at {item.companyName}
            </h3>
            <div className="mb-4 text-base font-normal text-gray-700 dark:text-gray-400">
              <ul>
                {item.description.map((desc, index) => (
                  <li key={index}>
                    
                    
                    
                    {desc}
                    {item.companyLink && index === 1 && ( // Add the SVG for the TAM - AIML Club description
                      <a
                        href={item.companyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        link
                      </a>
                    )}
                    
                    
                    
                    </li>
                ))}
              </ul>
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
