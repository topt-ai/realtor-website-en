export const AGENT_CONFIG = {
  name: "Jarvis Mendez",
  tagline: "Encontrando el hogar que mereces",
  bio: "Con más de 10 años de experiencia en las propiedades más exclusivas de El Salvador, combinando experiencia local con un servicio de clase mundial. Ya sea que esté comprando su primera casa o invirtiendo en bienes raíces de lujo, su guía de confianza.",
  whatsapp: "50372018215",
  website: "https://jarvisrealty.tuwebsv.com",
  portal: "https://portal.tuwebsv.com",
  primaryColor: "#C9A84C",
  logo: "/tommyaboutus.webp",
};

// First word of the name, uppercased — used as the wordmark in header/footer.
export const BRAND_MARK = AGENT_CONFIG.name.split(' ')[0].toUpperCase();

// Site title suffix, e.g. "Jarvis Mendez Real Estate".
export const SITE_TITLE = `${AGENT_CONFIG.name} Real Estate`;

// "+503 7201 8215" from "50372018215". Adjust the country code split if needed.
export function formatPhoneDisplay(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (digits.length === 11 && digits.startsWith('503')) {
    return `+503 ${digits.slice(3, 7)} ${digits.slice(7)}`;
  }
  return `+${digits}`;
}
