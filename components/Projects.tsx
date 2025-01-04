import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";

const projectsData = [
  {
    title: "FoundersHub",
    description:
      "Platform where entrepreneurs can submit their startup ideas for virtual pitch competitions, browse other pitches, and gain exposure.",
    link: "https://founders-hub-new.vercel.app/",
    code: "https://github.com/apk471/FoundersHub",
    previewVideo: "/videos/FoundersHub.png",
    technologies: [
      "Next.js 15",
      "React 19",
      "Sanity (CMS)",
      "ShadCN",
      "Appwrite",
      "TypeScript",
      "Tailwind CSS",
    ],
  },
  {
    title: "Chat App",
    description:
      "Modern messaging application designed to provide real-time communication. ",
    link: "https://chatapp-5aj0.onrender.com/",
    code: "https://github.com/apk471/ChatApp",
    previewVideo: "/videos/ChatApp.png",
    technologies: ["JavaScript", "Node.js", "React", "MongoDB", "Socket.io"],
  },
  {
    title: "DocuGenie",
    description:
      "An AI-powered chatbot that answers questions based on your uploaded PDF by using llamma3 as it LLM.",
    link: "https://drive.google.com/file/d/1KI1r9M6jVKRDYc2VzmoZrpF2j3EcIpCJ/view?usp=sharing",
    code: "https://github.com/apk471/DocuGenie",
    previewVideo: "/videos/DocGene.png",
    technologies: ["Streamlit", "Python", "Langchain", "RAG" , "LLM" , "VectorDB"],
  },
  {
    title: "Multiple Diseases Classifier",
    description:
      "Machine learning-based classifier designed to diagnose multiple diseases, specifically heart disease, Parkinson's disease, and diabetes.",
    link: "https://diseasesprediction.streamlit.app/",
    code: "https://github.com/apk471/mdps",
    previewVideo: "/videos/MDPS.png",
    technologies: ["Streamlit", "Python", "Supervised ML", "Numpy", "Pandas"],
  },
];

function Projects() {
  return (
    <div className="flex w-full flex-col gap-4">
      <h1 className="text-2xl font-bold">Projects</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 ">
        {projectsData.map((project, index) => (
          <div
            key={index}
            className="flex flex-col rounded-md border dark:border-gray-700 transition-transform duration-300 ease-in-out hover:scale-105"
          >
            <Image
              alt={`${project.title} preview`}
              width={250}
              height={250}
              
              src={project.previewVideo}
              className="rounded-t-md  w-full h-64 object-cover"
            />
            <div className="flex grow flex-col gap-3 p-4">
              <h2 className="text-xl font-bold">{project.title}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-[4px]">
                {project.technologies.map((technology, index) => (
                  <span
                    key={index}
                    className="me-2 rounded bg-slate-100 px-2.5 py-0.5 text-sm font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                  >
                    {technology}
                  </span>
                ))}
              </div>
              <div className="mt-auto flex gap-2">
                <Link href={project?.link}>
                  <Button variant="default">View</Button>
                </Link>
                <Link href={project.code}>
                  <Button variant="outline">Code</Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
