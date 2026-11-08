// Central business details. Update these before going live —
// the phone / WhatsApp numbers below are placeholders.
export const site = {
  name: "Vardhan Metals",
  tagline: "Electrical & Electronic Scrap Buyers",
  phoneDisplay: "+91 90000 00000",
  phoneHref: "tel:+919000000000",
  whatsapp: "919000000000", // digits only, with country code
  email: "vardhanmetals@gmail.com",
  address: "302, Priyanka Arcade, Op. Road, Bh. Banker's Heart Institute, Vadodara - 390020",
  hours: "Mon–Sat, 9:00 AM – 7:00 PM",
  domain: "https://www.vardhanmetals.com",
};

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
