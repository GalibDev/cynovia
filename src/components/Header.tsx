import Link from "next/link";
import { Suspense } from "react";
import { CategoryDrawer } from "@/components/CategoryDrawer";
import { Logo } from "@/components/Logo";
import { SearchBar } from "@/components/SearchBar";
import { getCategories } from "@/lib/supabase";
import type { Category } from "@/lib/types";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/categories", label: "Products" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
];

export async function Header({ categories }: { categories?: Category[] }) {
  const drawerCategories = categories ?? (await getCategories());

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-4 px-4 py-4 sm:px-6 lg:min-h-20 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:px-6 lg:py-0">
        <div className="flex items-center justify-between gap-4">
          <Logo />
        </div>
        <Suspense
          fallback={
            <div className="h-[46px] w-full max-w-[380px] rounded-xl border border-slate-200 bg-white shadow-sm" />
          }
        >
          <SearchBar className="lg:max-w-[380px]" />
        </Suspense>
        <nav className="flex flex-wrap items-center justify-center gap-4 text-sm font-semibold text-slate-700 lg:flex-1 lg:justify-end lg:gap-7">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-orange-500">
              {item.label}
            </Link>
          ))}
          <CategoryDrawer categories={drawerCategories} variant="light" />
        </nav>
      </div>
    </header>
  );
}
