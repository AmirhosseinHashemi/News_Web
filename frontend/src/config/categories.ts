export const CATEGORIES = [
  { key: "politics", slug: "politics", label: "سیاسی" },
  { key: "economy", slug: "economy", label: "اقتصادی" },
  { key: "society", slug: "society", label: "اجتماعی" },
  { key: "world", slug: "world", label: "بین‌الملل" },
  { key: "sports", slug: "sports", label: "ورزشی" },
  { key: "culture", slug: "culture", label: "فرهنگ و هنر" },
  { key: "science", slug: "science", label: "علم و فناوری" },
] as const;

export type CategoryKey = (typeof CATEGORIES)[number]["key"];
