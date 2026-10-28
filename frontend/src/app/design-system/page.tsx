import { Loader2, Plus, ShieldAlert } from "lucide-react";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CategoryBadge } from "@/components/news/CategoryBadge";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { EmptyState, ErrorState } from "@/components/shared/StateView";
import { StatusPage } from "@/components/shared/StatusPage";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CATEGORIES, type CategoryKey } from "@/config/categories";
import { Byline } from "@/features/post/components/Byline";
import { LiveBadge } from "@/features/post/components/LiveBadge";
import { MediaBadge } from "@/features/post/components/MediaBadge";
import { PostCard } from "@/features/post/components/PostCard";
import type { MediaInfo, Post } from "@/features/post/post.type";
import { faDate, faDuration, faNumber } from "@/lib/format";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "دیزاین سیستم" };

/* ───────── داده‌های نمونه ───────── */
type SampleCardData = {
  slug: string;
  title: string;
  summary?: string;
  category?: { key: CategoryKey };
  cover?: { src: string; alt: string };
  media?: MediaInfo;
  authorName?: string;
  publishedAt?: string;
  readingMinutes?: number;
  isLive?: boolean;
};

const toPost = (data: SampleCardData): Post => {
  const publishedAt = data.publishedAt ?? null;
  const createdAt = publishedAt ?? new Date().toISOString();

  return {
    id: data.slug.length,
    title: data.title,
    slug: data.slug,
    excerpt: data.summary ?? null,
    status: "PUBLISHED",
    createdAt,
    publishedAt,
    updatedAt: createdAt,
    deletedAt: null,
    author: {
      id: 0,
      firstName: data.authorName ?? "خبرنگار",
      lastName: "",
    },
    category: {
      id: 0,
      name:
        CATEGORIES.find((category) => category.key === data.category?.key)
          ?.label ?? "عمومی",
    },
    cover: data.cover
      ? { filename: data.cover.src, type: data.media?.type ?? "IMAGE" }
      : null,
  };
};

const IMG = (seed: string) => `https://picsum.photos/seed/${seed}/800/450`;

const heroData: SampleCardData = {
  slug: "energy-deal",
  title: "توافق تازه درباره تبادل انرژی در منطقه امضا شد",
  summary:
    "منابع آگاه از امضای توافق‌نامه همکاری انرژی میان چند کشور منطقه خبر دادند؛ جزئیات کامل سند تا ساعات آینده منتشر می‌شود.",
  category: { key: "world" },
  cover: { src: IMG("rahgh-hero"), alt: "نشست امضای توافق‌نامه" },
  authorName: "سارا محمدی",
  publishedAt: "2025-06-10T12:30:00+03:30",
  readingMinutes: 6,
  isLive: true,
};

const defaultData: SampleCardData[] = [
  {
    slug: "inflation-spring",
    title: "نرخ تورم در بهار به مرز ۳۰ درصد رسید",
    summary:
      "مرکز آمار ایران نرخ تورم نقطه‌به‌نقطه خردادماه را ۳۰٫۴ درصد اعلام کرد.",
    category: { key: "economy" },
    cover: { src: IMG("rahgh-economy"), alt: "بازار ارز" },
    publishedAt: "2025-06-10T09:30:00+03:30",
    readingMinutes: 4,
  },
  {
    slug: "team-win",
    title: "پیروزی پرگل تیم ملی در دیدار تدارکاتی",
    category: { key: "sports" },
    cover: { src: IMG("rahgh-sports"), alt: "بازیکنان تیم ملی" },
    media: { type: "VIDEO", totalSeconds: 134 },
    publishedAt: "2025-06-10T18:45:00+03:30",
    readingMinutes: 3,
  },
  {
    slug: "no-image",
    title: "الگوی کارت بدون تصویر با جایگزین گرادیانی",
    summary: "وقتی خبر تصویر ندارد، از MediaPlaceholder استفاده می‌شود.",
    category: { key: "science" },
    cover: undefined,
    publishedAt: "2025-06-09T21:10:00+03:30",
    readingMinutes: 2,
  },
];

const videoData: SampleCardData[] = [
  {
    slug: "v1",
    title: "گزارش ویدیویی: یک روز در بزرگ‌ترین بازار میوه تهران",
    category: { key: "society" },
    cover: { src: IMG("rahgh-market"), alt: "" },
    media: { type: "VIDEO", totalSeconds: 287 },
    publishedAt: "2025-06-10T10:00:00+03:30",
    readingMinutes: 2,
  },
  {
    slug: "v2",
    title: "مصاحبه اختصاصی با سرمربی تیم ملی",
    category: { key: "sports" },
    cover: { src: IMG("rahgh-coach"), alt: "" },
    media: { type: "VIDEO", totalSeconds: 612 },
    publishedAt: "2025-06-09T19:30:00+03:30",
    readingMinutes: 4,
  },
];

const listData: SampleCardData[] = [
  {
    slug: "l1",
    title: "نشست شورای شهر با دستور کار بودجه سالانه برگزار شد",
    category: { key: "politics" },
    cover: { src: IMG("rahgh-city"), alt: "" },
    publishedAt: "2025-06-10T14:00:00+03:30",
    readingMinutes: 3,
  },
  {
    slug: "l2",
    title: "بازارچه صنایع‌دستی در پارک ملت گشایش یافت",
    category: { key: "society" },
    cover: { src: IMG("rahgh-bazaar"), alt: "" },
    media: { type: "IMAGE", count: 18 },
    publishedAt: "2025-06-10T11:20:00+03:30",
    readingMinutes: 2,
  },
  {
    slug: "l3",
    title: "نمایشگاه کتاب تابستانه از هفته آینده آغاز می‌شود",
    category: { key: "culture" },
    cover: { src: IMG("rahgh-book"), alt: "" },
    publishedAt: "2025-06-09T16:00:00+03:30",
    readingMinutes: 5,
  },
];

const compactData: SampleCardData[] = [
  {
    slug: "c1",
    title: "اعلام برنامه زمان‌بندی پخش سریال‌های تابستان",
    category: { key: "culture" },
    publishedAt: "2025-06-10T08:00:00+03:30",
  },
  {
    slug: "c2",
    title: "قیمت طلا در بازار آزاد با رشد جزئی همراه بود",
    category: { key: "economy" },
    publishedAt: "2025-06-10T07:45:00+03:30",
  },
  {
    slug: "c3",
    title: "تیم‌های صعودکرده لیگ دسته دوم مشخص شدند",
    category: { key: "sports" },
    publishedAt: "2025-06-10T01:30:00+03:30",
  },
  {
    slug: "c4",
    title: "پرتال جدید فضایی با موفقیت در مدار قرار گرفت",
    category: { key: "science" },
    publishedAt: "2025-06-09T23:10:00+03:30",
  },
];

/* ───────── توکن‌ها (کلاس‌ها باید literal باشند تا Tailwind ببیندشان) ───────── */
const SEMANTIC_SWATCHES: [string, string][] = [
  ["background", "bg-background"],
  ["foreground", "bg-foreground"],
  ["card", "bg-card"],
  ["primary", "bg-primary"],
  ["secondary", "bg-secondary"],
  ["muted", "bg-muted"],
  ["accent", "bg-accent"],
  ["destructive", "bg-destructive"],
  ["border", "bg-border"],
  ["ring", "bg-ring"],
];

const STATUS_SWATCHES: [string, string][] = [
  ["success", "bg-success"],
  ["warning", "bg-warning"],
  ["info", "bg-info"],
  ["breaking", "bg-breaking"],
];

const CATEGORY_SWATCHES: [CategoryKey, string][] = [
  ["politics", "bg-politics"],
  ["economy", "bg-economy"],
  ["society", "bg-society"],
  ["world", "bg-world"],
  ["sports", "bg-sports"],
  ["culture", "bg-culture"],
  ["science", "bg-science"],
];

const TYPE_SCALE: {
  cls: string;
  token: string;
  usage: string;
  sample: string;
}[] = [
  {
    cls: "text-display font-bold",
    token: "text-display",
    usage: "تیتر خبر اصلی",
    sample: "توافق تازه درباره تبادل انرژی در منطقه",
  },
  {
    cls: "text-headline font-bold",
    token: "text-headline",
    usage: "تیتر کارت‌ها",
    sample: "نرخ تورم در بهار به مرز ۳۰ درصد رسید",
  },
  {
    cls: "text-title font-bold",
    token: "text-title",
    usage: "عنوان بخش",
    sample: "گزارش میدانی از بازار ارز تهران",
  },
  {
    cls: "text-lead text-muted-foreground",
    token: "text-lead",
    usage: "لید خبر",
    sample:
      "بر اساس اعلام مرکز آمار، شاخص قیمت مصرف‌کننده در بهار امسال نسبت به مدت مشابه سال قبل رشد قابل توجهی داشته است.",
  },
  {
    cls: "text-base",
    token: "text-base",
    usage: "بدنه متن",
    sample:
      "کارشناسان معتقدند ادامه این روند به سیاست‌های حمایتی بستگی دارد و در صورت ثبات نرخ ارز، انتظار می‌رود فشار قیمتی در نیمه دوم سال کاهش یابد.",
  },
  {
    cls: "text-xs text-muted-foreground",
    token: "text-xs",
    usage: "کپشن و متادیتا",
    sample: "عکس: آرش صادقی — خبرگزاری رحق",
  },
];

const NAV: [string, string][] = [
  ["#colors", "رنگ‌ها"],
  ["#typography", "تایپوگرافی"],
  ["#buttons", "دکمه‌ها"],
  ["#badges", "نشان‌ها"],
  ["#cards", "کارت خبر"],
  ["#forms", "فرم‌ها"],
  ["#misc", "اجزای دیگر"],
  ["#states", "وضعیت‌ها"],
];

/* ───────── اجزای کمکی همین صفحه ───────── */
function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 space-y-6">
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-extrabold">{title}</h2>
        <code
          dir="ltr"
          className="rounded bg-muted px-2 py-0.5 font-mono text-xs text-muted-foreground"
        >
          #{id}
        </code>
      </div>
      <Separator />
      {children}
    </section>
  );
}

function SubLabel({ children }: { children: ReactNode }) {
  return (
    <h3 className="text-sm font-bold text-muted-foreground">{children}</h3>
  );
}

function Swatch({ name, cls }: { name: string; cls: string }) {
  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      <div className={cn("h-12 w-full border-b", cls)} />
      <div
        dir="ltr"
        className="px-2 py-1.5 text-left font-mono text-[11px] text-muted-foreground"
      >
        {name}
      </div>
    </div>
  );
}

function CategorySwatch({
  cat,
  cls,
  label,
}: {
  cat: CategoryKey;
  cls: string;
  label: string;
}) {
  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      <div className={cn("h-12 w-full border-b", cls)} />
      <div className="flex items-center justify-between gap-2 px-2 py-1.5">
        <CategoryBadge category={cat} label={label} />
        <code dir="ltr" className="font-mono text-[10px] text-muted-foreground">
          {cat}
        </code>
      </div>
    </div>
  );
}

/* ───────── صفحه ───────── */
export default function DesignSystemPage() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <div>
            <h1 className="text-lg font-extrabold">دیزاین سیستم رحق</h1>
            <p className="text-xs text-muted-foreground">
              مرجع بصری توکن‌ها و کامپوننت‌ها — با سوییچ تم، هر دو حالت را ببین
            </p>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-16 px-4 pb-24 pt-10">
        <nav className="flex flex-wrap gap-2">
          {NAV.map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="rounded-md border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* ── رنگ‌ها ── */}
        <Section id="colors" title="رنگ‌ها">
          <div className="space-y-8">
            <div>
              <SubLabel>Semantic</SubLabel>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">
                {SEMANTIC_SWATCHES.map(([name, cls]) => (
                  <Swatch key={name} name={name} cls={cls} />
                ))}
              </div>
            </div>
            <div>
              <SubLabel>وضعیت‌ها</SubLabel>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {STATUS_SWATCHES.map(([name, cls]) => (
                  <Swatch key={name} name={name} cls={cls} />
                ))}
              </div>
            </div>
            <div>
              <SubLabel>دسته‌بندی‌ها</SubLabel>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">
                {CATEGORY_SWATCHES.map(([cat, cls]) => (
                  <CategorySwatch
                    key={cat}
                    cat={cat}
                    cls={cls}
                    label={CATEGORIES.find((c) => c.key === cat)?.label ?? cat}
                  />
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* ── تایپوگرافی ── */}
        <Section id="typography" title="تایپوگرافی">
          <div className="space-y-6">
            {TYPE_SCALE.map((t) => (
              <div
                key={t.token}
                className="flex items-baseline justify-between gap-6 border-b pb-6 last:border-0"
              >
                <p className={cn("min-w-0", t.cls)}>{t.sample}</p>
                <div
                  dir="ltr"
                  className="hidden shrink-0 text-left font-mono text-[11px] text-muted-foreground sm:block"
                >
                  <div>.{t.token}</div>
                  <div className="opacity-60">{t.usage}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-lg border bg-card p-4">
            <SubLabel>اعداد و تاریخ</SubLabel>
            <div className="mt-3 flex flex-wrap gap-x-10 gap-y-4">
              <div>
                <div className="text-xs text-muted-foreground">faNumber</div>
                <div className="font-bold">{faNumber(987654321)}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">faDate</div>
                <div className="font-bold">
                  {faDate("2025-03-21T09:00:00+03:30")}
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">faDuration</div>
                <div className="font-bold">{faDuration(134)}</div>
              </div>
            </div>
          </div>
        </Section>

        {/* ── دکمه‌ها ── */}
        <Section id="buttons" title="دکمه‌ها">
          <div className="space-y-8">
            <div>
              <SubLabel>Variants</SubLabel>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <Button>نمایش بیشتر</Button>
                <Button variant="secondary">ذخیره</Button>
                <Button variant="outline">اشتراک‌گذاری</Button>
                <Button variant="ghost">بستن</Button>
                <Button variant="link">ادامه مطلب</Button>
                <Button variant="destructive">حذف</Button>
              </div>
            </div>
            <div>
              <SubLabel>Sizes و State ها</SubLabel>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <Button size="sm">کوچک</Button>
                <Button>پیش‌فرض</Button>
                <Button size="lg">بزرگ</Button>
                <Button size="icon" aria-label="افزودن">
                  <Plus />
                </Button>
                <Button disabled>غیرفعال</Button>
                <Button disabled>
                  <Loader2 className="animate-spin" /> در حال ارسال
                </Button>
              </div>
            </div>
          </div>
        </Section>

        {/* ── نشان‌ها ── */}
        <Section id="badges" title="نشان‌ها">
          <div className="space-y-8">
            <div>
              <SubLabel>shadcn Badge</SubLabel>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <Badge>پیش‌فرض</Badge>
                <Badge variant="secondary">ثانویه</Badge>
                <Badge variant="outline">خط‌دار</Badge>
                <Badge variant="destructive">حذف‌شده</Badge>
              </div>
            </div>
            <div>
              <SubLabel>CategoryBadge — soft / solid</SubLabel>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {CATEGORIES.map((c) => (
                  <CategoryBadge key={c.key} category={c.key} label={c.label} />
                ))}
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {CATEGORIES.slice(0, 3).map((c) => (
                  <CategoryBadge
                    key={c.key}
                    category={c.key}
                    label={c.label}
                    variant="solid"
                  />
                ))}
              </div>
            </div>
            <div>
              <SubLabel>Live / Media / Byline</SubLabel>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <LiveBadge />
                <LiveBadge label="فوری" />
                <MediaBadge type="VIDEO" totalSeconds={134} />
                <MediaBadge type="IMAGE" />
                <MediaBadge type="IMAGE" count={12} />
              </div>
              <div className="mt-4 max-w-md rounded-lg border bg-card p-4">
                <Byline
                  name="سارا محمدی"
                  publishedAt="2025-06-10T12:30:00+03:30"
                  readingMinutes={6}
                />
              </div>
            </div>
          </div>
        </Section>

        {/* ── کارت خبر ── */}
        <Section id="cards" title="کارت خبر">
          <div className="space-y-10">
            <div className="space-y-3">
              <SubLabel>
                <code dir="ltr">variant=&quot;hero&quot;</code>
              </SubLabel>
              <PostCard data={toPost(heroData)} variant="hero" />
            </div>

            <div className="space-y-3">
              <SubLabel>
                <code dir="ltr">
                  variant=&quot;default&quot; / &quot;video&quot;
                </code>
              </SubLabel>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {defaultData.map((d) => (
                  <PostCard key={d.slug} data={toPost(d)} />
                ))}
              </div>
              <div className="grid gap-5 pt-4 sm:grid-cols-2">
                {videoData.map((d) => (
                  <PostCard key={d.slug} data={toPost(d)} variant="video" />
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <SubLabel>
                <code dir="ltr">variant=&quot;list&quot;</code> + SectionHeader
              </SubLabel>
              <SectionHeader title="سیاسی" href="#" />
              <div className="grid gap-3 lg:grid-cols-2">
                {listData.map((d) => (
                  <PostCard key={d.slug} data={toPost(d)} variant="list" />
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <SubLabel>
                <code dir="ltr">variant=&quot;compact&quot;</code>
              </SubLabel>
              <SectionHeader title="پربازدیدترین" />
              <div className="max-w-2xl space-y-3">
                {compactData.map((d) => (
                  <PostCard key={d.slug} data={toPost(d)} variant="compact" />
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* ── فرم‌ها ── */}
        <Section id="forms" title="فرم‌ها">
          <div className="max-w-md space-y-6">
            <div className="space-y-2">
              <label htmlFor="ds-search" className="text-sm font-medium">
                جستجو
              </label>
              <Input id="ds-search" placeholder="مثلاً: تورم، لیگ برتر، ..." />
            </div>
            <div className="space-y-2">
              <label htmlFor="ds-comment" className="text-sm font-medium">
                متن نظر
              </label>
              <Textarea
                id="ds-comment"
                placeholder="نظر خود را بنویسید..."
                rows={4}
              />
              <p className="text-xs text-muted-foreground">
                اعتبارسنجی با zod — در کامپوننت فرم واقعی
              </p>
            </div>
            <div className="flex gap-3">
              <Button>ارسال نظر</Button>
              <Button variant="ghost">انصراف</Button>
            </div>
          </div>
        </Section>

        {/* ── اجزای دیگر ── */}
        <Section id="misc" title="اجزای دیگر">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-3">
              <SubLabel>Avatar</SubLabel>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={IMG("rahgh-face1")} alt="" />
                  <AvatarFallback>س</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>م</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>ر</AvatarFallback>
                </Avatar>
              </div>
            </div>
            <div className="space-y-3">
              <SubLabel>Skeleton — حالت لودینگ کارت</SubLabel>
              <div className="flex gap-3">
                <Skeleton className="h-20 w-32 rounded-md" />
                <div className="flex-1 space-y-2 pt-1">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <SubLabel>Separator</SubLabel>
              <div className="max-w-xs">
                <p className="text-sm">متن بالا</p>
                <Separator className="my-3" />
                <p className="text-sm">متن پایین</p>
              </div>
            </div>
            <div className="space-y-3">
              <SubLabel>Tooltip</SubLabel>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger
                    render={<Button variant="outline">نشانه‌گذاری</Button>}
                  />
                  <TooltipContent>افزودن به فهرست خواندنی</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </Section>

        {/* ── وضعیت‌ها ── */}
        <Section id="states" title="وضعیت‌ها">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-3">
              <SubLabel>EmptyState</SubLabel>
              <div className="rounded-xl border">
                <EmptyState
                  title="خالی"
                  description="وقتی لیست یا نتیجه جستجو خالی است."
                />
              </div>
            </div>
            <div className="space-y-3">
              <SubLabel>ErrorState</SubLabel>
              <div className="rounded-xl border">
                <ErrorState
                  title="ارور"
                  description="وقتی بارگذاری داده ناموفق است."
                />
              </div>
            </div>
            <div className="space-y-3 lg:col-span-2">
              <SubLabel>StatusPage — embedded (۴۰۳)</SubLabel>
              <StatusPage
                embedded
                code={403}
                icon={ShieldAlert}
                title="دسترسی غیرمجاز"
                description="برای مشاهده این بخش باید با حساب مدیر وارد شوید."
                homeHref="#"
                homeLabel="بازگشت"
              />
            </div>
          </div>
        </Section>

        <footer className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
          این صفحه ابزار توسعه است. قبل از انتشار نهایی، مسیر{" "}
          <code dir="ltr">/design-system</code> را حذف کن یا با middleware فقط
          برای ادمین باز نگهش دار.
        </footer>
      </main>
    </div>
  );
}
