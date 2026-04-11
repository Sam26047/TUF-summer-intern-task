import { useEffect, useRef, useState } from "react";
import { useCalendar } from "../../hooks/useCalendar";
import { MONTH_THEMES } from "../../data/monthThemes";
import HeroSection   from "./HeroSection";
import CalendarGrid  from "./CalendarGrid";
import NotesSidebar  from "./NotesSidebar";
import Legend        from "./Legend";
import "../../styles/Calendar.css";

export default function WallCalendar() {
  const cal = useCalendar();
  const theme = MONTH_THEMES[cal.month];

  // Flip animation state
  const [flipClass, setFlipClass] = useState("");
  const flipTimeout = useRef(null);

  // Touch refs
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const flipForwardAudio = new Audio("/flip-forward.wav");
  const flipBackAudio    = new Audio("/flip-backward.wav");

  function playFlipSound(dir) {
    try {
      const audio = dir === 1 ? flipForwardAudio : flipBackAudio;
      audio.currentTime = 0;
      audio.volume = 0.5;
      audio.play();
    } catch(e) {}
  }

  function triggerFlip(dir, callback) {
    playFlipSound(dir); //play flip sound
    // Reset animation (fix stacking bug)
    setFlipClass("");

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setFlipClass(dir === 1 ? "flip-forward" : "flip-back");

        clearTimeout(flipTimeout.current);
        flipTimeout.current = setTimeout(() => setFlipClass(""), 420);

        callback();
      });
    });
  }

  function handleNavigate(dir) {
    triggerFlip(dir, () => cal.navigate(dir));
  }

  function handleGoToToday() {
    triggerFlip(1, () => cal.goToToday());
  }

  // Keyboard navigation (FIX: prevent scroll)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNavigate(1);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handleNavigate(-1);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []); // eslint-disable-line

  // Touch handlers (NEW)
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;

    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) < 50) return; // ignore small swipes

    if (diff > 0) {
      handleNavigate(1);  // swipe left → next
    } else {
      handleNavigate(-1); // swipe right → prev
    }
  };

  return (
    <div className={`app-wall ${cal.darkMode ? "dark" : ""}`}>
      <div style={{ width: "100%", maxWidth: "920px", position: "relative" }}>
        
        {/* Threads + pin */}
        <div className="thread left"></div>
        <div className="thread right"></div>
        <div className="wall-pin" />

        {/* Calendar */}
        <div
          className={`calendar-card ${cal.darkMode ? "dark" : ""} ${flipClass}`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >

          {/* Spiral binding */}
          <div className="spiral-bar">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="spiral-ring" />
            ))}
          </div>

          {/* Hero */}
          <HeroSection
            year={cal.year}
            month={cal.month}
            theme={theme}
            darkMode={cal.darkMode}
            onNavigate={handleNavigate}
            onGoToToday={handleGoToToday}   // ✅ FIXED
            onToggleDark={() => cal.setDarkMode(d => !d)}
          />

          {/* Body */}
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

        {/* Hint */}
        <p style={{
          textAlign: "center",
          fontSize: "11px",
          marginTop: "14px",
          letterSpacing: "1.5px",
          color: cal.darkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.25)",
          fontFamily: "'Lato', sans-serif",
        }}>
          ← → Arrow keys • Swipe • Click dates to select
        </p>

      </div>
    </div>
  );
}