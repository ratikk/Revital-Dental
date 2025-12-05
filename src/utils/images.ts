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
import drSangeeta from '../assets/images/about/dr-sangeeta.jpg'; 

// Gallery Images
import whiteningCase1Before from '../assets/images/gallery/whitening-case1-before.jpg';
import whiteningCase1After from '../assets/images/gallery/whitening-case1-after.jpg';
import fillingsCase1Before from '../assets/images/gallery/fillings-case1-before.jpg';
import fillingsCase1After from '../assets/images/gallery/fillings-case1-after.jpg';
import implantCase1Before from '../assets/images/gallery/implant-case1-before.jpg';
import implantCase1After from '../assets/images/gallery/implant-case1-after.jpg';

export const HERO_IMAGES = {
  dental1, dental2, dental3, dental4, dental5, dental6
} as const;

export const TEAM_IMAGES = {
  drSuman,
  // ✅ UPDATED: Export Dr. G
  drSangeeta 
} as const;

export const GALLERY_IMAGES = {
  whiteningCase1: { before: whiteningCase1Before, after: whiteningCase1After },
  fillingsCase1: { before: fillingsCase1Before, after: fillingsCase1After },
  implantCase1: { before: implantCase1Before, after: implantCase1After }
} as const;
