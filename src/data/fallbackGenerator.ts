import { CityId, DayPlan, Language, PrayerTimes, WeatherInfo, ScheduleItem, TransportItem } from '../types';
import { CITIES } from './cities';
import { getHijriDate, isFriday } from '../utils/hijri';

interface GenerateFallbackParams {
  cityKey: CityId;
  dateStr: string;
  travelers: number;
  specialNeeds: string[];
  preferences: string[];
  language: Language;
  prayerTimes: PrayerTimes;
  weather: WeatherInfo;
  isRateLimited?: boolean;
}

export function generateSmartFallbackPlan(params: GenerateFallbackParams): DayPlan {
  const {
    cityKey,
    dateStr,
    travelers,
    specialNeeds,
    language,
    prayerTimes,
    weather,
    isRateLimited,
  } = params;

  const cityInfo = CITIES[cityKey] || CITIES.riyadh;
  const isAr = language === 'ar';
  const isFri = isFriday(dateStr);
  const isExtremeHeat = weather.temperature > 38;
  const isAccessible = specialNeeds.some((s) => ['wheelchair', 'stroller', 'elderly'].includes(s));

  const warnings: string[] = [];

  if (isRateLimited) {
    warnings.push(
      isAr
        ? 'ملاحظة: تم إعداد هذا الجدول الذكي تلقائياً وفق خوارزمية مساري المحلية لضمان استمرار الخدمة أثناء الضغط العالي على الخادم.'
        : 'Notice: This smart itinerary was generated via Masari fallback logic to maintain service continuity during peak AI traffic.'
    );
  }

  if (isFri) {
    warnings.push(
      isAr
        ? 'جمعة مباركة: تم إيقاف جميع الأنشطة الميدانية من 11:30 ص حتى 1:00 م لأداء صلاة الجمعة.'
        : 'Blessed Friday: All outdoor activities paused from 11:30 AM to 1:00 PM for Friday Jumuah prayer.'
    );
  }

  if (isExtremeHeat) {
    warnings.push(
      isAr
        ? `تنبيه الحرارة الشديدة (${weather.temperature}°م): تم تحويل الأنشطة بين 12:00 ظهراً و 4:00 عصراً إلى أماكن مغلقة ومكيفة بالكامل.`
        : `Extreme Heat Advisory (${weather.temperature}°C): Activities between 12:00 PM and 4:00 PM restricted to indoor air-conditioned venues.`
    );
  }

  if (isAccessible) {
    warnings.push(
      isAr
        ? 'معيار الوصول الشامل: جميع الوجهات المحددة تتضمن مسارات خالية من الدرج، مصاعد، ومنحدرات مهيأة.'
        : 'Universal Accessibility: All chosen venues guarantee step-free entrances, ramps, and elevator access.'
    );
  }

  let schedule: ScheduleItem[] = [];
  let transport: TransportItem[] = [];

  const cityName = isAr ? cityInfo.nameAr : cityInfo.nameEn;

  // City-specific tailored itineraries
  if (cityKey === 'diriyah') {
    schedule = [
      {
        time: '09:00 - 11:15',
        venue: isAr ? 'حي الطريف التاريخي (UNESCO)' : 'At-Turaif UNESCO World Heritage Site',
        activity: isAr
          ? 'جولة استكشافية قصيرة بين قصور الطريف الطينية ومتحف الدولة السعودية الأولى، مع الاستفادة من العربات الكهربائية المخصصة لكبار السن وذوي الاحتياجات.'
          : 'Guided exploration of mud-brick palaces and First Saudi State Museum with available electric cart mobility.',
        duration_minutes: 135,
        accessibility_friendly: true,
        crowd_level: 'low',
        notes: isAr
          ? 'الموقع مهيأ بالكامل بممرات حجرية مصقولة وعربات جولف مجانية عند المدخل الرئيسي.'
          : 'Paved pathways throughout with complimentary golf cart transfers at the main entrance.',
        map_query: 'At-Turaif World Heritage Site Diriyah',
        is_indoor: false,
      },
      {
        time: isFri ? '13:00 - 15:30' : '12:30 - 15:00',
        venue: isAr ? 'مطل البجيري الفاخر' : 'Bujairi Terrace Dining',
        activity: isAr
          ? 'تناول وجبة الغداء السعودية الفاخرة والاستراحة في قاعات مكيفة ومطلة مباشرة على وادي حنيفة وحي الطريف.'
          : 'Enjoy authentic Saudi lunch in air-conditioned indoor dining with direct views over At-Turaif.',
        duration_minutes: 150,
        accessibility_friendly: true,
        crowd_level: 'medium',
        notes: isAr
          ? 'استراحة صلاة الظهر والعصر متوفرة في المصليات الفسيحة المكيفة داخل مطل البجيري.'
          : 'Dhuhr prayer break and air-conditioned rest halls available on site.',
        map_query: 'Bujairi Terrace Diriyah',
        is_indoor: true,
      },
      {
        time: '17:00 - 19:30',
        venue: isAr ? 'حي البجيري التراثي وممشى الوادي' : 'Bujairi Heritage Walk & Valley Views',
        activity: isAr
          ? 'جولة مسائية هادئة في المتاجر التراثية والمقاهي السعودية مع الاستمتاع بإضاءات حي الطريف التاريخية عند الغروب.'
          : 'Relaxing evening stroll through artisan craft shops and Saudi specialty coffee lounges as At-Turaif illuminates at sunset.',
        duration_minutes: 150,
        accessibility_friendly: true,
        crowd_level: 'low',
        notes: isAr
          ? 'أفضل أوقات الزيارة لتفادي الازدحام والحرارة، مع توفر المصاعد بين مستويات المطل والوادي.'
          : 'Ideal cool evening atmosphere with elevators connecting terrace levels.',
        map_query: 'Bujairi Heritage District Diriyah',
        is_indoor: false,
      },
    ];

    transport = [
      {
        from: isAr ? 'حي الطريف التاريخي' : 'At-Turaif Historic District',
        to: isAr ? 'مطل البجيري' : 'Bujairi Terrace',
        mode: 'walking',
        estimated_time: '10 mins',
        accessibility_notes: isAr ? 'ممر مشاة مصقول ومسطح مزود بمصاعد كهربائية' : 'Flat paved walkway equipped with elevators',
      },
      {
        from: isAr ? 'مطل البجيري' : 'Bujairi Terrace',
        to: isAr ? 'حي البجيري التراثي' : 'Bujairi Heritage Walk',
        mode: 'walking',
        estimated_time: '5 mins',
        accessibility_notes: isAr ? 'مسار مشاة آمن وخالٍ من الدرج' : 'Safe step-free pedestrian path',
      },
    ];
  } else if (cityKey === 'jeddah') {
    schedule = [
      {
        time: '09:00 - 11:30',
        venue: isAr ? 'متحف مدينة الطيبات العالمية' : 'Al Tayebat International City Museum',
        activity: isAr
          ? 'استكشاف التراث الحجازي والإسلامي داخل مجمع متحفي مغلق ومكيف بالكامل يضم مقتنيات أثرية ومجسمات المعمار الحجازي.'
          : 'Explore Hijazi and Islamic heritage inside a fully air-conditioned museum complex showcasing traditional architecture.',
        duration_minutes: 150,
        accessibility_friendly: true,
        crowd_level: 'low',
        notes: isAr ? 'المتحف مزود بمصاعد كهربائية ومداخل مهيأة تماماً للكراسي المتحركة.' : 'Elevators and wide step-free ramps accessible throughout all floors.',
        map_query: 'Al Tayebat International City Jeddah',
        is_indoor: true,
      },
      {
        time: isFri ? '13:00 - 15:30' : '12:30 - 15:00',
        venue: isAr ? 'واجهة جدة البحرية (الكورنيش)' : 'Jeddah Waterfront Corniche',
        activity: isAr
          ? 'تغداء في مطعم بحري مكيف والاستراحة الشاطئية المغلقة مع إطلالة بانورامية على البحر الأحمر.'
          : 'Indoor Red Sea seafood dining and climate-controlled waterfront lounge relaxation.',
        duration_minutes: 150,
        accessibility_friendly: true,
        crowd_level: 'medium',
        notes: isAr ? 'تأمين استراحة صلاة الظهر والعصر في مصليات الواجهة البحرية المجهزة.' : 'Dhuhr prayer break handled in the waterfront air-conditioned prayer halls.',
        map_query: 'Jeddah Waterfront Corniche',
        is_indoor: true,
      },
      {
        time: '17:00 - 19:30',
        venue: isAr ? 'حي البلد التاريخي (UNESCO)' : 'Historic Al-Balad UNESCO District',
        activity: isAr
          ? 'جولة مسائية بين بيوت الرواشين الخشبية التاريخية (مثل بيت نصيف) والأسواق القديمة في المسارات الرئيسية المصقولة.'
          : 'Evening stroll past historic wooden Roshan houses (Nasseef House) along paved primary pedestrian alleys.',
        duration_minutes: 150,
        accessibility_friendly: true,
        crowd_level: 'low',
        notes: isAr ? 'استخدام المسار الرئيسي الممهد الخالي من الدرج لتسهيل الحركة.' : 'Primary paved route utilized to guarantee smooth wheelchair and stroller passage.',
        map_query: 'Historic Al Balad Jeddah',
        is_indoor: false,
      },
    ];

    transport = [
      {
        from: isAr ? 'متحف الطيبات' : 'Al Tayebat Museum',
        to: isAr ? 'واجهة جدة البحرية' : 'Jeddah Waterfront',
        mode: 'taxi',
        estimated_time: '20 mins',
        accessibility_notes: isAr ? 'سيارة أجرة مريحة مزودة بصندوق تسع للكراسي المتحركة' : 'Comfortable taxi with spacious wheelchair trunk',
      },
      {
        from: isAr ? 'واجهة جدة البحرية' : 'Jeddah Waterfront',
        to: isAr ? 'حي البلد التاريخي' : 'Historic Al-Balad',
        mode: 'taxi',
        estimated_time: '25 mins',
        accessibility_notes: isAr ? 'مسار تنقل عبر الطريق الساحلي المباشر' : 'Direct drive along coastal highway',
      },
    ];
  } else if (cityKey === 'alula') {
    schedule = [
      {
        time: '08:30 - 11:00',
        venue: isAr ? 'موقع الحجر التاريخي (Hegra UNESCO)' : 'Hegra UNESCO World Heritage Site',
        activity: isAr
          ? 'جولة موجهة بواسطة الحافلات الكهربائية المجهزة لزيارة المقابر النبطية المنحوتة في الصخور مثل قصر الفريد.'
          : 'Guided tour aboard air-conditioned electric buses visiting ancient Nabataean rock-cut tombs including Qasr al-Farid.',
        duration_minutes: 150,
        accessibility_friendly: true,
        crowd_level: 'low',
        notes: isAr ? 'الحافلات الرسمية مزودة بمنصات هيدروليكية لرفع الكراسي المتحركة.' : 'Official Hegra tour buses feature hydraulic lifts for wheelchair accessibility.',
        map_query: 'Hegra Hegra AlUla',
        is_indoor: false,
      },
      {
        time: isFri ? '13:00 - 15:30' : '12:00 - 14:30',
        venue: isAr ? 'البلدة القديمة بالعلا' : 'AlUla Old Town Heritage Village',
        activity: isAr
          ? 'وجبة غداء تراثية في مطعم مكيف داخل البلدة القديمة مع جولة مغطاة في الأسواق المحلية والحرف اليدوية.'
          : 'Traditional lunch in air-conditioned heritage dining followed by covered market exploration.',
        duration_minutes: 150,
        accessibility_friendly: true,
        crowd_level: 'low',
        notes: isAr ? 'مسارات البلدة مسطحة ومبلطة بشكل كامل يضمن سلامة الجميع.' : 'Paved flat pathways ensuring comfortable navigation.',
        map_query: 'AlUla Old Town',
        is_indoor: true,
      },
      {
        time: '17:00 - 19:30',
        venue: isAr ? 'صخرة الفيل ومطل مرايا' : 'Elephant Rock & Maraya Environs',
        activity: isAr
          ? 'جلسة غروب ساحرة عند صخرة الفيل مع مشاهدة انعكاسات قاعة مرايا المبهرة وسط الجبال.'
          : 'Sunset lounge at Elephant Rock with views of the mirrored Maraya Concert Hall embedded in the desert canyon.',
        duration_minutes: 150,
        accessibility_friendly: true,
        crowd_level: 'medium',
        notes: isAr ? 'منطقة صخرة الفيل مجهزة بممرات خشبية مسطحة وجلسات منخفضة مهيأة.' : 'Wooden boardwalks leading directly to accessible outdoor sunken seating.',
        map_query: 'Elephant Rock AlUla',
        is_indoor: false,
      },
    ];

    transport = [
      {
        from: isAr ? 'موقع الحجر' : 'Hegra UNESCO Site',
        to: isAr ? 'البلدة القديمة بالعلا' : 'AlUla Old Town',
        mode: 'private_car',
        estimated_time: '25 mins',
        accessibility_notes: isAr ? 'سيارة خاصة أو حافلة السياحة المجهزة' : 'Private vehicle or equipped tour coach',
      },
      {
        from: isAr ? 'البلدة القديمة' : 'AlUla Old Town',
        to: isAr ? 'صخرة الفيل' : 'Elephant Rock',
        mode: 'private_car',
        estimated_time: '20 mins',
        accessibility_notes: isAr ? 'طريق مهد ومستوي حتى مواقف صخرة الفيل' : 'Smooth paved road to Elephant Rock parking',
      },
    ];
  } else if (cityKey === 'mecca') {
    schedule = [
      {
        time: '08:30 - 11:30',
        venue: isAr ? 'المسجد الحرام وبرج الساعة' : 'Al-Masjid al-Haram & Clock Tower Complex',
        activity: isAr
          ? 'أداء المناسك والاستفادة من العربات الكهربائية المخصصة، ثم زيارة متحف برج الساعة المغلق والمكيف.'
          : 'Spiritual visit utilizing official electric wheelchairs, followed by the climate-controlled Clock Tower Museum.',
        duration_minutes: 180,
        accessibility_friendly: true,
        crowd_level: 'medium',
        notes: isAr ? 'ممرات ومنحدرات ومصاعد حديثة متوفرة في كافة أبواب الحرم الشريف.' : 'Modern elevators, ramps, and dedicated electric wheelchair lanes available.',
        map_query: 'Masjid al-Haram Mecca',
        is_indoor: true,
      },
      {
        time: isFri ? '13:00 - 15:30' : '12:30 - 15:00',
        venue: isAr ? 'متحف معرض عمارة الحرمين الشريفين' : 'Exhibition of Two Holy Mosques Architecture',
        activity: isAr
          ? 'جولة ثقافية مكيفة بالكامل تعرض التاريخ المعماري للحرمين الشريفين والمقتنيات الأثرية النادرة.'
          : 'Fully air-conditioned exhibition showcasing historical architectural treasures of the Two Holy Mosques.',
        duration_minutes: 150,
        accessibility_friendly: true,
        crowd_level: 'low',
        notes: isAr ? 'صالة واحدة مسطحة ومكيفة تتيح سهولة الحركة التامة للكبار وذوي الاحتياجات.' : 'Flat air-conditioned hall providing seamless access for seniors and wheelchair users.',
        map_query: 'Exhibition of Two Holy Mosques Architecture Mecca',
        is_indoor: true,
      },
      {
        time: '17:30 - 20:00',
        venue: isAr ? 'حي حراء الثقافي' : 'Hira Cultural District',
        activity: isAr
          ? 'زيارة متحف الوحي التفاعلي وتناول العشاء التراثي في الحي الثقافي المجاور لجبل النور.'
          : 'Explore the interactive Revelation Museum and enjoy cultural dining at the foot of Mount Hira.',
        duration_minutes: 150,
        accessibility_friendly: true,
        crowd_level: 'low',
        notes: isAr ? 'المجمع الثقافي مجهز بالكامل بممرات مسطحة ومصاعد حديثة.' : 'Cultural complex completely outfitted with flat pathways and elevators.',
        map_query: 'Hira Cultural District Mecca',
        is_indoor: true,
      },
    ];

    transport = [
      {
        from: isAr ? 'المسجد الحرام' : 'Al-Masjid al-Haram',
        to: isAr ? 'معرض عمارة الحرمين' : 'Architecture Exhibition',
        mode: 'taxi',
        estimated_time: '20 mins',
        accessibility_notes: isAr ? 'حافلات أو سيارات أجرة مجهزة' : 'Equipped shuttle or taxi service',
      },
      {
        from: isAr ? 'معرض عمارة الحرمين' : 'Architecture Exhibition',
        to: isAr ? 'حي حراء الثقافي' : 'Hira Cultural District',
        mode: 'taxi',
        estimated_time: '25 mins',
        accessibility_notes: isAr ? 'سيارة أجرة مباشرة' : 'Direct taxi route',
      },
    ];
  } else if (cityKey === 'medina') {
    schedule = [
      {
        time: '08:30 - 11:30',
        venue: isAr ? 'المسجد النبوي الشريف ومسجد قباء' : 'Al-Masjid an-Nabawi & Quba Mosque',
        activity: isAr
          ? 'الزيارة والتبرك في المسجد النبوي ومسجد قباء عبر ممشى قباء التراثي المصقول.'
          : 'Morning visit to the Prophet\'s Mosque and Quba Mosque via the smooth pedestrian avenue.',
        duration_minutes: 180,
        accessibility_friendly: true,
        crowd_level: 'medium',
        notes: isAr ? 'ساحات المسجد النبوي مزودة بسلالم كهربائية ومصاعد وعربات تنقل مجانية.' : 'Prophet\'s Mosque plaza equipped with escalators, elevators, and golf carts.',
        map_query: 'Al-Masjid an-Nabawi Medina',
        is_indoor: true,
      },
      {
        time: isFri ? '13:00 - 15:30' : '12:30 - 15:00',
        venue: isAr ? 'متحف دار المدينة للتراث المعماري' : 'Dar Al Madinah Heritage Museum',
        activity: isAr
          ? 'جولة استكشافية مكيفة داخل أول متحف متخصص في تاريخ وتطور السيرة والعمائر بالمدينة المنورة.'
          : 'Air-conditioned indoor guided tour exploring Medina\'s urban history and Islamic artifacts.',
        duration_minutes: 150,
        accessibility_friendly: true,
        crowd_level: 'low',
        notes: isAr ? 'المتحف مجهز بمصاعد وممرات مهيأة لجميع الزوار.' : 'Museum equipped with elevators and smooth access ramps.',
        map_query: 'Dar Al Madinah Museum Medina',
        is_indoor: true,
      },
      {
        time: '17:30 - 20:00',
        venue: isAr ? 'مجمع جبل أحد والمركز الحضاري' : 'Mount Uhud Historic Complex',
        activity: isAr
          ? 'زيارة معالم جبل أحد وسيد الشهداء والاستراحة في المركز الحضاري والمقهى التراثي المطل.'
          : 'Visit Mount Uhud historic site and relax at the surrounding cultural visitor center.',
        duration_minutes: 150,
        accessibility_friendly: true,
        crowd_level: 'low',
        notes: isAr ? 'الممرات السفلية والمركز الحضاري مسطحة ومتاحة للكراسي المتحركة.' : 'Lower visitor center and plaza fully paved and wheelchair accessible.',
        map_query: 'Mount Uhud Historic Site Medina',
        is_indoor: false,
      },
    ];

    transport = [
      {
        from: isAr ? 'المسجد النبوي' : 'Al-Masjid an-Nabawi',
        to: isAr ? 'متحف دار المدينة' : 'Dar Al Madinah Museum',
        mode: 'taxi',
        estimated_time: '20 mins',
        accessibility_notes: isAr ? 'حافلات النقل التناقلي أو سيارة أجرة' : 'Shuttle bus or accessible taxi',
      },
      {
        from: isAr ? 'متحف دار المدينة' : 'Dar Al Madinah Museum',
        to: isAr ? 'جبل أحد' : 'Mount Uhud',
        mode: 'taxi',
        estimated_time: '20 mins',
        accessibility_notes: isAr ? 'سيارة أجرة مباشرة عبر الطريق الدائري' : 'Direct drive along ring road',
      },
    ];
  } else {
    // Default Riyadh
    schedule = [
      {
        time: '09:00 - 11:30',
        venue: isAr ? 'المتحف الوطني السعودي وقصر المربع' : 'National Museum of Saudi Arabia & Murabba Palace',
        activity: isAr
          ? 'جولة استكشافية ثقافية في قاعات المتحف المغلقة والمكيفة التي تروي تاريخ الجزيرة العربية والتراث السعودي.'
          : 'Explore Saudi heritage across climate-controlled exhibition halls showcasing Arabian history.',
        duration_minutes: 150,
        accessibility_friendly: true,
        crowd_level: 'low',
        notes: isAr ? 'المتحف مزود بمصاعد كهربائية وممرات مسطحة واسعة للكراسي المتحركة وعربات الأطفال.' : 'Fully equipped with elevators, automatic doors, and wide ramps.',
        map_query: 'National Museum of Saudi Arabia Riyadh',
        is_indoor: true,
      },
      {
        time: isFri ? '13:00 - 15:30' : '12:30 - 15:00',
        venue: isAr ? 'برج المملكة وسكاي بريدج' : 'Kingdom Tower Sky Bridge & Galleria',
        activity: isAr
          ? 'تناول الغداء في المطاعم المكيفة الفاخرة والاستمتاع بالإطلالة البانورامية الشاملة للرياض من ارتفاع 300 متر.'
          : 'Indoor dining and panoramic 300-meter skyline views of Riyadh from the Kingdom Tower Sky Bridge.',
        duration_minutes: 150,
        accessibility_friendly: true,
        crowd_level: 'medium',
        notes: isAr ? 'مصاعد فائقة السرعة مهيأة مع توفر مصليات فسيحة لأداء صلاتي الظهر والعصر.' : 'High-speed express elevators with direct step-free access to prayer rooms.',
        map_query: 'Kingdom Center Sky Bridge Riyadh',
        is_indoor: true,
      },
      {
        time: '17:30 - 20:30',
        venue: isAr ? 'سوق الزل التاريخي وقصر المصمك' : 'Souq Al-Zal & Historic Masmak Fortress',
        activity: isAr
          ? 'جولة مسائية هادئة في سوق الزل للتراثيات والعطور السعودية، وتأمل الإضاءة التراثية لقصر المصمك.'
          : 'Evening heritage walk through traditional incense & carpet souks and historic Masmak Fortress plaza.',
        duration_minutes: 180,
        accessibility_friendly: true,
        crowd_level: 'low',
        notes: isAr ? 'المسارات الخارجية للميدان مسطحة ومبلطة بالكامل وتناسب الحركة المسائية اللطيفة.' : 'Smooth stone plazas allowing comfortable evening strolling.',
        map_query: 'Souq Al Zal Diriyah Riyadh',
        is_indoor: false,
      },
    ];

    transport = [
      {
        from: isAr ? 'المتحف الوطني' : 'National Museum',
        to: isAr ? 'برج المملكة' : 'Kingdom Tower',
        mode: 'metro',
        estimated_time: '20 mins',
        accessibility_notes: isAr ? 'مترو الرياض مزود بمصاعد ومسارات مكفوفي البصر' : 'Riyadh Metro featuring elevators and tactile paving',
      },
      {
        from: isAr ? 'برج المملكة' : 'Kingdom Tower',
        to: isAr ? 'سوق الزل وقصر المصمك' : 'Souq Al-Zal & Masmak',
        mode: 'taxi',
        estimated_time: '25 mins',
        accessibility_notes: isAr ? 'سيارة أجرة أو كريم عبر طريق الملك فهد' : 'Taxi or Careem via King Fahd Road',
      },
    ];
  }

  const titleAr = `جدول يومي ذكي في ${cityName} (${travelers} ${travelers === 1 ? 'مسافر' : 'مسافرين'})`;
  const titleEn = `Smart Day Plan in ${cityName} (${travelers} traveler${travelers > 1 ? 's' : ''})`;

  const officialVisitSaudiUrl = `https://www.visitsaudi.com/${isAr ? 'ar' : 'en'}/see-do/destinations/${cityKey}`;

  return {
    plan_title: isAr ? titleAr : titleEn,
    date: dateStr,
    hijri_date: getHijriDate(dateStr, language),
    city: cityName,
    city_id: cityKey,
    prayer_times: prayerTimes,
    weather: weather,
    schedule: schedule,
    transport: transport,
    warnings: warnings,
    grounding_urls: [
      {
        title: isAr ? 'روح السعودية (المصدر الرسمي للوجهات) - Visit Saudi' : 'Official Destination Source - Visit Saudi (visitsaudi.com)',
        url: officialVisitSaudiUrl,
      },
    ],
  };
}
