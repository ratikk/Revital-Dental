import React, { useState } from 'react';
import type { ImageMetadata } from 'astro';

/**
 * Genuine before/after cases only. No treatment duration, visit counts,
 * materials, or diagnoses here — those details are not published unless
 * supplied and approved. Alt text comes from the case data, not a template.
 */
interface Transformation {
  tag: string;         // treatment tag pill, e.g. "Dental Restoration"
  title: string;
  description: string; // short, non-clinical explanation
  before: ImageMetadata;
  after: ImageMetadata;
  beforeAlt: string;
  afterAlt: string;
  /** CSS object-position for both frames; keeps the clinically relevant
   *  teeth/smile region when the source framing differs. */
  objectPosition?: string;
  /** Optional link to the matching treatment page. */
  serviceHref?: string;
  serviceLabel?: string;
}

interface Props {
  transformations: Transformation[];
}

/**
 * Draggable before/after comparison. The invisible <input type="range">
 * is the real control: touch-drag, mouse-drag, and left/right arrow keys
 * all move the divider, and the wrapper shows a visible focus ring.
 * BEFORE/AFTER text labels sit on the images (not color-dependent).
 */
const CompareSlider = ({
  before,
  after,
  beforeAlt,
  afterAlt,
  objectPosition = 'center',
  eager = false,
}: {
  before: ImageMetadata;
  after: ImageMetadata;
  beforeAlt: string;
  afterAlt: string;
  objectPosition?: string;
  eager?: boolean;
}) => {
  const [position, setPosition] = useState(50); // Start at 50%

  return (
    <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden cursor-ew-resize group select-none shadow-lg border border-gray-100 focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2">

      {/* 1. AFTER Image (Background Layer) */}
      <img
        src={after.src}
        width={after.width}
        height={after.height}
        alt={afterAlt}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition }}
        loading={eager ? 'eager' : 'lazy'}
        draggable={false}
      />
      <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 text-xs font-bold rounded-full backdrop-blur-sm z-10 tracking-widest">
        AFTER
      </div>

      {/* 2. BEFORE Image (Top Layer - Clipped) */}
      <img
        src={before.src}
        width={before.width}
        height={before.height}
        alt={beforeAlt}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition, clipPath: `inset(0 ${100 - position}% 0 0)` }}
        loading={eager ? 'eager' : 'lazy'}
        draggable={false}
      />
      <div
        className="absolute top-4 left-4 bg-white/90 text-gray-900 px-3 py-1 text-xs font-bold rounded-full backdrop-blur-sm z-10 tracking-widest shadow-sm"
        style={{ opacity: position > 15 ? 1 : 0, transition: 'opacity 0.2s' }} // Hide label if slider covers it
      >
        BEFORE
      </div>

      {/* 3. The Slider Handle (Visual Only) */}
      <div
        className="absolute inset-y-0 w-1 bg-white shadow-[0_0_15px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
        style={{ left: `${position}%` }}
      >
        {/* Circle Handle Button */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center text-primary-600 border border-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" className="rotate-90 origin-center" />
          </svg>
        </div>
      </div>

      {/* 4. Invisible Input Range (The actual interactive part) */}
      <input
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30 touch-none"
        aria-label="Drag to compare the before and after photos"
      />
    </div>
  );
};

export default function BeforeAfterGallery({ transformations }: Props) {
  return (
    <div className="space-y-24">
      {transformations.map((item, index) => (
        // Alternating Layout for visual interest
        <div key={index} className={`flex flex-col gap-10 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>

          {/* Image Slider Side */}
          <div className="w-full lg:w-1/2" data-aos="fade-up">
            <CompareSlider
              before={item.before}
              after={item.after}
              beforeAlt={item.beforeAlt}
              afterAlt={item.afterAlt}
              objectPosition={item.objectPosition}
              eager={index === 0}
            />
          </div>

          {/* Text Details Side */}
          <div className="w-full lg:w-1/2 lg:px-8" data-aos="fade-up" data-aos-delay="100">
            <div className="inline-block px-3 py-1 bg-primary-50 text-primary-700 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
              {item.tag}
            </div>

            <h3 className="text-3xl font-bold font-heading text-gray-900 mb-4 leading-tight">
              {item.title}
            </h3>

            <p className="text-lg text-gray-600 leading-relaxed">
              {item.description}
            </p>

            {item.serviceHref && (
              <a
                href={item.serviceHref}
                className="inline-flex items-center gap-1 mt-6 text-primary-600 font-semibold hover:text-primary-800 transition-colors"
              >
                {item.serviceLabel || 'Learn more'}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
