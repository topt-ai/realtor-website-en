import { useState, FormEvent } from 'react';
import { supabase } from '../lib/supabase';

interface LeadCaptureFormProps {
  listingId?: string;
  compact?: boolean;
}

const LOOKING_FOR_OPTIONS = ['Buying', 'Selling', 'Renting', 'Just browsing'];
const TIMELINE_OPTIONS = ['ASAP', '1-3 months', '3-6 months', 'Just exploring'];

const inputClass =
  'w-full bg-white border border-gray-200 px-4 py-3 text-sm text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:border-[var(--primary)] transition-colors';
const labelClass = 'block text-xs uppercase tracking-widest text-gray-500 mb-2';

export default function LeadCaptureForm({ listingId, compact = false }: LeadCaptureFormProps) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    looking_for: '',
    timeline: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const set = (field: string, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const payload: Record<string, string | undefined> = {
      name: form.name,
      email: form.email,
      phone: form.phone || undefined,
      looking_for: form.looking_for || undefined,
      timeline: form.timeline || undefined,
      message: form.message || undefined,
      listing_id: listingId || undefined,
    };

    const { error: insertError } = await supabase.from('leads').insert([payload]);

    setSubmitting(false);
    if (insertError) {
      setError('Something went wrong. Please try again.');
    } else {
      setSubmitted(true);
      setForm({ name: '', email: '', phone: '', looking_for: '', timeline: '', message: '' });
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <p className="text-[var(--primary)] uppercase tracking-widest text-xs font-semibold mb-3">
          Message received
        </p>
        <p className="text-[#1A1A1A] font-serif text-xl mb-2">Thank you.</p>
        <p className="text-gray-500 text-sm font-light">We will be in touch shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className={compact ? 'grid grid-cols-1 gap-4' : 'grid grid-cols-1 sm:grid-cols-2 gap-4'}>
        <div>
          <label className={labelClass}>Name *</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={e => set('name', e.target.value)}
            placeholder="Your name"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Email *</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={e => set('email', e.target.value)}
            placeholder="your@email.com"
            className={inputClass}
          />
        </div>
      </div>

      {!compact && (
        <div>
          <label className={labelClass}>Phone</label>
          <input
            type="tel"
            value={form.phone}
            onChange={e => set('phone', e.target.value)}
            placeholder="+1 (555) 000-0000"
            className={inputClass}
          />
        </div>
      )}

      <div className={compact ? 'grid grid-cols-1 gap-4' : 'grid grid-cols-1 sm:grid-cols-2 gap-4'}>
        <div>
          <label className={labelClass}>Looking for</label>
          <select
            value={form.looking_for}
            onChange={e => set('looking_for', e.target.value)}
            className={inputClass}
          >
            <option value="">Select...</option>
            {LOOKING_FOR_OPTIONS.map(o => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Timeline</label>
          <select
            value={form.timeline}
            onChange={e => set('timeline', e.target.value)}
            className={inputClass}
          >
            <option value="">Select...</option>
            {TIMELINE_OPTIONS.map(o => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>
      </div>

      {!compact && (
        <div>
          <label className={labelClass}>Message</label>
          <textarea
            rows={4}
            value={form.message}
            onChange={e => set('message', e.target.value)}
            placeholder="Tell us what you're looking for..."
            className={`${inputClass} resize-none`}
          />
        </div>
      )}

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="bg-[var(--primary)] text-white px-8 py-4 uppercase tracking-widest text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? 'Sending...' : 'Send Inquiry'}
      </button>
    </form>
  );
}
