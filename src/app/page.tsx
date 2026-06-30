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

export default async function Home() {
  const [categories, products, homeSlides] = await Promise.all([getCategories(), getProducts(), getHomeSlides()]);
  const featuredNames = [
    "3-Nozzle Soft Ice Cream Making Machine",
    "Commercial Oven",
    "ABLE Dialysis Catheter Kit",
    "DDF Printer Ink",
    "Men's Premium Shirt",
    "Corporate Gift Set",
  ];
  const featuredProducts = featuredNames
    .map((name) => products.find((product) => product.name === name))
    .filter((product): product is ProductWithCategory => Boolean(product));

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
