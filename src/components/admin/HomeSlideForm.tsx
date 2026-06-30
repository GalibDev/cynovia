import { createHomeSlide, updateHomeSlide } from "@/app/admin/actions";
import { AdminField } from "@/components/admin/AdminField";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import type { HomeSlide } from "@/lib/types";

export function HomeSlideForm({ slide }: { slide?: HomeSlide }) {
  const action = slide ? updateHomeSlide : createHomeSlide;

  return (
    <form action={action} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="mb-5">
        <h2 className="text-xl font-black text-slate-950">{slide ? "Edit Home Slide" : "Add Home Slide"}</h2>
        <p className="mt-1 text-sm text-slate-500">Manage homepage slider text, buttons, image, and display order.</p>
      </div>
      {slide ? <input type="hidden" name="id" value={slide.id} /> : null}
      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <AdminField label="Title" name="title" defaultValue={slide?.title} required />
            </div>
            <div className="md:col-span-2">
              <AdminField label="Subtitle" name="subtitle" defaultValue={slide?.subtitle} textarea />
            </div>
            <AdminField label="Badge Text" name="badge" defaultValue={slide?.badge} />
            <AdminField label="Serial Number" name="sort_order" type="number" defaultValue={slide?.sort_order ?? 0} />
            <AdminField label="Primary Button" name="primary_label" defaultValue={slide?.primary_label ?? "Explore Products"} required />
            <AdminField label="Primary Link" name="primary_href" defaultValue={slide?.primary_href ?? "/categories"} required />
            <AdminField label="Secondary Button" name="secondary_label" defaultValue={slide?.secondary_label} />
            <AdminField label="Secondary Link" name="secondary_href" defaultValue={slide?.secondary_href} />
            <label className="flex h-full items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm font-bold text-slate-700">
              <input
                type="checkbox"
                name="is_active"
                defaultChecked={slide?.is_active ?? true}
                className="h-4 w-4 rounded border-slate-300 text-blue-950"
              />
              Active slide
            </label>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5">
          <ImageUploadField defaultValue={slide?.image_url} />
        </div>
      </div>
      <button className="mt-5 rounded-lg bg-blue-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-900">
        {slide ? "Save Slide" : "Add Slide"}
      </button>
    </form>
  );
}
