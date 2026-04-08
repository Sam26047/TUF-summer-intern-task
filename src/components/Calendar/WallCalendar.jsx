import { useEffect, useRef, useState } from "react";
import { useCalendar } from "../../hooks/useCalendar";
import { MONTH_THEMES } from "../../data/monthThemes";
import HeroSection   from "./HeroSection";
import CalendarGrid  from "./CalendarGrid";
import NotesSidebar  from "./NotesSidebar";
import Legend        from "./Legend";
import "../../styles/Calendar.css";

/**
 * Top-level calendar component.
 * Composes all sub-components and wires up the useCalendar hook.
 */
export default function WallCalendar() {
  const cal = useCalendar();
  const theme = MONTH_THEMES[cal.month];

  // Flip animation state — tracked separately from navigation so we
  // can apply a CSS animation class and remove it cleanly.
  const [flipClass, setFlipClass] = useState("");
  const flipTimeout = useRef(null);

  function handleNavigate(dir) {
    // Trigger animation
    setFlipClass(dir === 1 ? "flip-forward" : "flip-back");
    clearTimeout(flipTimeout.current);
    flipTimeout.current = setTimeout(() => setFlipClass(""), 420);

    cal.navigate(dir);
  }

  // Keyboard navigation
  useEffect(() => {
    const onKey = e => {
      if (e.key === "ArrowRight") handleNavigate(1);
      if (e.key === "ArrowLeft")  handleNavigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []); // eslint-disable-line

  return (
    <div className={`app-wall ${cal.darkMode ? "dark" : ""}`}>
      <div style={{ width: "100%", maxWidth: "920px", position: "relative" }}>
        <div className="thread left"></div>
        <div className="thread right"></div>
        {/* Wall pin at the very top */}
        <div className="wall-pin" />

        {/* The physical calendar card */}
        <div className={`calendar-card ${cal.darkMode ? "dark" : ""} ${flipClass}`}>

          {/* Spiral binding */}
          <div className="spiral-bar">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="spiral-ring" />
            ))}
          </div>

          {/* Hero photo + month label + nav */}
          <HeroSection
            year={cal.year}
            month={cal.month}
            theme={theme}
            darkMode={cal.darkMode}
            onNavigate={handleNavigate}
            onGoToToday={cal.goToToday}
            onToggleDark={() => cal.setDarkMode(d => !d)}
          />

          {/* Body: notes sidebar + calendar grid */}
          <div className="calendar-body">
            <NotesSidebar
              year={cal.year}
              month={cal.month}
              activeNote={cal.activeNote}
              rangeStart={cal.rangeStart}
              rangeEnd={cal.rangeEnd}
              getDayNote={cal.getDayNote}
              setDayNote={cal.setDayNote}
              getMonthNote={cal.getMonthNote}
              setMonthNote={cal.setMonthNote}
              clearSelection={cal.clearSelection}
              accent={theme.accent}
              darkMode={cal.darkMode}
            />

            <CalendarGrid
              year={cal.year}
              month={cal.month}
              today={cal.today}
              rangeStart={cal.rangeStart}
              rangeEnd={cal.rangeEnd}
              dayNotes={cal.dayNotes}
              accent={theme.accent}
              darkMode={cal.darkMode}
              onDayClick={cal.handleDayClick}
            />
          </div>

          {/* Legend */}
          <Legend accent={theme.accent} />

        </div>

        {/* Keyboard hint */}
        <p style={{
          textAlign: "center",
          fontSize: "11px",
          marginTop: "14px",
          letterSpacing: "1.5px",
          color: cal.darkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.25)",
          fontFamily: "'Lato', sans-serif",
        }}>
          ← → Arrow keys to navigate • Click a date to select • Click again to end range
        </p>

      </div>
    </div>
  );
}
