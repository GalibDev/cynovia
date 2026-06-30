"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-100">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-orange-500">Something went wrong</p>
        <h1 className="mt-3 text-2xl font-black text-slate-950">Unable to load catalog data</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">{error.message}</p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 h-11 rounded-lg bg-blue-950 px-5 text-sm font-bold text-white"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
