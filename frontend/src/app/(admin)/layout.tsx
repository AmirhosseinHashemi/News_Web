import { AdminShell } from "@/components/admin/AdminShell";

export default async function AdminLayout({
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
