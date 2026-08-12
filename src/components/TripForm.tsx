import React from 'react';
import { Language, CityId, SpecialNeed, PlanRequest } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { CITIES } from '../data/cities';
import { getHijriDate } from '../utils/hijri';
import { CityCard } from './CityCard';
import {
  MapPin,
  Calendar,
  Users,
  Accessibility,
  HeartHandshake,
  Sparkles,
  Check,
} from 'lucide-react';

interface TripFormProps {
  language: Language;
  onSubmit: (request: PlanRequest) => void;
  isLoading: boolean;
  initialValues?: Partial<PlanRequest>;
}

export const TripForm: React.FC<TripFormProps> = ({
  language,
  onSubmit,
  isLoading,
  initialValues,
}) => {
  const t = TRANSLATIONS[language];

  const todayStr = new Date().toISOString().split('T')[0];

  const [city, setCity] = React.useState<CityId>(initialValues?.city || 'riyadh');
  const [date, setDate] = React.useState<string>(initialValues?.date || todayStr);
  const [travelers, setTravelers] = React.useState<number>(initialValues?.travelers || 2);
  const [specialNeeds, setSpecialNeeds] = React.useState<SpecialNeed[]>(
    initialValues?.specialNeeds || ['none']
  );
  const [preferences, setPreferences] = React.useState<string[]>(
    initialValues?.preferences || ['pref_history', 'pref_food']
  );

  const hijriDateDisplay = React.useMemo(() => {
    return getHijriDate(date, language);
  }, [date, language]);

  const handleSpecialNeedToggle = (need: SpecialNeed) => {
    if (need === 'none') {
      setSpecialNeeds(['none']);
      return;
    }

    let updated = specialNeeds.filter((n) => n !== 'none');
    if (updated.includes(need)) {
      updated = updated.filter((n) => n !== need);
    } else {
      updated.push(need);
    }

    if (updated.length === 0) {
      updated = ['none'];
    }

    setSpecialNeeds(updated);
  };

  const handlePreferenceToggle = (prefKey: string) => {
    if (preferences.includes(prefKey)) {
      setPreferences(preferences.filter((p) => p !== prefKey));
    } else {
      setPreferences([...preferences, prefKey]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      city,
      date,
      travelers,
      specialNeeds,
      preferences: preferences.map((p) => t[p] || p),
      language,
    });
  };

  const cityKeys: CityId[] = ['riyadh', 'diriyah', 'jeddah', 'alula', 'mecca', 'medina'];

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-xl border border-amber-900/10 p-6 sm:p-8 transition-all relative overflow-hidden"
    >
      {/* Top Banner Accent */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-700 via-amber-500 to-emerald-800" />

      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-emerald-950 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-amber-500" />
          <span>{language === 'ar' ? 'صمّم رحلتك المثالية في المملكة' : 'Plan Your Saudi Itinerary'}</span>
        </h2>
        <p className="text-sm text-stone-600 mt-1">{t.tagline}</p>
      </div>

      {/* City Selector */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-emerald-950 mb-3 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-emerald-700" />
          <span>{t.select_city}</span>
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-3">
          {cityKeys.map((cKey) => {
            const isSelected = city === cKey;
            return (
              <CityCard
                key={cKey}
                cityId={cKey}
                isSelected={isSelected}
                onClick={() => setCity(cKey)}
              />
            );
          })}
        </div>
      </div>

      {/* Date & Travelers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        {/* Date Selector */}
        <div>
          <label className="block text-sm font-semibold text-emerald-950 mb-2 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-700" />
            <span>{t.select_date}</span>
          </label>
          <div className="relative">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={todayStr}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 text-stone-800 font-medium bg-stone-50/50"
            />
          </div>
          {hijriDateDisplay && (
            <div className="mt-2 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200/80 rounded-lg px-3 py-1.5 inline-flex items-center gap-1.5">
              <span>📅 {language === 'ar' ? 'التاريخ الهجري المتوقع:' : 'Hijri Date:'}</span>
              <span className="font-bold text-emerald-900">{hijriDateDisplay}</span>
            </div>
          )}
        </div>

        {/* Travelers Count */}
        <div>
          <label className="block text-sm font-semibold text-emerald-950 mb-2 flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-700" />
            <span>{t.travelers_count}</span>
          </label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setTravelers(Math.max(1, travelers - 1))}
              className="w-10 h-10 rounded-xl bg-stone-100 hover:bg-stone-200 border border-stone-300 flex items-center justify-center font-bold text-lg text-emerald-950 transition-colors"
            >
              -
            </button>
            <div className="flex-1 text-center py-2 bg-stone-50 rounded-xl border border-stone-200 font-bold text-emerald-950">
              {travelers} {travelers === 1 ? t.person : t.persons}
            </div>
            <button
              type="button"
              onClick={() => setTravelers(Math.min(20, travelers + 1))}
              className="w-10 h-10 rounded-xl bg-stone-100 hover:bg-stone-200 border border-stone-300 flex items-center justify-center font-bold text-lg text-emerald-950 transition-colors"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Special Needs Checkboxes (Accessibility) */}
      <div className="mb-6 p-4 rounded-xl bg-stone-50 border border-stone-200">
        <label className="block text-sm font-bold text-emerald-950 mb-2 flex items-center gap-2">
          <Accessibility className="w-5 h-5 text-emerald-700" />
          <span>{t.special_needs}</span>
        </label>
        <p className="text-xs text-stone-500 mb-3">
          {language === 'ar'
            ? 'عند تحديد أي خيار، يتم حظر جميع الأماكن غير المهيئة وضمان مسارات خالية من الدرج ومعابر مخصصة.'
            : 'Selecting accessibility filters ensures step-free paths, elevators, ramps, and accessible venues only.'}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {[
            { id: 'wheelchair', label: t.wheelchair, icon: '♿' },
            { id: 'stroller', label: t.stroller, icon: '👶' },
            { id: 'elderly', label: t.elderly, icon: '👴' },
            { id: 'none', label: t.none_needs, icon: '⚡' },
          ].map((item) => {
            const isChecked = specialNeeds.includes(item.id as SpecialNeed);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSpecialNeedToggle(item.id as SpecialNeed)}
                className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all ${
                  isChecked
                    ? 'bg-emerald-800 text-white border-emerald-800 shadow-sm'
                    : 'bg-white text-stone-700 border-stone-200 hover:border-emerald-600'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Preferences / Activity Interests */}
      <div className="mb-8">
        <label className="block text-sm font-bold text-emerald-950 mb-2 flex items-center gap-2">
          <HeartHandshake className="w-4 h-4 text-emerald-700" />
          <span>{t.preferences_title}</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'pref_history', label: t.pref_history },
            { id: 'pref_food', label: t.pref_food },
            { id: 'pref_nature', label: t.pref_nature },
            { id: 'pref_shopping', label: t.pref_shopping },
            { id: 'pref_family', label: t.pref_family },
          ].map((pref) => {
            const isSelected = preferences.includes(pref.id);
            return (
              <button
                key={pref.id}
                type="button"
                onClick={() => handlePreferenceToggle(pref.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  isSelected
                    ? 'bg-amber-500/20 text-amber-900 border-amber-600/60 font-bold'
                    : 'bg-stone-100 text-stone-600 border-stone-200 hover:bg-stone-200'
                }`}
              >
                {pref.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-emerald-800 via-emerald-700 to-amber-700 hover:from-emerald-900 hover:to-amber-800 text-amber-100 font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 border border-amber-400/30 disabled:opacity-75 disabled:cursor-not-allowed group"
      >
        {isLoading ? (
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border-3 border-amber-400 border-t-transparent rounded-full animate-spin" />
            <span className="animate-pulse">{t.generating}</span>
          </div>
        ) : (
          <>
            <Sparkles className="w-6 h-6 text-amber-300 group-hover:rotate-12 transition-transform" />
            <span>{t.generate_btn}</span>
          </>
        )}
      </button>
    </form>
  );
};
