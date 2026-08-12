import React, { useState } from 'react';
import { Language, ScheduleItem, TransportItem, DayPlan } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { VenueChat } from './VenueChat';
import {
  Clock,
  MapPin,
  Building2,
  Users,
  Accessibility,
  ExternalLink,
  Car,
  Footprints,
  Train,
  Bus,
  Sparkles,
  ShieldCheck,
  Navigation,
  Compass,
  Bot,
} from 'lucide-react';

interface TimelineViewProps {
  plan: DayPlan;
  language: Language;
}

export const TimelineView: React.FC<TimelineViewProps> = ({ plan, language }) => {
  const t = TRANSLATIONS[language];
  const [activeChatIndex, setActiveChatIndex] = useState<number | null>(null);

  const getTransportIcon = (mode: string) => {
    switch (mode) {
      case 'walking':
        return Footprints;
      case 'metro':
        return Train;
      case 'bus':
        return Bus;
      case 'taxi':
      case 'private_car':
      default:
        return Car;
    }
  };

  const getCrowdBadge = (level: string) => {
    switch (level) {
      case 'low':
        return {
          label: t.crowd_low,
          bg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        };
      case 'medium':
        return {
          label: t.crowd_med,
          bg: 'bg-amber-100 text-amber-900 border-amber-300',
        };
      case 'high':
      default:
        return {
          label: t.crowd_high,
          bg: 'bg-purple-100 text-purple-900 border-purple-300',
        };
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-xl sm:text-2xl font-bold text-emerald-950 flex items-center gap-2">
          <Compass className="w-6 h-6 text-amber-600" />
          <span>{t.schedule_timeline}</span>
        </h3>
        
        <div className="flex items-center gap-2 flex-wrap">
          <a
            href="https://www.visitsaudi.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-emerald-900 text-amber-300 font-bold border border-amber-400/60 shadow-xs hover:bg-emerald-800 transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.visit_saudi_badge || (language === 'ar' ? 'موثق من روح السعودية' : 'Verified by Visit Saudi')}</span>
          </a>

          <span className="text-xs px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
            {plan.schedule.length} {language === 'ar' ? 'وجهات رئيسية' : 'Venues Selected'}
          </span>
        </div>
      </div>

      <div className="relative border-r-2 sm:border-r-4 border-amber-500/30 mr-3 sm:mr-6 pr-4 sm:pr-8 space-y-8 rtl:border-r-2 rtl:sm:border-r-4 ltr:border-l-2 ltr:sm:border-l-4 ltr:ml-3 ltr:sm:ml-6 ltr:pl-4 ltr:sm:pl-8 ltr:border-r-0 ltr:pr-0">
        {plan.schedule.map((item: ScheduleItem, index: number) => {
          const transportItem: TransportItem | undefined = plan.transport[index];
          const crowdInfo = getCrowdBadge(item.crowd_level);

          return (
            <React.Fragment key={index}>
              {/* Venue Card */}
              <div className="relative group">
                {/* Timeline Node Point */}
                <div className="absolute top-5 -right-[23px] sm:-right-[39px] ltr:-left-[23px] ltr:sm:-left-[39px] w-8 h-8 rounded-full bg-emerald-800 text-amber-300 border-2 border-amber-400 flex items-center justify-center font-bold text-sm shadow-md group-hover:scale-110 transition-transform">
                  {index + 1}
                </div>

                <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-md hover:shadow-xl border border-stone-200 transition-all duration-300 relative overflow-hidden">
                  {/* Top Bar Indicator */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-3 mb-4">
                    <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm sm:text-base">
                      <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                      <span className="bg-amber-100 text-amber-900 px-3 py-1 rounded-lg border border-amber-300/60 font-mono tracking-tight">
                        {item.time}
                      </span>
                      <span className="text-xs text-stone-500">
                        ({item.duration_minutes} {t.minutes})
                      </span>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      {/* Crowd Badge */}
                      <span className={`text-xs px-2.5 py-0.5 rounded-full border font-semibold ${crowdInfo.bg}`}>
                        👥 {t.crowd_level}: {crowdInfo.label}
                      </span>

                      {/* Indoor AC Badge */}
                      {item.is_indoor !== false && (
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200 font-semibold">
                          ❄️ {t.indoor_ac}
                        </span>
                      )}

                      {/* Verified by Visit Saudi Badge */}
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-300 font-bold flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-amber-600 shrink-0" />
                        <span>{t.visit_saudi_badge || (language === 'ar' ? 'موثق من روح السعودية' : 'Verified by Visit Saudi')}</span>
                      </span>
                    </div>
                  </div>

                  {/* Title & Activity */}
                  <div className="mb-4">
                    <h4 className="text-lg sm:text-xl font-bold text-emerald-950 mb-1 flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-amber-600 shrink-0" />
                      <span>{item.venue}</span>
                    </h4>
                    <p className="text-stone-700 text-sm leading-relaxed font-medium mt-2">
                      {item.activity}
                    </p>
                  </div>

                  {/* Notes & Accessibility Guarantee */}
                  {item.notes && (
                    <div className="bg-stone-50 rounded-xl p-3 border border-stone-200 text-xs text-stone-600 mb-4">
                      💡 <span className="font-semibold">{item.notes}</span>
                    </div>
                  )}

                  {/* Accessibility Badge */}
                  {item.accessibility_friendly && (
                    <div className="flex items-center gap-2 text-xs font-semibold text-emerald-900 bg-emerald-50 border border-emerald-200/80 rounded-xl px-3 py-2 mb-4">
                      <Accessibility className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span>{t.accessible_guaranteed}</span>
                    </div>
                  )}

                  {/* Action Bar: Ask the Guide + Google Maps Directions */}
                  <div className="flex items-center justify-between gap-2 pt-3 border-t border-stone-100 flex-wrap">
                    <button
                      onClick={() => setActiveChatIndex(activeChatIndex === index ? null : index)}
                      className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-all border cursor-pointer ${
                        activeChatIndex === index
                          ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                          : 'bg-amber-50 text-amber-900 border-amber-300/80 hover:bg-amber-100'
                      }`}
                    >
                      <Bot className="w-3.5 h-3.5 text-amber-800 shrink-0" />
                      <span>{t.ask_guide || (language === 'ar' ? 'اسأل المرشد' : 'Ask Local Guide')}</span>
                      <Sparkles className="w-3 h-3 text-amber-600 opacity-80 animate-pulse" />
                    </button>

                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        item.map_query || `${item.venue} ${plan.city}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-100/80 hover:bg-emerald-200 px-3 py-1.5 rounded-lg transition-colors border border-emerald-300/60"
                    >
                      <MapPin className="w-3.5 h-3.5 text-amber-600" />
                      <span>{t.open_in_google_maps}</span>
                      <ExternalLink className="w-3 h-3 opacity-70" />
                    </a>
                  </div>

                  {/* Inline Venue Chat Panel */}
                  {activeChatIndex === index && (
                    <VenueChat
                      venue={item.venue}
                      cityName={plan.city}
                      language={language}
                      onClose={() => setActiveChatIndex(null)}
                    />
                  )}
                </div>
              </div>

              {/* Interleaved Transport & Prayer Break Segment */}
              {transportItem && index < plan.schedule.length - 1 && (
                <div className="my-6 pr-2 sm:pr-4">
                  {/* Transport Card */}
                  <div className="bg-stone-100/90 rounded-xl p-4 border border-stone-300/70 text-xs sm:text-sm text-stone-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-800 border border-amber-400/40 flex items-center justify-center shrink-0">
                        {React.createElement(getTransportIcon(transportItem.mode), {
                          className: 'w-5 h-5 text-amber-800',
                        })}
                      </div>
                      <div>
                        <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                          <span>{transportItem.from}</span>
                          <span className="text-stone-400">➔</span>
                          <span>{transportItem.to}</span>
                        </div>
                        <div className="text-xs text-stone-500 mt-0.5">
                          🚗 {t.est_travel_time}: <strong className="text-stone-800">{transportItem.estimated_time}</strong> ({t.min_travel_gap})
                        </div>
                      </div>
                    </div>

                    {transportItem.accessibility_notes && (
                      <div className="text-xs text-emerald-900 bg-emerald-50 border border-emerald-200 rounded-lg px-2.5 py-1 font-medium">
                        ♿ {transportItem.accessibility_notes}
                      </div>
                    )}
                  </div>

                  {/* Dedicated Golden Prayer Break Marker */}
                  <div className="mt-3 bg-gradient-to-r from-emerald-900 via-emerald-800 to-amber-900 text-amber-200 rounded-xl p-3 border border-amber-500/40 text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-sm">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>🕌 {t.prayer_pause}: {language === 'ar' ? 'استراحة صلاة وراحة مناداة الآذان' : 'Prayer Call & Comfort Buffer'}</span>
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
