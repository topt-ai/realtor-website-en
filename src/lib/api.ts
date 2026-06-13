import { useEffect, useState } from 'react';
import { supabase } from './supabase';

export interface Listing {
  id: string;
  titulo: string;
  precio: string;
  ubicacion: string;
  descripcion: string;
  habitaciones: string;
  banos: string;
  metros: string;
  whatsapp: string;
  tipo: 'venta' | 'alquiler' | '';
  status: string;
  featured: boolean;
  images: string[];
}

function formatPrecio(value: unknown): string {
  if (value == null || value === '') return '';
  if (typeof value === 'number') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  }
  const str = String(value).trim();
  const asNum = Number(str);
  if (!Number.isNaN(asNum) && str !== '' && /^-?\d+(\.\d+)?$/.test(str)) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(asNum);
  }
  return str;
}

function normalizeTipo(value: unknown): 'venta' | 'alquiler' | '' {
  const t = String(value ?? '').trim().toLowerCase();
  return t === 'venta' ? 'venta' : t === 'alquiler' ? 'alquiler' : '';
}

export async function fetchListings(): Promise<Listing[]> {
  try {
    const { data, error } = await supabase
      .from('listings')
      .select('*, listing_images(url, position)')
      .eq('status', 'publicado');

    if (error) throw error;

    const listings: Listing[] = (data ?? []).map((row: any) => {
      const imgs = Array.isArray(row.listing_images) ? [...row.listing_images] : [];
      imgs.sort((a, b) => {
        const pa = a?.position ?? 0;
        const pb = b?.position ?? 0;
        return pa - pb;
      });
      const images = imgs
        .map((i: any) => (typeof i?.url === 'string' ? i.url.trim() : ''))
        .filter(Boolean);

      return {
        id: String(row.id ?? ''),
        titulo: String(row.titulo ?? ''),
        precio: formatPrecio(row.precio),
        ubicacion: String(row.ubicacion ?? ''),
        descripcion: String(row.descripcion ?? ''),
        habitaciones: row.habitaciones == null ? '' : String(row.habitaciones),
        banos: row.banos == null ? '' : String(row.banos),
        metros: row.metros == null ? '' : String(row.metros),
        whatsapp: String(row.whatsapp ?? ''),
        tipo: normalizeTipo(row.tipo),
        status: String(row.status ?? ''),
        featured: row.featured === true,
        images,
      };
    });

    return listings.filter(l => l.id);
  } catch (err) {
    console.error('Error fetching listings from Supabase:', err);
    return [];
  }
}

export function useListings() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchListings()
      .then(data => {
        setListings(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error in useListings:', err);
        setError(err);
        setLoading(false);
      });
  }, []);

  return { listings, loading, error };
}
