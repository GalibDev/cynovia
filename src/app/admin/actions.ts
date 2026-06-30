"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { clearAdminSession, getAdminPassword, requireAdmin, setAdminSession } from "@/lib/admin-auth";
import { getAdminStorageBucket, getAdminSupabase, slugify } from "@/lib/admin-supabase";

function textValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function optionalTextValue(formData: FormData, key: string) {
  const value = textValue(formData, key);
  return value.length > 0 ? value : null;
}

function revalidateCatalog() {
  revalidatePath("/");
  revalidatePath("/categories");
  revalidatePath("/admin");
  revalidatePath("/admin/categories");
  revalidatePath("/admin/products");
}

async function resolveImageUrl(
  supabase: ReturnType<typeof getAdminSupabase>,
  formData: FormData,
  folder: string,
  slug: string,
) {
  const imageFile = formData.get("image_file");

  if (imageFile instanceof File && imageFile.size > 0) {
    const extension = imageFile.name.split(".").pop()?.toLowerCase() || "png";
    const cleanSlug = slugify(slug) || "image";
    const path = `${folder}/${cleanSlug}-${Date.now()}.${extension}`;
    const bytes = Buffer.from(await imageFile.arrayBuffer());
    const bucket = getAdminStorageBucket();
    const { error } = await supabase.storage.from(bucket).upload(path, bytes, {
      contentType: imageFile.type || "image/png",
      upsert: true,
    });

    if (error) {
      throw new Error(`Image upload failed: ${error.message}`);
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  }

  return optionalTextValue(formData, "image_url");
}

export async function loginAdmin(formData: FormData) {
  const password = textValue(formData, "password");

  if (password !== getAdminPassword()) {
    redirect("/admin/login?error=Invalid%20password");
  }

  await setAdminSession();
  redirect("/admin");
}

export async function logoutAdmin() {
  await clearAdminSession();
  redirect("/admin/login");
}

export async function createCategory(formData: FormData) {
  await requireAdmin();

  const name = textValue(formData, "name");
  const slug = textValue(formData, "slug") || slugify(name);
  const sortOrder = Number(textValue(formData, "sort_order") || "0");

  if (!name || !slug) {
    throw new Error("Category name and slug are required.");
  }

  const supabase = getAdminSupabase();
  const imageUrl = await resolveImageUrl(supabase, formData, "categories", slug);
  const { error } = await supabase.from("categories").insert({
    name,
    slug,
    description: optionalTextValue(formData, "description"),
    image_url: imageUrl,
    sort_order: Number.isFinite(sortOrder) ? sortOrder : 0,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidateCatalog();
  redirect("/admin/categories");
}

export async function updateCategory(formData: FormData) {
  await requireAdmin();

  const id = textValue(formData, "id");
  const name = textValue(formData, "name");
  const slug = textValue(formData, "slug") || slugify(name);
  const sortOrder = Number(textValue(formData, "sort_order") || "0");

  if (!id || !name || !slug) {
    throw new Error("Category id, name, and slug are required.");
  }

  const supabase = getAdminSupabase();
  const imageUrl = await resolveImageUrl(supabase, formData, "categories", slug);
  const { error } = await supabase
    .from("categories")
    .update({
      name,
      slug,
      description: optionalTextValue(formData, "description"),
      image_url: imageUrl,
      sort_order: Number.isFinite(sortOrder) ? sortOrder : 0,
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidateCatalog();
  revalidatePath(`/categories/${slug}`);
  redirect("/admin/categories");
}

export async function deleteCategory(formData: FormData) {
  await requireAdmin();

  const id = textValue(formData, "id");

  if (!id) {
    throw new Error("Category id is required.");
  }

  const supabase = getAdminSupabase();
  const { error } = await supabase.from("categories").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidateCatalog();
  redirect("/admin/categories");
}

export async function createProduct(formData: FormData) {
  await requireAdmin();

  const name = textValue(formData, "name");
  const slug = textValue(formData, "slug") || slugify(name);
  const categoryId = textValue(formData, "category_id");

  if (!name || !slug || !categoryId) {
    throw new Error("Product name, slug, and category are required.");
  }

  const supabase = getAdminSupabase();
  const imageUrl = await resolveImageUrl(supabase, formData, "products", slug);
  const { error } = await supabase.from("products").insert({
    category_id: categoryId,
    name,
    slug,
    description: optionalTextValue(formData, "description"),
    image_url: imageUrl,
    is_featured: formData.get("is_featured") === "on",
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidateCatalog();
  redirect("/admin/products");
}

export async function updateProduct(formData: FormData) {
  await requireAdmin();

  const id = textValue(formData, "id");
  const name = textValue(formData, "name");
  const slug = textValue(formData, "slug") || slugify(name);
  const categoryId = textValue(formData, "category_id");

  if (!id || !name || !slug || !categoryId) {
    throw new Error("Product id, name, slug, and category are required.");
  }

  const supabase = getAdminSupabase();
  const imageUrl = await resolveImageUrl(supabase, formData, "products", slug);
  const { error } = await supabase
    .from("products")
    .update({
      category_id: categoryId,
      name,
      slug,
      description: optionalTextValue(formData, "description"),
      image_url: imageUrl,
      is_featured: formData.get("is_featured") === "on",
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidateCatalog();
  revalidatePath(`/products/${slug}`);
  redirect("/admin/products");
}

export async function deleteProduct(formData: FormData) {
  await requireAdmin();

  const id = textValue(formData, "id");

  if (!id) {
    throw new Error("Product id is required.");
  }

  const supabase = getAdminSupabase();
  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidateCatalog();
  redirect("/admin/products");
}
