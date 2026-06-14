import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useEffect } from 'react';
import { useListings } from '../lib/api';
import ListingCard from '../components/ListingCard';
import { AGENT_CONFIG, SITE_TITLE } from '../config';

export default function Home() {
  const { listings, loading } = useListings();

  useEffect(() => {
    document.title = SITE_TITLE;
  }, []);

  // Featured listings (flagged via Supabase `featured = true`)
  const featuredListings = listings.filter(l => l.featured);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1715742634813-e13fc96d9195?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="Luxury Home" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-16">
          <p className="text-[var(--primary)] uppercase tracking-[0.3em] text-sm md:text-base mb-6 font-medium">
            {SITE_TITLE}
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-8 leading-tight">
            {AGENT_CONFIG.tagline}.
          </h1>
          <Link 
            to="/propiedades" 
            className="inline-flex items-center gap-3 bg-white text-[#1A1A1A] px-8 py-4 uppercase tracking-widest text-sm hover:bg-[var(--primary)] hover:text-white transition-colors duration-300"
          >
            Ver Propiedades <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 md:py-32 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-serif mb-10 text-[#1A1A1A]">
            Experiencia local.<br/>Servicio de clase mundial.
          </h2>
          <p className="text-lg md:text-xl text-[#2C2C2C] font-light leading-relaxed">
            {AGENT_CONFIG.bio}
          </p>
          <div className="mt-12">
            <img
              src={AGENT_CONFIG.logo}
              alt={AGENT_CONFIG.name}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover mx-auto border-4 border-[#F8F6F2]"
              referrerPolicy="no-referrer"
            />
            <p className="mt-6 font-serif text-xl">{AGENT_CONFIG.name}</p>
            <p className="text-[var(--primary)] uppercase tracking-widest text-xs mt-2">Fundador y Agente Principal</p>
          </div>
        </div>
      </section>

      {/* Featured Listings — hidden entirely when no featured listings exist */}
      {(loading || featuredListings.length > 0) && (
        <section className="py-24 px-6 bg-[#F8F6F2]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div>
                <p className="text-[var(--primary)] uppercase tracking-widest text-sm mb-4">Exclusividad</p>
                <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A1A]">Propiedades Destacadas</h2>
              </div>
              <Link
                to="/propiedades"
                className="inline-flex items-center gap-2 text-[#1A1A1A] uppercase tracking-widest text-sm hover:text-[var(--primary)] transition-colors border-b border-[#1A1A1A] hover:border-[var(--primary)] pb-1"
              >
                Ver Todas <ArrowRight size={16} />
              </Link>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse bg-white border border-gray-100 h-[500px]">
                    <div className="w-full h-[300px] bg-gray-200"></div>
                    <div className="p-6">
                      <div className="h-6 bg-gray-200 w-3/4 mb-4"></div>
                      <div className="h-8 bg-gray-200 w-1/2 mb-8"></div>
                      <div className="h-4 bg-gray-200 w-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredListings.map(listing => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
