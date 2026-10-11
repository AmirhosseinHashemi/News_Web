import { StatusPage } from "@/components/shared/StatusPage";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <StatusPage
      code={404}
      icon={FileQuestion}
      title="صفحه پیدا نشد"
      description="صفحه‌ای که به دنبال آن هستید وجود ندارد یا جابه‌جا شده است."
      homeLabel="صفحه اصلی"
      secondaryHref="/admin"
      secondaryLabel="پنل مدیریت"
    />
  );
}
