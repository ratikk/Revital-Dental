import { GALLERY_IMAGES } from './images';

/**
 * The four genuine before/after cases shown on /smile-gallery and
 * /patient-education/before-after. Single source of truth — supplied photos
 * only, no durations/materials/diagnoses, alt text approved as written.
 * Written patient marketing authorization must be on file for every
 * identifiable image before production release.
 */
export const galleryCases = [
  {
    tag: "Dental Restoration",
    title: "Restoring a Chipped Front Tooth",
    description: "A natural-looking restoration was used to rebuild the damaged front tooth and create a smoother, more balanced smile.",
    before: GALLERY_IMAGES.restoration.before,
    after: GALLERY_IMAGES.restoration.after,
    beforeAlt: "Before treatment showing a chipped upper front tooth.",
    afterAlt: "After treatment showing the restored upper front tooth.",
    objectPosition: "center 45%",
  },
  {
    tag: "Teeth Whitening",
    title: "A Brighter, Refreshed Smile",
    description: "Professional whitening helped reduce visible staining and brighten the patient's smile while preserving its natural appearance.",
    before: GALLERY_IMAGES.whitening.before,
    after: GALLERY_IMAGES.whitening.after,
    beforeAlt: "Smile before professional teeth-whitening treatment.",
    afterAlt: "Brighter smile after professional teeth-whitening treatment.",
  },
  {
    tag: "Dental Crowns",
    title: "Natural-Looking Crown Restoration",
    description: "Custom crowns were placed to restore the prepared front teeth and blend naturally with the surrounding smile.",
    before: GALLERY_IMAGES.crowns.before,
    after: GALLERY_IMAGES.crowns.after,
    beforeAlt: "Prepared upper front teeth before placement of dental crowns.",
    afterAlt: "Upper front teeth after delivery of custom dental crowns.",
  },
  {
    tag: "Invisalign\u00ae",
    title: "A Straighter, More Confident Smile",
    description: "Clear-aligner treatment improved tooth alignment and created a more even, harmonious smile.",
    before: GALLERY_IMAGES.invisalign.before,
    after: GALLERY_IMAGES.invisalign.after,
    beforeAlt: "Smile before clear-aligner treatment showing uneven tooth alignment.",
    afterAlt: "Straighter smile after clear-aligner treatment.",
  },
];
