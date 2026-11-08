import { whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "./Icons";

export function WhatsAppFab() {
  return (
    <a
      href={whatsappLink("Hi Vardhan Metals, I want to sell electrical / electronic scrap.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25d366] text-white shadow-lg shadow-black/25 transition-transform hover:scale-105"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
