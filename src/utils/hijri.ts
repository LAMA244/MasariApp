import { Language } from '../types';

export function getHijriDate(dateStr: string, lang: Language = 'ar'): string {
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return '';

    const locale = lang === 'ar' ? 'ar-SA-u-ca-islamic-umalqura' : 'en-US-u-ca-islamic-umalqura';
    
    const formatter = new Intl.DateTimeFormat(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    const formatted = formatter.format(date);
    return formatted;
  } catch {
    return '';
  }
}

export function formatGregorianDate(dateStr: string, lang: Language = 'ar'): string {
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;

    const locale = lang === 'ar' ? 'ar-SA' : 'en-US';
    return new Intl.DateTimeFormat(locale, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  } catch {
    return dateStr;
  }
}

export function isFriday(dateStr: string): boolean {
  try {
    const date = new Date(dateStr);
    return date.getDay() === 5; // 5 = Friday
  } catch {
    return false;
  }
}

export function isSummerMonth(dateStr: string): boolean {
  try {
    const date = new Date(dateStr);
    const month = date.getMonth() + 1; // 1 to 12
    return month >= 4 && month <= 10; // April (4) to October (10)
  } catch {
    return false;
  }
}
