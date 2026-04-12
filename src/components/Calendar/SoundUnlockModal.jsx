export default function SoundUnlockModal({ onUnlock, darkMode }) {
  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.6)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    }}>
      <div style={{
        background: darkMode ? "#1e2130" : "#fff",
        borderRadius: "16px",
        padding: "28px 24px",
        maxWidth: "300px",
        width: "90%",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}>
        <div style={{ fontSize: "36px" }}>🔊</div>
        <div style={{
          fontSize: "18px",
          fontWeight: "700",
          fontFamily: "'Playfair Display', serif",
          color: darkMode ? "#cdd6f4" : "#333",
        }}>
          Enable Sound?
        </div>
        <div style={{
          fontSize: "13px",
          color: darkMode ? "#6a7090" : "#888",
          lineHeight: "1.6",
        }}>
          This calendar plays a page-turn sound when flipping months.
        </div>
        <button
          onClick={() => onUnlock(true)}
          style={{
            background: "#3D7EBF",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            padding: "12px",
            fontSize: "14px",
            fontWeight: "700",
            cursor: "pointer",
            fontFamily: "'Lato', sans-serif",
            letterSpacing: "0.5px",
          }}
        >
          Yes, enable sound
        </button>
        <button
          onClick={() => onUnlock(false)}
          style={{
            background: "transparent",
            color: darkMode ? "#6a7090" : "#aaa",
            border: "none",
            fontSize: "13px",
            cursor: "pointer",
            fontFamily: "'Lato', sans-serif",
          }}
        >
          No thanks
        </button>
      </div>
    </div>
  );
}