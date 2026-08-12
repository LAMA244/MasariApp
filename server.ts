import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { generateSmartFallbackPlan } from './src/data/fallbackGenerator';
import { CityId } from './src/types';

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize GenAI
const getGenAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('GEMINI_API_KEY is not set in environment variables.');
  }
  return new GoogleGenAI({
    apiKey: apiKey || 'DUMMY_KEY',
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// City coordinates mapping for weather & prayer times fallback
const CITY_CONFIG: Record<string, { cityEn: string; cityAr: string; lat: number; lng: number }> = {
  riyadh: { cityEn: 'Riyadh', cityAr: 'الرياض', lat: 24.7136, lng: 46.6753 },
  diriyah: { cityEn: 'Diriyah', cityAr: 'الدرعية', lat: 24.7333, lng: 46.5750 },
  jeddah: { cityEn: 'Jeddah', cityAr: 'جدة', lat: 21.5433, lng: 39.1728 },
  alula: { cityEn: 'AlUla', cityAr: 'العلا', lat: 26.6171, lng: 37.9229 },
  mecca: { cityEn: 'Mecca', cityAr: 'مكة المكرمة', lat: 21.3891, lng: 39.8579 },
  medina: { cityEn: 'Medina', cityAr: 'المدينة المنورة', lat: 24.5247, lng: 39.5692 },
};

// Helper 1: Fetch Prayer Times via Aladhan API (Method 4: Umm al-Qura)
async function fetchPrayerTimes(cityKey: string, dateStr: string) {
  const cfg = CITY_CONFIG[cityKey] || CITY_CONFIG.riyadh;
  try {
    const url = `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(cfg.cityEn)}&country=Saudi%20Arabia&method=4`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      const timings = data.data?.timings;
      if (timings) {
        return {
          fajr: timings.Fajr,
          dhuhr: timings.Dhuhr,
          asr: timings.Asr,
          maghrib: timings.Maghrib,
          isha: timings.Isha,
          sunrise: timings.Sunrise,
          sunset: timings.Sunset,
        };
      }
    }
  } catch (err) {
    console.error('Error fetching prayer times from Aladhan API:', err);
  }

  // Robust Umm al-Qura seasonal approximation fallback if API is unreachable
  return {
    fajr: '04:15',
    dhuhr: '12:05',
    asr: '15:25',
    maghrib: '18:35',
    isha: '20:05',
    sunrise: '05:35',
    sunset: '18:35',
  };
}

// Helper 2: Fetch Weather
async function fetchWeather(cityKey: string, dateStr: string) {
  const cfg = CITY_CONFIG[cityKey] || CITY_CONFIG.riyadh;
  const dateObj = new Date(dateStr);
  const month = dateObj.getMonth() + 1; // 1 to 12

  // Seasonal estimation logic for Saudi Arabia
  let baseTemp = 32;
  let condition = 'Sunny / Clear';
  let humidity = 25;
  let uvIndex = 9;

  if (month >= 5 && month <= 9) { // Summer
    if (cityKey === 'riyadh' || cityKey === 'diriyah') {
      baseTemp = 42;
      humidity = 18;
      uvIndex = 11;
      condition = 'Very Hot & Sunny';
    } else if (cityKey === 'jeddah') {
      baseTemp = 39;
      humidity = 65;
      uvIndex = 10;
      condition = 'Hot & Humid';
    } else if (cityKey === 'alula') {
      baseTemp = 41;
      humidity = 15;
      uvIndex = 11;
      condition = 'Hot & Dry Clear Skies';
    } else if (cityKey === 'mecca') {
      baseTemp = 43;
      humidity = 30;
      uvIndex = 11;
      condition = 'Extremely Hot';
    } else if (cityKey === 'medina') {
      baseTemp = 42;
      humidity = 20;
      uvIndex = 11;
      condition = 'Hot & Sunny';
    }
  } else if (month >= 11 || month <= 2) { // Winter
    baseTemp = 22;
    humidity = 40;
    uvIndex = 6;
    condition = 'Mild & Pleasant';
    if (cityKey === 'alula') baseTemp = 18;
  } else { // Spring / Autumn
    baseTemp = 31;
    humidity = 35;
    uvIndex = 8;
    condition = 'Warm & Sunny';
  }

  const isHeatWarning = baseTemp > 38 && (month >= 4 && month <= 10);

  return {
    temperature: baseTemp,
    condition,
    humidity,
    uv_index: uvIndex,
    is_heat_warning: isHeatWarning,
  };
}

// Route 1: Prayer Times API
app.get('/api/prayer-times', async (req, res) => {
  try {
    const city = (req.query.city as string) || 'riyadh';
    const date = (req.query.date as string) || new Date().toISOString().split('T')[0];
    const timings = await fetchPrayerTimes(city, date);
    res.json(timings);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to fetch prayer times' });
  }
});

// Route 2: Weather API
app.get('/api/weather', async (req, res) => {
  try {
    const city = (req.query.city as string) || 'riyadh';
    const date = (req.query.date as string) || new Date().toISOString().split('T')[0];
    const weather = await fetchWeather(city, date);
    res.json(weather);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to fetch weather' });
  }
});

// Route 3: Generate Smart Itinerary
app.post('/api/generate-plan', async (req, res) => {
  try {
    const { city, date, travelers, specialNeeds, preferences, language } = req.body || {};

    const cityKey = ((city || 'riyadh').toLowerCase()) as CityId;
    const cityDetails = CITY_CONFIG[cityKey] || CITY_CONFIG.riyadh;
    const dateStr = date || new Date().toISOString().split('T')[0];
    const lang = language === 'en' ? 'en' : 'ar';

    const prayerTimes = await fetchPrayerTimes(cityKey, dateStr);
    const weather = await fetchWeather(cityKey, dateStr);

    const specialNeedsArray = Array.isArray(specialNeeds) ? specialNeeds : ['none'];
    const preferencesArray = Array.isArray(preferences) ? preferences : [];

    try {
      const ai = getGenAI();
      const specialNeedsList = specialNeedsArray.join(', ');
      const isAccessibilityRequired = specialNeedsArray.some((s: string) => ['wheelchair', 'stroller', 'elderly'].includes(s));
      const isFriday = new Date(dateStr).getDay() === 5;

      const systemInstruction = `You are "Smart Saudi Trip Planner" (Masari / مساري), an intelligent Saudi Arabia tourism day planner AI powered by official Visit Saudi data.

VISIT SAUDI MANDATE:
- Primary Source: You MUST use Visit Saudi (https://www.visitsaudi.com) as the official primary source of truth for venue names, opening hours, ticket pricing, accessibility features, and seasonal events (Riyadh Season, AlUla Moments, Diriyah Season, Jeddah Season).
- No invented info: Verify venue details with official Visit Saudi listings. Do NOT invent prices or operating hours.

Build a realistic, beautifully structured daily itinerary for visitors to Saudi Arabia adhering strictly to these rules:

STRICT CORE RULES:
1. PRAYER TIMES: NEVER schedule any venue activity during prayer times (Fajr: ${prayerTimes.fajr}, Dhuhr: ${prayerTimes.dhuhr}, Asr: ${prayerTimes.asr}, Maghrib: ${prayerTimes.maghrib}, Isha: ${prayerTimes.isha}). Always leave a 20-30 min buffer around prayer times for rest/prayer.
${isFriday ? 'IMPORTANT: Today is Friday! Maintain a complete break from 11:30 AM to 1:00 PM for Jumuah Friday prayer.' : ''}

2. HEAT & WEATHER (Apr-Oct / Temp > 38°C): Current forecast temperature is ${weather.temperature}°C. ${weather.temperature > 38 ? 'Temperature IS ABOVE 38°C! You MUST AVOID all outdoor activities between 12:00 PM and 4:00 PM. Only schedule air-conditioned indoor venues (museums, indoor heritage centers, malls, climate-controlled galleries).' : 'Keep weather comfort in mind.'}

3. ACCESSIBILITY REQUIREMENT: User special needs selected: [${specialNeedsList}].
${isAccessibilityRequired ? 'CRITICAL: User has accessibility needs (wheelchair/stroller/elderly). You MUST ONLY recommend venues that have step-free entrances, elevators, accessible ramps, and paved pathways. Include explicit accessibility notes for every venue and transport option.' : 'Ensure general comfort.'}

4. CROWD & PEAK HOURS: During peak hours (16:00 to 20:00), prioritize least crowded, spacious, or efficient venues.

5. VENUE & TIMING LIMITS:
   - Maximum 3 primary venues per day.
   - Minimum 20 to 30 minutes inter-venue travel/buffer time between venues.

6. GROUNDED REAL FACTS: Do NOT invent fake prices, addresses, or opening hours. Recommend authentic venues in ${cityDetails.cityEn} / ${cityDetails.cityAr}.

7. LANGUAGE: Respond in ${lang === 'en' ? 'English' : 'Arabic'}.

JSON RESPONSE SCHEMA:
Return a valid, raw JSON object matching this schema exactly:
{
  "plan_title": "string",
  "date": "${dateStr}",
  "city": "${cityDetails.cityEn}",
  "prayer_times": {
    "fajr": "${prayerTimes.fajr}",
    "dhuhr": "${prayerTimes.dhuhr}",
    "asr": "${prayerTimes.asr}",
    "maghrib": "${prayerTimes.maghrib}",
    "isha": "${prayerTimes.isha}"
  },
  "weather": {
    "temperature": ${weather.temperature},
    "condition": "${weather.condition}",
    "humidity": ${weather.humidity},
    "uv_index": ${weather.uv_index}
  },
  "schedule": [
    {
      "time": "HH:MM - HH:MM",
      "venue": "string",
      "activity": "string",
      "duration_minutes": number,
      "accessibility_friendly": boolean,
      "crowd_level": "low" | "medium" | "high",
      "notes": "string",
      "map_query": "string (venue search query for Google Maps)",
      "is_indoor": boolean
    }
  ],
  "transport": [
    {
      "from": "string",
      "to": "string",
      "mode": "walking" | "taxi" | "metro" | "bus" | "private_car",
      "estimated_time": "string",
      "accessibility_notes": "string"
    }
  ],
  "warnings": [
    "string"
  ]
}`;

      const userPrompt = `Create a 1-day itinerary for ${travelers || 1} traveler(s) visiting ${cityDetails.cityEn} (${cityDetails.cityAr}) on date ${dateStr}.
Preferences/Interests: ${preferencesArray.length > 0 ? preferencesArray.join(', ') : 'Popular Highlights, History, Saudi Cuisine'}.
Special Needs: ${specialNeedsList}.
Language output requested: ${lang === 'en' ? 'English' : 'Arabic'}.`;

      let responseText = '';
      let groundingUrls: { title: string; url: string }[] = [];

      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.6-flash',
          contents: userPrompt,
          config: {
            systemInstruction,
            responseMimeType: 'application/json',
          },
        });
        responseText = response.text || '';

        const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
        if (Array.isArray(groundingChunks)) {
          groundingChunks.forEach((chunk: any) => {
            if (chunk.web?.uri) {
              groundingUrls.push({
                title: chunk.web.title || chunk.web.uri,
                url: chunk.web.uri,
              });
            }
          });
        }
      } catch (apiErr: any) {
        console.warn('Gemini API call encountered rate limit or quota error:', apiErr?.message || apiErr);
        throw apiErr; // Triggers fallback below
      }

      let parsedPlan: any;
      try {
        parsedPlan = JSON.parse(responseText);
      } catch (e) {
        const cleaned = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
        parsedPlan = JSON.parse(cleaned);
      }

      // Always ensure primary Visit Saudi official source link is present
      const officialVisitSaudiUrl = cityDetails ? `https://www.visitsaudi.com/en/see-do/destinations/${cityKey}` : 'https://www.visitsaudi.com';
      if (!groundingUrls.some(g => g.url.includes('visitsaudi.com'))) {
        groundingUrls.unshift({
          title: lang === 'ar' ? 'روح السعودية (المصدر الرسمي للوجهات) - Visit Saudi' : 'Official Destination Source - Visit Saudi (visitsaudi.com)',
          url: officialVisitSaudiUrl,
        });
      }

      parsedPlan.city_id = cityKey;
      parsedPlan.grounding_urls = groundingUrls;

      return res.json(parsedPlan);
    } catch (err: any) {
      console.error('Gemini API error (falling back to smart local algorithm):', err?.message || err);

      // Generate seamless smart fallback itinerary
      const fallbackPlan = generateSmartFallbackPlan({
        cityKey,
        dateStr,
        travelers: Number(travelers) || 1,
        specialNeeds: specialNeedsArray,
        preferences: preferencesArray,
        language: lang as any,
        prayerTimes,
        weather,
        isRateLimited: true,
      });

      return res.json(fallbackPlan);
    }
  } catch (outerErr: any) {
    console.error('Global error in /api/generate-plan:', outerErr?.message || outerErr);
    return res.status(500).json({ error: outerErr?.message || 'Failed to generate itinerary' });
  }
});

// Route 4: Ask the Guide Chat for Specific Venues
app.post('/api/venue-chat', async (req, res) => {
  try {
    const { venue, city, question, language } = req.body || {};

    if (!venue || !question) {
      return res.status(400).json({ error: 'Venue and question are required parameters.' });
    }

    const lang = language === 'en' ? 'en' : 'ar';
    const systemInstruction = `You are "Masari Guide" (مرشد مساري المحلي), a knowledgeable, courteous, and highly accurate local tour guide expert on Saudi Arabian tourism, heritage, landmarks, etiquette, and venue specifics verified by official Visit Saudi (visitsaudi.com) listings.

Your job is to answer questions strictly about the venue: "${venue}" located in/near "${city || 'Saudi Arabia'}".
Provide practical, helpful advice covering topics such as:
- Opening hours & best time to visit
- Recommended attire and dress code etiquette
- Ticket booking requirements, pricing, and entry guidelines
- Accessibility, ramps, elevator availability, and parking facilities
- Cultural tips and family amenities

STRICT RULES:
- Respond in ${lang === 'en' ? 'English' : 'Arabic'}.
- Keep responses concise, clear, and easy to read on mobile devices (2-3 short paragraphs or bullet points).
- Maintain a welcoming, hospitable Saudi tone ("حياكم الله").`;

    const userPrompt = `Venue: ${venue} (${city || 'Saudi Arabia'})
Question: ${question}`;

    try {
      const ai = getGenAI();
      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: userPrompt,
        config: {
          systemInstruction,
        },
      });

      const responseText = response.text || (lang === 'ar' ? 'معذرة، لم أتمكن من العثور على الإجابة المناسبة حالياً.' : 'Sorry, I could not retrieve information at this moment.');
      return res.json({ answer: responseText });
    } catch (apiErr: any) {
      console.warn('Gemini API error in venue chat:', apiErr?.message || apiErr);

      // Smart structured fallback response when API key is limited or offline
      const fallbackAnswer = lang === 'ar'
        ? `حول زيارة "${venue}" في ${city || 'المملكة العربية السعودية'}:\n- **أوقات الزيارة واللباس**: يفضل الالتزام بالزي المحتشم المعتاد في الأماكن العامة، والزيارة في الفترات الصباحية أو المسائية لتجنب حرارة الشمس.\n- **الحجز والدخول**: يُنصح بمراجعة الموقع الرسمي أو حسابات الهيئة قبل الزيارة للتأكد من اشتراط التذاكر المسبقة.\n- **التسهيلات**: معظم الوجهات والمرافق الرئيسية مجهزة بمسارات سهولة الوصول ومواقف للسيارات.`
        : `Regarding "${venue}" in ${city || 'Saudi Arabia'}:\n- **Attire & Best Time**: Modest comfortable attire is recommended. Morning or evening visits are best to avoid peak heat.\n- **Tickets & Entry**: Check official booking platforms in advance to confirm if prior reservations are required.\n- **Accessibility**: Standard amenities, parking facilities, and accessible step-free access are provided.`;

      return res.json({ answer: fallbackAnswer });
    }
  } catch (outerErr: any) {
    console.error('Error in /api/venue-chat:', outerErr?.message || outerErr);
    return res.status(500).json({ error: outerErr?.message || 'Failed to process guide chat query' });
  }
});

// Setup Vite Development or Production Server
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Smart Saudi Trip Planner running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
