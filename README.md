
# Citylight Space Booking App

A modern React + Vite application for booking spaces, with dynamic time slot management and Supabase backend integration.

## Features
- Select date and time for booking
- Complete a booking questionnaire
- Confirm and review booking details
- Dynamic time slot availability (Supabase)
- Demo mode with mock data
- Responsive, modern UI (Tailwind CSS)

## Tech Stack
- React
- Vite
- TypeScript
- Tailwind CSS
- Supabase (database & API)
- Azure Static Web Apps (recommended for hosting)

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/mezzyboss/citylight-proj.git
cd citylight-proj
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the project root:
```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_KEY=your-supabase-anon-key
```

### 4. Run locally
```bash
npm run dev
```

### 5. Build for production
```bash
npm run build
```

## Supabase Setup
- Create tables `bookings` and `time_slots` in Supabase (see `/docs` or ask Copilot for SQL scripts)
- Add time slot records for each bookable day

## Azure Static Web Apps Deployment
1. Push your code to GitHub
2. Create a Static Web App in Azure Portal
3. Set app location to `/`, output location to `dist`
4. Add environment variables in Azure Portal
5. Deploy and access your app via the provided URL

## Switching Between Demo and Live Calendar
- To use the demo calendar, import and use `BookingCalendarDemo` in your components
- To use the live calendar, import and use `BookingCalendar` (Supabase-powered)

## License
MIT

---
For questions or help, contact mezzyboss or use GitHub Issues.