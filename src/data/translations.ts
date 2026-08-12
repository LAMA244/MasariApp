import { Language } from '../types';

export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  ar: {
    app_title: 'مَسَارِي',
    app_subtitle: 'مخطط الرحلات اليومي',
    tagline: 'جدول يومي مخصص يحترم مواعيد الصلاة، يتجنب أوقات الحر الشديد، ويضمن سهولة الوصول لذوي الاحتياجات.',
    
    // Form fields
    select_city: 'اختر المدينة',
    select_date: 'تاريخ الزيارة',
    travelers_count: 'عدد المسافرين',
    person: 'شخص',
    persons: 'أشخاص',
    special_needs: 'الاحتياجات الخاصة وسهولة الوصول',
    wheelchair: 'مستخدم كرسي متحرك',
    stroller: 'عربة أطفال',
    elderly: 'كبار السن',
    none_needs: 'لا توجد احتياجات خاصة',
    
    preferences_title: 'الأنشطة والاهتمامات المفضلة',
    pref_history: 'التراث والتاريخ',
    pref_food: 'المطاعم المقاهي السعودية',
    pref_nature: 'الطبيعة والمناظر',
    pref_shopping: 'الأسواق والتسوق',
    pref_family: 'فعاليات عائلية',
    
    generate_btn: 'إنشاء جدول اليوم (مساري)',
    generating: 'جاري التحليل...',
    
    // Quick Presets
    quick_presets: 'جداول جاهزة سريعة',
    preset_riyadh_title: 'يوم في تاريخ ورياض اليوم',
    preset_diriyah_title: 'جولة الطريف ومطل البجيري',
    preset_jeddah_title: 'عروس البحر الأحمر والبلد',
    preset_alula_title: 'سحر الحجر ومرايا بالعلا',
    
    // Cards
    prayer_times_title: 'أوقات الصلاة في',
    next_prayer: 'الصلاة القادمة:',
    remaining: 'المتبقي',
    jumuah_notice: 'جمعة مباركة! يتوقف الجدول تماماً من 11:30 ص إلى 1:00 م لأداء صلاة الجمعة.',
    prayer_pause: 'استراحة لأداء الصلاة والراحة',
    
    fajr: 'الفجر',
    dhuhr: 'الظهر',
    asr: 'العصر',
    maghrib: 'المغرب',
    isha: 'العشاء',
    
    weather_title: 'حالة الطقس ودرجة الحرارة',
    temperature: 'الحرارة',
    humidity: 'الرطوبة',
    uv_index: 'مؤشر الأشعة',
    heat_warning_title: 'تنبيه الحرارة الشديدة (> 38°م)',
    heat_warning_desc: 'تم تجنب الأنشطة الخارجية بين الساعة 12:00 ظهراً و 4:00 عصراً وتحويل الأنشطة إلى أماكن مغلقة مكيفة.',
    
    warnings_title: 'تنبيهات وإرشادات السلامة',
    
    // Timeline
    schedule_timeline: 'جدول اليوم الزمني (خطوات الرحلة)',
    venue: 'المكان',
    activity: 'النشاط',
    duration: 'المدة',
    minutes: 'دقيقة',
    crowd_level: 'مستوى الازدحام',
    crowd_low: 'قليل',
    crowd_med: 'متوسط',
    crowd_high: 'مزدحم',
    accessible_guaranteed: 'مكفول ممر خالي من العوائق ورامب/مصعد',
    indoor_ac: 'مكان مغلق ومكيف بالكامل',
    
    // Transport
    transport_title: 'التنقل والمواصلات بين الوجهات',
    mode_walking: 'مشياً على الأقدام',
    mode_taxi: 'سيارة أوجرة / كريم / أوبر',
    mode_metro: 'قطار / مترو الرياض',
    mode_bus: 'حافلات النقل العام',
    mode_private_car: 'سيارة خاصة',
    est_travel_time: 'وقت التنقل المتوقع',
    min_travel_gap: 'مراعاة مسافة تنقل 20-30 دقيقة بين الأماكن',
    
    // Maps
    locations_map: 'خريطة الوجهات والاتجاهات',
    open_in_google_maps: 'فتح في خرائط Google',
    get_directions: 'اتجاهات السير',
    
    // Actions
    print_plan: 'طباعة الجدول',
    share_plan: 'مشاركة الجدول',
    copied_success: 'تم نسخ رابط الجدول إلى الحافظة!',
    replan: 'تعديل الجدول',
    
    // Accessibility Notice Banner
    accessibility_applied: 'تم تطبيق فلتر إمكانية الوصول: جميع الوجهات المختارة تحتوي على مداخل مهيأة، مصاعد، ومنحدرات (Ramps).',
    
    // Visit Saudi Verification
    verified_visit_saudi: 'موثق من روح السعودية (Visit Saudi)',
    visit_saudi_badge: 'موثق من روح السعودية',
    visit_saudi_source_notice: 'تم التحقق من الأسعار، أوقات العمل، والفعاليات الموسمية عبر المصدر الرسمي "روح السعودية" (visitsaudi.com)',
    visit_saudi_official_link: 'الانتقال إلى روح السعودية',

    // Ask the Guide
    ask_guide: 'اسأل المرشد المحلي',
    ask_guide_placeholder: 'اسأل عن أوقات العمل، اللباس، التذاكر، أو الدخول...',
    ask_guide_send: 'إرسال',
    ask_guide_quick_dress: 'الزي المناسب؟',
    ask_guide_quick_tickets: 'تذاكر ودخول؟',
    ask_guide_quick_best_time: 'أفضل وقت للزيارة؟',
    ask_guide_quick_parking: 'مواقف وتسهيلات؟',
    
    // Grounding
    sources_grounding: 'المصادر والمعلومات الموثقة من Google Search & Maps:',

    // Print Header
    print_notice: 'تم إنشاء هذا الجدول بواسطة منصة "مساري"',
    
    // Empty & Errors
    error_title: 'حدث خطأ أثناء إعداد الجدول',
    error_retry: 'إعادة المحاولة'
  },
  en: {
    app_title: 'Masari',
    app_subtitle: 'Daily Trip Planner',
    tagline: 'Custom daily itinerary honoring prayer times, avoiding peak heat, and guaranteeing accessibility.',
    
    // Form fields
    select_city: 'Select Destination City',
    select_date: 'Date of Visit',
    travelers_count: 'Number of Travelers',
    person: 'person',
    persons: 'travelers',
    special_needs: 'Accessibility & Special Needs',
    wheelchair: 'Wheelchair User',
    stroller: 'Baby Stroller',
    elderly: 'Elderly Companion',
    none_needs: 'No Special Needs',
    
    preferences_title: 'Interests & Activity Preferences',
    pref_history: 'History & Culture',
    pref_food: 'Saudi Dining & Cafes',
    pref_nature: 'Nature & Scenic Views',
    pref_shopping: 'Souks & Shopping',
    pref_family: 'Family Activities',
    
    generate_btn: 'Generate Itinerary (Masari)',
    generating: 'Analyzing...',
    
    // Quick Presets
    quick_presets: 'Quick Preset Itineraries',
    preset_riyadh_title: 'Riyadh Heritage & Skyline',
    preset_diriyah_title: 'Historic At-Turaif & Bujairi',
    preset_jeddah_title: 'Al-Balad & Red Sea Corniche',
    preset_alula_title: 'Hegra & Maraya Wonders',
    
    // Cards
    prayer_times_title: 'Prayer Times in',
    next_prayer: 'Next Prayer:',
    remaining: 'Remaining',
    jumuah_notice: 'Blessed Friday! All activities pause 11:30 AM – 1:00 PM for Jumu\'ah Friday prayer.',
    prayer_pause: 'Prayer Break & Rest Period',
    
    fajr: 'Fajr',
    dhuhr: 'Dhuhr',
    asr: 'Asr',
    maghrib: 'Maghrib',
    isha: 'Isha',
    
    weather_title: 'Weather & Climate Advisory',
    temperature: 'Temperature',
    humidity: 'Humidity',
    uv_index: 'UV Index',
    heat_warning_title: 'Extreme Heat Advisory (> 38°C)',
    heat_warning_desc: 'Outdoor activities 12:00 PM – 4:00 PM avoided. Air-conditioned indoor venues recommended.',
    
    warnings_title: 'Safety & Trip Advisories',
    
    // Timeline
    schedule_timeline: 'Daily Schedule & Timeline',
    venue: 'Venue',
    activity: 'Activity',
    duration: 'Duration',
    minutes: 'mins',
    crowd_level: 'Crowd Level',
    crowd_low: 'Low',
    crowd_med: 'Moderate',
    crowd_high: 'Busy',
    accessible_guaranteed: 'Step-free entrance with elevator & ramps guaranteed',
    indoor_ac: 'Fully indoor & air-conditioned venue',
    
    // Transport
    transport_title: 'Inter-Venue Travel & Transport',
    mode_walking: 'Walking Path',
    mode_taxi: 'Taxi / Careem / Uber',
    mode_metro: 'Riyadh Metro / Train',
    mode_bus: 'Public Bus',
    mode_private_car: 'Private Vehicle',
    est_travel_time: 'Est. Travel Time',
    min_travel_gap: '20-30 min buffer time included between venues',
    
    // Maps
    locations_map: 'Venue Locations & Directions',
    open_in_google_maps: 'Open in Google Maps',
    get_directions: 'Get Directions',
    
    // Actions
    print_plan: 'Print Itinerary',
    share_plan: 'Share Itinerary',
    copied_success: 'Itinerary link copied to clipboard!',
    replan: 'Modify Plan',
    
    // Accessibility Notice Banner
    accessibility_applied: 'Accessibility Filter Active: Only venues with step-free access, ramps, and elevators are selected.',
    
    // Visit Saudi Verification
    verified_visit_saudi: 'Verified by Visit Saudi (روح السعودية)',
    visit_saudi_badge: 'Verified by Visit Saudi',
    visit_saudi_source_notice: 'All prices, operating hours, and seasonal events are cross-verified with official Visit Saudi (visitsaudi.com) listings.',
    visit_saudi_official_link: 'Explore on VisitSaudi.com',

    // Ask the Guide
    ask_guide: 'Ask Local Guide',
    ask_guide_placeholder: 'Ask about tickets, dress code, hours, or access...',
    ask_guide_send: 'Send',
    ask_guide_quick_dress: 'Dress code?',
    ask_guide_quick_tickets: 'Tickets?',
    ask_guide_quick_best_time: 'Best time?',
    ask_guide_quick_parking: 'Parking & Access?',
    
    // Grounding
    sources_grounding: 'Grounded Data Sources from Google Search & Maps:',

    // Print Header
    print_notice: 'Generated by "Masari"',
    
    // Empty & Errors
    error_title: 'Error generating itinerary',
    error_retry: 'Try Again'
  }
};
