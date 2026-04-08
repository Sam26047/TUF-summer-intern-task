/**
 * Small legend bar at the bottom of the calendar explaining visual indicators.
 */
export default function Legend({ accent }) {
  return (
    <div className="legend-bar">

      <div className="legend-item">
        <div className="legend-dot" style={{ background: accent }} />
        Selected / Endpoint
      </div>

      <div className="legend-item">
        <div className="legend-dot" style={{ background: `${accent}44` }} />
        In range
      </div>

      <div className="legend-item">
        <div
          className="legend-ring"
          style={{ borderColor: accent, color: accent }}
        />
        Today
      </div>

      <div className="legend-item">
        <span style={{ fontSize: "11px" }}>⭐</span>
        Holiday
      </div>

      <div className="legend-item">
        <div
          className="legend-dot"
          style={{ background: accent, width: "7px", height: "7px" }}
        />
        Has note
      </div>

    </div>
  );
}
