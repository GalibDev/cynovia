import { createClient } from "@supabase/supabase-js";
import { categories as sampleCategories, products as sampleProducts } from "@/lib/sample-data";
import type { Category, ProductWithCategory } from "@/lib/types";

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

  return data ?? [];
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

  return data;
}

export async function getProducts(): Promise<ProductWithCategory[]> {
  if (!supabase) {
    await withFallbackDelay();
    return sampleProducts;
  }

  const { data, error } = await supabase
    .from("products")
    .select("*, categories(*)")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as ProductWithCategory[];
}

export async function getProductsByCategory(categoryId: string): Promise<ProductWithCategory[]> {
  if (!supabase) {
    await withFallbackDelay();
    return sampleProducts.filter((product) => product.category_id === categoryId);
  }

  const { data, error } = await supabase
    .from("products")
    .select("*, categories(*)")
    .eq("category_id", categoryId)
    .order("name", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as ProductWithCategory[];
}

export async function getProductBySlug(slug: string): Promise<ProductWithCategory | null> {
  if (!supabase) {
    await withFallbackDelay();
    return sampleProducts.find((product) => product.slug === slug) ?? null;
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
