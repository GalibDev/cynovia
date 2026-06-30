import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="inline-flex items-center gap-3 leading-none" aria-label="CYNOVIA home">
      <Image
        src="/cynovia-logo.png"
        alt="CYNOVIA logo"
        width={56}
        height={56}
        className="h-14 w-14 rounded-lg object-cover"
        priority
      />
      <span className="flex flex-col">
        <span className="text-3xl font-black tracking-tight text-slate-950">
          CYN<span className="text-orange-500">OVIA</span>
        </span>
        <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
          Global Products. Local Confidence.
        </span>
      </span>
    </Link>
  );
}
