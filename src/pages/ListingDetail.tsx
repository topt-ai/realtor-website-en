import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Bed, Bath, Square } from 'lucide-react';
import { useListings, formatPrecio } from '../lib/api';
import Gallery from '../components/Gallery';
import WhatsAppButton from '../components/WhatsAppButton';
import { AGENT_CONFIG, SITE_TITLE } from '../config';

export default function ListingDetail() {
  const { id } = useParams<{ id: string }>();
  const { listings, loading, error } = useListings();
  
  const listing = listings.find(l => l.id === id);
  const descripcion = listing
    ? listing.descripcion.replace(/\*+\s*SAMPLE DATA\s*\*+/gi, '').trim()
    : '';



  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-12 px-6">
        <div className="max-w-7xl mx-auto animate-pulse">
          <div className="h-8 bg-gray-200 w-32 mb-8"></div>
          <div className="w-full aspect-[21/9] bg-gray-200 mb-12"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <div className="h-12 bg-gray-200 w-3/4 mb-6"></div>
              <div className="h-6 bg-gray-200 w-1/4 mb-12"></div>
              <div className="h-4 bg-gray-200 w-full mb-4"></div>
              <div className="h-4 bg-gray-200 w-full mb-4"></div>
              <div className="h-4 bg-gray-200 w-2/3"></div>
            </div>
            <div className="lg:col-span-1">
              <div className="h-[300px] bg-gray-200 w-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="min-h-screen bg-[#F8F6F2] flex items-center justify-center px-6">
        <title>{`Property not found | ${SITE_TITLE}`}</title>
        <div className="text-center">
          <h1 className="text-4xl font-serif text-[#1A1A1A] mb-6">Property not found</h1>
          <p className="text-[#2C2C2C] font-light mb-8">The property you're looking for doesn't exist or is no longer available.</p>
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 text-[#1A1A1A] uppercase tracking-widest text-sm border-b border-[#1A1A1A] pb-1"
          >
            <ArrowLeft size={16} /> Back to properties
          </Link>
        </div>
      </div>
    );
  }

  const currentUrl = window.location.href;

  return (
    <div className="min-h-screen bg-white pb-24">
      <title>{`${listing.titulo} | ${SITE_TITLE}`}</title>
      <meta name="description" content={descripcion.substring(0, 160)} />
      <meta property="og:title" content={`${listing.titulo} | ${SITE_TITLE}`} />
      <meta property="og:description" content={descripcion.substring(0, 160)} />
      <meta property="og:image" content={listing.images[0] || 'https://picsum.photos/seed/luxuryhome/1200/630'} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${listing.titulo} | ${SITE_TITLE}`} />
      <meta name="twitter:description" content={descripcion.substring(0, 160)} />
      <meta name="twitter:image" content={listing.images[0] || 'https://picsum.photos/seed/luxuryhome/1200/630'} />

      {/* Back Link */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Link
          to="/properties"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-[#1A1A1A] uppercase tracking-widest text-xs transition-colors"
        >
          <ArrowLeft size={14} /> Back to properties
        </Link>
      </div>

      {/* Gallery */}
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 mb-16">
        <Gallery photos={listing.images} title={listing.titulo} />
      </div>

      {/* Video Tour */}
      {listing.video_url && (
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 mb-16">
          <p className="text-[var(--primary)] uppercase tracking-widest text-sm mb-4">Video Tour</p>
          {(() => {
            const url = listing.video_url;
            const isYouTube = /youtube\.com|youtu\.be/.test(url);
            if (isYouTube) {
              let videoId = '';
              try {
                const u = new URL(url);
                if (u.hostname.includes('youtu.be')) {
                  videoId = u.pathname.replace(/^\//, '');
                } else {
                  videoId = u.searchParams.get('v') || u.pathname.split('/').pop() || '';
                }
              } catch {
                videoId = '';
              }
              const embedUrl = videoId
                ? `https://www.youtube.com/embed/${videoId}`
                : url;
              return (
                <div className="relative w-full aspect-video bg-black">
                  <iframe
                    src={embedUrl}
                    title={`${listing.titulo} - Video tour`}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              );
            }
            return (
              <video
                src={url}
                controls
                autoPlay
                muted
                playsInline
                className="w-full aspect-video bg-black"
              />
            );
          })()}
        </div>
      )}

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Main Details */}
          <div className="lg:col-span-8">
            <div className="mb-12">
              <div className="flex items-center gap-2 text-[var(--primary)] mb-4">
                <MapPin size={18} />
                <span className="uppercase tracking-widest text-sm font-medium">{listing.ubicacion}</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#1A1A1A] mb-8 leading-tight">
                {listing.titulo}
              </h1>
              
              <div className="flex flex-wrap items-center gap-8 py-6 border-y border-gray-100 text-[#2C2C2C]">
                {listing.habitaciones != null && (
                  <div className="flex items-center gap-3">
                    <Bed size={24} className="text-[var(--primary)]" />
                    <div>
                      <p className="text-xl font-light">{listing.habitaciones}</p>
                      <p className="text-xs uppercase tracking-widest text-gray-500">Bedrooms</p>
                    </div>
                  </div>
                )}
                {listing.banos != null && (
                  <>
                    <div className="w-px h-10 bg-gray-200 hidden sm:block"></div>
                    <div className="flex items-center gap-3">
                      <Bath size={24} className="text-[var(--primary)]" />
                      <div>
                        <p className="text-xl font-light">{listing.banos}</p>
                        <p className="text-xs uppercase tracking-widest text-gray-500">Bathrooms</p>
                      </div>
                    </div>
                  </>
                )}
                {listing.metros && (
                  <>
                    <div className="w-px h-10 bg-gray-200 hidden sm:block"></div>
                    <div className="flex items-center gap-3">
                      <Square size={24} className="text-[var(--primary)]" />
                      <div>
                        <p className="text-xl font-light">{listing.metros}</p>
                        <p className="text-xs uppercase tracking-widest text-gray-500">Sq Ft</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="prose prose-lg max-w-none text-[#2C2C2C] font-light leading-relaxed">
              <h3 className="text-2xl font-serif text-[#1A1A1A] mb-6">Description</h3>
              {descripcion.split('\n').map((paragraph, idx) => (
                <p key={idx} className="mb-4">{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Sidebar / Sticky CTA */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 bg-[#F8F6F2] p-8 md:p-10 border border-gray-100">
              {listing.tipo && (
                <div
                  className={`inline-block rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase border-2 mb-4 ${
                    listing.tipo === 'venta'
                      ? 'border-[var(--primary)] text-[var(--primary)]'
                      : 'border-[#1E4A8B] text-[#1E4A8B]'
                  }`}
                >
                  {listing.tipo === 'venta' ? 'For Sale' : listing.tipo === 'alquiler' ? 'For Rent' : listing.tipo}
                </div>
              )}
              <p className="text-sm uppercase tracking-widest text-gray-500 mb-2">Price</p>
              <p className="text-4xl md:text-5xl font-light text-[#1A1A1A] mb-10">
                {formatPrecio(listing.precio)}
              </p>
              
              <div className="mb-10">
                <WhatsAppButton
                  whatsapp={listing.whatsapp}
                  titulo={listing.titulo}
                  pageUrl={currentUrl}
                  className="w-full py-4 text-lg"
                />
                <p className="text-xs text-gray-400 mt-3 text-center font-light">
                  This connects buyers directly to your WhatsApp
                </p>
              </div>
              
              <div className="border-t border-gray-200 pt-8 mt-8 flex items-center gap-4">
                <img
                  src={AGENT_CONFIG.logo}
                  alt={AGENT_CONFIG.name}
                  className="w-16 h-16 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <p className="font-serif text-lg text-[#1A1A1A]">{AGENT_CONFIG.name}</p>
                  <p className="text-xs uppercase tracking-widest text-[var(--primary)]">Lead Agent</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
