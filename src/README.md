# 🗓️ Wall Calendar — Frontend Engineering Challenge

A polished, interactive wall calendar React component inspired by the physical wall calendar aesthetic.

## ✨ Features

- **Physical wall calendar look** — spiral binding, hero photo per month, pin on top, realistic shadow
- **Date range selection** — click start → click end, range always displays chronologically (lo → hi)
- **Notes** — monthly notes + per-day notes, both saved in memory
- **Indian holidays** — Diwali, Holi, Republic Day, Independence Day, Ganesh Chaturthi, etc. with tooltips
- **Go to Today** button — jump back to the current month instantly
- **Flip animation** — smooth 3D card tilt when navigating months
- **Dark / Light mode** toggle
- **Keyboard navigation** — ← → arrow keys
- **Note indicators** — visible dot badge on days that have a note
- **Fully responsive** — stacks vertically on mobile

## 📁 Folder Structure

```
src/
├── App.jsx                          # Entry point
├── components/
│   └── Calendar/
│       ├── WallCalendar.jsx         # Top-level composer
│       ├── HeroSection.jsx          # Photo + month label + nav buttons
│       ├── CalendarGrid.jsx         # 7-column date grid
│       ├── DayCell.jsx              # Individual day cell
│       ├── NotesSidebar.jsx         # Notes panel (monthly + per-day)
│       └── Legend.jsx               # Bottom legend bar
├── hooks/
│   └── useCalendar.js              # All calendar state logic
├── utils/
│   └── calendarUtils.js            # Pure helper functions
├── data/
│   ├── monthThemes.js              # Per-month image, accent colour, mood
│   └── holidays.js                 # Indian + global holidays
└── styles/
    └── Calendar.css                # All styles
```

## 🚀 Getting Started

### With Vite (recommended)
```bash
npm create vite@latest wall-calendar -- --template react
cd wall-calendar
# Replace src/ with the src/ from this project
npm install
npm run dev
```

### With Next.js
```bash
npx create-next-app@latest wall-calendar --app
cd wall-calendar
# Copy src/ files into the app appropriately
npm run dev
```

## 🎨 Design Choices

- **Fonts**: Playfair Display (display/headings) + Lato (body) — classic editorial pairing
- **Wall background**: Warm wood-brown texture via CSS repeating gradients
- **Shadows**: Multi-layer box-shadow to simulate a calendar hanging on a wall
- **Accent colors**: Each month has its own accent color that themes the entire UI
- **Range sorting**: The displayed range always shows earlier date → later date, regardless of click order
