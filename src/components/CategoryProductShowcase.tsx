import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import type { Category, ProductWithCategory } from "@/lib/types";
import { categoryVisuals, productIconByCategory } from "@/lib/visuals";

function pickCategoryProduct(category: Category, products: ProductWithCategory[]) {
  return products
    .filter((product) => product.category_id === category.id)
    .sort((a, b) => Number(b.is_featured) - Number(a.is_featured) || a.sort_order - b.sort_order)[0];
}

export function CategoryProductShowcase({
  categories,
  products,
}: {
  categories: Category[];
  products: ProductWithCategory[];
}) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {categories.map((category) => {
        const product = pickCategoryProduct(category, products);
        const visual = categoryVisuals[category.slug] ?? { icon: "?", tint: "from-slate-50 to-slate-100" };
        const icon = productIconByCategory[category.slug] ?? visual.icon;

        return (
          <section
            key={category.id}
            className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className={`bg-gradient-to-br ${visual.tint} p-4`}>
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex h-9 min-w-9 items-center justify-center rounded-full bg-white/85 px-3 text-sm font-black text-blue-950 shadow-sm">
                  {category.sort_order}
                </span>
                <Link
                  href={`/categories/${category.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-black text-blue-950 transition hover:text-orange-500"
                >
                  Explore all items <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-4 overflow-hidden rounded-xl bg-white/75 shadow-sm ring-1 ring-white/70">
                <ImagePlaceholder
                  icon={icon}
                  src={product?.image_url ?? category.image_url}
                  alt={product?.name ?? category.name}
                  className="aspect-[4/3] rounded-xl bg-white/70"
                />
              </div>
            </div>
            <div className="p-5">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-orange-500">{category.name}</p>
              <h3 className="mt-2 line-clamp-2 min-h-[3.5rem] text-xl font-black leading-tight text-slate-950">
                {product?.name ?? category.name}
              </h3>
              <p className="mt-3 line-clamp-2 min-h-12 text-sm leading-6 text-slate-600">
                {product?.description ?? category.description}
              </p>
            </div>
          </section>
        );
      })}
    </div>
  );
}
