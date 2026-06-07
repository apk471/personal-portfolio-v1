import React from "react";
import { Code2, BrainCircuit, Boxes, Users } from "lucide-react";

interface SkillGroup {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  skills: string[];
}

const skillGroups: SkillGroup[] = [
  {
    title: "Technical Skills",
    icon: Code2,
    skills: [
      "Golang",
      "Python",
      "JavaScript",
      "TypeScript",
      "Backend Development",
      "Distributed Systems",
      "REST APIs",
      "System Design",
      "Concurrency",
      "Caching (Redis)",
      "Search Systems (Elasticsearch)",
      "Docker",
      "MongoDB",
      "SQL",
    ],
  },
  {
    title: "AI & LLM Systems",
    icon: BrainCircuit,
    skills: [
      "RAG Pipelines",
      "Agentic AI Workflows",
      "Prompt Engineering",
      "LLM Orchestration",
      "Vector Databases (ChromaDB/FAISS)",
      "Embeddings",
      "Context Management",
      "Evaluation & Retrieval Optimization",
    ],
  },
  {
    title: "Frameworks",
    icon: Boxes,
    skills: [
      "Go (net/http, goroutines, channels)",
      "Gin",
      "Fiber",
      "Echo",
      "FastAPI",
      "Node.js",
      "Next.js",
      "LangChain",
      "LangGraph",
    ],
  },
  {
    title: "Soft Skills",
    icon: Users,
    skills: [
      "Problem-solving",
      "Time Management",
      "Communication",
      "Teamwork",
      "Decision Making",
    ],
  },
];

function Skills() {
  return (
    <div className="flex w-full flex-col gap-4">
      <h1 className="text-2xl font-bold">Skills</h1>
      <div className="flex flex-col gap-6">
        {skillGroups.map((group) => {
          const Icon = group.icon;
          return (
            <div key={group.title} className="flex flex-col gap-2.5">
              <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                <Icon className="h-4 w-4" />
                {group.title}
              </h2>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-gray-200 bg-slate-100 px-2.5 py-1 text-sm font-medium text-gray-800 transition-colors hover:border-gray-300 hover:bg-slate-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-gray-600 dark:hover:bg-gray-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Skills;
