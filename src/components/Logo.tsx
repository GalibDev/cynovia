import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5 leading-none" aria-label="CYNOVIA home">
      <Image
        src="/cynovia-logo.png"
        alt="CYNOVIA logo"
        width={52}
        height={52}
        className="h-[52px] w-[52px] rounded-lg object-cover"
        priority
      />
      <span className="flex flex-col">
        <span className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
          CYN<span className="text-orange-500">OVIA</span>
        </span>
        <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
          Global Products. Local Confidence.
        </span>
      </span>
    </Link>
  );
}
