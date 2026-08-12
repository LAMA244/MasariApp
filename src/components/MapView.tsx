import React from 'react';
import { Language, ScheduleItem, DayPlan } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { MapPin, ExternalLink, Navigation, CheckCircle2, ShieldCheck } from 'lucide-react';

interface MapViewProps {
  plan: DayPlan;
  language: Language;
}

export const MapView: React.FC<MapViewProps> = ({ plan, language }) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="bg-stone-900 text-white rounded-2xl p-6 shadow-xl border border-stone-800">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg sm:text-xl font-bold text-amber-400 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-amber-500" />
          <span>{t.locations_map}</span>
        </h3>
        <span className="text-xs text-stone-400">{plan.city}</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {plan.schedule.map((item: ScheduleItem, index: number) => {
          const query = encodeURIComponent(item.map_query || `${item.venue} ${plan.city}`);
          return (
            <div
              key={index}
              className="bg-stone-800/90 rounded-xl p-4 border border-stone-700 hover:border-amber-500/50 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-stone-950 font-bold text-xs flex items-center justify-center shrink-0">
                    {index + 1}
                  </span>
                  <h4 className="font-bold text-sm text-amber-300 truncate">
                    {item.venue}
                  </h4>
                </div>
                <p className="text-xs text-stone-300 line-clamp-2 mb-3">
                  {item.activity}
                </p>
              </div>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${query}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-lg bg-emerald-900/80 hover:bg-emerald-800 text-amber-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-emerald-700/60"
              >
                <Navigation className="w-3.5 h-3.5 text-amber-400" />
                <span>{t.get_directions}</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};
