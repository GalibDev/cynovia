import { CategoryCard } from "@/components/CategoryCard";
import { EmptyState } from "@/components/EmptyState";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeader } from "@/components/SectionHeader";
import { groupProductsByCategory } from "@/lib/utils";
import { searchCatalog } from "@/lib/supabase";

type CategoriesPageProps = {
  searchParams: Promise<{
    query?: string;
  }>;
};

export default async function CategoriesPage({ searchParams }: CategoriesPageProps) {
  const params = await searchParams;
  const query = params.query?.trim() ?? "";
  const { categories, products } = await searchCatalog(query);
  const groupedProducts = groupProductsByCategory(products, categories);
  const hasResults = categories.length > 0 || products.length > 0;

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow={query ? "Search Results" : "Catalog"}
          title={query ? `Results for "${query}"` : "All Categories"}
          text="Choose a category to view catalog items, or search by product and category name from the header."
        />

        {!hasResults ? (
          <EmptyState title="No matching catalog items" text="Try another search term or browse all BizMart categories." />
        ) : (
          <div className="space-y-10">
            {categories.length > 0 ? (
              <section>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {categories.map((category) => (
                    <CategoryCard key={category.id} category={category} />
                  ))}
                </div>
              </section>
            ) : null}

            {products.length > 0 ? (
              <section>
                <SectionHeader title={query ? "Matching Products" : "Products by Category"} />
                <div className="space-y-8">
                  {query ? (
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  ) : (
                    groupedProducts.map((group) => (
                      <div key={group.category.id}>
                        <h3 className="mb-4 text-xl font-black text-slate-950">{group.category.name}</h3>
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                          {group.products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </section>
            ) : null}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
