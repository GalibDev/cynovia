import Link from "next/link";
import { Suspense } from "react";
import { Logo } from "@/components/Logo";
import { SearchBar } from "@/components/SearchBar";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/categories", label: "Browse Categories" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
];

export async function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-4 px-4 py-4 sm:px-6 lg:min-h-24 lg:flex-row lg:items-center lg:gap-10 lg:px-8 lg:py-0">
        <div className="flex shrink-0 items-center justify-between gap-4">
          <Logo />
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-5 text-sm font-black text-slate-800 lg:order-none lg:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition hover:text-orange-500 ${item.label === "Browse Categories" ? "text-blue-950" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Suspense
          fallback={
            <div className="h-[46px] w-full max-w-[430px] rounded-xl border border-slate-200 bg-white shadow-sm lg:ml-auto" />
          }
        >
          <SearchBar className="lg:ml-auto lg:max-w-[430px]" />
        </Suspense>
      </div>
    </header>
  );
}
