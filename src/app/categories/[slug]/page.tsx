import { notFound } from "next/navigation";
import { EmptyState } from "@/components/EmptyState";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeader } from "@/components/SectionHeader";
import { getCategoryBySlug, getProductsByCategory } from "@/lib/supabase";
import { categoryVisuals } from "@/lib/visuals";

type CategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = await getProductsByCategory(category.id);
  const visual = categoryVisuals[category.slug] ?? { icon: "▫️", tint: "from-slate-50 to-slate-100" };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section className={`grid gap-8 rounded-2xl bg-gradient-to-br ${visual.tint} p-6 shadow-sm ring-1 ring-black/5 md:grid-cols-[1fr_280px] md:p-10`}>
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-orange-500">Category</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950">{category.name}</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700">{category.description}</p>
          </div>
          <ImagePlaceholder icon={visual.icon} src={category.image_url} alt={category.name} className="aspect-[4/3] bg-white/70" priority />
        </section>

        <section className="mt-10">
          <SectionHeader title="Products" text="Select a product to view details and send an inquiry." />
          {products.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <EmptyState title="No products in this category yet" text="Please contact CYNOVIA for sourcing help in this category." />
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
