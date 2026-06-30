import Image from "next/image";

type ImagePlaceholderProps = {
  src?: string | null;
  alt: string;
  icon: string;
  className?: string;
  priority?: boolean;
};

export function ImagePlaceholder({ src, alt, icon, className = "", priority }: ImagePlaceholderProps) {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-white/60 ${className}`}>
      {src ? (
        <Image src={src} alt={alt} fill className="object-cover" priority={priority} />
      ) : (
        <span className="select-none text-5xl drop-shadow-sm sm:text-6xl" aria-hidden="true">
          {icon}
        </span>
      )}
    </div>
  );
}
