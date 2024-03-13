import AdminSidebar from "@/app/components/adminNavbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex">
      <AdminSidebar />
      <div className="flex-grow">{children}</div>
    </section>
  );
}
