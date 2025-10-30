export const clinicInfo = {
  name: "Revital Dental",
  address: {
    line1: "4311 S 31st Ste 145",
    city: "Temple",
    state: "TX",
    zip: "76502",
    full: "4311 S 31st Ste 145, Temple, TX 76502"
  },
  phone: "+12546778640",
  displayPhone: "(254) 677-8640",
  email: "revitaldentaltx@gmail.com",
  mapLink: "https://www.google.com/maps/place/Revital+Dental/@31.0575554,-97.3734765,15z/data=!4m6!3m5!1s0x86456b77cbcefa79:0xcf1db0a8e3bdced7!8m2!3d31.0575554!4d-97.3734765!16s%2Fg%2F11q598fxmn!5m1!1e1?entry=ttu&g_ep=EgoyMDI1MDcyOS4wIKXMDSoASAFQAw%3D%3D",
  coordinates: {
    latitude: 31.0575554,
    longitude: -97.3734765
  },
  hours: {
    Monday: "9:00 AM – 5:00 PM",
    Tuesday: "Closed",
    Wednesday: "9:00 AM – 5:00 PM",
    Thursday: "9:00 AM – 5:00 PM",
    Friday: "10:00 AM – 2:00 PM",
    Saturday: "9:00 AM – 2:00 PM",
    Sunday: "Closed"
  },
  social: {
    facebook: "https://www.facebook.com/RevitalDental/",
    twitter: "https://x.com/revitaldentaltx",
    yelp: "https://www.yelp.com/biz/revital-dental-austin"
  },
  booking: {
    url: "https://book.modento.io/revital-dental/patient-details"
  }
};

export type ClinicInfo = typeof clinicInfo;
export type BusinessHours = typeof clinicInfo.hours;

export default clinicInfo;
