import Link from "next/link";
import React from "react";
import { GitCommit, GitPullRequest, FolderGit2, Users } from "lucide-react";
import { timeAgo } from "@/lib/relative-time";
import type { ActivityEvent, LanguageSlice, ProfileStats } from "@/lib/github";

function StatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-md border p-4 text-center dark:border-gray-700">
      <span className="text-gray-500 dark:text-gray-400">{icon}</span>
      <span className="text-2xl font-bold">{value.toLocaleString()}</span>
      <span className="text-xs text-gray-500 dark:text-gray-400">{label}</span>
    </div>
  );
}

function LanguageBar({ languages }: { languages: LanguageSlice[] }) {
  const total = languages.reduce((sum, l) => sum + l.size, 0);
  if (total === 0 || languages.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex h-2.5 w-full overflow-hidden rounded-full">
        {languages.map((lang) => (
          <div
            key={lang.name}
            title={lang.name}
            style={{
              width: `${(lang.size / total) * 100}%`,
              backgroundColor: lang.color ?? "#888",
            }}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {languages.map((lang) => (
          <span
            key={lang.name}
            className="inline-flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400"
          >
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: lang.color ?? "#888" }}
            />
            {lang.name}
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {((lang.size / total) * 100).toFixed(1)}%
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function GitHubStats({
  profile,
  topLanguages,
  events,
}: {
  profile: ProfileStats | null;
  topLanguages: LanguageSlice[];
  events: ActivityEvent[];
}) {
  if (!profile && events.length === 0 && topLanguages.length === 0) return null;

  return (
    <div className="flex w-full flex-col gap-6">
      <h1 className="text-2xl font-bold">GitHub Activity</h1>

      {profile && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard
            icon={<GitCommit className="h-5 w-5" />}
            value={profile.totalCommits}
            label="Commits (1yr)"
          />
          <StatCard
            icon={<GitPullRequest className="h-5 w-5" />}
            value={profile.totalPullRequests}
            label="Pull Requests"
          />
          <StatCard
            icon={<FolderGit2 className="h-5 w-5" />}
            value={profile.publicRepos}
            label="Public Repos"
          />
          <StatCard
            icon={<Users className="h-5 w-5" />}
            value={profile.followers}
            label="Followers"
          />
        </div>
      )}

      {topLanguages.length > 0 && (
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold">Most Used Languages</h2>
          <LanguageBar languages={topLanguages} />
        </div>
      )}

      {events.length > 0 && (
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold">Recent Activity</h2>
          <ul className="flex flex-col gap-2">
            {events.map((event) => (
              <li
                key={event.id}
                className="flex items-center justify-between gap-3 text-sm"
              >
                <span className="min-w-0 truncate text-gray-700 dark:text-gray-300">
                  {event.detail}{" "}
                  {event.repo && (
                    <Link
                      href={event.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                    >
                      {event.repo}
                    </Link>
                  )}
                </span>
                <span className="shrink-0 text-xs text-gray-400 dark:text-gray-500">
                  {timeAgo(event.createdAt)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
