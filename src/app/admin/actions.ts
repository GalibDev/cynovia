"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { clearAdminSession, getAdminPassword, requireAdmin, setAdminSession } from "@/lib/admin-auth";
import { getAdminStorageBucket, getAdminSupabase, hasAdminSupabase, slugify } from "@/lib/admin-supabase";
import {
  createLocalProduct,
  createLocalHomeSlide,
  deleteLocalHomeSlide,
  deleteLocalProduct,
  saveLocalUpload,
  toggleLocalProductFeatured,
  updateLocalHomeSlide,
  updateLocalProduct,
} from "@/lib/local-catalog";

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
  revalidatePath("/admin/slides");
}

async function resolveImageUrl(
  formData: FormData,
  folder: string,
  slug: string,
  supabase?: ReturnType<typeof getAdminSupabase>,
) {
  const imageFile = formData.get("image_file");

  if (imageFile instanceof File && imageFile.size > 0) {
    const extension = imageFile.name.split(".").pop()?.toLowerCase() || "png";
    const cleanSlug = slugify(slug) || "image";
    if (!supabase) {
      return saveLocalUpload(imageFile, folder, cleanSlug);
    }

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
  const imageUrl = await resolveImageUrl(formData, "categories", slug, supabase);
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
  const imageUrl = await resolveImageUrl(formData, "categories", slug, supabase);
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
  const sortOrder = Number(textValue(formData, "sort_order") || "0");

  if (!name || !slug || !categoryId) {
    throw new Error("Product name, slug, and category are required.");
  }

  const imageUrl = await resolveImageUrl(formData, "products", slug, hasAdminSupabase() ? getAdminSupabase() : undefined);

  if (!hasAdminSupabase()) {
    await createLocalProduct({
      category_id: categoryId,
      name,
      slug,
      description: optionalTextValue(formData, "description"),
      image_url: imageUrl,
      sort_order: Number.isFinite(sortOrder) ? sortOrder : 0,
      is_featured: formData.get("is_featured") === "on",
    });
    revalidateCatalog();
    redirect("/admin/products");
  }

  const supabase = getAdminSupabase();
  const { error } = await supabase.from("products").insert({
    category_id: categoryId,
    name,
    slug,
    description: optionalTextValue(formData, "description"),
    image_url: imageUrl,
    sort_order: Number.isFinite(sortOrder) ? sortOrder : 0,
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
  const sortOrder = Number(textValue(formData, "sort_order") || "0");

  if (!id || !name || !slug || !categoryId) {
    throw new Error("Product id, name, slug, and category are required.");
  }

  const imageUrl = await resolveImageUrl(formData, "products", slug, hasAdminSupabase() ? getAdminSupabase() : undefined);

  if (!hasAdminSupabase()) {
    await updateLocalProduct(id, {
      category_id: categoryId,
      name,
      slug,
      description: optionalTextValue(formData, "description"),
      image_url: imageUrl,
      sort_order: Number.isFinite(sortOrder) ? sortOrder : 0,
      is_featured: formData.get("is_featured") === "on",
    });
    revalidateCatalog();
    revalidatePath(`/products/${slug}`);
    redirect("/admin/products");
  }

  const supabase = getAdminSupabase();
  const { error } = await supabase
    .from("products")
    .update({
      category_id: categoryId,
      name,
      slug,
      description: optionalTextValue(formData, "description"),
      image_url: imageUrl,
      sort_order: Number.isFinite(sortOrder) ? sortOrder : 0,
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

export async function toggleProductFeatured(formData: FormData) {
  await requireAdmin();

  const id = textValue(formData, "id");
  const isFeatured = textValue(formData, "is_featured") === "true";

  if (!id) {
    throw new Error("Product id is required.");
  }

  if (!hasAdminSupabase()) {
    await toggleLocalProductFeatured(id);
    revalidateCatalog();
    redirect("/admin/products");
  }

  const supabase = getAdminSupabase();
  const { error } = await supabase.from("products").update({ is_featured: !isFeatured }).eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidateCatalog();
  redirect("/admin/products");
}

export async function deleteProduct(formData: FormData) {
  await requireAdmin();

  const id = textValue(formData, "id");

  if (!id) {
    throw new Error("Product id is required.");
  }

  if (!hasAdminSupabase()) {
    await deleteLocalProduct(id);
    revalidateCatalog();
    redirect("/admin/products");
  }

  const supabase = getAdminSupabase();
  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidateCatalog();
  redirect("/admin/products");
}

function slideInput(formData: FormData, imageUrl: string | null) {
  const sortOrder = Number(textValue(formData, "sort_order") || "0");

  return {
    title: textValue(formData, "title"),
    subtitle: optionalTextValue(formData, "subtitle"),
    badge: optionalTextValue(formData, "badge"),
    image_url: imageUrl,
    primary_label: textValue(formData, "primary_label") || "Explore Products",
    primary_href: textValue(formData, "primary_href") || "/categories",
    secondary_label: optionalTextValue(formData, "secondary_label"),
    secondary_href: optionalTextValue(formData, "secondary_href"),
    sort_order: Number.isFinite(sortOrder) ? sortOrder : 0,
    is_active: formData.get("is_active") === "on",
  };
}

export async function createHomeSlide(formData: FormData) {
  await requireAdmin();

  const title = textValue(formData, "title");

  if (!title) {
    throw new Error("Slide title is required.");
  }

  const imageUrl = await resolveImageUrl(formData, "slides", slugify(title), hasAdminSupabase() ? getAdminSupabase() : undefined);
  const input = slideInput(formData, imageUrl);

  if (!hasAdminSupabase()) {
    await createLocalHomeSlide(input);
    revalidateCatalog();
    redirect("/admin/slides");
  }

  const supabase = getAdminSupabase();
  const { error } = await supabase.from("home_slides").insert(input);

  if (error) {
    throw new Error(error.message);
  }

  revalidateCatalog();
  redirect("/admin/slides");
}

export async function updateHomeSlide(formData: FormData) {
  await requireAdmin();

  const id = textValue(formData, "id");
  const title = textValue(formData, "title");

  if (!id || !title) {
    throw new Error("Slide id and title are required.");
  }

  const imageUrl = await resolveImageUrl(formData, "slides", slugify(title), hasAdminSupabase() ? getAdminSupabase() : undefined);
  const input = slideInput(formData, imageUrl);

  if (!hasAdminSupabase()) {
    await updateLocalHomeSlide(id, input);
    revalidateCatalog();
    redirect("/admin/slides");
  }

  const supabase = getAdminSupabase();
  const { error } = await supabase.from("home_slides").update(input).eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidateCatalog();
  redirect("/admin/slides");
}

export async function deleteHomeSlide(formData: FormData) {
  await requireAdmin();

  const id = textValue(formData, "id");

  if (!id) {
    throw new Error("Slide id is required.");
  }

  if (!hasAdminSupabase()) {
    await deleteLocalHomeSlide(id);
    revalidateCatalog();
    redirect("/admin/slides");
  }

  const supabase = getAdminSupabase();
  const { error } = await supabase.from("home_slides").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidateCatalog();
  redirect("/admin/slides");
}
