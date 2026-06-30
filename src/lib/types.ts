export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  sort_order: number;
};

export type Product = {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  sort_order: number;
  is_featured: boolean;
  created_at: string;
  categories?: Category | null;
};

export type ProductWithCategory = Product & {
  categories: Category;
};

export type HomeSlide = {
  id: string;
  title: string;
  subtitle: string | null;
  badge: string | null;
  image_url: string | null;
  primary_label: string;
  primary_href: string;
  secondary_label: string | null;
  secondary_href: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
};
