import React from 'react';
import { Language, PrayerTimes } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { isFriday } from '../utils/hijri';
import { Sun, Moon, Clock, MoonStar, Sparkles } from 'lucide-react';

interface PrayerTimesCardProps {
  prayerTimes: PrayerTimes;
  cityName: string;
  language: Language;
  dateStr: string;
}

export const PrayerTimesCard: React.FC<PrayerTimesCardProps> = ({
  prayerTimes,
  cityName,
  language,
  dateStr,
}) => {
  const t = TRANSLATIONS[language];
  const isFridayToday = isFriday(dateStr);

  const prayers = [
    { key: 'fajr', label: t.fajr, time: prayerTimes.fajr, icon: MoonStar },
    { key: 'dhuhr', label: t.dhuhr, time: prayerTimes.dhuhr, icon: Sun },
    { key: 'asr', label: t.asr, time: prayerTimes.asr, icon: Sun },
    { key: 'maghrib', label: t.maghrib, time: prayerTimes.maghrib, icon: Moon },
    { key: 'isha', label: t.isha, time: prayerTimes.isha, icon: MoonStar },
  ];

  return (
    <div className="bg-emerald-950 text-white rounded-2xl p-6 shadow-xl border border-amber-500/30 relative overflow-hidden">
      {/* Background Islamic Pattern Accent */}
      <div className="absolute top-0 right-0 -mr-12 -mt-12 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-amber-300">
              {t.prayer_times_title} {cityName}
            </h3>
            <p className="text-xs text-emerald-200/80">
              {language === 'ar' ? 'توقيت أم القرى الرسمي (ممنوع البرمجة خلال الصلاة)' : 'Official Umm al-Qura Timings'}
            </p>
          </div>
        </div>

        <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-900 border border-emerald-700 text-emerald-200 font-medium">
          🕌 {language === 'ar' ? 'محتسبة في الجدول' : 'Synced'}
        </span>
      </div>

      {/* Friday Jumu'ah Callout */}
      {isFridayToday && (
        <div className="mb-4 p-3 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-200 text-xs sm:text-sm font-semibold flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
          <span>{t.jumuah_notice}</span>
        </div>
      )}

      {/* Prayers Row */}
      <div className="grid grid-cols-5 gap-2 sm:gap-3">
        {prayers.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.key}
              className="bg-emerald-900/80 border border-emerald-800/80 hover:border-amber-500/50 rounded-xl p-2.5 text-center transition-all group"
            >
              <Icon className="w-4 h-4 mx-auto mb-1 text-amber-400 group-hover:scale-110 transition-transform" />
              <div className="text-[11px] font-medium text-emerald-200">{item.label}</div>
              <div className="text-xs sm:text-sm font-black text-amber-300 tracking-wider mt-0.5">
                {item.time}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
