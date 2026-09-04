import React from 'react';
import type { ImageMetadata } from 'astro';

/**
 * Compact card-grid gallery, styled after NextGen Dental's smile gallery:
 * each card shows the case title, a treatment tag pill, and the before/after
 * photos side by side with persistent BEFORE / AFTER text labels.
 *
 * Genuine cases only — no treatment duration, visit counts, materials, or
 * diagnoses; alt text comes from the case data. Static markup, no state:
 * render it WITHOUT client:load so it ships zero JavaScript.
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

const Pane = ({
  image,
  alt,
  label,
  labelClass,
  labelSide,
  objectPosition = 'center',
  eager,
}: {
  image: ImageMetadata;
  alt: string;
  label: string;
  labelClass: string;
  labelSide: 'left' | 'right';
  objectPosition?: string;
  eager: boolean;
}) => (
  <div className="relative w-1/2 aspect-[4/3] overflow-hidden">
    <img
      src={image.src}
      width={image.width}
      height={image.height}
      alt={alt}
      className="absolute inset-0 w-full h-full object-cover"
      style={{ objectPosition }}
      loading={eager ? 'eager' : 'lazy'}
      draggable={false}
    />
    <span
      className={`absolute bottom-3 ${labelSide === 'left' ? 'left-3' : 'right-3'} px-3 py-1 text-[11px] font-bold tracking-widest rounded-full shadow-sm ${labelClass}`}
    >
      {label}
    </span>
  </div>
);

export default function BeforeAfterGallery({ transformations }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {transformations.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
          data-aos="fade-up"
        >
          {/* Card header */}
          <div className="px-5 pt-5 pb-3">
            <h3 className="text-lg font-bold font-heading text-gray-900 leading-snug">
              {item.title}
            </h3>
            <span className="inline-block mt-2 px-2.5 py-0.5 bg-primary-50 text-primary-700 text-xs font-semibold rounded-full">
              {item.tag}
            </span>
          </div>

          {/* Before | After, side by side */}
          <div className="flex gap-px bg-gray-200">
            <Pane
              image={item.before}
              alt={item.beforeAlt}
              label="BEFORE"
              labelClass="bg-white/95 text-gray-900"
              labelSide="left"
              objectPosition={item.objectPosition}
              eager={index < 3}
            />
            <Pane
              image={item.after}
              alt={item.afterAlt}
              label="AFTER"
              labelClass="bg-green-600 text-white"
              labelSide="right"
              objectPosition={item.objectPosition}
              eager={index < 3}
            />
          </div>

          {/* Explanation + optional treatment link */}
          <div className="px-5 py-4 flex-1 flex flex-col">
            <p className="text-sm text-gray-600 leading-relaxed">
              {item.description}
            </p>
            {item.serviceHref && (
              <a
                href={item.serviceHref}
                className="inline-flex items-center gap-1 text-sm text-primary-600 font-semibold hover:text-primary-800 transition-colors mt-auto pt-3"
              >
                {item.serviceLabel || 'Learn more'}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
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
