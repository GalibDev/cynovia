import Link from "next/link";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { getProductBySlug } from "@/lib/supabase";
import { contactHref } from "@/lib/utils";
import { categoryVisuals, productIconByCategory } from "@/lib/visuals";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const category = product.categories;
  const tint = categoryVisuals[category.slug]?.tint ?? "from-slate-50 to-slate-100";
  const icon = productIconByCategory[category.slug] ?? "▫️";
  const inquiryMessage = `Hello BizMart, I want to inquire about ${product.name}.`;

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Link href={`/categories/${category.slug}`} className="inline-flex items-center gap-2 text-sm font-bold text-blue-950 hover:text-orange-500">
          <ArrowLeft className="h-4 w-4" /> Back to {category.name}
        </Link>
        <section className="mt-6 grid gap-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
          <div className={`rounded-2xl bg-gradient-to-br ${tint} p-6`}>
            <ImagePlaceholder icon={icon} src={product.image_url} alt={product.name} className="aspect-square bg-white/70" priority />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-orange-500">{category.name}</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950">{product.name}</h1>
            <p className="mt-5 text-base leading-8 text-slate-700">{product.description}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={contactHref(inquiryMessage)}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-blue-950 px-6 text-sm font-bold text-white shadow-lg shadow-blue-950/10 transition hover:bg-blue-900"
              >
                <MessageCircle className="h-5 w-5" /> Contact for Inquiry
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-slate-200 px-6 text-sm font-bold text-slate-800 transition hover:border-orange-200 hover:bg-orange-50"
              >
                Contact Page
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
