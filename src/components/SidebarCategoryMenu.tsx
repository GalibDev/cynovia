import { ChevronRight, Grid2X2 } from "lucide-react";
import Link from "next/link";
import type { Category } from "@/lib/types";
import { categoryVisuals } from "@/lib/visuals";

export function SidebarCategoryMenu({ categories }: { categories: Category[] }) {
  return (
    <aside className="hidden w-72 shrink-0 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm lg:block">
      <div className="flex items-center gap-3 bg-blue-950 px-5 py-4 text-white">
        <Grid2X2 className="h-5 w-5" />
        <h2 className="font-semibold">Categories</h2>
      </div>
      <nav className="divide-y divide-slate-50">
        {categories.map((category) => {
          const visual = categoryVisuals[category.slug];

          return (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group flex items-center gap-3 px-4 py-3 text-[13px] text-slate-700 transition hover:bg-slate-50 hover:text-blue-950"
            >
              <span className="w-5 text-xs font-bold text-slate-500">{category.sort_order}</span>
              <span className="text-lg" aria-hidden="true">
                {visual?.icon ?? "▫️"}
              </span>
              <span className="min-w-0 flex-1 truncate font-medium">{category.name}</span>
              <ChevronRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-0.5" />
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
