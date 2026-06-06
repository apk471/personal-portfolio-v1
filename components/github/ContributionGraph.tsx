import React from "react";
import type { ContributionData } from "@/lib/github";

// Map a day's contribution count to one of 5 intensity buckets. Uses fixed
// green shades that read well in both light and dark themes.
const LEVELS = [
  "bg-gray-200 dark:bg-gray-800",
  "bg-green-200 dark:bg-green-900",
  "bg-green-400 dark:bg-green-700",
  "bg-green-500 dark:bg-green-600",
  "bg-green-600 dark:bg-green-500",
];

function level(count: number): number {
  if (count <= 0) return 0;
  if (count < 3) return 1;
  if (count < 6) return 2;
  if (count < 10) return 3;
  return 4;
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export default function ContributionGraph({
  data,
}: {
  data: ContributionData | null;
}) {
  if (!data || data.weeks.length === 0) return null;

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-baseline justify-between">
        <h1 className="text-2xl font-bold">Contributions</h1>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {data.total.toLocaleString()} in the last year
        </span>
      </div>

      <div className="w-full overflow-x-auto pb-2">
        <div className="flex gap-[3px]">
          {data.weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {Array.from({ length: 7 }).map((_, di) => {
                const day = week.days.find((d) => d.weekday === di);
                if (!day) {
                  return <div key={di} className="h-[11px] w-[11px]" />;
                }
                return (
                  <div
                    key={di}
                    title={`${day.count} contribution${
                      day.count === 1 ? "" : "s"
                    } on ${day.date}`}
                    className={`h-[11px] w-[11px] rounded-[2px] ${
                      LEVELS[level(day.count)]
                    }`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-end gap-1 text-xs text-gray-500 dark:text-gray-400">
        <span>Less</span>
        {LEVELS.map((cls, i) => (
          <div key={i} className={`h-[11px] w-[11px] rounded-[2px] ${cls}`} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}
