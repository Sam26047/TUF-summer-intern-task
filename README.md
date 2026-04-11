# 🗓️ Wall Calendar — Interactive React Component

A polished, interactive wall calendar built with React + Vite, inspired by the physical wall calendar aesthetic. Built as a frontend engineering challenge submission.

---

## ✅ Challenge Requirements — All Implemented

### Core Requirements

| Requirement | Status | Notes |
|---|---|---|
| Wall Calendar Aesthetic | ✅ | Spiral binding, hero photo, hanging pin + threads, multi-layer shadows |
| Day Range Selector | ✅ | Click start → click end; clear visual states for start, end, and in-range days |
| Integrated Notes Section | ✅ | Monthly notes + per-day notes in a dedicated sidebar panel |
| Responsive Design | ✅ | Desktop side-by-side layout; mobile stacks vertically with full touch support |

---

## ✨ Extra Features (Beyond the Baseline)

These were added on top of the core requirements to showcase additional product sense and technical depth:

- **3D Flip Animation** — Smooth `perspective + rotateX` card tilt plays on every month navigation, giving the feel of flipping a real calendar page
- **Dark / Light Mode Toggle** — Full dark mode across every section (hero, grid, sidebar, legend), accessible from the hero overlay button
- **Keyboard Navigation** — `←` / `→` arrow keys navigate months without triggering browser scroll (`e.preventDefault()`)
- **Touch / Swipe Navigation** — Swipe left/right on mobile to navigate months (50px threshold to ignore accidental micro-swipes)
- **Indian Holiday Markers** — 17 holidays (Republic Day, Holi, Diwali, Independence Day, Ganesh Chaturthi, etc.) marked with ⭐ and hover tooltips. Approximate 2026 dates used for floating holidays
- **Per-month Hero Themes** — Each month has a unique Unsplash hero image, accent color, and mood tagline that themes the entire UI (grid highlights, sidebar labels, legend dots)
- **Go to Today Button** — Instantly returns to the current month from anywhere in the calendar
- **Note Indicators** — Small colored dot badge appears on day cells that have a saved note
- **Range Direction Sorting** — The displayed range is always rendered chronologically (lo → hi) regardless of click order, via a `sortedRange()` utility
- **Range Day Count** — The sidebar shows the number of days in the selected range
- **Flip Sound Effects** — Distinct audio clips play on forward and backward month navigation, using real recorded page-turn sounds split into two directional cues
- **Physical Calendar Decorations** — Spiral binding bar with 20 metallic rings, red wall pin, and two angled hanging threads built entirely in CSS
- **Accent-Aware Theming** — Weekend day numbers, header labels, note badges, sidebar labels, and the legend all inherit the current month's accent color dynamically via inline styles

---

## 🏗️ Architecture & Design Decisions

### Component Structure

```
src/
├── App.jsx                          # Root — renders WallCalendar
├── components/
│   └── Calendar/
│       ├── WallCalendar.jsx         # Top-level composer; owns animation + touch + keyboard
│       ├── HeroSection.jsx          # Hero image, month label, nav buttons, dark mode toggle
│       ├── CalendarGrid.jsx         # 7-column grid + day-of-week headers
│       ├── DayCell.jsx              # Single day cell (range/today/holiday/note states)
│       ├── NotesSidebar.jsx         # Monthly notes + per-day note + range summary
│       └── Legend.jsx               # Bottom legend bar
├── hooks/
│   └── useCalendar.js              # All calendar state (view, range, notes, dark mode)
├── utils/
│   └── calendarUtils.js            # Pure helpers: buildCalendarDays, sortedRange, isBetween, etc.
├── data/
│   ├── monthThemes.js              # Per-month image URL, accent colour, mood string
│   └── holidays.js                 # Holiday map keyed by "month-day"
└── styles/
    └── Calendar.css                # All styles — single stylesheet, BEM-like naming
```

### State Management

All state lives in the `useCalendar` custom hook and is passed down as props — no external state library. This keeps the data flow explicit and easy to follow:

- **View state** (`year`, `month`) stored as a single `{ year, month }` object to avoid the year-wrap bug that occurs when incrementing month and year separately
- **Range selection** keeps raw click order (`startDate`, `endDate`) separate from the sorted display range (`rangeStart`, `rangeEnd`), so the UI always shows lo → hi while the selection logic stays simple
- **Notes** are stored in flat objects keyed by `"y-m-d"` (day notes) and `"y-m"` (month notes) — simple and serialisation-friendly if you ever want to persist them to localStorage

### Styling

- Single `Calendar.css` file — no CSS modules or CSS-in-JS — keeps styles co-located and straightforward to audit
- CSS custom properties (`--font-display`, `--font-body`, `--transition-speed`) for shared tokens
- Accent-dependent colours (range highlights, today border, weekend tint, legend) are applied as inline `style` props driven by the current month theme — this avoids dynamically generating CSS class names
- Fonts: **Playfair Display** (headings / day numbers) + **Lato** (body / UI) loaded from Google Fonts — a classic editorial pairing appropriate for a calendar

---

## 🚀 Getting Started

### Prerequisites

- Node.js `>=20.19.0` (required by Vite 8 + Rolldown)

### Install & Run

```bash
# Clone the repo
git clone https://github.com/Sam26047/TUF-summer-intern-task.git
cd my-calendar

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
# Output is in /dist — deploy to Vercel, Netlify, or GitHub Pages
```
### 🌐 Live Deployment

The application is deployed on Vercel:

👉 **Live URL:** https://tuf-summer-intern-task.vercel.app/

No login required — fully public.
---

## 🖱️ How to Use

| Action | How |
|---|---|
| Navigate months | Click `‹` / `›` buttons, press `←` / `→` arrow keys, or swipe left/right on mobile |
| Jump to today | Click the **Today** button in the hero |
| Select a date range | Click a start date, then click an end date — order doesn't matter |
| Clear selection | Click **✕ Clear selection** in the sidebar |
| Add a monthly note | Type in the **Monthly Notes** textarea in the sidebar |
| Add a day note | Click any date — a **Day Note** textarea appears in the sidebar |
| See a holiday name | Hover over a ⭐ marked date |
| Toggle dark mode | Click **☾ Dark** / **☀ Light** in the top-right of the hero image |
| Hear flip sound | Navigate months in either direction — forward and backward flips play different sounds |

---

## 🛠️ Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| React | 19.2.4 | UI framework |
| Vite | 8.x | Dev server + build tool (uses Rolldown bundler) |
| Plain CSS | — | All styling, no preprocessor |
| Google Fonts | — | Playfair Display + Lato |
| Unsplash | — | Hero images (CDN, no API key needed) |

---

## 📝 Notes on Scope

Per the challenge brief, this is a **strictly frontend** implementation. All data (notes, selected range, view state) lives in React component state and resets on page refresh. Adding localStorage persistence would be a one-line change to the `useCalendar` hook if needed.