import { useState, useCallback } from "react";
import { sortedRange, dayKey, monthKey } from "../utils/calendarUtils";

/**
 * Manages all calendar state:
 * - current month/year view
 * - date range selection
 * - notes (per-day and per-month)
 * - dark mode
 */
export function useCalendar() {
  const today = new Date();
  const todayObj = { y: today.getFullYear(), m: today.getMonth(), d: today.getDate() };

const [view, setView] = useState({ year: todayObj.y, month: todayObj.m });
const year  = view.year;
const month = view.month;

  // Range selection: startDate is always the first click, endDate the second.
  // Displayed range is always sorted (lo→hi) via sortedRange().
  const [startDate, setStartDate] = useState(null);
  const [endDate,   setEndDate]   = useState(null);

  // The date whose day-note is shown in the sidebar
  const [activeNote, setActiveNote] = useState(null);

  // { "y-m-d": "note text", ... }
  const [dayNotes,   setDayNotes]   = useState({});
  // { "y-m": "note text", ... }
  const [monthNotes, setMonthNotes] = useState({});

  const [darkMode, setDarkMode] = useState(false);

  // ── Navigation ────────────────────────────────────────────────────────────
  // We track month as a flat index to avoid the year-jump bug.
  // month is always 0-11; we adjust year when it wraps.
const navigate = useCallback((dir) => {
  setView(prev => {
    const next = prev.month + dir;
    if (next > 11) return { year: prev.year + 1, month: 0 };
    if (next < 0)  return { year: prev.year - 1, month: 11 };
    return { ...prev, month: next };
  });
}, []);

const goToToday = useCallback(() => {
  setView({ year: todayObj.y, month: todayObj.m });
}, [todayObj.y, todayObj.m]);

  // ── Date selection ────────────────────────────────────────────────────────
  const handleDayClick = useCallback((d) => {
    const clicked = { y: year, m: month, d };
    setActiveNote(clicked);

    if (!startDate || (startDate && endDate)) {
      // Fresh selection
      setStartDate(clicked);
      setEndDate(null);
    } else {
      // Second click — set end (could be before or after start, sortedRange handles it)
      setEndDate(clicked);
    }
  }, [year, month, startDate, endDate]);

  const clearSelection = useCallback(() => {
    setStartDate(null);
    setEndDate(null);
    setActiveNote(null);
  }, []);

  // ── Notes ─────────────────────────────────────────────────────────────────
  const setDayNote = useCallback((dateObj, text) => {
    setDayNotes(prev => ({ ...prev, [dayKey(dateObj)]: text }));
  }, []);

  const getDayNote = useCallback((dateObj) => {
    return dayNotes[dayKey(dateObj)] || "";
  }, [dayNotes]);

  const setMonthNote = useCallback((y, m, text) => {
    setMonthNotes(prev => ({ ...prev, [monthKey(y, m)]: text }));
  }, []);

  const getMonthNote = useCallback((y, m) => {
    return monthNotes[monthKey(y, m)] || "";
  }, [monthNotes]);

  // ── Sorted range (always lo → hi for display) ─────────────────────────────
  const { lo: rangeStart, hi: rangeEnd } = sortedRange(startDate, endDate);

  return {
    // View
    year, month, today: todayObj,
    navigate, goToToday,
    // Selection (raw clicks)
    startDate, endDate,
    // Sorted for display
    rangeStart, rangeEnd,
    handleDayClick, clearSelection,
    activeNote, setActiveNote,
    // Notes
    dayNotes, setDayNote, getDayNote,
    setMonthNote, getMonthNote,
    // UI
    darkMode, setDarkMode,
  };
}
