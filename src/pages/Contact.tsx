import { useEffect } from 'react';
import LeadCaptureForm from '../components/LeadCaptureForm';
import { AGENT_CONFIG, SITE_TITLE } from '../config';

export default function Contact() {
  useEffect(() => {
    document.title = `Contact | ${SITE_TITLE}`;
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F6F2] pt-12 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-16 text-center md:text-left">
          <p className="text-[var(--primary)] uppercase tracking-widest text-sm mb-4 font-semibold">
            Get in touch
          </p>
          <h1 className="text-4xl md:text-6xl font-serif text-[#1A1A1A] mb-6">Contact</h1>
          <p className="text-lg text-[#2C2C2C] font-light max-w-xl">
            Ready to find your next home, or want to list a property? Send us a message and we will get back to you promptly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="md:col-span-2 bg-white p-8 md:p-10 border border-gray-100">
            <LeadCaptureForm />
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <img
                src={AGENT_CONFIG.logo}
                alt={AGENT_CONFIG.name}
                className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                referrerPolicy="no-referrer"
              />
              <div>
                <p className="font-serif text-lg text-[#1A1A1A]">{AGENT_CONFIG.name}</p>
                <p className="text-xs uppercase tracking-widest text-[var(--primary)]">Lead Agent</p>
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-gray-500 mb-3">Email</p>
              <a
                href="mailto:hello@thecitadl.com"
                className="text-[#1A1A1A] hover:text-[var(--primary)] transition-colors text-sm"
              >
                hello@thecitadl.com
              </a>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-gray-500 mb-3">Schedule a call</p>
              <a
                href="https://cal.com/the-citadl/discovery-call?overlayCalendar=true"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1A1A1A] hover:text-[var(--primary)] transition-colors text-sm"
              >
                Book a discovery call
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
