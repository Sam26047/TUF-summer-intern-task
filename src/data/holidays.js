// Indian public holidays + global ones (Christmas, New Year)
// Key format: "month-day" (1-indexed month)
// Some holidays like Diwali/Holi change every year; these are approximate 2026 dates.
export const HOLIDAYS = {
  // Fixed-date holidays
  "1-1":   "New Year's Day 🎆",
  "1-26":  "Republic Day 🇮🇳",
  "3-25":  "Holi 🎨",          // ~2026
  "4-14":  "Dr. Ambedkar Jayanti 🌟",
  "4-18":  "Good Friday ✝️",
  "5-1":   "Labour Day 🛠️",
  "6-21":  "Eid ul-Adha 🌙",   // ~2026
  "8-15":  "Independence Day 🇮🇳",
  "8-26":  "Janmashtami 🦚",   // ~2026
  "9-3":   "Ganesh Chaturthi 🐘", // ~2026
  "10-2":  "Gandhi Jayanti 🕊️",
  "10-20": "Dussehra 🏹",      // ~2026
  "10-31": "Halloween 🎃",
  "11-1":  "Diwali 🪔",        // ~2026
  "11-5":  "Bhai Dooj 🪔",     // ~2026
  "11-15": "Guru Nanak Jayanti 🙏",
  "12-25": "Christmas 🎄",
  "12-31": "New Year's Eve 🎉",
};
