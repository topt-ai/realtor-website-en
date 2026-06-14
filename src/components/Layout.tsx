import { Link, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Menu, X, Smartphone, MessageCircle, Search } from 'lucide-react';
import { AGENT_CONFIG, BRAND_MARK, SITE_TITLE, formatPhoneDisplay } from '../config';

export default function Layout() {
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
  }, [location.pathname]);

  const cleanWhatsapp = AGENT_CONFIG.whatsapp.replace(/\D/g, '');
  const contactHref = `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(`Hi ${AGENT_CONFIG.name}, I'd like more information.`)}`;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F6F2] font-sans text-[#1A1A1A]">
      {/* Navigation */}
      <header className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-40 border-b border-gray-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="text-2xl font-serif tracking-tight text-[#1A1A1A]">
            {BRAND_MARK}<span className="text-[var(--primary)]">.</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm uppercase tracking-widest hover:text-[var(--primary)] transition-colors">
              Home
            </Link>
            <Link to="/properties" className="text-sm uppercase tracking-widest hover:text-[var(--primary)] transition-colors">
              Properties
            </Link>
            <a
              href={contactHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm uppercase tracking-widest border border-[#1A1A1A] px-6 py-2 hover:bg-[#1A1A1A] hover:text-white transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-[#1A1A1A]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 py-6 px-6 flex flex-col gap-6 shadow-xl">
            <Link to="/" className="text-lg tracking-widest uppercase">Home</Link>
            <Link to="/properties" className="text-lg tracking-widest uppercase">Properties</Link>
            <a
              href={contactHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg tracking-widest uppercase text-[var(--primary)]"
            >
              Contact
            </a>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-20">
        {isBannerVisible && (
          <div className="bg-[#1A1A1A] text-white py-2 px-4 flex justify-between items-center text-xs md:text-sm shadow-sm relative z-30">
            <div className="mx-auto text-center flex-1 pr-4">
              This is a demo site. The properties shown are for demonstration only. Want one like this for your business?{' '}
              <a href="mailto:hello@thecitadl.com" className="text-[var(--primary)] hover:underline inline-block mt-1 md:mt-0 md:ml-1 font-medium">
                → hello@thecitadl.com
              </a>
            </div>
            <button onClick={() => setIsBannerVisible(false)} className="text-gray-400 hover:text-white flex-shrink-0" aria-label="Close banner">
              <X size={16} />
            </button>
          </div>
        )}
        <Outlet />
      </main>

      {/* Pitch Section */}
      <section className="w-full bg-[#F8F6F2] py-24 px-6 border-t border-gray-200">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-[var(--primary)] text-sm font-bold uppercase tracking-widest mb-4 block">
            YOUR PERSONAL BRAND
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] mb-6">
            Stop depending on Marketplace.
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-16 max-w-3xl mx-auto">
            The best agents don't wait for clients to find them on Zillow — they build their own brand, their own space, their own rules. Your personal website: showcase your properties, build trust, and convert visits into inquiries straight to your WhatsApp.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 text-[var(--primary)]">
                <Smartphone size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-medium text-[#1A1A1A] mb-3">Your listings, your brand</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Upload new properties from your phone or laptop, wherever you are. No middlemen.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 text-[var(--primary)]">
                <MessageCircle size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-medium text-[#1A1A1A] mb-3">Leads straight to WhatsApp</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Every property has a button that connects the buyer to you instantly.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 text-[var(--primary)]">
                <Search size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-medium text-[#1A1A1A] mb-3">Show up on Google</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Your site strengthens your local presence and helps you rank when someone searches for an agent in your area.
              </p>
            </div>
          </div>

          <a
            href="mailto:hello@thecitadl.com"
            className="inline-block bg-[var(--primary)] text-white px-8 py-4 uppercase tracking-widest text-sm hover:opacity-90 transition-opacity"
          >
            I want my website
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A1A1A] text-white py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <Link to="/" className="text-3xl font-serif tracking-tight mb-6 block">
              {BRAND_MARK}<span className="text-[var(--primary)]">.</span>
            </Link>
            <p className="text-gray-400 font-light leading-relaxed max-w-sm">
              {AGENT_CONFIG.tagline}. Premium real estate.
            </p>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-widest mb-6 text-[var(--primary)]">Contact</h4>
            <div className="flex flex-col gap-4 text-gray-400 font-light">
              <a href={`https://wa.me/${cleanWhatsapp}`} className="hover:text-white transition-colors">
                {formatPhoneDisplay(AGENT_CONFIG.whatsapp)}
              </a>
              <a href="mailto:hello@thecitadl.com" className="hover:text-white transition-colors">
                hello@thecitadl.com
              </a>
              <p>United States</p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-800 flex flex-col items-center gap-4">
          <p className="text-xs text-gray-400 uppercase tracking-widest text-center max-w-2xl leading-relaxed">
            &copy; {new Date().getFullYear()} {SITE_TITLE}. Demo site — the properties shown are fictitious.
          </p>
          <p className="text-xs text-gray-500">
            Demo site created by The Citadl — https://thecitadl.com
          </p>
        </div>
      </footer>
    </div>
  );
}
