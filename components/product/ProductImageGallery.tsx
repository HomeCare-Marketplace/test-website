"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { SafeImage } from "@/components/ui/SafeImage";

type ProductImageGalleryProps = {
  title: string;
  images: string[];
  selectedImage: string;
  onSelectImage: (image: string) => void;
};

/* ------------------------------------------------------------------ */
/*  Arrow icons for mobile carousel                                    */
/* ------------------------------------------------------------------ */

const arrowProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
};

function ChevronLeft() {
  return (
    <svg {...arrowProps}>
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg {...arrowProps}>
      <polyline points="9 6 15 12 9 18" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function ProductImageGallery({
  title,
  images,
  selectedImage,
  onSelectImage,
}: ProductImageGalleryProps) {
  const selectedIndex = images.indexOf(selectedImage);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  /* Keep thumbnail in view when selection changes */
  useEffect(() => {
    const btn = thumbnailRefs.current[selectedIndex];
    btn?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
  }, [selectedIndex]);

  /* Keyboard navigation on main image */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft" && selectedIndex > 0) {
        onSelectImage(images[selectedIndex - 1]);
      } else if (e.key === "ArrowRight" && selectedIndex < images.length - 1) {
        onSelectImage(images[selectedIndex + 1]);
      }
    },
    [images, selectedIndex, onSelectImage],
  );

  /* Zoom handlers (desktop hover-zoom on main image) */
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  const prev = () => selectedIndex > 0 && onSelectImage(images[selectedIndex - 1]);
  const next = () => selectedIndex < images.length - 1 && onSelectImage(images[selectedIndex + 1]);

  return (
    <div className="flex flex-col-reverse gap-3 lg:flex-row lg:gap-4">
      {/* ================================================================ */}
      {/*  Thumbnail strip — horizontal on mobile, vertical on desktop      */}
      {/* ================================================================ */}
      <div
        className="scrollbar-none flex gap-2 overflow-x-auto lg:flex-col lg:overflow-y-auto lg:overflow-x-visible"
        role="list"
        aria-label="Product thumbnails"
      >
        {images.map((image, index) => {
          const active = image === selectedImage;
          return (
            <button
              key={image}
              ref={(el) => { thumbnailRefs.current[index] = el; }}
              type="button"
              role="listitem"
              onClick={() => onSelectImage(image)}
              className={`relative flex-shrink-0 overflow-hidden rounded-lg transition-all duration-200 ${
                active
                  ? "ring-2 ring-ink ring-offset-2"
                  : "ring-1 ring-oat opacity-60 hover:opacity-100"
              }`}
              aria-label={`View image ${index + 1} of ${images.length}`}
              aria-pressed={active}
            >
              <SafeImage
                src={image}
                alt={`${title} thumbnail ${index + 1}`}
                width={120}
                height={120}
                fallbackSrc="/images/placeholders/product-placeholder.svg"
                className="h-16 w-16 object-cover sm:h-[72px] sm:w-[72px] lg:h-20 lg:w-20"
              />
            </button>
          );
        })}
      </div>

      {/* ================================================================ */}
      {/*  Main image                                                       */}
      {/* ================================================================ */}
      <div
        className="relative flex-1"
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="region"
        aria-roledescription="Image gallery"
        aria-label={`${title} — image ${selectedIndex + 1} of ${images.length}`}
      >
        {/* Image container with hover-zoom */}
        <div
          className="relative overflow-hidden rounded-2xl border border-oat bg-sand/30"
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
          onMouseMove={handleMouseMove}
        >
          <SafeImage
            key={selectedImage}
            src={selectedImage}
            alt={title}
            width={1100}
            height={1300}
            priority
            fallbackSrc="/images/placeholders/product-placeholder.svg"
            className={`aspect-[3/4] w-full object-cover transition-transform duration-500 ease-out motion-safe:animate-fade-in-fast ${
              isZoomed ? "scale-150" : "scale-100"
            }`}
            style={
              isZoomed
                ? { transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` }
                : undefined
            }
          />
        </div>

        {/* Mobile prev / next arrows */}
        {images.length > 1 && (
          <div className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-2 lg:hidden">
            <button
              type="button"
              onClick={prev}
              disabled={selectedIndex === 0}
              aria-label="Previous image"
              className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-ink shadow-sm backdrop-blur-sm transition-opacity disabled:opacity-30"
            >
              <ChevronLeft />
            </button>
            <button
              type="button"
              onClick={next}
              disabled={selectedIndex === images.length - 1}
              aria-label="Next image"
              className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-ink shadow-sm backdrop-blur-sm transition-opacity disabled:opacity-30"
            >
              <ChevronRight />
            </button>
          </div>
        )}

        {/* Image counter pill (mobile) */}
        {images.length > 1 && (
          <span className="absolute bottom-3 right-3 rounded-full bg-ink/60 px-2.5 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm lg:hidden">
            {selectedIndex + 1} / {images.length}
          </span>
        )}
      </div>
    </div>
  );
}
