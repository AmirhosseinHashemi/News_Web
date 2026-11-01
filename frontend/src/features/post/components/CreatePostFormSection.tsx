import { Skeleton } from "@/components/ui/skeleton";
import { getCategoriesReq } from "@/features/category/category.api";
import { CreatePostForm } from "@/features/post/components/CreatePostForm";
import {
  POST_LOCATION_OPTIONS,
  POST_TYPE_OPTIONS,
} from "@/features/post/post.constant";

export async function CreatePostFormSection() {
  const categoriesResponse = await getCategoriesReq({ limit: 100 });
  const categories = categoriesResponse.success ? categoriesResponse.data : [];

  return (
    <CreatePostForm
      categories={categories}
      types={POST_TYPE_OPTIONS}
      locations={POST_LOCATION_OPTIONS}
    />
  );
}

export function CreatePostFormSkeleton() {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <div className="space-y-6">
        <Skeleton className="h-96 rounded-xl" />
        <Skeleton className="h-64 rounded-xl" />
      </div>

      <div className="space-y-6">
        <Skeleton className="h-80 rounded-xl" />
        <Skeleton className="h-56 rounded-xl" />
      </div>
    </div>
  );
}
