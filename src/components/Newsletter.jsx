import React, { useState } from 'react';
import { Send, CheckCircle2, Sparkles } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubmitted(true);
    }
  };

  return (
    <section className="py-20 sm:py-28 bg-botanical-deep text-champagne relative overflow-hidden">
      {/* Background ambient floral watermarks */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-gold/10 filter blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-botanical-light/20 filter blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-gold/20 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-gold-light">
            Botanical Gazette Dispatch
          </span>
        </div>

        <h2 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl text-white font-light tracking-tight">
          Receive The Morning Bloom
        </h2>

        <p className="text-xs sm:text-base text-champagne/80 font-sans max-w-xl mx-auto mt-4 leading-relaxed">
          Be privileged with first access to rare bulb harvests, seasonal floral care journals, and invitations to our intimate botanical salon soir&eacute;es.
        </p>

        {isSubmitted ? (
          <div className="mt-10 p-6 rounded-2xl bg-botanical-light/40 border border-gold/30 max-w-md mx-auto flex items-center justify-center gap-3 animate-fade-in">
            <CheckCircle2 className="w-5 h-5 text-gold" />
            <p className="text-sm font-serif-luxury text-white">
              You are warmly welcomed to the Bloom &amp; Co. Gazette circle.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-10 max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row items-center gap-3 bg-white/5 p-1.5 rounded-full border border-gold/30 focus-within:border-gold transition-colors">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your personal email..."
                className="w-full px-5 py-3 rounded-full bg-transparent text-white placeholder-champagne/40 text-xs sm:text-sm font-sans focus:outline-none"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-gold text-botanical-dark hover:bg-gold-light transition-colors text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 whitespace-nowrap shadow-sm"
              >
                <span>Subscribe</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-[10px] text-champagne/50 tracking-wider mt-3">
              We honor your sanctuary. Unsubscribe at your pleasure.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
