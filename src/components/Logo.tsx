import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="inline-flex flex-col leading-none" aria-label="BizMart home">
      <span className="text-3xl font-black tracking-tight text-slate-950">
        Biz<span className="text-orange-500">Mart</span>
      </span>
      <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
        One Stop Business Solution
      </span>
    </Link>
  );
}
