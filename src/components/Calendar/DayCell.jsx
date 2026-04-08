import { useState } from "react";
import { sameDay, isBetween } from "../../utils/calendarUtils";

/**
 * Renders a single day cell in the calendar grid.
 * Props:
 *  - day: number or null (null = empty padding cell)
 *  - year, month: for building the date object
 *  - today: {y,m,d}
 *  - rangeStart, rangeEnd: {y,m,d} (sorted lo→hi)
 *  - hasNote: boolean
 *  - holiday: string | null
 *  - accent: string (CSS color)
 *  - darkMode: boolean
 *  - isWeekend: boolean
 *  - onClick: (day) => void
 */
export default function DayCell({
  day,
  year, month,
  today,
  rangeStart, rangeEnd,
  hasNote,
  holiday,
  accent,
  darkMode,
  isWeekend,
  onClick,
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  if (!day) {
    return <div className="day-cell empty" />;
  }

  const cellDate = { y: year, m: month, d: day };
  const isEndpoint = sameDay(cellDate, rangeStart) || sameDay(cellDate, rangeEnd);
  const inRange    = isBetween(cellDate, rangeStart, rangeEnd);
  const isToday    = sameDay(cellDate, today);

  // Determine state label for CSS class
  let stateClass = "state-normal";
  if (isEndpoint) stateClass = "state-endpoint";
  else if (inRange) stateClass = "state-range";
  else if (isToday) stateClass = "state-today";

  // Inline styles that depend on the accent color prop
  const inlineStyles = (() => {
    if (isEndpoint) return {
      background: accent,
      color: "#fff",
      boxShadow: `0 4px 14px ${accent}60`,
    };
    if (inRange) return {
      background: `${accent}22`,
      color: darkMode ? "#cdd6f4" : "#444",
      borderRadius: "4px",
    };
    if (isToday) return {
      border: `2px solid ${accent}`,
      color: accent,
    };
    return {
      color: isWeekend
        ? accent
        : (darkMode ? "#c0c8e8" : "#333"),
    };
  })();

  return (
    <div
      className={`day-cell ${stateClass}`}
      style={inlineStyles}
      onClick={() => onClick(day)}
      onMouseEnter={() => holiday && setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {day}

      {/* Note indicator — visible circle badge */}
      {hasNote && !isEndpoint && (
        <div
          className="note-indicator"
          style={{ background: isToday ? "#fff" : accent }}
          title="Has a note"
        />
      )}

      {/* Holiday star */}
      {holiday && (
        <div className="holiday-star">⭐</div>
      )}

      {/* Holiday tooltip */}
      {showTooltip && holiday && (
        <div className="holiday-tooltip">{holiday}</div>
      )}
    </div>
  );
}
