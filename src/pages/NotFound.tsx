import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] bg-[#F8F6F2] flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <h1 className="text-8xl font-serif text-[var(--primary)] mb-6">404</h1>
        <h2 className="text-3xl font-serif text-[#1A1A1A] mb-6">Page not found</h2>
        <p className="text-[#2C2C2C] font-light mb-10 leading-relaxed">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-3 bg-[#1A1A1A] text-white px-8 py-4 uppercase tracking-widest text-sm hover:bg-[var(--primary)] transition-colors duration-300"
        >
          <ArrowLeft size={18} /> Back to home
        </Link>
      </div>
    </div>
  );
}
