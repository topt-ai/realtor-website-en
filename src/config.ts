export const AGENT_CONFIG = {
  name: "Marcus Reid",
  tagline: "Finding you the home you deserve",
  bio: "With over 10 years of experience in premium real estate, Marcus Reid combines local market knowledge with world-class service. Whether you're buying your first home or investing in luxury property, Marcus is your trusted guide.",
  whatsapp: "50372018215",
  website: "https://marcusreid.tuwebsv.com",
  portal: "https://portal-en.tuwebsv.com",
  primaryColor: "#C9A84C",
  logo: "/tommyaboutus.webp",
};

// First word of the name, uppercased — used as the wordmark in header/footer.
export const BRAND_MARK = AGENT_CONFIG.name.split(' ')[0].toUpperCase();

// Site title suffix, e.g. "Marcus Reid Real Estate".
export const SITE_TITLE = `${AGENT_CONFIG.name} Real Estate`;

// "+503 7201 8215" from "50372018215". Adjust the country code split if needed.
export function formatPhoneDisplay(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (digits.length === 11 && digits.startsWith('503')) {
    return `+503 ${digits.slice(3, 7)} ${digits.slice(7)}`;
  }
  return `+${digits}`;
}
