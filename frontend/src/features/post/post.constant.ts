import type {
  PostLocationOption,
  PostTypeOption,
} from "@/features/post/post.type";

export const POST_TYPE_OPTIONS: PostTypeOption[] = [
  { id: 1, name: "اخبار" },
  { id: 2, name: "اطلاعیه" },
  { id: 3, name: "عمومی" },
];

export const POST_LOCATION_OPTIONS: PostLocationOption[] = [
  { id: 1, name: "محلی" },
  { id: 2, name: "کاشان" },
  { id: 3, name: "ملی" },
  { id: 4, name: "بین‌المللی" },
];
