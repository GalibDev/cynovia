"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, Phone, ShieldCheck, Sparkles, Tags } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import type { HomeSlide } from "@/lib/types";

const trustBadges = [
  { label: "Quality Products", icon: ShieldCheck },
  { label: "Competitive Prices", icon: Tags },
  { label: "Reliable Support", icon: Sparkles },
];

const fallbackIcons = ["*", "#", "+", "%", "&"];

export function HeroSlider({ slides }: { slides: HomeSlide[] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const visibleSlides = slides.length > 0 ? slides : [];
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: visibleSlides.length > 1 }, [
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="relative flex flex-col overflow-hidden rounded-3xl bg-gradient-to-br from-sky-50 via-white to-blue-100 px-6 py-8 shadow-sm ring-1 ring-slate-100 sm:px-10 lg:h-[470px] lg:px-16 lg:py-10">
      <div className="min-h-[500px] flex-1 overflow-hidden lg:min-h-0" ref={emblaRef}>
        <div className="flex">
          {visibleSlides.map((slide) => (
            <div key={slide.id} className="min-w-0 flex-[0_0_100%]">
              <div className="grid min-h-[470px] items-center gap-8 lg:min-h-[360px] lg:grid-cols-[42fr_58fr]">
                <div className="text-center lg:text-left">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-blue-950 shadow-sm">
                    <ShieldCheck className="h-3.5 w-3.5 text-orange-500" /> {slide.badge || "Trusted by Businesses Worldwide"}
                  </span>
                  <h1 className="mx-auto mt-4 max-w-xl text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl lg:mx-0 lg:text-[46px]">
                    {slide.title}
                  </h1>
                  <p className="mx-auto mt-3 max-w-lg text-[15px] leading-6 text-slate-700 lg:mx-0">{slide.subtitle}</p>
                  <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
                    <Link
                      href={slide.primary_href}
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-blue-950 px-5 text-sm font-bold text-white shadow-lg shadow-blue-950/10 transition hover:bg-blue-900"
                    >
                      {slide.primary_label} <ArrowRight className="h-4 w-4" />
                    </Link>
                    {slide.secondary_label && slide.secondary_href ? (
                      <Link
                        href={slide.secondary_href}
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 text-sm font-bold text-slate-900 shadow-sm transition hover:border-orange-200 hover:bg-orange-50"
                      >
                        <Phone className="h-4 w-4" /> {slide.secondary_label}
                      </Link>
                    ) : null}
                  </div>
                  <div className="mt-7 grid max-w-xl gap-3 text-[11px] font-black text-slate-700 sm:grid-cols-3 lg:mx-0">
                    {trustBadges.map((badge) => {
                      const Icon = badge.icon;
                      return (
                        <div key={badge.label} className="flex items-center justify-center gap-2 lg:justify-start">
                          <Icon className="h-3.5 w-3.5 text-blue-950" />
                          {badge.label}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="relative mx-auto w-full max-w-2xl lg:max-w-none">
                  <div className="absolute right-4 top-0 z-10 hidden rounded-2xl bg-white px-6 py-4 text-center shadow-xl ring-1 ring-slate-100 sm:block">
                    <p className="text-3xl font-black leading-none text-blue-950">11+</p>
                    <p className="mt-1 text-[11px] font-bold text-slate-600">Product Categories</p>
                  </div>
                  {slide.image_url ? (
                    <ImagePlaceholder
                      icon="*"
                      src={slide.image_url}
                      alt={slide.title}
                      className="aspect-[16/10] rounded-3xl bg-white/80 shadow-sm ring-1 ring-white/80"
                      priority
                    />
                  ) : (
                    <div className="grid grid-cols-12 items-end gap-3 pr-0 sm:pr-20 lg:origin-center lg:scale-[0.92]">
                      <ImagePlaceholder icon={fallbackIcons[0]} alt={slide.title} className="col-span-4 aspect-[0.95] translate-y-2 rounded-2xl bg-white/75" priority />
                      <ImagePlaceholder icon={fallbackIcons[1]} alt={slide.title} className="col-span-4 aspect-square rounded-2xl bg-white/85" priority />
                      <ImagePlaceholder icon={fallbackIcons[4]} alt={slide.title} className="col-span-4 aspect-[0.85] translate-y-5 rounded-2xl bg-white/75" />
                      <ImagePlaceholder icon={fallbackIcons[3]} alt={slide.title} className="col-span-7 aspect-[2.2] rounded-2xl bg-white/75" />
                      <ImagePlaceholder icon={fallbackIcons[2]} alt={slide.title} className="col-span-5 aspect-[1.35] rounded-2xl bg-white/85" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {visibleSlides.length > 1 ? (
        <>
          <button
            type="button"
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-blue-950 shadow-md transition hover:bg-blue-950 hover:text-white md:inline-flex"
            aria-label="Previous slide"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            className="absolute right-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-blue-950 shadow-md transition hover:bg-blue-950 hover:text-white md:inline-flex"
            aria-label="Next slide"
          >
            <ArrowRight className="h-5 w-5" />
          </button>

          <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 gap-2 lg:flex">
            {visibleSlides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => scrollTo(index)}
                className={`h-2.5 rounded-full transition-all ${selectedIndex === index ? "w-7 bg-blue-950" : "w-2.5 bg-slate-300"}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      ) : null}
    </section>
  );
}
