import { AboutCynovia } from "@/components/AboutCynovia";
import { CategoryCard } from "@/components/CategoryCard";
import { FeatureStrip } from "@/components/FeatureStrip";
import { FeaturedProductCarousel } from "@/components/FeaturedProductCarousel";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroSlider } from "@/components/HeroSlider";
import { SectionHeader } from "@/components/SectionHeader";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getCategories, getHomeSlides, getProducts } from "@/lib/supabase";
import type { ProductWithCategory } from "@/lib/types";

function pickFeaturedProducts(products: ProductWithCategory[]) {
  const preferredProducts = [...products].sort((a, b) => {
    if (a.is_featured !== b.is_featured) {
      return a.is_featured ? -1 : 1;
    }

    return a.sort_order - b.sort_order;
  });
  const selected: ProductWithCategory[] = [];
  const usedCategories = new Set<string>();

  for (const product of preferredProducts) {
    if (selected.length >= 8) {
      break;
    }

    if (!usedCategories.has(product.category_id)) {
      selected.push(product);
      usedCategories.add(product.category_id);
    }
  }

  for (const product of preferredProducts) {
    if (selected.length >= 8) {
      break;
    }

    if (!selected.some((item) => item.id === product.id)) {
      selected.push(product);
    }
  }

  return selected;
}

export default async function Home() {
  const [categories, products, homeSlides] = await Promise.all([getCategories(), getProducts(), getHomeSlides()]);
  const featuredProducts = pickFeaturedProducts(products);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="mx-auto max-w-[1500px] space-y-10 px-4 py-6 sm:px-6 lg:px-8">
        <HeroSlider slides={homeSlides} />
        <section>
          <div className="text-center">
            <SectionHeader title="Shop by Category" text="Browse all 11 CYNOVIA catalog groups and contact us for product sourcing inquiries." />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>
        <section>
          <div className="text-center">
            <SectionHeader title="Featured Products" />
          </div>
          <FeaturedProductCarousel products={featuredProducts} />
        </section>
        <FeatureStrip />
        <AboutCynovia />
      </main>
      <Footer categories={categories} />
      <WhatsAppButton />
    </div>
  );
}
