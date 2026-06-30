import Link from "next/link";
import { Pencil } from "lucide-react";
import { deleteProduct } from "@/app/admin/actions";
import { AdminShell } from "@/components/admin/AdminShell";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { ProductForm } from "@/components/admin/ProductForm";
import { requireAdmin } from "@/lib/admin-auth";
import { getCategories, getProducts } from "@/lib/supabase";

type AdminProductsPageProps = {
  searchParams: Promise<{
    edit?: string;
  }>;
};

export default async function AdminProductsPage({ searchParams }: AdminProductsPageProps) {
  await requireAdmin();
  const params = await searchParams;
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);
  const editingProduct = params.edit ? products.find((product) => product.id === params.edit) : undefined;

  return (
    <AdminShell>
      <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
        <ProductForm product={editingProduct} categories={categories} />

        <section className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
          <div className="border-b border-slate-100 px-5 py-4">
            <h2 className="text-xl font-black text-slate-950">Products</h2>
            <p className="mt-1 text-sm text-slate-500">Manage catalog products and featured homepage items.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-[0.12em] text-slate-500">
                <tr>
                  <th className="px-5 py-3">Product</th>
                  <th className="px-5 py-3">Category</th>
                  <th className="px-5 py-3">Slug</th>
                  <th className="px-5 py-3">Featured</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.map((product) => (
                  <tr key={product.id} className="align-top">
                    <td className="px-5 py-4">
                      <p className="font-black text-slate-950">{product.name}</p>
                      <p className="mt-1 max-w-sm text-xs leading-5 text-slate-500">{product.description}</p>
                    </td>
                    <td className="px-5 py-4 font-bold text-slate-700">{product.categories.name}</td>
                    <td className="px-5 py-4 font-mono text-xs text-slate-500">{product.slug}</td>
                    <td className="px-5 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-black ${product.is_featured ? "bg-orange-50 text-orange-600" : "bg-slate-100 text-slate-500"}`}>
                        {product.is_featured ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/products?edit=${product.id}`} className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-200">
                          <Pencil className="h-4 w-4" /> Edit
                        </Link>
                        <form action={deleteProduct}>
                          <input type="hidden" name="id" value={product.id} />
                          <DeleteButton label={product.name} />
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
