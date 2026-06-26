import { Link } from 'react-router-dom';
import { Bed, Bath, Square, Home } from 'lucide-react';
import { Listing, formatPrecio } from '../lib/api';
import WhatsAppButton from './WhatsAppButton';

interface ListingCardProps {
  listing: Listing;
  key?: string | number;
}

export default function ListingCard({ listing }: ListingCardProps) {
  const firstPhoto = listing.images[0] ?? null;
  const listingUrl = `${window.location.origin}/properties/${listing.id}`;

  const soldOverlay =
    listing.sold_status === 'vendido'
      ? { label: 'Sold', bg: 'bg-red-600' }
      : listing.sold_status === 'alquilado'
      ? { label: 'Rented', bg: 'bg-[#1E4A8B]' }
      : null;

  const tipoLabel =
    listing.tipo === 'venta'
      ? 'For Sale'
      : listing.tipo === 'alquiler'
      ? 'For Rent'
      : listing.tipo;

  const propertyTypeLabel: Record<string, string> = {
    casa: 'House',
    apartamento: 'Apartment',
    terreno: 'Land',
    'local comercial': 'Commercial Space',
    oficina: 'Office',
  };

  return (
    <div className="group flex flex-col bg-white border border-gray-100 hover:border-[var(--primary)] transition-all duration-500 shadow-sm hover:shadow-xl hover:-translate-y-1 h-full">
      <Link to={`/properties/${listing.id}`} className="block relative aspect-[4/3] overflow-hidden">
        {firstPhoto ? (
          <img
            src={firstPhoto}
            alt={listing.titulo}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <Home size={48} className="text-gray-300" strokeWidth={1} />
          </div>
        )}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold tracking-wider uppercase text-[#1A1A1A]">
          {listing.ubicacion}
        </div>
        {listing.tipo && (
          <div
            className={`absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold tracking-wider uppercase border-2 ${
              listing.tipo === 'venta'
                ? 'border-[var(--primary)] text-[var(--primary)]'
                : 'border-[#1E4A8B] text-[#1E4A8B]'
            }`}
          >
            {tipoLabel}
          </div>
        )}
        {soldOverlay && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="absolute inset-0 bg-black/30"></div>
            <div
              className={`relative ${soldOverlay.bg} text-white px-8 py-2 text-base font-semibold uppercase tracking-[0.25em] shadow-lg -rotate-6`}
            >
              {soldOverlay.label}
            </div>
          </div>
        )}
      </Link>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex-grow">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            {listing.property_type && (
              <span className="text-[10px] uppercase tracking-widest text-gray-500 border border-gray-200 px-2 py-0.5">
                {propertyTypeLabel[listing.property_type.toLowerCase()] ?? listing.property_type}
              </span>
            )}
            {listing.negociable && (
              <span className="text-[10px] uppercase tracking-widest bg-[var(--primary)] text-white px-2 py-0.5 rounded-full font-semibold">
                Price negotiable
              </span>
            )}
          </div>
          <Link to={`/properties/${listing.id}`}>
            <h3 className="text-xl font-medium text-[#1A1A1A] mb-2 line-clamp-2 font-serif group-hover:text-[var(--primary)] transition-colors">
              {listing.titulo}
            </h3>
          </Link>
          <p className="text-2xl font-light text-[#1A1A1A] mb-6">
            {formatPrecio(listing.precio)}
          </p>

          <div className="flex items-center gap-6 text-[#2C2C2C] mb-8 border-t border-gray-100 pt-4">
            {listing.habitaciones != null && (
              <div className="flex items-center gap-2">
                <Bed size={18} className="text-[var(--primary)]" />
                <span className="text-sm">{listing.habitaciones}</span>
              </div>
            )}
            {listing.banos != null && (
              <div className="flex items-center gap-2">
                <Bath size={18} className="text-[var(--primary)]" />
                <span className="text-sm">{listing.banos}</span>
              </div>
            )}
            {listing.metros && (
              <div className="flex items-center gap-2">
                <Square size={18} className="text-[var(--primary)]" />
                <span className="text-sm">{listing.metros}</span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-auto">
          <WhatsAppButton
            whatsapp={listing.whatsapp}
            titulo={listing.titulo}
            pageUrl={listingUrl}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
