import { MessageCircle } from "lucide-react";
import { contactHref } from "@/lib/utils";

export function WhatsAppButton() {
  return (
    <a
      href={contactHref()}
      className="fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-xl shadow-green-500/20 transition hover:-translate-y-1 hover:bg-green-600"
      aria-label="Contact CYNOVIA on WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
