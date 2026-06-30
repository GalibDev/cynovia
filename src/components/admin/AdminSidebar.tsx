"use client";

import Link from "next/link";
import { Box, ChevronsLeft, ChevronsRight, LayoutDashboard, LogOut, Package, Tags } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/categories", label: "Categories", icon: Tags },
  { href: "/admin/products", label: "Products", icon: Package },
];

export function AdminSidebar({ logoutAction }: { logoutAction: () => void | Promise<void> }) {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty("--admin-sidebar-width", collapsed ? "6rem" : "18rem");
  }, [collapsed]);

  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 hidden border-r border-slate-200 bg-white transition-all duration-300 lg:block ${
          collapsed ? "w-24" : "w-72"
        }`}
      >
        <button
          type="button"
          onClick={() => setCollapsed((value) => !value)}
          className="flex h-24 w-full items-center gap-3 px-6 text-left transition hover:bg-slate-50"
          title={collapsed ? "Show sidebar" : "Hide sidebar"}
        >
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-950 text-white">
            <Box className="h-5 w-5" />
          </span>
          <span className={`min-w-0 transition ${collapsed ? "hidden" : "block"}`}>
            <span className="block text-xl font-black text-slate-950">BizMart</span>
            <span className="mt-1 block text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Admin Panel</span>
          </span>
          <span className={`ml-auto text-slate-400 ${collapsed ? "hidden" : "block"}`}>
            <ChevronsLeft className="h-4 w-4" />
          </span>
        </button>

        {collapsed ? (
          <button
            type="button"
            onClick={() => setCollapsed(false)}
            className="mx-auto mt-2 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition hover:bg-blue-50 hover:text-blue-950"
            aria-label="Show admin sidebar"
          >
            <ChevronsRight className="h-4 w-4" />
          </button>
        ) : null}

        <nav className="mt-6 space-y-2 px-4">
          {links.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center rounded-xl px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 hover:text-blue-950 ${
                  collapsed ? "justify-center" : "gap-3"
                }`}
                title={item.label}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span className={collapsed ? "sr-only" : "block"}>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <form action={logoutAction} className={`absolute bottom-6 ${collapsed ? "left-4 right-4" : "left-4 right-4"}`}>
          <button
            className={`flex w-full items-center justify-center rounded-xl bg-slate-100 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-orange-50 hover:text-orange-600 ${
              collapsed ? "" : "gap-2"
            }`}
            title="Logout"
          >
            <LogOut className="h-4 w-4" />
            <span className={collapsed ? "sr-only" : "block"}>Logout</span>
          </button>
        </form>
      </aside>
    </>
  );
}
