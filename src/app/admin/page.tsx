import Link from "next/link";
import { Package, Tags, Star } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { requireAdmin } from "@/lib/admin-auth";
import { getCategories, getProducts } from "@/lib/supabase";

export default async function AdminDashboardPage() {
  await requireAdmin();
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);
  const featuredCount = products.filter((product) => product.is_featured).length;

  const stats = [
    { label: "Categories", value: categories.length, icon: Tags, href: "/admin/categories" },
    { label: "Products", value: products.length, icon: Package, href: "/admin/products" },
    { label: "Featured", value: featuredCount, icon: Star, href: "/admin/products" },
  ];

  return (
    <AdminShell>
      <div className="grid gap-5 md:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Link key={stat.label} href={stat.href} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-md">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-950 text-white">
                <Icon className="h-5 w-5" />
              </span>
              <p className="mt-5 text-4xl font-black text-slate-950">{stat.value}</p>
              <p className="mt-1 text-sm font-bold text-slate-500">{stat.label}</p>
            </Link>
          );
        })}
      </div>

      <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-xl font-black text-slate-950">Quick Actions</h2>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/admin/categories" className="rounded-lg bg-blue-950 px-5 py-3 text-sm font-bold text-white">
            Manage Categories
          </Link>
          <Link href="/admin/products" className="rounded-lg bg-orange-500 px-5 py-3 text-sm font-bold text-white">
            Manage Products
          </Link>
          <Link href="/" className="rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700">
            View Website
          </Link>
        </div>
      </section>
    </AdminShell>
  );
}
