import { DAYS_SHORT } from "../../data/monthThemes";
import { HOLIDAYS } from "../../data/holidays";
import { buildCalendarDays } from "../../utils/calendarUtils";
import DayCell from "./DayCell";

/**
 * The 7-column date grid + day-of-week headers.
 */
export default function CalendarGrid({
  year, month,
  today,
  rangeStart, rangeEnd,
  dayNotes,
  accent,
  darkMode,
  onDayClick,
}) {
  const days = buildCalendarDays(year, month);

  return (
    <div className="cal-col">
      {/* Day-of-week headers */}
      <div className="day-headers">
        {DAYS_SHORT.map((label, i) => (
          <div
            key={label}
            className="day-header"
            style={{
              color: i === 0 || i === 6
                ? accent
                : (darkMode ? "#5a6080" : "#aab"),
            }}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="days-grid">
        {days.map((day, idx) => {
          const isWeekend = idx % 7 === 0 || idx % 7 === 6;
          const holiday   = day ? (HOLIDAYS[`${month + 1}-${day}`] || null) : null;
          // A day has a note if its key exists and is non-empty
          const hasNote   = day
            ? Boolean(dayNotes[`${year}-${month}-${day}`])
            : false;

          return (
            <DayCell
              key={idx}
              day={day}
              year={year}
              month={month}
              today={today}
              rangeStart={rangeStart}
              rangeEnd={rangeEnd}
              hasNote={hasNote}
              holiday={holiday}
              accent={accent}
              darkMode={darkMode}
              isWeekend={isWeekend}
              onClick={onDayClick}
            />
          );
        })}
      </div>
    </div>
  );
}
