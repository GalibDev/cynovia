import Link from "next/link";
import { LayoutDashboard, Package, Tags } from "lucide-react";
import { logoutAdmin } from "@/app/admin/actions";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/categories", label: "Categories", icon: Tags },
  { href: "/admin/products", label: "Products", icon: Package },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-100">
      <AdminSidebar logoutAction={logoutAdmin} />
      <div className="transition-[padding] duration-300 lg:pl-[var(--admin-sidebar-width,18rem)]">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-orange-500">BizMart Admin</p>
              <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-950">Catalog Management</h1>
            </div>
            <div className="flex flex-wrap gap-2">
              {links.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700 lg:hidden">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </header>
        <main className="px-4 py-8 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
