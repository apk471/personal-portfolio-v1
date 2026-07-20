import Link from "next/link";
import type { Organization } from "@/lib/github";

export default function Organizations({
  organizations,
}: {
  organizations: Organization[];
}) {
  if (!organizations || organizations.length === 0) return null;

  return (
    <div className="flex w-full flex-col gap-3">
      <h2 className="text-lg font-semibold">Organizations</h2>
      <div className="flex flex-wrap gap-3">
        {organizations.map((org) => (
          <Link
            key={org.login}
            href={org.url}
            target="_blank"
            rel="noopener noreferrer"
            title={org.name ?? org.login}
            className="inline-flex items-center gap-2 rounded-md border p-2 pr-3 text-sm transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={org.avatarUrl}
              alt={`${org.login} avatar`}
              width={24}
              height={24}
              className="h-6 w-6 rounded"
            />
            <span className="font-medium">{org.name ?? org.login}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
