import { BadgeCheck, Globe2, Headphones, Tags } from "lucide-react";

const features = [
  { icon: BadgeCheck, title: "Quality Products", text: "Trusted & Verified" },
  { icon: Tags, title: "Competitive Prices", text: "Best Value for Money" },
  { icon: Globe2, title: "Global Sourcing", text: "Worldwide Suppliers" },
  { icon: Headphones, title: "Customer Support", text: "We're here to help" },
];

export function FeatureStrip() {
  return (
    <section className="grid gap-4 rounded-xl bg-slate-50 p-5 ring-1 ring-slate-100 sm:grid-cols-2 lg:grid-cols-4">
      {features.map((feature) => {
        const Icon = feature.icon;

        return (
          <div key={feature.title} className="flex items-center gap-4">
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-blue-950 shadow-sm">
              <Icon className="h-6 w-6" />
            </span>
            <div>
              <h3 className="font-black text-slate-950">{feature.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{feature.text}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
}
