import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  whatsapp: string;
  titulo: string;
  pageUrl: string;
  className?: string;
}

export default function WhatsAppButton({ className = '' }: WhatsAppButtonProps) {
  return (
    <span
      className={`inline-flex items-center justify-center gap-2 bg-[var(--primary)] text-white font-medium py-3 px-6 rounded-none w-full md:w-auto cursor-default select-none ${className}`}
    >
      <MessageCircle size={20} />
      <span>Chat on WhatsApp</span>
    </span>
  );
}
