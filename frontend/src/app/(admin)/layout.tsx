import { AdminShell } from "@/components/admin/AdminShell";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminShell user={{ name: "امیرحسین", role: "مدیر" }}>
      {children}
    </AdminShell>
  );
}
