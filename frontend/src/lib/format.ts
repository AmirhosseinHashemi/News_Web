const numberFmt = new Intl.NumberFormat("fa-IR");

/** ۱۲۳۴ → «۱٬۲۳۴» */
export const faNumber = (value: number): string => numberFmt.format(value);

/** «۱۵ خرداد ۱۴۰۳» */
export function faDate(input: Date | string | number): string {
  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(input));
}

/** «۱۴:۰۵» */
export function faTime(input: Date | string | number): string {
  return new Intl.DateTimeFormat("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(input));
}

/** «۱۵ خرداد ۱۴۰۳، ساعت ۱۴:۰۵» */
export const faDateTime = (input: Date | string | number): string =>
  `${faDate(input)}، ساعت ${faTime(input)}`;

/** «۳ ساعت پیش» */
export function faTimeAgo(input: Date | string | number): string {
  const rtf = new Intl.RelativeTimeFormat("fa", { numeric: "always" });
  const seconds = Math.round((Date.now() - new Date(input).getTime()) / 1000);
  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 31536000],
    ["month", 2592000],
    ["week", 604800],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
  ];
  for (const [unit, secs] of units) {
    if (seconds >= secs) return rtf.format(-Math.floor(seconds / secs), unit);
  }
  return "لحظاتی پیش";
}

/** تخمین زمان مطالعه — سرعت متوسط خواندن فارسی ≈ ۲۰۰ واژه در دقیقه */
export function readingMinutes(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

/** «۴ دقیقه مطالعه» */
export const faReadingTime = (minutes: number): string =>
  `${faNumber(minutes)} دقیقه مطالعه`;

/** 134 → «۰۲:۱۴» (مدت‌زمان ویدیو) */
export function faDuration(totalSeconds: number): string {
  const fmt = (n: number) =>
    n.toLocaleString("fa-IR", { useGrouping: false, minimumIntegerDigits: 2 });
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${fmt(m)}:${fmt(s)}`;
}
