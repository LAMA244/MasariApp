import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { AlertTriangle, ShieldCheck, Thermometer, Clock } from 'lucide-react';

interface WarningBannerProps {
  warnings: string[];
  language: Language;
}

export const WarningBanner: React.FC<WarningBannerProps> = ({ warnings, language }) => {
  const t = TRANSLATIONS[language];

  if (!warnings || warnings.length === 0) return null;

  return (
    <div className="bg-amber-50 rounded-2xl p-5 border-2 border-amber-300 shadow-md">
      <div className="flex items-center gap-2 mb-3 text-amber-900 font-bold text-base">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
        <span>{t.warnings_title}</span>
      </div>

      <ul className="space-y-2">
        {warnings.map((warn, idx) => (
          <li
            key={idx}
            className="flex items-start gap-2.5 text-xs sm:text-sm text-amber-950 font-medium bg-amber-100/60 p-2.5 rounded-xl border border-amber-200/80"
          >
            <span className="text-amber-600 font-bold">•</span>
            <span>{warn}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
