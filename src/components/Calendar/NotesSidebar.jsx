import { daysBetween, formatDate } from "../../utils/calendarUtils";
import { MONTH_THEMES } from "../../data/monthThemes";

/**
 * The left sidebar containing:
 *  - Monthly notes textarea
 *  - Per-day note textarea (when a day is selected)
 *  - Range info summary
 *  - Clear selection button
 */
export default function NotesSidebar({
  year, month,
  activeNote,
  rangeStart, rangeEnd,
  getDayNote, setDayNote,
  getMonthNote, setMonthNote,
  clearSelection,
  accent,
  darkMode,
}) {
  const monthNoteValue = getMonthNote(year, month);
  const dayNoteValue   = activeNote ? getDayNote(activeNote) : "";

  const hasRange = rangeStart && rangeEnd;
  const hasStart = rangeStart && !rangeEnd;

  return (
    <div className="notes-sidebar">

      {/* ── Monthly notes ── */}
      <div className="notes-section-label" style={{ color: accent }}>
        Monthly Notes
      </div>
      <textarea
        className="notes-textarea month-note"
        placeholder="Goals, reminders, plans for the month…"
        value={monthNoteValue}
        onChange={e => setMonthNote(year, month, e.target.value)}
        style={darkMode ? { background: "#222640", borderColor: "#3a3f60", color: "#cdd6f4" } : {}}
      />

      {/* ── Per-day note (shown when a day is active) ── */}
      {activeNote && (
        <>
          <div className="notes-section-label" style={{ color: accent }}>
            Day Note
          </div>
          <div className="active-date-label">
            {formatDate(activeNote, MONTH_THEMES)}
          </div>
          <textarea
            className="notes-textarea day-note"
            placeholder="What's happening this day?"
            value={dayNoteValue}
            onChange={e => setDayNote(activeNote, e.target.value)}
            style={{
              border: `1.5px solid ${accent}55`,
              background: darkMode ? "#222640" : `${accent}0a`,
              color: darkMode ? "#cdd6f4" : "#333",
            }}
          />
        </>
      )}

      {/* ── Range summary ── */}
      {(hasStart || hasRange) && (
        <>
          <div className="notes-section-label" style={{ color: accent }}>
            Selection
          </div>
          <div
            className="range-info-box"
            style={{
              background: darkMode ? "#1a1e30" : `${accent}0d`,
              border: `1px solid ${accent}30`,
            }}
          >
            {hasStart && (
              <>
                📅 <strong>{formatDate(rangeStart, MONTH_THEMES)}</strong>
                <br />
                <span style={{ opacity: 0.65 }}>Click another date to end range</span>
              </>
            )}
            {hasRange && (
              <>
                📅 <strong>{formatDate(rangeStart, MONTH_THEMES)}</strong>
                <br />
                ↳ <strong>{formatDate(rangeEnd, MONTH_THEMES)}</strong>
                <br />
                <span style={{ opacity: 0.65 }}>
                  {daysBetween(rangeStart, rangeEnd)} day{daysBetween(rangeStart, rangeEnd) !== 1 ? "s" : ""}
                </span>
              </>
            )}
          </div>
          <button
            className="clear-btn"
            onClick={clearSelection}
            style={{
              border: `1px solid ${accent}55`,
              color: accent,
            }}
          >
            ✕ Clear selection
          </button>
        </>
      )}
    </div>
  );
}
