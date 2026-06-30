import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import type { Category } from "@/lib/types";
import { categoryVisuals } from "@/lib/visuals";

export function CategoryCard({ category }: { category: Category }) {
  const visual = categoryVisuals[category.slug] ?? { icon: "▫️", tint: "from-slate-50 to-slate-100" };

  return (
    <Link
      href={`/categories/${category.slug}`}
      className={`group flex min-h-40 flex-col justify-between overflow-hidden rounded-xl bg-gradient-to-br ${visual.tint} p-4 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-md`}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/75 text-base font-black text-blue-950 shadow-sm">
          {category.sort_order}
        </span>
        <ImagePlaceholder icon={visual.icon} src={category.image_url} alt={category.name} className="h-20 w-24 rounded-xl" />
      </div>
      <div>
        <h3 className="text-lg font-black leading-tight text-slate-950">{category.name}</h3>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-950">
          Explore <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
