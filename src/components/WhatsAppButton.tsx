import { MessageCircle } from 'lucide-react';
import { AGENT_CONFIG } from '../config';

interface WhatsAppButtonProps {
  whatsapp: string;
  titulo: string;
  pageUrl: string;
  className?: string;
}

export default function WhatsAppButton({ whatsapp, titulo, pageUrl, className = '' }: WhatsAppButtonProps) {
  const phoneNumber = whatsapp || AGENT_CONFIG.whatsapp;
  const cleanNumber = phoneNumber.replace(/\D/g, '');

  const firstName = AGENT_CONFIG.name.split(' ')[0];
  const text = `Hi ${firstName}! I'm interested in the property: ${titulo} - ${pageUrl}`;
  const encodedText = encodeURIComponent(text);
  const url = `https://wa.me/${cleanNumber}?text=${encodedText}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 bg-[var(--primary)] hover:opacity-90 text-white font-medium py-3 px-6 rounded-none transition-opacity duration-300 w-full md:w-auto ${className}`}
    >
      <MessageCircle size={20} />
      <span>Chat on WhatsApp</span>
    </a>
  );
}
