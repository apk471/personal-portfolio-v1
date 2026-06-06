import Link from "next/link";
import React from "react";
import { ArrowUpRight } from "lucide-react";
import { timeAgo } from "@/lib/relative-time";
import type { Repo } from "@/lib/github";

export default function CurrentlyWorking({ repos }: { repos: Repo[] }) {
  if (!repos || repos.length === 0) return null;

  return (
    <div className="flex w-full flex-col gap-4">
      <h1 className="text-2xl font-bold">Currently Working On</h1>
      <ul className="flex flex-col divide-y rounded-md border dark:divide-gray-700 dark:border-gray-700">
        {repos.map((repo) => (
          <li key={repo.name}>
            <Link
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 p-4 hover:bg-slate-50 dark:hover:bg-gray-800/50"
            >
              <div className="flex min-w-0 flex-col gap-1">
                <span className="inline-flex items-center gap-1.5 font-semibold">
                  {repo.name}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4 opacity-60 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                  />
                  <span className="sr-only">(opens in a new tab)</span>
                </span>
                {repo.description && (
                  <span className="truncate text-sm text-gray-500 dark:text-gray-400">
                    {repo.description}
                  </span>
                )}
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1 text-sm text-gray-500 dark:text-gray-400">
                {repo.primaryLanguage && (
                  <span className="inline-flex items-center gap-1.5">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{
                        backgroundColor: repo.primaryLanguage.color ?? "#888",
                      }}
                    />
                    {repo.primaryLanguage.name}
                  </span>
                )}
                {repo.pushedAt && (
                  <span className="text-xs">{timeAgo(repo.pushedAt)}</span>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
