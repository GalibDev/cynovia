import Link from "next/link";
import { Pencil, Plus, Star } from "lucide-react";
import { deleteProduct, toggleProductFeatured } from "@/app/admin/actions";
import { AdminShell } from "@/components/admin/AdminShell";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { ProductForm } from "@/components/admin/ProductForm";
import { requireAdmin } from "@/lib/admin-auth";
import { getCategories, getProducts } from "@/lib/supabase";
import { productIconByCategory } from "@/lib/visuals";

type AdminProductsPageProps = {
  searchParams: Promise<{
    add?: string;
    edit?: string;
  }>;
};

export default async function AdminProductsPage({ searchParams }: AdminProductsPageProps) {
  await requireAdmin();
  const params = await searchParams;
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);
  const editingProduct = params.edit ? products.find((product) => product.id === params.edit) : undefined;
  const showForm = Boolean(params.add || editingProduct);

  return (
    <AdminShell>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-slate-950">Manage Products</h1>
            <p className="mt-2 text-base text-slate-500">Add, edit, delete, feature, and reorder catalog products.</p>
          </div>
          <Link
            href={showForm ? "/admin/products" : "/admin/products?add=1"}
            className={`inline-flex h-14 items-center justify-center gap-2 rounded-xl px-6 text-sm font-black shadow-sm transition ${
              showForm
                ? "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"
                : "bg-blue-950 text-white hover:bg-blue-900"
            }`}
          >
            <Plus className="h-5 w-5" />
            {showForm ? "Back to Products" : "Add Product"}
          </Link>
        </div>

        {showForm ? <ProductForm product={editingProduct} categories={categories} /> : null}

        <section className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
          <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-black text-slate-950">Product List</h2>
              <p className="mt-1 text-sm text-slate-500">Serial number controls the product display order.</p>
            </div>
            <span className="inline-flex w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">
              {products.length} products
            </span>
          </div>
          <div className="max-w-full overflow-hidden">
            <table className="w-full table-fixed text-left text-sm">
              <colgroup>
                <col className="w-[7%]" />
                <col className="w-[39%]" />
                <col className="w-[17%]" />
                <col className="w-[12%]" />
                <col className="w-[25%]" />
              </colgroup>
              <thead className="bg-slate-50 text-xs uppercase tracking-[0.12em] text-slate-500">
                <tr>
                  <th className="px-4 py-3">Serial</th>
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Featured</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.map((product) => {
                  const icon = productIconByCategory[product.categories.slug] ?? "?";

                  return (
                    <tr key={product.id} className="align-middle transition hover:bg-slate-50/70">
                      <td className="px-4 py-4">
                        <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-slate-100 px-2 text-xs font-black text-slate-700">
                          {product.sort_order}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex min-w-0 items-center gap-3">
                          <ImagePlaceholder
                            icon={icon}
                            src={product.image_url}
                            alt={product.name}
                            className="h-12 w-12 shrink-0 rounded-lg bg-slate-100"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-black text-slate-950" title={product.name}>
                              {product.name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="inline-flex max-w-full truncate rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-black leading-5 text-orange-600" title={product.categories.name}>
                          {product.categories.name}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-black ${
                            product.is_featured ? "bg-orange-50 text-orange-600 ring-1 ring-orange-100" : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {product.is_featured ? "Featured" : "Regular"}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-nowrap justify-end gap-1.5">
                          <form action={toggleProductFeatured}>
                            <input type="hidden" name="id" value={product.id} />
                            <input type="hidden" name="is_featured" value={String(product.is_featured)} />
                            <button
                              type="submit"
                              className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-bold transition ${
                                product.is_featured
                                  ? "bg-purple-50 text-purple-700 ring-1 ring-purple-200 hover:bg-purple-100"
                                  : "bg-amber-50 text-amber-700 ring-1 ring-amber-200 hover:bg-amber-100"
                              }`}
                            >
                              <Star className="h-4 w-4" /> {product.is_featured ? "Unfeature" : "Feature"}
                            </button>
                          </form>
                          <Link
                            href={`/admin/products?edit=${product.id}`}
                            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-orange-50 px-2.5 py-2 text-xs font-bold text-orange-600 ring-1 ring-orange-200 transition hover:bg-orange-100"
                          >
                            <Pencil className="h-4 w-4" /> Edit
                          </Link>
                          <form action={deleteProduct}>
                            <input type="hidden" name="id" value={product.id} />
                            <DeleteButton label={product.name} />
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
