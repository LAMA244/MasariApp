# مُسَارِي | Masari — Smart Saudi Trip Planner

[**English**](#english) | 
---

<a name="english"></a>
##  English Overview

### Project Name & Description
**مُسَارِي | Masari — Smart Saudi Trip Planner** is a dynamic, bilingual (Arabic & English) Saudi Arabian tourism itinerary planner. Designed for tourists and residents exploring key Saudi cities, Masari synthesizes real-time prayer schedules, extreme heat advisories, crowd density patterns, and accessibility needs into seamlessly structured single-day itineraries.

---

###  Problem Statement
Traveling across Saudi Arabia presents unique cultural and environmental factors that standard itinerary apps often ignore:
* **Prayer Schedules**: Establishments temporarily pause activity during prayer times (Fajr, Dhuhr, Asr, Maghrib, Isha). Failing to account for these times can lead to locked doors and missed reservations.
* **Extreme Weather & Heat**: Midday temperatures in regions like Riyadh or AlUla can reach high peaks, making outdoor walking hazardous or unpleasant.
* **Accessibility Needs**: Travelers with wheelchairs, strollers, or elderly companions require verified step-free access and minimal walking distances.
* **Crowd Spikes**: Popular spots (e.g., Boulevard City or historic Al-Balad) experience distinct peak hours, requiring optimized timing to avoid traffic bottlenecks.

---

###  Key Features
* 🇸🇦 **Native Bilingual UI**: Seamless one-click toggle between Arabic (RTL) and English (LTR).
* 🇸🇦 **Verified by Visit Saudi (روح السعودية)**: All venue names, operating hours, price ranges, accessibility options, and seasonal festival calendars are strictly cross-checked with official `visitsaudi.com` listings.
*  **Prayer-Aware Routing**: Automatically embeds buffer times for congregational prayers and mosque visits, ensuring activities don't overlap with prayer closures.
*  **Heat Adaptive Engine**: Intelligently schedules outdoor sightseeing during cooler morning/evening hours and routes indoor air-conditioned activities during peak afternoon heat.
*  **Accessibility & Mobility Filters**: Tailors routes specifically for wheelchair users, families with strollers, and elderly travelers.
*  **Crowd & Timing Optimization**: Balances high-traffic cultural attractions with low-density relaxation spots.
*  **Integrated Map & Directions**: Direct links to Google Maps coordinates for each recommended venue.
*  **"Ask the Guide" Interactive Assistant**: Embedded AI chat panel on every venue card allowing users to ask venue-specific questions regarding dress code, tickets, best visiting hours, accessibility, and parking.

---

###  How It Works
1. **Real-time Context Assembly**: When a trip request is submitted, the server fetches live prayer schedules via the **Aladhan API** and accurate weather forecasts via the **OpenWeatherMap API**.
2. **Gemini 3.6 Flash Engine**: The combined constraints (travelers, city, date, special needs, weather, and prayer times) are passed to **Gemini 3.6 Flash** powered by **Google AI Studio**.
3. **Structured JSON Output**: The AI produces a strictly typed JSON object conforming to a predefined schema, guaranteeing valid timeline events, category tags, and duration estimates.
4. **Google Search & Maps Grounding**: Integrates grounding citations for real-world landmark verification.

---

###  Tech Stack
* **Platform & AI**: Google AI Studio, Gemini 3.6 Flash Model
* **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide React, Motion
* **Backend**: Express.js (Node.js runtime server)
* **APIs**: Aladhan Prayer Times API, OpenWeatherMap API, Google Search & Maps Grounding

---

###  Screenshots
(https://drive.google.com/file/d/16E6l1W9M-jinzUyUsrp7_OL1EfRl2Xh6/view?usp=sharing)



---

###  Live Demo
* **Live Application URL**: (https://ai.studio/apps/79e7a343-d76b-4766-8bad-e95a0806aa99)

---

###  Future Improvements
*  **Firebase Authentication & Saved Itineraries**: User accounts to bookmark, export, and share past trips.
*  **Real-time Live Traffic & Crowd Integration**: Integration with live foot-traffic APIs to suggest real-time rerouting.
*  **Expanded Saudi Destinations**: Inclusion of emerging Vision 2030 destinations (e.g., NEOM, Red Sea Project, Diriyah season events.

---

<br />

---
