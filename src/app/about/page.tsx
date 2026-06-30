import { FeatureStrip } from "@/components/FeatureStrip";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SectionHeader } from "@/components/SectionHeader";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-2xl bg-gradient-to-br from-sky-50 to-slate-100 p-6 shadow-sm ring-1 ring-black/5 md:p-12">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-orange-500">About CYNOVIA</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-tight text-slate-950">
            Global products with local confidence for sourcing practical products across many industries.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-700">
            CYNOVIA helps businesses explore industrial machinery, food equipment, medical supplies, fashion, home
            essentials, electronics, kids products, and gift collections from one clean catalog. The website is designed
            for product discovery and direct inquiry, keeping the buying conversation simple and personal.
          </p>
        </section>
        <section className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            ["Wide Catalog", "A broad product showcase for commercial, industrial, household, and lifestyle categories."],
            ["Inquiry First", "No checkout flow or cart pressure. Visitors can simply ask about what they need."],
            ["Business Focused", "A professional catalog experience made for sourcing, supplier conversations, and portfolio display."],
          ].map(([title, text]) => (
            <div key={title} className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-black text-slate-950">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
            </div>
          ))}
        </section>
        <section className="mt-10">
          <SectionHeader title="Why Businesses Choose CYNOVIA" />
          <FeatureStrip />
        </section>
      </main>
      <Footer />
    </div>
  );
}
