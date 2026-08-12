import React from 'react';
import { CityId } from '../types';
import { Check, ShieldCheck } from 'lucide-react';

export const CITY_EMOJIS: Record<string, string> = {
  riyadh: '🏙️',
  mecca: '🕋',
  medina: '🕌',
  jeddah: '🌊',
  alula: '🏜️',
  diriyah: '🏛️',
};

export const CITY_NAMES_AR: Record<string, string> = {
  riyadh: 'الرياض',
  mecca: 'مكة',
  medina: 'المدينة',
  jeddah: 'جدة',
  alula: 'العلا',
  diriyah: 'الدرعية',
};

interface CityCardProps {
  cityId: CityId | string;
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
  size?: 'normal' | 'compact';
  as?: 'button' | 'div';
}

export const CityCard: React.FC<CityCardProps> = ({
  cityId,
  isSelected = false,
  onClick,
  className = '',
  size = 'normal',
  as,
}) => {
  const emoji = CITY_EMOJIS[cityId] || '🌴';
  const nameAr = CITY_NAMES_AR[cityId] || 'الرياض';

  const isCompact = size === 'compact';
  const Component = as || (onClick ? 'button' : 'div');

  return (
    <Component
      type={Component === 'button' ? 'button' : undefined}
      onClick={onClick}
      className={`relative w-full h-full min-h-[85px] rounded-xl overflow-hidden transition-all duration-300 flex flex-col items-center justify-center p-3 text-center cursor-pointer select-none border group ${
        isSelected
          ? 'border-[#C5A059] ring-2 ring-[#C5A059]/60 shadow-lg shadow-emerald-950/30 scale-[1.02]'
          : 'border-[#C5A059]/30 hover:border-[#C5A059] opacity-90 hover:opacity-100 hover:scale-[1.01]'
      } ${className}`}
      style={{
        background: 'linear-gradient(135deg, #006C35 0%, #004d25 50%, #C5A059 100%)',
      }}
    >
      {/* Selected Indicator Badge */}
      {isSelected && (
        <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-[#C5A059] text-emerald-950 flex items-center justify-center shadow-md z-10">
          <Check className="w-3.5 h-3.5 stroke-[3]" />
        </div>
      )}

      {/* Emoji Icon Centered Above Name */}
      <span
        className={`filter drop-shadow-md transition-transform group-hover:scale-110 mb-1 leading-none ${
          isCompact ? 'text-2xl' : 'text-3xl sm:text-4xl'
        }`}
      >
        {emoji}
      </span>

      {/* Large Arabic City Name in White Bold Text */}
      <span
        className={`text-white font-black tracking-wide drop-shadow-md ${
          isCompact ? 'text-xs' : 'text-base sm:text-lg'
        }`}
      >
        {nameAr}
      </span>

      {!isCompact && (
        <span className="mt-1 inline-flex items-center gap-1 text-[10px] text-amber-200/90 bg-emerald-950/40 px-2 py-0.5 rounded-full border border-amber-400/30">
          <ShieldCheck className="w-2.5 h-2.5 text-amber-300 shrink-0" />
          <span>روح السعودية</span>
        </span>
      )}
    </Component>
  );
};
