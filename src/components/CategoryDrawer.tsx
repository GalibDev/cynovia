"use client";

import { ChevronRight, Grid2X2, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { Category } from "@/lib/types";
import { categoryVisuals } from "@/lib/visuals";

type CategoryDrawerProps = {
  categories: Category[];
  variant?: "primary" | "light";
};

export function CategoryDrawer({ categories, variant = "primary" }: CategoryDrawerProps) {
  const [open, setOpen] = useState(false);
  const buttonClass =
    variant === "light"
      ? "border border-slate-200 bg-white text-slate-900 shadow-sm hover:border-blue-200 hover:bg-blue-50"
      : "bg-blue-950 text-white shadow-lg shadow-blue-950/10 hover:bg-blue-900";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Browse Categories"
        className={`inline-flex h-[46px] shrink-0 items-center justify-center gap-2 rounded-xl px-5 text-sm font-bold transition ${buttonClass}`}
      >
        <Menu className="h-4 w-4" />
        Browse Categories
      </button>

      <div
        className={`fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[88vw] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-950 text-white">
              <Grid2X2 className="h-5 w-5" />
            </span>
            <div>
              <h2 className="font-black text-slate-950">Browse Categories</h2>
              <p className="text-xs font-semibold text-slate-500">CYNOVIA catalog menu</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-700 transition hover:bg-slate-200"
            aria-label="Close category drawer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {categories.map((category) => {
              const visual = categoryVisuals[category.slug];

              return (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  onClick={() => setOpen(false)}
                  className="group flex items-center gap-3 rounded-xl border border-slate-100 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm transition hover:border-blue-100 hover:bg-blue-50 hover:text-blue-950"
                >
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-50 text-xs font-black text-blue-950">
                    {category.sort_order}
                  </span>
                  <span className="text-xl" aria-hidden="true">
                    {visual?.icon ?? "▫️"}
                  </span>
                  <span className="min-w-0 flex-1 font-bold">{category.name}</span>
                  <ChevronRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-0.5" />
                </Link>
              );
            })}
          </div>
        </nav>
      </aside>
    </>
  );
}
