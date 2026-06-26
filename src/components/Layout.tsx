import { Link, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Menu, X, Smartphone, MessageCircle, RefreshCw } from 'lucide-react';
import { AGENT_CONFIG, BRAND_MARK, SITE_TITLE } from '../config';

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
              <a href="https://cal.com/the-citadl/discovery-call" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] hover:underline inline-block mt-1 md:mt-0 md:ml-1 font-medium">
                → Book a free discovery call
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
            Zillow and Realtor.com show your listings next to every other agent's. Your own site puts you front and center. No competitors, no distractions, just you and the buyer.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 text-[var(--primary)]">
                <RefreshCw size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-medium text-[#1A1A1A] mb-3">Always up to date</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Your MLS listings sync automatically. Add off-market and exclusive properties manually whenever you want.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 text-[var(--primary)]">
                <Smartphone size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-medium text-[#1A1A1A] mb-3">Your listings, your brand</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Upload new properties from your phone or laptop. No middlemen.
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
          </div>

          <a
            href="https://cal.com/the-citadl/discovery-call?overlayCalendar=true"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[var(--primary)] text-white px-8 py-4 uppercase tracking-widest text-sm hover:opacity-90 transition-opacity"
          >
            Schedule a Call
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
              <a href="mailto:hello@thecitadl.com" className="hover:text-white transition-colors">
                hello@thecitadl.com
              </a>
              <p>United States</p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-16 pt-12 border-t border-gray-800 text-center mb-12">
          <p className="text-2xl md:text-3xl font-serif text-white mb-6">
            Let's build your brand. Let's talk.
          </p>
          <a
            href="https://cal.com/the-citadl/discovery-call?overlayCalendar=true"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[var(--primary)] text-white px-8 py-4 uppercase tracking-widest text-sm hover:opacity-90 transition-opacity"
          >
            Schedule a Call
          </a>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-gray-800 flex flex-col items-center gap-4">
          <p className="text-xs text-gray-400 uppercase tracking-widest text-center max-w-2xl leading-relaxed">
            &copy; {new Date().getFullYear()} {SITE_TITLE}. Demo site. The properties shown are fictitious.
          </p>
          <p className="text-xs text-gray-500">
            Demo site created by <a href="https://www.thecitadl.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors underline">The Citadl</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
