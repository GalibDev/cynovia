import { createProduct, updateProduct } from "@/app/admin/actions";
import { AdminField } from "@/components/admin/AdminField";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import type { Category, ProductWithCategory } from "@/lib/types";

export function ProductForm({ product, categories }: { product?: ProductWithCategory; categories: Category[] }) {
  const action = product ? updateProduct : createProduct;

  return (
    <form action={action} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="mb-5">
        <h2 className="text-xl font-black text-slate-950">{product ? "Edit Product" : "Add Product"}</h2>
        <p className="mt-1 text-sm text-slate-500">Update product details, image, category, serial number, and featured status.</p>
      </div>
      {product ? <input type="hidden" name="id" value={product.id} /> : null}
      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <AdminField label="Product Name" name="name" defaultValue={product?.name} required />
            </div>
            <AdminField label="Slug" name="slug" defaultValue={product?.slug} placeholder="auto-generated if blank" />
            <AdminField label="Serial Number" name="sort_order" type="number" defaultValue={product?.sort_order ?? 0} />
            <label className="block text-sm font-bold text-slate-700">
              Category
              <select
                name="category_id"
                defaultValue={product?.category_id ?? ""}
                required
                className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              >
                <option value="" disabled>
                  Select category
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex h-full items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm font-bold text-slate-700">
              <input
                type="checkbox"
                name="is_featured"
                defaultChecked={product?.is_featured}
                className="h-4 w-4 rounded border-slate-300 text-blue-950"
              />
              Featured product
            </label>
          </div>
          <div className="mt-4">
            <AdminField label="Description" name="description" defaultValue={product?.description} textarea />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5">
          <ImageUploadField defaultValue={product?.image_url} />
        </div>
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button className="rounded-lg bg-blue-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-900">
          {product ? "Save Product" : "Add Product"}
        </button>
      </div>
    </form>
  );
}
