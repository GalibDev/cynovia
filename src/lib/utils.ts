import type { Category, ProductWithCategory } from "@/lib/types";

export function contactHref(message?: string) {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const text = encodeURIComponent(message ?? "Hello BizMart, I want to inquire about your products.");

  if (!phone) {
    return `/contact?message=${text}`;
  }

  return `https://wa.me/${phone}?text=${text}`;
}

export function groupProductsByCategory(products: ProductWithCategory[], categories: Category[]) {
  return categories
    .map((category) => ({
      category,
      products: products.filter((product) => product.category_id === category.id),
    }))
    .filter((group) => group.products.length > 0);
}
