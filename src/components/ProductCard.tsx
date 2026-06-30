import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import type { ProductWithCategory } from "@/lib/types";
import { categoryVisuals, productIconByCategory } from "@/lib/visuals";

export function ProductCard({ product }: { product: ProductWithCategory }) {
  const category = product.categories;
  const tint = categoryVisuals[category.slug]?.tint ?? "from-slate-50 to-slate-100";
  const icon = productIconByCategory[category.slug] ?? "▫️";

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className={`bg-gradient-to-br ${tint} p-4`}>
        <ImagePlaceholder icon={icon} src={product.image_url} alt={product.name} className="aspect-[4/3] rounded-xl bg-white/65" />
      </div>
      <div className="p-5">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-orange-500">{category.name}</p>
        <h3 className="mt-2 text-lg font-black leading-tight text-slate-950">{product.name}</h3>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">{product.description}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-blue-950">
          View details <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
