/**
 * The top photo section of the calendar.
 * Shows the month's hero image, month name, year, and navigation controls.
 */
export default function HeroSection({
  year, month,
  theme,          // { name, img, accent, mood }
  darkMode,
  onNavigate,     // (dir: -1 | 1) => void
  onGoToToday,
  onToggleDark,
}) {
  return (
    <div className="hero-section">
      <img
        key={`${year}-${month}`}   /* key change triggers a remount = natural crossfade feel */
        src={theme.img}
        alt={`${theme.name} ${year}`}
        className="hero-img"
        style={{ filter: darkMode ? "brightness(0.6) saturate(0.7)" : "brightness(0.82) saturate(1.1)" }}
      />
      <div className="hero-overlay" />

      {/* Month label */}
      <div className="hero-label">
        <div className="hero-mood">{theme.mood}</div>
        <div className="hero-year">{year}</div>
        <div className="hero-month">{theme.name}</div>
      </div>

      {/* Navigation: ‹ › + Go to Today */}
      <div className="hero-nav">
        <button className="nav-btn" onClick={() => onNavigate(-1)} title="Previous month">
          ‹
        </button>
        <button className="nav-btn" onClick={() => onNavigate(1)} title="Next month">
          ›
        </button>
        <button className="today-btn" onClick={onGoToToday}>
          Today
        </button>
      </div>

      {/* Dark mode toggle */}
      <button className="dark-mode-btn" onClick={onToggleDark}>
        {darkMode ? "☀ Light" : "☾ Dark"}
      </button>
    </div>
  );
}
