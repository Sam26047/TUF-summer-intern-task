/**
 * Returns an array of day numbers (or null for empty leading cells)
 * for the given year + month (0-indexed month).
 */
export function buildCalendarDays(year, month) {
  const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0 = Sunday
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = [];
  for (let i = 0; i < firstDayOfWeek; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);
  return days;
}

/** Returns a sortable integer for a date object {y, m, d} */
export function dateToInt({ y, m, d }) {
  return y * 10000 + m * 100 + d;
}

/** True if two date objects represent the same calendar day */
export function sameDay(a, b) {
  if (!a || !b) return false;
  return a.y === b.y && a.m === b.m && a.d === b.d;
}

/**
 * Given a start and end (which may be in any order),
 * returns { lo, hi } always in chronological order.
 */
export function sortedRange(start, end) {
  if (!start || !end) return { lo: start, hi: end };
  const si = dateToInt(start);
  const ei = dateToInt(end);
  return si <= ei ? { lo: start, hi: end } : { lo: end, hi: start };
}

/** True if cell is strictly between lo and hi */
export function isBetween(cell, lo, hi) {
  if (!lo || !hi) return false;
  const t = dateToInt(cell);
  const s = dateToInt(lo);
  const e = dateToInt(hi);
  return t > s && t < e;
}

/** Number of days between two date objects (always positive) */
export function daysBetween(a, b) {
  if (!a || !b) return 0;
  const d1 = new Date(a.y, a.m, a.d);
  const d2 = new Date(b.y, b.m, b.d);
  return Math.abs(Math.round((d2 - d1) / 86400000));
}

/** Format a date object to a readable string */
export function formatDate(d, monthThemes) {
  if (!d) return "";
  return `${monthThemes[d.m].name} ${d.d}, ${d.y}`;
}

/** Storage key for a specific day */
export function dayKey(d) {
  return `${d.y}-${d.m}-${d.d}`;
}

/** Storage key for a month */
export function monthKey(year, month) {
  return `${year}-${month}`;
}
