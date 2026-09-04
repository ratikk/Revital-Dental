import type { ImageMetadata } from 'astro';

// Hero Images
import dental1 from '../assets/images/hero/dental-1.jpg';
import dental2 from '../assets/images/hero/dental-2.jpg';
import dental3 from '../assets/images/hero/dental-3.jpg';
import dental4 from '../assets/images/hero/dental-4.jpg';
import dental5 from '../assets/images/hero/dental-5.jpg';
import dental6 from '../assets/images/hero/dental-6.jpg';

// Team Photos
import drSuman from '../assets/images/about/dr-suman.jpg';
// ✅ UPDATED: Import Dr. G's image
// Newer profile shot recovered from S3 version history (Aug 2026);
// the previous portrait remains at ../assets/images/about/dr-sangeeta.jpg
import drSangeeta from '../assets/images/about/dr-sangeeta-profile.jpg'; 

// Gallery Images — genuine before/after cases (added Aug 2026, metadata
// stripped, clinical appearance unaltered). Marketing use requires written
// patient authorization on file for every identifiable image.
import restorationBefore from '../assets/images/gallery/restoration-before.jpg';
import restorationAfter from '../assets/images/gallery/restoration-after.jpg';
import whiteningBefore from '../assets/images/gallery/whitening-before.jpg';
import whiteningAfter from '../assets/images/gallery/whitening-after.jpg';
import crownsBefore from '../assets/images/gallery/crowns-before.jpg';
import crownsAfter from '../assets/images/gallery/crowns-after.jpg';
import invisalignBefore from '../assets/images/gallery/invisalign-before.jpg';
import invisalignAfter from '../assets/images/gallery/invisalign-after.jpg';

export const HERO_IMAGES = {
  dental1, dental2, dental3, dental4, dental5, dental6
} as const;

export const TEAM_IMAGES = {
  drSuman,
  // ✅ UPDATED: Export Dr. G
  drSangeeta 
} as const;

export const GALLERY_IMAGES = {
  restoration: { before: restorationBefore, after: restorationAfter },
  whitening: { before: whiteningBefore, after: whiteningAfter },
  crowns: { before: crownsBefore, after: crownsAfter },
  invisalign: { before: invisalignBefore, after: invisalignAfter },
} as const;
