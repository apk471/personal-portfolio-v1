import React from "react";

const skillsData = [
  "React",
  "Next.js",
  "Tailwind CSS",
  "TypeScript",
  "JavaScript",
  "HTML",
  "CSS",
  "Git",
  "GitHub",
  "Node.js",
  "Express",
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "Docker",
  "AWS",
  "Python",
  "FastAPI",
  "RESTful APIs",
  "Langchain",
  "RAG Apps",
  "Supervised ML",
  "Unsupervised ML",
  "NLP",
  "Deep Learning",
];

function Skills() {
  return (
    <div className="flex w-full flex-col gap-4">
      <h1 className="text-2xl font-bold">Skills</h1>
      <div className="flex flex-wrap gap-2">
        {skillsData.map((skill, index) => (
          <span
            key={index}
            className="me-2 rounded bg-gray-500 px-2.5 py-0.5 text-sm font-medium text-gray-100 dark:bg-gray-700 dark:text-gray-300"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Skills;
