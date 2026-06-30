import Link from "next/link";

export function EmptyState({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center shadow-sm">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 text-3xl">🔎</div>
      <h2 className="mt-5 text-xl font-black text-slate-950">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">{text}</p>
      <Link
        href="/categories"
        className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-blue-950 px-5 text-sm font-bold text-white"
      >
        Browse Categories
      </Link>
    </div>
  );
}
