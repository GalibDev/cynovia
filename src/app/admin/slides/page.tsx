import Link from "next/link";
import { Pencil, Plus } from "lucide-react";
import { deleteHomeSlide } from "@/app/admin/actions";
import { AdminShell } from "@/components/admin/AdminShell";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { HomeSlideForm } from "@/components/admin/HomeSlideForm";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { requireAdmin } from "@/lib/admin-auth";
import { getHomeSlides } from "@/lib/supabase";

type AdminSlidesPageProps = {
  searchParams: Promise<{
    add?: string;
    edit?: string;
  }>;
};

export default async function AdminSlidesPage({ searchParams }: AdminSlidesPageProps) {
  await requireAdmin();
  const params = await searchParams;
  const slides = await getHomeSlides({ activeOnly: false });
  const editingSlide = params.edit ? slides.find((slide) => slide.id === params.edit) : undefined;
  const showForm = Boolean(params.add || editingSlide);

  return (
    <AdminShell>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-slate-950">Home Slider</h1>
            <p className="mt-2 text-base text-slate-500">Upload, edit, delete, and reorder homepage slider slides.</p>
          </div>
          <Link
            href={showForm ? "/admin/slides" : "/admin/slides?add=1"}
            className={`inline-flex h-14 items-center justify-center gap-2 rounded-xl px-6 text-sm font-black shadow-sm transition ${
              showForm ? "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50" : "bg-blue-950 text-white hover:bg-blue-900"
            }`}
          >
            <Plus className="h-5 w-5" />
            {showForm ? "Back to Slides" : "Add Slide"}
          </Link>
        </div>

        {showForm ? <HomeSlideForm slide={editingSlide} /> : null}

        <section className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
          <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-black text-slate-950">Slider List</h2>
              <p className="mt-1 text-sm text-slate-500">Only active slides show on the homepage.</p>
            </div>
            <span className="inline-flex w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">
              {slides.length} slides
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] table-fixed text-left text-sm">
              <colgroup>
                <col className="w-[90px]" />
                <col className="w-[420px]" />
                <col className="w-[150px]" />
                <col className="w-[130px]" />
                <col className="w-[210px]" />
              </colgroup>
              <thead className="bg-slate-50 text-xs uppercase tracking-[0.12em] text-slate-500">
                <tr>
                  <th className="px-4 py-3">Serial</th>
                  <th className="px-4 py-3">Slide</th>
                  <th className="px-4 py-3">Button</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {slides.map((slide) => (
                  <tr key={slide.id} className="align-middle transition hover:bg-slate-50/70">
                    <td className="px-4 py-4">
                      <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-slate-100 px-2 text-xs font-black text-slate-700">
                        {slide.sort_order}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <ImagePlaceholder
                          icon="*"
                          src={slide.image_url}
                          alt={slide.title}
                          className="h-14 w-20 shrink-0 rounded-lg bg-slate-100"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-black text-slate-950" title={slide.title}>
                            {slide.title}
                          </p>
                          <p className="mt-1 truncate text-xs text-slate-500" title={slide.subtitle ?? ""}>
                            {slide.subtitle}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-xs font-bold text-slate-600">{slide.primary_label}</td>
                    <td className="px-4 py-4">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-black ${slide.is_active ? "bg-green-50 text-green-700" : "bg-slate-100 text-slate-600"}`}>
                        {slide.is_active ? "Active" : "Hidden"}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-nowrap justify-end gap-1.5">
                        <Link
                          href={`/admin/slides?edit=${slide.id}`}
                          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-orange-50 px-2.5 py-2 text-xs font-bold text-orange-600 ring-1 ring-orange-200 transition hover:bg-orange-100"
                        >
                          <Pencil className="h-4 w-4" /> Edit
                        </Link>
                        <form action={deleteHomeSlide}>
                          <input type="hidden" name="id" value={slide.id} />
                          <DeleteButton label={slide.title} />
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
