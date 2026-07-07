import { createClient } from "@supabase/supabase-js";
import { categories as sampleCategories, homeSlides as sampleHomeSlides } from "@/lib/sample-data";
import { getLocalHomeSlides, getLocalProducts } from "@/lib/local-catalog";
import type { Category, HomeSlide, ProductWithCategory } from "@/lib/types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: false,
        },
      })
    : null;

const withFallbackDelay = async () => {
  if (!supabase) {
    await new Promise((resolve) => setTimeout(resolve, 120));
  }
};

function withCategoryImageFallback(category: Category): Category {
  const sampleCategory = sampleCategories.find((item) => item.slug === category.slug);
  return {
    ...category,
    image_url: category.image_url ?? sampleCategory?.image_url ?? null,
  };
}

export async function getCategories(): Promise<Category[]> {
  if (!supabase) {
    await withFallbackDelay();
    return sampleCategories;
  }

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map(withCategoryImageFallback);
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  if (!supabase) {
    await withFallbackDelay();
    return sampleCategories.find((category) => category.slug === slug) ?? null;
  }

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data ? withCategoryImageFallback(data) : null;
}

export async function getProducts(): Promise<ProductWithCategory[]> {
  if (!supabase) {
    await withFallbackDelay();
    return getLocalProducts();
  }

  const { data, error } = await supabase
    .from("products")
    .select("*, categories(*)")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as ProductWithCategory[];
}

export async function getProductsByCategory(categoryId: string): Promise<ProductWithCategory[]> {
  if (!supabase) {
    await withFallbackDelay();
    return (await getLocalProducts()).filter((product) => product.category_id === categoryId);
  }

  const { data, error } = await supabase
    .from("products")
    .select("*, categories(*)")
    .eq("category_id", categoryId)
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as ProductWithCategory[];
}

export async function getProductBySlug(slug: string): Promise<ProductWithCategory | null> {
  if (!supabase) {
    await withFallbackDelay();
    return (await getLocalProducts()).find((product) => product.slug === slug) ?? null;
  }

  const { data, error } = await supabase
    .from("products")
    .select("*, categories(*)")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data as ProductWithCategory | null;
}

export async function getHomeSlides({ activeOnly = true } = {}): Promise<HomeSlide[]> {
  if (!supabase) {
    await withFallbackDelay();
    return getLocalHomeSlides({ activeOnly });
  }

  let query = supabase
    .from("home_slides")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (activeOnly) {
    query = query.eq("is_active", true);
  }

  const { data, error } = await query;

  if (error) {
    if (error.code === "42P01") {
      return sampleHomeSlides;
    }

    throw new Error(error.message);
  }

  return (data ?? []) as HomeSlide[];
}

export async function searchCatalog(query: string) {
  const normalized = query.trim().toLowerCase();
  const [allCategories, allProducts] = await Promise.all([getCategories(), getProducts()]);

  if (!normalized) {
    return {
      categories: allCategories,
      products: allProducts,
    };
  }

  return {
    categories: allCategories.filter((category) =>
      `${category.name} ${category.description ?? ""}`.toLowerCase().includes(normalized),
    ),
    products: allProducts.filter((product) =>
      `${product.name} ${product.description ?? ""} ${product.categories.name}`.toLowerCase().includes(normalized),
    ),
  };
}
