import { createProduct, updateProduct } from "@/app/admin/actions";
import { AdminField } from "@/components/admin/AdminField";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import type { Category, ProductWithCategory } from "@/lib/types";

export function ProductForm({ product, categories }: { product?: ProductWithCategory; categories: Category[] }) {
  const action = product ? updateProduct : createProduct;

  return (
    <form action={action} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <div className="mb-5">
        <h2 className="text-xl font-black text-slate-950">{product ? "Edit Product" : "Add Product"}</h2>
        <p className="mt-1 text-sm text-slate-500">Products shown across catalog pages.</p>
      </div>
      {product ? <input type="hidden" name="id" value={product.id} /> : null}
      <div className="grid gap-4 md:grid-cols-2">
        <AdminField label="Name" name="name" defaultValue={product?.name} required />
        <AdminField label="Slug" name="slug" defaultValue={product?.slug} placeholder="auto-generated if blank" />
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
        <ImageUploadField defaultValue={product?.image_url} />
        <div className="md:col-span-2">
          <AdminField label="Description" name="description" defaultValue={product?.description} textarea />
        </div>
      </div>
      <label className="mt-5 flex items-center gap-3 text-sm font-bold text-slate-700">
        <input
          type="checkbox"
          name="is_featured"
          defaultChecked={product?.is_featured}
          className="h-4 w-4 rounded border-slate-300 text-blue-950"
        />
        Featured product
      </label>
      <button className="mt-5 rounded-lg bg-blue-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-900">
        {product ? "Save Product" : "Create Product"}
      </button>
    </form>
  );
}
