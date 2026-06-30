import Link from "next/link";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";

const highlights = [
  {
    title: "Industrial Machinery",
    text: "High Performance Machines",
    href: "/categories/industrial-machinery",
    icon: "🏭",
  },
  {
    title: "Medical Supplies",
    text: "Trusted Medical Solutions",
    href: "/categories/medical-supplies-reagents",
    icon: "🩺",
  },
  {
    title: "Fashion & Textiles",
    text: "Style Meets Comfort",
    href: "/categories/fashion",
    icon: "👔",
  },
  {
    title: "Home & Kitchen",
    text: "Smart Living Essentials",
    href: "/categories/kitchen-accessories",
    icon: "🍳",
  },
];

export function HighlightCards({ className = "" }: { className?: string }) {
  return (
    <div className={`grid gap-5 md:grid-cols-2 xl:grid-cols-4 ${className}`}>
      {highlights.map((item) => (
        <Link
          key={item.title}
          href={item.href}
          className="group grid min-h-[72px] grid-cols-[72px_1fr] items-center gap-4 rounded-xl border border-slate-100 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:border-blue-100 hover:shadow-md"
        >
          <ImagePlaceholder icon={item.icon} alt={item.title} className="aspect-square rounded-lg bg-sky-50" />
          <div>
            <h3 className="font-black text-slate-950">{item.title}</h3>
            <p className="mt-1 text-sm text-slate-500">{item.text}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
