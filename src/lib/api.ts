import { useEffect, useState } from 'react';
import { supabase } from './supabase';

export interface Listing {
  id: string;
  titulo: string;
  precio: number;
  ubicacion: string;
  descripcion: string;
  habitaciones: number | null;
  banos: number | null;
  metros: string;
  whatsapp: string;
  tipo: string;
  status: string;
  featured: boolean;
  images: string[];
  property_type: string;
  negociable: boolean;
  sold_status: string;
  video_url: string;
}

export function formatPrecio(precio: number): string {
  if (!Number.isFinite(precio)) return '';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(precio);
}

export async function fetchListings(): Promise<Listing[]> {
  try {
    const { data, error } = await supabase
      .from('listings')
      .select('*, listing_images(url, order_index)')
      .eq('status', 'publicado');

    if (error) throw error;

    const listings: Listing[] = (data ?? []).map((row: any) => {
      let images: string[];

      if (row.is_manual === false) {
        // MLS-imported listing: images come from the external_image_urls column
        images = Array.isArray(row.external_image_urls)
          ? row.external_image_urls.filter((u: any) => typeof u === 'string' && u.trim())
          : [];
      } else {
        // Manually uploaded listing: images come from the listing_images join
        const imgs = Array.isArray(row.listing_images) ? [...row.listing_images] : [];
        imgs.sort((a, b) => (a?.order_index ?? 0) - (b?.order_index ?? 0));
        images = imgs
          .map((i: any) => (typeof i?.url === 'string' ? i.url.trim() : ''))
          .filter(Boolean);
      }

      return {
        id: String(row.id ?? ''),
        titulo: String(row.titulo ?? ''),
        precio: Number(row.precio ?? 0),
        ubicacion: String(row.ubicacion ?? ''),
        descripcion: String(row.descripcion ?? ''),
        habitaciones: row.habitaciones == null ? null : Number(row.habitaciones),
        banos: row.banos == null ? null : Number(row.banos),
        metros: row.metros == null ? '' : String(row.metros),
        whatsapp: String(row.whatsapp ?? ''),
        tipo: String(row.tipo ?? ''),
        status: String(row.status ?? ''),
        featured: row.featured === true,
        images,
        property_type: String(row.property_type ?? ''),
        negociable: row.negociable === true,
        sold_status: String(row.sold_status ?? ''),
        video_url: String(row.video_url ?? ''),
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
