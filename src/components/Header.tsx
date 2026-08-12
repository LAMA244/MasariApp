import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { Globe, Printer, Compass, Share2, Check, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onPrint: () => void;
  onOpenPresets?: () => void;
  hasPlan?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  onPrint,
  onOpenPresets,
  hasPlan,
}) => {
  const t = TRANSLATIONS[language];
  const [copied, setCopied] = React.useState(false);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Masari - Daily Trip Planner',
          text: t.app_subtitle,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // ignore
    }
  };

  return (
    <header className="bg-emerald-950 text-amber-50 border-b border-amber-600/30 sticky top-0 z-40 shadow-lg backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand & Logo */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-600 to-amber-500 p-0.5 shadow-md flex items-center justify-center">
            <div className="w-full h-full bg-emerald-900 rounded-[10px] flex items-center justify-center text-amber-400 font-bold text-xl tracking-tight">
              🌴
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-amber-400 tracking-wide font-sans">
                {language === 'ar' ? 'مَسَارِي' : 'MASARI'}
              </h1>
              <a
                href="https://www.visitsaudi.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden xs:inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold text-amber-300 bg-emerald-900/90 hover:bg-emerald-800 px-2 py-0.5 rounded-full border border-amber-400/40 transition-colors"
                title={t.visit_saudi_source_notice}
              >
                <ShieldCheck className="w-3 h-3 text-amber-400 shrink-0" />
                <span>{language === 'ar' ? 'موثق من روح السعودية' : 'Verified by Visit Saudi'}</span>
              </a>
            </div>
            <p className="text-xs text-emerald-200/80 font-medium">
              {t.app_subtitle}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 flex-wrap justify-center sm:justify-end">
          {onOpenPresets && (
            <button
              onClick={onOpenPresets}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-900/80 hover:bg-emerald-800 text-emerald-100 text-xs sm:text-sm font-medium border border-emerald-700/60 transition-colors"
            >
              <Compass className="w-4 h-4 text-amber-400" />
              <span>{t.quick_presets}</span>
            </button>
          )}

          {hasPlan && (
            <>
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-900/80 hover:bg-emerald-800 text-emerald-100 text-xs sm:text-sm font-medium border border-emerald-700/60 transition-colors"
                title={t.share_plan}
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Share2 className="w-4 h-4 text-amber-400" />
                )}
                <span>{copied ? (language === 'ar' ? 'تم النسخ' : 'Copied') : t.share_plan}</span>
              </button>

              <button
                onClick={onPrint}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs sm:text-sm font-medium border border-amber-500/40 transition-colors"
              >
                <Printer className="w-4 h-4 text-amber-400" />
                <span>{t.print_plan}</span>
              </button>
            </>
          )}

          {/* Language Toggle */}
          <button
            onClick={() => onLanguageChange(language === 'ar' ? 'en' : 'ar')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-800/90 hover:bg-emerald-700 text-amber-300 text-xs sm:text-sm font-semibold border border-amber-500/40 transition-all shadow-sm"
          >
            <Globe className="w-4 h-4 text-amber-400" />
            <span>{language === 'ar' ? 'English' : 'العربية'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
