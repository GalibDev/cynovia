import { createCategory, updateCategory } from "@/app/admin/actions";
import { AdminField } from "@/components/admin/AdminField";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import type { Category } from "@/lib/types";

export function CategoryForm({ category }: { category?: Category }) {
  const action = category ? updateCategory : createCategory;

  return (
    <form action={action} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <div className="mb-5">
        <h2 className="text-xl font-black text-slate-950">{category ? "Edit Category" : "Add Category"}</h2>
        <p className="mt-1 text-sm text-slate-500">Category cards and sidebar menu data.</p>
      </div>
      {category ? <input type="hidden" name="id" value={category.id} /> : null}
      <div className="grid gap-4 md:grid-cols-2">
        <AdminField label="Name" name="name" defaultValue={category?.name} required />
        <AdminField label="Slug" name="slug" defaultValue={category?.slug} placeholder="auto-generated if blank" />
        <AdminField label="Sort Order" name="sort_order" type="number" defaultValue={category?.sort_order ?? 0} />
        <ImageUploadField defaultValue={category?.image_url} />
        <div className="md:col-span-2">
          <AdminField label="Description" name="description" defaultValue={category?.description} textarea />
        </div>
      </div>
      <button className="mt-5 rounded-lg bg-blue-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-900">
        {category ? "Save Category" : "Create Category"}
      </button>
    </form>
  );
}
