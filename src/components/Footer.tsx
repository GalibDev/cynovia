import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/Logo";
import type { Category } from "@/lib/types";

export function Footer({ categories = [] }: { categories?: Category[] }) {
  const footerCategories = categories.slice(0, 5);

  return (
    <footer className="mt-16 border-t border-slate-100 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.9fr_1fr_1.1fr] lg:px-8">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-600">
            We provide the best products and solutions for your business growth.
          </p>
          <div className="mt-5 flex gap-2 text-blue-950">
            {["f", "ig", "in", "yt"].map((label) => (
              <a key={label} href="#" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 text-xs font-black uppercase transition hover:bg-orange-50 hover:text-orange-500" aria-label={`${label} social link`}>
                {label}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-black text-slate-950">Quick Links</h3>
          <div className="mt-4 flex flex-col gap-3 text-sm font-semibold text-slate-600">
            <Link href="/categories" className="hover:text-orange-500">
              Categories
            </Link>
            <Link href="/about" className="hover:text-orange-500">
              About Us
            </Link>
            <Link href="/contact" className="hover:text-orange-500">
              Contact Us
            </Link>
          </div>
        </div>
        <div>
          <h3 className="font-black text-slate-950">Categories</h3>
          <div className="mt-4 flex flex-col gap-3 text-sm font-semibold text-slate-600">
            {footerCategories.length > 0 ? (
              footerCategories.map((category) => (
                <Link key={category.id} href={`/categories/${category.slug}`} className="hover:text-orange-500">
                  {category.name}
                </Link>
              ))
            ) : (
              <Link href="/categories" className="hover:text-orange-500">
                All Categories
              </Link>
            )}
          </div>
        </div>
        <div>
          <h3 className="font-black text-slate-950">Contact</h3>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <p className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-blue-950" /> +880 1XXX-XXXXXX
            </p>
            <p className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-blue-950" /> info@bizmart.example
            </p>
            <p className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-blue-950" /> Dhaka, Bangladesh
            </p>
          </div>
        </div>
        <div>
          <h3 className="font-black text-slate-950">Newsletter</h3>
          <p className="mt-4 text-sm leading-6 text-slate-600">Subscribe to get updates on new products and offers.</p>
          <form className="mt-4 flex overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <input
              type="email"
              placeholder="Enter your email"
              className="min-w-0 flex-1 px-4 py-3 text-sm outline-none"
            />
            <button type="button" className="inline-flex w-12 items-center justify-center bg-blue-950 text-white">
              <ArrowRight className="h-5 w-5" />
            </button>
          </form>
          <div className="mt-5 flex gap-4 text-xs font-semibold text-slate-500">
            <Link href="/contact">Privacy Policy</Link>
            <Link href="/contact">Terms of Service</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-100 py-4 text-center text-xs font-semibold text-slate-500">
        © 2026 BizMart. One Stop Business Solution.
      </div>
    </footer>
  );
}
