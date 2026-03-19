# 🚌 Public Transport Tracker

A real-time public transit tracking dashboard built with React and Tailwind CSS, featuring automated schedule fetches and complex state management. It delivers routing ETAs through a striking, neon-accented 3D visual aesthetic inspired by sci-fi terminal interfaces.

## ✨ Features
- **Real-Time Data Bridge**: Maps dummy JSON endpoint data (`jsonplaceholder.typicode.com/todos`) intelligently into usable transit lines, generated ETAs, and localized status updates.
- **Auto Data Refresh**: Manually refresh the schedule or toggle the background auto-refresh (30-second interval) to keep the tracking board up-to-date.
- **Complex State Management**: Centralized data using React's `useState` and `useEffect` controlling the active route lists, real-time fetching logic, search queries, and timestamps.
- **Search & Filtering**: Quickly look up lines globally by filtering the fetched transport data.
- **Stunning UI Interface**: A custom design system leveraging Tailwind CSS that focuses on transparency, glowing UI accents (`.glow-box`), dynamic scrollbars, and grid aesthetic mapping.

## 🛠️ Built With 
- **React 19** 
- **Vite.js**
- **Tailwind CSS v3**

## 🚀 Getting Started 

**1. Clone or download the repository.**

**2. Navigate into the project directory:**
```bash
cd public-transport-tracker
```

**3. Install dependencies:**
```bash
npm install
```

**4. Start the local development server:**
```bash
npm run dev
```

**5. Open the app:**
Visit `http://localhost:5173` in your browser.

## 📝 Learning Objectives Reached
- Time-based states and derived values.
- Conditional rendering arrays cleanly using `.map()`.
- Building UI based precisely on custom parameters, colors, and layouts.
- Manual re-fetches vs isolated intervals.
