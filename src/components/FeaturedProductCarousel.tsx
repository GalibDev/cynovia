"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback } from "react";
import { ProductCard } from "@/components/ProductCard";
import type { ProductWithCategory } from "@/lib/types";

export function FeaturedProductCarousel({ products }: { products: ProductWithCategory[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: products.length > 3 }, [
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="relative rounded-2xl bg-slate-50 px-4 py-5 ring-1 ring-slate-100">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="-ml-4 flex">
          {products.map((product) => (
            <div key={product.id} className="min-w-0 flex-[0_0_82%] pl-4 sm:flex-[0_0_48%] lg:flex-[0_0_31%] xl:flex-[0_0_24%]">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={scrollPrev}
        className="absolute left-0 top-1/2 hidden h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-blue-950 shadow-md transition hover:bg-blue-950 hover:text-white md:inline-flex"
        aria-label="Previous featured product"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={scrollNext}
        className="absolute right-0 top-1/2 hidden h-11 w-11 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-white text-blue-950 shadow-md transition hover:bg-blue-950 hover:text-white md:inline-flex"
        aria-label="Next featured product"
      >
        <ArrowRight className="h-5 w-5" />
      </button>
    </div>
  );
}
