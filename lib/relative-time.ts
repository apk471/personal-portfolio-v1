// Human-friendly "x days ago" from an ISO timestamp.
//
// Uses absolute second-thresholds rather than cumulative flooring, so a ~365-day
// gap reads as "1 year ago" instead of underreporting as "11 months ago".
const MINUTE = 60;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const MONTH = 30 * DAY;
const YEAR = 365 * DAY;

export function timeAgo(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const seconds = Math.floor((Date.now() - then) / 1000);

  if (seconds < 30) return "just now";

  const format = (value: number, unit: string) =>
    `${value} ${unit}${value === 1 ? "" : "s"} ago`;

  if (seconds < MINUTE) return format(seconds, "second");
  if (seconds < HOUR) return format(Math.floor(seconds / MINUTE), "minute");
  if (seconds < DAY) return format(Math.floor(seconds / HOUR), "hour");
  if (seconds < WEEK) return format(Math.floor(seconds / DAY), "day");
  if (seconds < MONTH) return format(Math.floor(seconds / WEEK), "week");
  if (seconds < YEAR) return format(Math.floor(seconds / MONTH), "month");
  return format(Math.floor(seconds / YEAR), "year");
}
