import React, { useState, useEffect } from 'react';
import { Language, PlanRequest, DayPlan } from './types';
import { TRANSLATIONS } from './data/translations';
import { Header } from './components/Header';
import { TripForm } from './components/TripForm';
import { PrayerTimesCard } from './components/PrayerTimesCard';
import { WeatherCard } from './components/WeatherCard';
import { WarningBanner } from './components/WarningBanner';
import { TimelineView } from './components/TimelineView';
import { MapView } from './components/MapView';
import { PresetItineraries } from './components/PresetItineraries';
import { formatGregorianDate, getHijriDate } from './utils/hijri';
import {
  Sparkles,
  MapPin,
  Calendar,
  Users,
  ShieldCheck,
  RefreshCw,
  ExternalLink,
  Compass,
  CheckCircle2,
  Heart,
} from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<Language>('ar');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [plan, setPlan] = useState<DayPlan | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPresets, setShowPresets] = useState<boolean>(false);

  const t = TRANSLATIONS[language];

  // Sync RTL / LTR HTML attribute
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const handleGeneratePlan = async (request: PlanRequest) => {
    setIsLoading(true);
    setError(null);
    setPlan(null);
    setShowPresets(false);

    try {
      const res = await fetch('/api/generate-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to generate itinerary');
      }

      const generatedPlan: DayPlan = await res.json();
      setPlan(generatedPlan);

      // Smooth scroll to output
      setTimeout(() => {
        const outputEl = document.getElementById('itinerary-output');
        if (outputEl) {
          outputEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } catch (err: any) {
      console.error('Plan generation failed:', err);
      setError(err.message || t.error_title);
      setPlan(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#F5F0E8] text-stone-900 flex flex-col font-sans selection:bg-amber-200">
      {/* Header */}
      <Header
        language={language}
        onLanguageChange={setLanguage}
        onPrint={handlePrint}
        onOpenPresets={() => setShowPresets(!showPresets)}
        hasPlan={!!plan}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Preset Drawer / Collapsible Section */}
        {showPresets && (
          <div className="no-print">
            <PresetItineraries
              language={language}
              onSelectPreset={(preset) => handleGeneratePlan(preset)}
            />
          </div>
        )}

        {/* Input Form Section */}
        <section className="no-print">
          <TripForm
            language={language}
            onSubmit={handleGeneratePlan}
            isLoading={isLoading}
          />
        </section>

        {/* Loading Spinner State Section */}
        {isLoading && (
          <div
            id="itinerary-loading"
            className="bg-white rounded-2xl p-8 sm:p-12 shadow-xl border border-amber-900/10 text-center space-y-4 no-print flex flex-col items-center justify-center min-h-[220px]"
          >
            <div className="w-14 h-14 border-4 border-amber-500 border-t-emerald-800 rounded-full animate-spin mx-auto" />
            <h3 className="text-xl sm:text-2xl font-bold text-emerald-950">
              {t.generating}
            </h3>
          </div>
        )}

        {/* Error Callout */}
        {!isLoading && error && (
          <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-6 text-red-900 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 no-print">
            <div>
              <h3 className="font-bold text-lg mb-1">{t.error_title}</h3>
              <p className="text-sm text-red-700">{error}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="px-4 py-2 rounded-xl bg-red-800 text-white font-bold text-sm hover:bg-red-900 transition-colors shrink-0 flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>{t.error_retry}</span>
            </button>
          </div>
        )}

        {/* Generated Itinerary Output Section - ONLY rendered AFTER all API calls succeed */}
        {!isLoading && !error && plan && (
          <section id="itinerary-output" className="space-y-8 print-area">
            {/* Itinerary Header Banner */}
            <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-amber-950 text-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-amber-500/40 relative overflow-hidden">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-amber-500/20 pb-6 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs border border-amber-500/30">
                      🌴 {t.app_title}
                    </span>
                    <span className="text-xs text-emerald-200">
                      {plan.city}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-amber-400">
                    {plan.plan_title}
                  </h2>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-semibold text-emerald-100 bg-emerald-900/60 p-3 rounded-xl border border-emerald-700/60">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-amber-400" />
                    <span>{formatGregorianDate(plan.date, language)}</span>
                  </div>
                  {getHijriDate(plan.date, language) && (
                    <div className="text-amber-300 font-bold border-r border-emerald-700 px-2 rtl:border-r rtl:border-l-0 ltr:border-l ltr:border-r-0">
                      {getHijriDate(plan.date, language)}
                    </div>
                  )}
                </div>
              </div>

              {/* Accessibility Active Guarantee Badge & Visit Saudi Official Verification Banner */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-emerald-900/80 border border-emerald-700 text-emerald-200 text-xs sm:text-sm p-3 rounded-xl flex items-center gap-2.5 font-medium">
                  <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>{t.accessibility_applied}</span>
                </div>

                <a
                  href="https://www.visitsaudi.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-900/90 hover:bg-emerald-800 border border-amber-400/50 text-amber-200 text-xs sm:text-sm p-3 rounded-xl flex items-center justify-between gap-2.5 font-medium transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
                    <span>{t.visit_saudi_source_notice}</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-amber-400 shrink-0" />
                </a>
              </div>
            </div>

            {/* Grid: Prayer Times + Weather */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PrayerTimesCard
                prayerTimes={plan.prayer_times}
                cityName={plan.city}
                language={language}
                dateStr={plan.date}
              />
              <WeatherCard weather={plan.weather} language={language} />
            </div>

            {/* Warning Banner */}
            {plan.warnings && plan.warnings.length > 0 && (
              <WarningBanner warnings={plan.warnings} language={language} />
            )}

            {/* Main Timeline View */}
            <div className="bg-stone-50/80 rounded-2xl p-6 sm:p-8 border border-stone-200/80 shadow-md">
              <TimelineView plan={plan} language={language} />
            </div>

            {/* Map Locations Grid */}
            <MapView plan={plan} language={language} />

            {/* Grounding Source Attribution (Google Search & Maps) */}
            {plan.grounding_urls && plan.grounding_urls.length > 0 && (
              <div className="bg-white rounded-xl p-4 border border-stone-200 text-xs text-stone-600 no-print">
                <div className="font-bold text-emerald-950 mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>{t.sources_grounding}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {plan.grounding_urls.slice(0, 5).map((g, i) => (
                    <a
                      key={i}
                      href={g.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-emerald-900 border border-stone-300 inline-flex items-center gap-1 transition-colors"
                    >
                      <span className="truncate max-w-[200px]">{g.title}</span>
                      <ExternalLink className="w-3 h-3 text-stone-400" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-emerald-950 text-amber-100/80 border-t border-amber-600/30 py-6 mt-12 no-print">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs space-y-2">
          <p className="font-bold text-amber-400 text-sm">
            {t.app_title} - {t.app_subtitle}
          </p>
          <p className="text-emerald-300/80">
            {language === 'ar'
              ? 'مصمم لتسهيل استكشاف معالم المملكة العربية السعودية الموثقة من روح السعودية (visitsaudi.com) مع الالتزام التام بأوقات الصلاة والطقس وإمكانية الوصول.'
              : 'Empowering seamless Saudi Arabia travel planning verified by Visit Saudi (visitsaudi.com) with prayer synchronization, heat advisories, and accessibility.'}
          </p>
          <p className="text-[11px] text-stone-400 pt-2 border-t border-emerald-900">
            © {new Date().getFullYear()} Masari | Powered by Google Gemini 3.6 Flash & AI Studio
          </p>
        </div>
      </footer>
    </div>
  );
}
