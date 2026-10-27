export const ROUTES = {
  login: "/login",
  admin: "/admin",
  articles: "/admin/articles",
  categories: "/admin/categories",
} as const;

export const ROUTE_TITLES: Record<string, string> = {
  [ROUTES.admin]: "داشبورد",
  [ROUTES.articles]: "خبرها",
  [ROUTES.categories]: "دسته‌بندی‌ها",
  [ROUTES.login]: "ورود",
};

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];

export function getRouteTitle(pathname: string) {
  return ROUTE_TITLES[pathname] ?? "اخبار رحق";
}
