# مُسَارِي | Masari — Smart Saudi Trip Planner

[**English**](#english) | [**العربية**](#العربية)

---

<a name="english"></a>
## 🌴 English Overview

### Project Name & Description
**مُسَارِي | Masari — Smart Saudi Trip Planner** is a dynamic, bilingual (Arabic & English) Saudi Arabian tourism itinerary planner. Designed for tourists and residents exploring key Saudi cities, Masari synthesizes real-time prayer schedules, extreme heat advisories, crowd density patterns, and accessibility needs into seamlessly structured single-day itineraries.

---

### 🚨 Problem Statement
Traveling across Saudi Arabia presents unique cultural and environmental factors that standard itinerary apps often ignore:
* **Prayer Schedules**: Establishments temporarily pause activity during prayer times (Fajr, Dhuhr, Asr, Maghrib, Isha). Failing to account for these times can lead to locked doors and missed reservations.
* **Extreme Weather & Heat**: Midday temperatures in regions like Riyadh or AlUla can reach high peaks, making outdoor walking hazardous or unpleasant.
* **Accessibility Needs**: Travelers with wheelchairs, strollers, or elderly companions require verified step-free access and minimal walking distances.
* **Crowd Spikes**: Popular spots (e.g., Boulevard City or historic Al-Balad) experience distinct peak hours, requiring optimized timing to avoid traffic bottlenecks.

---

### ✨ Key Features
* 🇸🇦 **Native Bilingual UI**: Seamless one-click toggle between Arabic (RTL) and English (LTR).
* 🇸🇦 **Verified by Visit Saudi (روح السعودية)**: All venue names, operating hours, price ranges, accessibility options, and seasonal festival calendars are strictly cross-checked with official `visitsaudi.com` listings.
* 🕌 **Prayer-Aware Routing**: Automatically embeds buffer times for congregational prayers and mosque visits, ensuring activities don't overlap with prayer closures.
* ☀️ **Heat Adaptive Engine**: Intelligently schedules outdoor sightseeing during cooler morning/evening hours and routes indoor air-conditioned activities during peak afternoon heat.
* ♿ **Accessibility & Mobility Filters**: Tailors routes specifically for wheelchair users, families with strollers, and elderly travelers.
* 👥 **Crowd & Timing Optimization**: Balances high-traffic cultural attractions with low-density relaxation spots.
* 🗺️ **Integrated Map & Directions**: Direct links to Google Maps coordinates for each recommended venue.
* 🤖 **"Ask the Guide" Interactive Assistant**: Embedded AI chat panel on every venue card allowing users to ask venue-specific questions regarding dress code, tickets, best visiting hours, accessibility, and parking.

---

### ⚙️ How It Works
1. **Real-time Context Assembly**: When a trip request is submitted, the server fetches live prayer schedules via the **Aladhan API** and accurate weather forecasts via the **OpenWeatherMap API**.
2. **Gemini 3.6 Flash Engine**: The combined constraints (travelers, city, date, special needs, weather, and prayer times) are passed to **Gemini 3.6 Flash** powered by **Google AI Studio**.
3. **Structured JSON Output**: The AI produces a strictly typed JSON object conforming to a predefined schema, guaranteeing valid timeline events, category tags, and duration estimates.
4. **Google Search & Maps Grounding**: Integrates grounding citations for real-world landmark verification.

---

### 🛠️ Tech Stack
* **Platform & AI**: Google AI Studio, Gemini 3.6 Flash Model
* **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide React, Motion
* **Backend**: Express.js (Node.js runtime server)
* **APIs**: Aladhan Prayer Times API, OpenWeatherMap API, Google Search & Maps Grounding

---

### 📸 Screenshots
*(Add screenshot image links here)*

| 1. Trip Configuration | 2. Daily Itinerary Output | 3. Prayer & Weather Insights |
|:---:|:---:|:---:|
| ![Trip Form Placeholder](https://via.placeholder.com/400x250?text=Trip+Form+Config) | ![Itinerary Output Placeholder](https://via.placeholder.com/400x250?text=Daily+Timeline) | ![Prayer & Weather Card Placeholder](https://via.placeholder.com/400x250?text=Prayer+%26+Weather) |

---

### 🌐 Live Demo
* **Live Application URL**: [https://ais-pre-nlmrasum6hex2lug6bq2zt-172681256880.europe-west2.run.app](https://ais-pre-nlmrasum6hex2lug6bq2zt-172681256880.europe-west2.run.app)

---

### 🔮 Future Improvements
* 🔐 **Firebase Authentication & Saved Itineraries**: User accounts to bookmark, export, and share past trips.
* 🚦 **Real-time Live Traffic & Crowd Integration**: Integration with live foot-traffic APIs to suggest real-time rerouting.
* 🏙️ **Expanded Saudi Destinations**: Inclusion of emerging Vision 2030 destinations (e.g., NEOM, Red Sea Project, Diriyah season events).

---

<br />

---

<a name="العربية"></a>
## 🌴 نظرة عامة باللغة العربية

### اسم المشروع والوصف
**مُسَارِي | Masari — Smart Saudi Trip Planner** هو تطبيق تفاعلي ثنائي اللغة (العربية والإنجليزية) لتخطيط الرحلات السياحية اليومية في المملكة العربية السعودية. يُساعد التطبيق الزوار والمقيمين على الاستمتاع بأفضل تجربة سياحية من خلال مراعاة أوقات الصلاة الرسمية، تجنب درجات الحرارة المرتفعة، ومراعاة متطلبات الوصول الشامل والكثافة الجماهيرية.

---

### 🚨 بيان المشكلة
تتميز السياحة في المملكة العربية السعودية بخصائص ثقافية وبيئية فريدة لا تأخذها التطبيقات التقليدية بعين الاعتبار:
* **توقيت الصلوات**: الإغلاق المؤقت للمتاجر والأنشطة أثناء أوقات الصلاة (الفجر، الظهر، العصر، المغرب، العشاء).
* **الطقس والحرارة الشديدة**: ارتفاع درجات الحرارة في فترة الظهيرة مما يتطلب تنظيم الأنشطة الخارجية في الصباح الباكر أو المساء.
* **متطلبات الوصول الشامل**: حاجة مستخدمي الكراسي المتحركة وكبار السن والعائلات مع عربات الأطفال إلى مسارات مجهزة.
* **الازدحام وأوقات الذروة**: تنظيم زيارة الوجهات الأكثر إقبالاً في أوقات متوازنة لتجنب الاختناقات المرورية.

---

### ✨ المميزات الرئيسية
* 🇸🇦 **واجهة ثنائية اللغة كاملة**: دعم سلس ومباشر للغتين العربية (RTL) والإنجليزية (LTR).
* 🇸🇦 **بيانات موثقة رسمياً من روح السعودية**: اعتماد موقع `visitsaudi.com` كمصدر رئيسي وموثق لجميع أسماء المعالم، أوقات العمل، أسعار التذاكر، خيارات الوصول الشامل، والفعاليات الموسمية.
* 🕌 **تنظيم الجدول وفقاً لأوقات الصلاة**: إدراج أوقات الصلاة والراحة تلقائياً في الجدول وتفادي تعارض المواعيد.
* ☀️ **تكيّف ذكي مع الطقس**: توجيه الأنشطة الخارجية للأوقات المعتدلة والأنشطة المغلقة والمكيفة وقت الظهيرة.
* ♿ **دعم الوصول الشامل**: خيارات مخصصة لذوي الإعاقة الحركية وكبار السن والعائلات.
* 👥 **إدارة الازدحام والتوقيت**: توزيع الأنشطة على مدار اليوم بشكل متوازن ومريح.
* 🗺️ **خرائط وإرشادات مدمجة**: روابط مباشرة لمواقع الفعاليات والمعالم عبر خرائط جوجل.
* 🤖 **ميزة "اسأل المرشد" التفاعلية**: لوحة محادثة فورية مدمجة في كل بطاقة مكان للإجابة على الاستفسارات الخاصة باللباس، التذاكر، أوقات الزيارة، وسهولة الوصول.

---

### ⚙️ آلية العمل
1. **جمع البيانات الحية**: استدعاء أوقات الصلاة عبر **Aladhan API** وبيانات الطقس عبر **OpenWeatherMap API**.
2. **محرك Gemini 3.6 Flash**: معالجة تفضيلات الزائر والقيود عبر **Google AI Studio**.
3. **مخرجات JSON منظمة**: توليد جدول زمني دقيق ومنظم وفق هيكل بيانات محدد.
4. **توثيق المصادر عبر Google Search**: توثيق المعالم والوجهات السياحية الحقيقية مع روابط المصادر.

---

### 🛠️ التقنيات المستخدمة
* **الذكاء الاصطناعي والمنصة**: Google AI Studio, Gemini 3.6 Flash Model
* **الواجهة الأمامية**: React 19, TypeScript, Tailwind CSS v4, Lucide React, Motion
* **الخلفية**: Express.js (Node.js runtime server)
* **الواجهات البرمجية**: Aladhan Prayer Times API, OpenWeatherMap API, Google Search & Maps Grounding

---

### 📸 لقطات الشاشة
*(يمكن إضافة صور التطبيق هنا)*

| 1. إعدادات الرحلة | 2. الجدول اليومي | 3. الصلاة والطقس |
|:---:|:---:|:---:|
| ![نموذج الرحلة](https://via.placeholder.com/400x250?text=Trip+Form+Config) | ![الجدول اليومي](https://via.placeholder.com/400x250?text=Daily+Timeline) | ![بطاقة الصلاة والطقس](https://via.placeholder.com/400x250?text=Prayer+%26+Weather) |

---

### <ctrl42> العرض المباشر
* **رابط التطبيق المباشر**: [https://ais-pre-nlmrasum6hex2lug6bq2zt-172681256880.europe-west2.run.app](https://ais-pre-nlmrasum6hex2lug6bq2zt-172681256880.europe-west2.run.app)

---

### 🔮 التحسينات المستقبلية
* 🔐 **تسجيل الدخول وحفظ الرحلات عبر Firebase**.
* 🚦 **تحديثات حية لحركة المرور والازدحام**.
* 🏙️ **إضافة المزيد من المدن والمشاريع السعودية الكبرى** (مثل نيوم، مشروع البحر الأحمر، وموسم الدرعية).
