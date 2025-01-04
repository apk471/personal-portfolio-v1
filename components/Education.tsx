import React from "react";

interface EducationItem {
  startDate: string;
  endDate?: string;
  collegeName?: string;
  schoolName?: string;
  address?: string;
  courseName: string;
}

const EducationData: EducationItem[] = [
  {
    startDate: "September 2022",
    endDate: "March 2026",
    collegeName: "VIT - Vellore",
    courseName: "BTech. in Computer Science and Engineering",
    address: "Vellore, Tamil Nadu",
  },
  {
    startDate: "2020",
    endDate: "2022",
    schoolName: "Sri Chaitanya Jr Kalasala",
    address: "Hyderabad, Telangana",
    courseName: "Intermidiate 11th and 12th",
  },
  {
    startDate: "2019",
    endDate: "2020",
    schoolName: "Bharatiya Vidya Bhavan A Ramarao",
    address: "Hyderabad, Telangana",
    courseName: "Schooling till 10th",
  },
];

const Education: React.FC = () => {
  return (
    <div className="-z-10 flex w-full flex-col gap-4">
      <h1 className="text-2xl font-bold">Education</h1>

      <ol className="relative border-s border-gray-200 dark:border-gray-700">
        {EducationData.map((item, index) => (
          <li
            key={index}
            className={`mb-10 ms-4 ${
              index === EducationData.length - 1 ? "mb-0" : ""
            }`}
          >
            <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700"></div>
            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              {item.startDate} - {item.endDate || "Present"}
            </time>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {item.courseName} at {item.collegeName || item.schoolName}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {item.address}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Education;
