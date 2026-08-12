export type Language = 'ar' | 'en';

export type CityId = 'riyadh' | 'jeddah' | 'mecca' | 'medina' | 'alula' | 'diriyah';

export interface CityInfo {
  id: CityId;
  nameAr: string;
  nameEn: string;
  regionAr: string;
  regionEn: string;
  lat: number;
  lng: number;
  descriptionAr: string;
  descriptionEn: string;
  image: string;
  popularVenuesAr: string[];
  popularVenuesEn: string[];
  verifiedByVisitSaudi?: boolean;
  officialSourceUrl?: string;
}

export type SpecialNeed = 'wheelchair' | 'stroller' | 'elderly' | 'none';

export interface PrayerTimes {
  fajr: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  sunrise?: string;
  sunset?: string;
}

export interface WeatherInfo {
  temperature: number; // Celsius
  condition: string;
  humidity: number; // %
  uv_index: number;
  is_heat_warning?: boolean;
}

export type CrowdLevel = 'low' | 'medium' | 'high';

export type TransportMode = 'walking' | 'taxi' | 'metro' | 'bus' | 'private_car';

export interface ScheduleItem {
  time: string;
  venue: string;
  activity: string;
  duration_minutes: number;
  accessibility_friendly: boolean;
  crowd_level: CrowdLevel;
  notes: string;
  map_query?: string;
  is_indoor?: boolean;
  verified_by_visit_saudi?: boolean;
}

export interface TransportItem {
  from: string;
  to: string;
  mode: TransportMode;
  estimated_time: string;
  accessibility_notes: string;
}

export interface DayPlan {
  plan_title: string;
  date: string;
  hijri_date?: string;
  city: string;
  city_id: CityId;
  prayer_times: PrayerTimes;
  weather: WeatherInfo;
  schedule: ScheduleItem[];
  transport: TransportItem[];
  warnings: string[];
  grounding_urls?: { title: string; url: string }[];
}

export interface PlanRequest {
  city: CityId;
  date: string; // YYYY-MM-DD
  travelers: number;
  specialNeeds: SpecialNeed[];
  preferences: string[];
  language: Language;
}
