// Human-friendly "x days ago" from an ISO timestamp.
export function timeAgo(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const seconds = Math.floor((Date.now() - then) / 1000);

  const units: [number, string][] = [
    [60, "second"],
    [60, "minute"],
    [24, "hour"],
    [7, "day"],
    [4.345, "week"],
    [12, "month"],
    [Number.POSITIVE_INFINITY, "year"],
  ];

  let value = seconds;
  let unit = "second";
  for (let i = 0; i < units.length; i++) {
    const [divisor, name] = units[i];
    if (value < divisor) {
      unit = name;
      break;
    }
    value = Math.floor(value / divisor);
    unit = name;
  }

  if (unit === "second" && value < 30) return "just now";
  const rounded = Math.max(1, Math.floor(value));
  return `${rounded} ${unit}${rounded === 1 ? "" : "s"} ago`;
}
