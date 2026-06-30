import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { contactHref } from "@/lib/utils";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="grid gap-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 lg:grid-cols-[1fr_0.9fr] lg:p-10">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-orange-500">Contact Us</p>
            <h1 className="mt-3 max-w-2xl text-4xl font-black tracking-tight text-slate-950">
              Send BizMart an inquiry for product details, sourcing, and availability.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-700">
              Share the product name, quantity, preferred origin, and any technical requirements. The team can follow up
              with sourcing details and next steps.
            </p>
            <Link
              href={contactHref()}
              className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-blue-950 px-6 text-sm font-bold text-white shadow-lg shadow-blue-950/10 transition hover:bg-blue-900"
            >
              <MessageCircle className="h-5 w-5" /> WhatsApp Inquiry
            </Link>
          </div>
          <div className="rounded-xl bg-slate-50 p-6 ring-1 ring-slate-100">
            <h2 className="text-xl font-black text-slate-950">Business Contact</h2>
            <div className="mt-6 space-y-5 text-sm text-slate-700">
              <p className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-blue-950" /> +880 1XXX-XXXXXX
              </p>
              <p className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-950" /> info@bizmart.example
              </p>
              <p className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-blue-950" /> Dhaka, Bangladesh
              </p>
            </div>
            <form className="mt-8 space-y-4">
              <input className="h-12 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" placeholder="Your name" />
              <input className="h-12 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" placeholder="Phone or email" />
              <textarea className="min-h-32 w-full rounded-lg border border-slate-200 p-4 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" placeholder="Tell us what product you need" />
              <button type="button" className="h-12 w-full rounded-lg bg-orange-500 px-5 text-sm font-bold text-white transition hover:bg-orange-600">
                Submit Inquiry
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
