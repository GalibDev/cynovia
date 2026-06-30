import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { categories, products as sampleProducts } from "@/lib/sample-data";
import type { Product, ProductWithCategory } from "@/lib/types";

const dataDir = path.join(process.cwd(), "data");
const productsFile = path.join(dataDir, "admin-products.json");
const uploadsDir = path.join(process.cwd(), "public", "uploads");

type ProductInput = {
  category_id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  sort_order: number;
  is_featured: boolean;
};

function attachCategory(product: Product): ProductWithCategory | null {
  const category = categories.find((item) => item.id === product.category_id);
  return category ? { ...product, categories: category } : null;
}

async function readProducts(): Promise<Product[]> {
  try {
    const raw = await readFile(productsFile, "utf8");
    return JSON.parse(raw) as Product[];
  } catch {
    return sampleProducts.map((product) => ({
      id: product.id,
      category_id: product.category_id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      image_url: product.image_url,
      sort_order: product.sort_order,
      is_featured: product.is_featured,
      created_at: product.created_at,
    }));
  }
}

async function writeProducts(products: Product[]) {
  await mkdir(dataDir, { recursive: true });
  await writeFile(productsFile, `${JSON.stringify(products, null, 2)}\n`, "utf8");
}

export async function getLocalProducts(): Promise<ProductWithCategory[]> {
  const products = await readProducts();
  return products
    .map(attachCategory)
    .filter((product): product is ProductWithCategory => Boolean(product))
    .sort((a, b) => a.sort_order - b.sort_order || b.created_at.localeCompare(a.created_at));
}

export async function createLocalProduct(input: ProductInput) {
  const products = await readProducts();
  const nextSortOrder =
    input.sort_order > 0 ? input.sort_order : products.reduce((max, product) => Math.max(max, product.sort_order), 0) + 1;

  if (products.some((product) => product.slug === input.slug)) {
    throw new Error("A product with this slug already exists.");
  }

  products.push({
    id: crypto.randomUUID(),
    ...input,
    sort_order: nextSortOrder,
    created_at: new Date().toISOString(),
  });

  await writeProducts(products);
}

export async function updateLocalProduct(id: string, input: ProductInput) {
  const products = await readProducts();
  const index = products.findIndex((product) => product.id === id);

  if (index === -1) {
    throw new Error("Product not found.");
  }

  if (products.some((product) => product.id !== id && product.slug === input.slug)) {
    throw new Error("A product with this slug already exists.");
  }

  products[index] = {
    ...products[index],
    ...input,
  };

  await writeProducts(products);
}

export async function toggleLocalProductFeatured(id: string) {
  const products = await readProducts();
  const product = products.find((item) => item.id === id);

  if (!product) {
    throw new Error("Product not found.");
  }

  product.is_featured = !product.is_featured;
  await writeProducts(products);
}

export async function deleteLocalProduct(id: string) {
  const products = await readProducts();
  await writeProducts(products.filter((product) => product.id !== id));
}

export async function saveLocalUpload(file: File, folder: string, slug: string) {
  const extension = file.name.split(".").pop()?.toLowerCase() || "png";
  const cleanSlug = slug || "image";
  const filename = `${cleanSlug}-${Date.now()}.${extension}`;
  const relativePath = `/uploads/${folder}/${filename}`;
  const targetDir = path.join(uploadsDir, folder);
  const targetFile = path.join(targetDir, filename);

  await mkdir(targetDir, { recursive: true });
  await writeFile(targetFile, Buffer.from(await file.arrayBuffer()));

  return relativePath;
}
