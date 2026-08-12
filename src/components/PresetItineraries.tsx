import React from 'react';
import { Language, CityId, PlanRequest } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { CITIES } from '../data/cities';
import { CityCard } from './CityCard';
import { ArrowRight, Compass } from 'lucide-react';

interface PresetItinerariesProps {
  language: Language;
  onSelectPreset: (preset: PlanRequest) => void;
}

export const PresetItineraries: React.FC<PresetItinerariesProps> = ({
  language,
  onSelectPreset,
}) => {
  const t = TRANSLATIONS[language];
  const todayStr = new Date().toISOString().split('T')[0];

  const presets = [
    {
      city: 'diriyah' as CityId,
      titleAr: 'تراث الدرعية وحي الطريف التاريخي',
      titleEn: 'Historic At-Turaif & Bujairi Terrace',
      descAr: 'حي الطريف الـ UNESCO مع مطل البجيري الراقي والتراث السعودي.',
      descEn: 'UNESCO World Heritage At-Turaif and fine dining at Bujairi.',
      preferences: [t.pref_history, t.pref_food],
    },
    {
      city: 'riyadh' as CityId,
      titleAr: 'الرياض: التاريخ وسكاي لاين العاصمة',
      titleEn: 'Riyadh Modern & Heritage Highlights',
      descAr: 'المتحف الوطني السعودي، سوق الزل القديم، وسكاي بريدج برج المملكة.',
      descEn: 'Saudi National Museum, Souq Al-Zal, and Kingdom Tower Sky Bridge.',
      preferences: [t.pref_history, t.pref_shopping],
    },
    {
      city: 'jeddah' as CityId,
      titleAr: 'عروس البحر الأحمر وبلد جدة',
      titleEn: 'Jeddah Historic Al-Balad & Waterfront',
      descAr: 'حي البلد التاريخي الـ UNESCO وواجهة جدة البحرية الخلابة.',
      descEn: 'UNESCO Al-Balad architecture and the Red Sea Corniche.',
      preferences: [t.pref_history, t.pref_nature],
    },
    {
      city: 'alula' as CityId,
      titleAr: 'عجائب العلا ومقابر الحجر',
      titleEn: 'AlUla Ancient Hegra & Elephant Rock',
      descAr: 'مقابر الحجر النبطية وصخرة الفيل ومبنى مرايا العالمي.',
      descEn: 'Ancient Nabataean Hegra tombs, Elephant Rock, and Maraya.',
      preferences: [t.pref_history, t.pref_nature],
    },
  ];

  return (
    <div className="bg-emerald-950 text-white rounded-2xl p-6 shadow-xl border border-amber-500/30">
      <div className="flex items-center gap-2 mb-4">
        <Compass className="w-5 h-5 text-amber-400" />
        <h3 className="font-bold text-lg text-amber-300">{t.quick_presets}</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {presets.map((preset, idx) => {
          const cityData = CITIES[preset.city];
          return (
            <button
              key={idx}
              onClick={() =>
                onSelectPreset({
                  city: preset.city,
                  date: todayStr,
                  travelers: 2,
                  specialNeeds: ['wheelchair'],
                  preferences: preset.preferences,
                  language,
                })
              }
              className="bg-emerald-900/80 hover:bg-emerald-800 border border-emerald-700/80 hover:border-amber-400 p-4 rounded-xl text-right rtl:text-right ltr:text-left transition-all duration-300 group flex gap-3 items-center justify-between"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-amber-400/30">
                  <CityCard cityId={preset.city} size="compact" as="div" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-sm text-amber-300 group-hover:text-amber-200 truncate">
                    {language === 'ar' ? preset.titleAr : preset.titleEn}
                  </h4>
                  <p className="text-xs text-emerald-200/80 line-clamp-1 mt-0.5">
                    {language === 'ar' ? preset.descAr : preset.descEn}
                  </p>
                </div>
              </div>

              <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 group-hover:bg-amber-500 group-hover:text-emerald-950 transition-colors">
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
