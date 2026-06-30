import Link from "next/link";
import { Boxes, Globe2, Handshake, MapPinned } from "lucide-react";

const stats = [
  { value: "500+", label: "Happy Clients", icon: Handshake },
  { value: "3000+", label: "Products", icon: Boxes },
  { value: "25+", label: "Countries Served", icon: Globe2 },
  { value: "10+", label: "Years Experience", icon: MapPinned },
];

export function AboutBizMart() {
  return (
    <section className="grid gap-8 overflow-hidden rounded-3xl bg-gradient-to-br from-sky-50 via-white to-blue-50 p-6 shadow-sm ring-1 ring-slate-100 lg:grid-cols-[1fr_1.1fr] lg:p-10">
      <div>
        <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-950">About BizMart</p>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Your Trusted Business Partner</h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
          BizMart is your one-stop destination for industrial, commercial, medical, fashion and lifestyle products. We
          are committed to quality, reliability and customer satisfaction.
        </p>
        <Link
          href="/about"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-blue-950 px-5 text-sm font-bold text-white transition hover:bg-blue-900"
        >
          Learn More About Us
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div key={stat.label} className="rounded-2xl bg-white p-5 text-center shadow-sm ring-1 ring-slate-100">
              <span className="mx-auto inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-950">
                <Icon className="h-5 w-5" />
              </span>
              <p className="mt-4 text-2xl font-black text-blue-950">{stat.value}</p>
              <p className="mt-1 text-xs font-bold text-slate-500">{stat.label}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
