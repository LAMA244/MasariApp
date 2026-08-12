import React from 'react';
import { Language, WeatherInfo } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { Sun, Thermometer, Droplets, ShieldAlert, Zap } from 'lucide-react';

interface WeatherCardProps {
  weather: WeatherInfo;
  language: Language;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weather, language }) => {
  const t = TRANSLATIONS[language];
  const isExtremeHeat = weather.temperature > 38 || weather.is_heat_warning;

  return (
    <div
      className={`rounded-2xl p-6 shadow-xl border transition-all ${
        isExtremeHeat
          ? 'bg-amber-950/90 text-amber-50 border-amber-500/50'
          : 'bg-stone-900 text-white border-stone-800'
      }`}
    >
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center border ${
              isExtremeHeat
                ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
            }`}
          >
            <Thermometer className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-amber-300">{t.weather_title}</h3>
            <p className="text-xs text-stone-300">{weather.condition}</p>
          </div>
        </div>

        <div className="text-right">
          <div className="text-2xl sm:text-3xl font-black text-amber-400 font-sans">
            {weather.temperature}°C
          </div>
        </div>
      </div>

      {/* Heat Advisory Banner */}
      {isExtremeHeat && (
        <div className="mb-4 p-3 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 text-xs sm:text-sm font-semibold flex items-start gap-2.5">
          <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-red-300">{t.heat_warning_title}</div>
            <p className="text-xs text-red-200/90 mt-0.5">{t.heat_warning_desc}</p>
          </div>
        </div>
      )}

      {/* Weather Metrics Grid */}
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="bg-white/5 rounded-xl p-2.5 border border-white/10">
          <Thermometer className="w-4 h-4 mx-auto mb-1 text-amber-400" />
          <div className="text-[11px] text-stone-300">{t.temperature}</div>
          <div className="text-xs sm:text-sm font-bold text-white">{weather.temperature}°C</div>
        </div>

        <div className="bg-white/5 rounded-xl p-2.5 border border-white/10">
          <Droplets className="w-4 h-4 mx-auto mb-1 text-blue-400" />
          <div className="text-[11px] text-stone-300">{t.humidity}</div>
          <div className="text-xs sm:text-sm font-bold text-white">{weather.humidity}%</div>
        </div>

        <div className="bg-white/5 rounded-xl p-2.5 border border-white/10">
          <Sun className="w-4 h-4 mx-auto mb-1 text-amber-400" />
          <div className="text-[11px] text-stone-300">{t.uv_index}</div>
          <div className="text-xs sm:text-sm font-bold text-white">{weather.uv_index} / 12</div>
        </div>
      </div>
    </div>
  );
};
