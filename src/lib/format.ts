export function fmtNumber(n: number): string {
  if (!Number.isFinite(n)) return "∞";
  if (n >= 1e12) return ${(n / 1e12).toFixed(2)}T;
  if (n >= 1e9) return ${(n / 1e9).toFixed(2)}B;
  if (n >= 1e6) return ${(n / 1e6).toFixed(2)}M;
  if (n >= 1e3) return ${(n / 1e3).toFixed(2)}K;
  return Math.round(n).toString();
}

export function formatDuration(seconds: number): string {
  if (!Number.isFinite(seconds)) return "∞";
  if (seconds <= 0) return "instant";

  const minute = 60;
  const hour = 60 * minute;
  const day = 24 * hour;
  const year = 365 * day;

  if (seconds < minute) return ${seconds.toFixed(1)} seconds;
  if (seconds < hour) return ${(seconds / minute).toFixed(1)} minutes;
  if (seconds < day) return ${(seconds / hour).toFixed(1)} hours;
  if (seconds < year) return ${(seconds / day).toFixed(1)} days;
  return ${(seconds / year).toFixed(1)} years;
}
