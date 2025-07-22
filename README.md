Our Lady of Fatima Parish Website (MERN Stack)
📌 Purpose
This project is a bilingual, community-focused website built to serve the Our Lady of Fatima parish. It features mass schedules, upcoming events, and easy navigation—all designed for accessibility and spiritual engagement.
The site uses a modular React frontend and is evolving into a full MERN-stack application with spiritual content automation, admin tools, and community impact at its core.

🛠️ Tech Stack Overview (MERN)
| Technology | Status | Role | 
| MongoDB | Planned | Will store dynamic events, parish updates, and user data | 
| Express.js | In Progress | Powers backend API routes, including dynamic reading scraping | 
| React.js | In Progress | Manages frontend components, bilingual UI, and page routing | 
| Node.js | In Progress | Backend runtime, API orchestration, and server configuration | 



🚧 Current Progress
✅ Built core pages with modular React components
✅ Bilingual toggle using React Context (English/Spanish)
✅ Responsive navigation with animated mobile hamburger menu
✅ Multi-page routing with react-router-dom
✅ Event calendar using react-calendar
✅ Dynamic event details based on selected date
✅ Scoped CSS styling with responsive layout
✅ Backend scraping route: /api/readings/today pulls daily Gospel excerpt using Cheerio
✅ CORS enabled for frontend/backend cross-origin development
✅ React frontend displays scripture excerpt with fallback and loading states
✅ Styled Daily Reading card with parchment-inspired theme and “Read More” button

🔧 Backend Highlights
- Express route /api/readings/today uses Axios & Cheerio to scrape USCCB’s daily Gospel
- Robust fallback handling for reading availability
- Preview and excerpt formatting for frontend rendering
- CORS configuration allowing React dev server access (http://localhost:5173)
- Modular routing structure (readings.js) exported for clean API integration

📦 Coming Soon
🚀 Donation and e-store integration (Stripe, PayPal, Donorbox)
📬 Contact + prayer request forms
📂 Saint of the Day module with dynamic content
🧾 Admin panel for event/content management
🌐 Persistent bilingual support across sessions
🔐 User accounts and member login system
🧠 Advanced scraping logic for Responsorial Psalms and Gospel segments
📡 Backend connection to live MongoDB data

💡 Vision
To deliver a welcoming digital home where parishioners and visitors can find worship times, daily inspiration, and ways to connect—all through an interface that is intuitive, inclusive, and spiritually enriching.
