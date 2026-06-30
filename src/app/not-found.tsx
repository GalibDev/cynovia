import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-100">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-orange-500">Not Found</p>
        <h1 className="mt-3 text-2xl font-black text-slate-950">This catalog page does not exist</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">The product or category may have been moved.</p>
        <Link href="/categories" className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-blue-950 px-5 text-sm font-bold text-white">
          Browse Categories
        </Link>
      </div>
    </div>
  );
}
