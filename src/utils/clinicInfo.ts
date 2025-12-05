export const clinicInfo = {
  name: "Revital Dental",
  phone: "(254) 227-5777",
  displayPhone: "(254) 227-5777",
  address: {
    line1: "4311 S 31st St Ste 145",
    city: "Temple",
    state: "TX",
    zip: "76502",
    full: "4311 S 31st St Ste 145, Temple, TX 76502"
  },
  email: "revitaldentaltx@gmail.com",
  // ✅ UPDATED: The specific Google Maps link you provided
  mapLink: "https://www.google.com/maps/place/Revital+Dental/@31.05756,-97.3760514,17z/data=!3m1!4b1!4m6!3m5!1s0x86456b77cbcefa79:0xcf1db0a8e3bdced7!8m2!3d31.0575554!4d-97.3734765!16s%2Fg%2F11q598fxmn!5m1!1e1?entry=ttu",
  // ✅ UPDATED: Exact coordinates for the iframe embed
  coordinates: {
    latitude: 31.0575554,
    longitude: -97.3734765
  },
  hours: {
    Monday: "9:00 AM – 5:00 PM",
    Tuesday: "9:00 AM – 5:00 PM",
    Wednesday: "By Appointment Only",
    Thursday: "9:00 AM – 5:00 PM",
    Friday: "10:00 AM – 2:00 PM",
    Saturday: "By Appointment Only",
    Sunday: "Closed"
  },
  social: {
    facebook: "https://www.facebook.com/profile.php?id=100083067285666",
    twitter: "https://x.com/revitaldentaltx",
    yelp: "https://yelp.com"
  },
  booking: {
    url: "https://book.modento.io/revital-dental/patient-details"
  }
};

export type ClinicInfo = typeof clinicInfo;
export type BusinessHours = typeof clinicInfo.hours;

export default clinicInfo;
