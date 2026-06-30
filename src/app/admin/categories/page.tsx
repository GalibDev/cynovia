import Link from "next/link";
import { Pencil } from "lucide-react";
import { deleteCategory } from "@/app/admin/actions";
import { AdminShell } from "@/components/admin/AdminShell";
import { CategoryForm } from "@/components/admin/CategoryForm";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { requireAdmin } from "@/lib/admin-auth";
import { getCategories, getProducts } from "@/lib/supabase";

type AdminCategoriesPageProps = {
  searchParams: Promise<{
    edit?: string;
  }>;
};

export default async function AdminCategoriesPage({ searchParams }: AdminCategoriesPageProps) {
  await requireAdmin();
  const params = await searchParams;
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);
  const editingCategory = params.edit ? categories.find((category) => category.id === params.edit) : undefined;

  return (
    <AdminShell>
      <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
        <CategoryForm category={editingCategory} />

        <section className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
          <div className="border-b border-slate-100 px-5 py-4">
            <h2 className="text-xl font-black text-slate-950">Categories</h2>
            <p className="mt-1 text-sm text-slate-500">Edit category text, order, and image URLs.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-[0.12em] text-slate-500">
                <tr>
                  <th className="px-5 py-3">Order</th>
                  <th className="px-5 py-3">Category</th>
                  <th className="px-5 py-3">Slug</th>
                  <th className="px-5 py-3">Products</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {categories.map((category) => {
                  const productCount = products.filter((product) => product.category_id === category.id).length;

                  return (
                    <tr key={category.id} className="align-top">
                      <td className="px-5 py-4 font-bold text-slate-600">{category.sort_order}</td>
                      <td className="px-5 py-4">
                        <p className="font-black text-slate-950">{category.name}</p>
                        <p className="mt-1 max-w-sm text-xs leading-5 text-slate-500">{category.description}</p>
                      </td>
                      <td className="px-5 py-4 font-mono text-xs text-slate-500">{category.slug}</td>
                      <td className="px-5 py-4 font-bold text-slate-700">{productCount}</td>
                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <Link href={`/admin/categories?edit=${category.id}`} className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-200">
                            <Pencil className="h-4 w-4" /> Edit
                          </Link>
                          <form action={deleteCategory}>
                            <input type="hidden" name="id" value={category.id} />
                            <DeleteButton label={category.name} />
                          </form>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
