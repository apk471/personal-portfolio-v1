import Link from "next/link";
import React from "react";
import { ExternalLink, GitFork, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Repo } from "@/lib/github";

// Fallback used when the GitHub API is unavailable (no token / rate-limited /
// network error) so the section never renders empty.
const fallbackRepos: Repo[] = [
  {
    name: "FoundersHub",
    description:
      "Platform where entrepreneurs submit startup ideas for virtual pitch competitions, browse other pitches, and gain exposure.",
    url: "https://github.com/apk471/FoundersHub",
    homepageUrl: "https://founders-hub-new.vercel.app/",
    primaryLanguage: { name: "TypeScript", color: "#3178c6" },
    forkCount: 0,
    topics: ["Next.js", "Sanity", "Appwrite"],
    languages: [],
  },
  {
    name: "ChatApp",
    description:
      "Modern real-time messaging application with sockets-based live communication.",
    url: "https://github.com/apk471/ChatApp",
    homepageUrl: "https://chatapp-5aj0.onrender.com/",
    primaryLanguage: { name: "JavaScript", color: "#f1e05a" },
    forkCount: 0,
    topics: ["Node.js", "React", "Socket.io"],
    languages: [],
  },
  {
    name: "DocuGenie",
    description:
      "AI-powered chatbot that answers questions from uploaded PDFs using Llama 3 as its LLM.",
    url: "https://github.com/apk471/DocuGenie",
    homepageUrl: null,
    primaryLanguage: { name: "Python", color: "#3572A5" },
    forkCount: 0,
    topics: ["Langchain", "RAG", "VectorDB"],
    languages: [],
  },
  {
    name: "mdps",
    description:
      "Machine-learning classifier diagnosing heart disease, Parkinson's, and diabetes.",
    url: "https://github.com/apk471/mdps",
    homepageUrl: "https://diseasesprediction.streamlit.app/",
    primaryLanguage: { name: "Python", color: "#3572A5" },
    forkCount: 0,
    topics: ["Streamlit", "ML", "Pandas"],
    languages: [],
  },
];

function RepoCard({ repo }: { repo: Repo }) {
  return (
    <div className="flex flex-col gap-3 rounded-md border p-4 transition-transform duration-300 ease-in-out hover:scale-[1.02] dark:border-gray-700">
      <div className="flex items-start justify-between gap-2">
        <Link
          href={repo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xl font-bold hover:underline"
        >
          <Github className="h-5 w-5 shrink-0" />
          {repo.name}
        </Link>
        {repo.forkCount > 0 && (
          <span className="inline-flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
            <GitFork className="h-3.5 w-3.5" />
            {repo.forkCount}
          </span>
        )}
      </div>

      {repo.description && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {repo.description}
        </p>
      )}

      {repo.topics.length > 0 && (
        <div className="flex flex-wrap gap-[4px]">
          {repo.topics.map((topic) => (
            <span
              key={topic}
              className="me-1 rounded bg-slate-100 px-2.5 py-0.5 text-sm font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300"
            >
              {topic}
            </span>
          ))}
        </div>
      )}

      <div className="mt-auto flex items-center justify-between gap-2 pt-1">
        {repo.primaryLanguage && (
          <span className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: repo.primaryLanguage.color ?? "#888" }}
            />
            {repo.primaryLanguage.name}
          </span>
        )}
        {repo.homepageUrl && (
          <Link href={repo.homepageUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="gap-1">
              Live <ExternalLink className="h-3.5 w-3.5" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default function PinnedRepos({ repos }: { repos: Repo[] }) {
  const data = repos.length > 0 ? repos : fallbackRepos;

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-baseline justify-between">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Link
          href="https://github.com/apk471?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:underline dark:text-blue-400"
        >
          All repos <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {data.map((repo) => (
          <RepoCard key={repo.name} repo={repo} />
        ))}
      </div>
    </div>
  );
}
