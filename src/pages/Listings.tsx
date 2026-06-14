import { useEffect, useMemo, useState } from 'react';
import { useListings } from '../lib/api';
import ListingCard from '../components/ListingCard';
import { SITE_TITLE } from '../config';

const PROPERTY_TYPES = ['House', 'Apartment', 'Land', 'Commercial Space', 'Office'];
const TIPOS = ['for sale', 'for rent'];

export default function Listings() {
  const { listings, loading, error } = useListings();
  const [propertyType, setPropertyType] = useState<string>('');
  const [tipo, setTipo] = useState<string>('');

  useEffect(() => {
    document.title = `Properties | ${SITE_TITLE}`;
  }, []);

  const filtered = useMemo(() => {
    return listings.filter(l => {
      if (propertyType && l.property_type !== propertyType) return false;
      if (tipo && l.tipo !== tipo) return false;
      return true;
    });
  }, [listings, propertyType, tipo]);

  return (
    <div className="min-h-screen bg-[#F8F6F2] pt-12 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-serif text-[#1A1A1A] mb-6">Properties</h1>
          <p className="text-lg text-[#2C2C2C] font-light max-w-2xl">
            Discover our exclusive collection of properties.
            Each home has been selected for its exceptional design and prime location.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-12 flex flex-col sm:flex-row gap-4 items-stretch sm:items-end">
          <div className="flex flex-col gap-2 flex-1 sm:max-w-xs">
            <label className="text-xs uppercase tracking-widest text-gray-500">Property type</label>
            <select
              value={propertyType}
              onChange={e => setPropertyType(e.target.value)}
              className="bg-white border border-gray-200 px-4 py-3 text-sm text-[#1A1A1A] focus:outline-none focus:border-[var(--primary)] transition-colors"
            >
              <option value="">All</option>
              {PROPERTY_TYPES.map(pt => (
                <option key={pt} value={pt}>{pt}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2 flex-1 sm:max-w-xs">
            <label className="text-xs uppercase tracking-widest text-gray-500">Listing type</label>
            <select
              value={tipo}
              onChange={e => setTipo(e.target.value)}
              className="bg-white border border-gray-200 px-4 py-3 text-sm text-[#1A1A1A] capitalize focus:outline-none focus:border-[var(--primary)] transition-colors"
            >
              <option value="">All</option>
              {TIPOS.map(t => (
                <option key={t} value={t} className="capitalize">{t}</option>
              ))}
            </select>
          </div>
          {(propertyType || tipo) && (
            <button
              type="button"
              onClick={() => { setPropertyType(''); setTipo(''); }}
              className="text-xs uppercase tracking-widest text-gray-500 hover:text-[#1A1A1A] transition-colors px-2 py-3 self-start sm:self-end"
            >
              Clear filters
            </button>
          )}
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-6 border border-red-100 mb-12">
            <p>There was an error loading the properties. Please try again later.</p>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
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
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white border border-gray-100">
            <h3 className="text-2xl font-serif text-[#1A1A1A] mb-4">No properties found</h3>
            <p className="text-gray-500 font-light">
              {propertyType || tipo
                ? 'No properties match the selected filters.'
                : 'No properties are currently available.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
