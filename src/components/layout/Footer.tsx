import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Instagram, Facebook, Youtube } from 'lucide-react';
import { api } from '@/lib/api';

export function Footer() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('loading');
    try {
      await api.newsletter.subscribe(email.trim());
      setStatus('done');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <footer className="bg-dark text-white/70">
      {/* Newsletter band */}
      <div className="border-b border-white/10">
        <div className="max-w-screen-xl mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-2xl text-white mb-1">{t('footer.newsletter')}</h3>
            <p className="font-sans text-sm text-white/50 tracking-wide">{t('footer.newsletterSub')}</p>
          </div>
          <form
            className="flex w-full max-w-sm"
            onSubmit={handleNewsletter}
          >
            {status === 'done' ? (
              <p className="font-sans text-sm text-accent-light">{t('footer.subscribed')}</p>
            ) : (
              <>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('sections.emailPlaceholder')}
                  required
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/20 text-white placeholder-white/30 font-sans text-sm focus:outline-none focus:border-accent-light"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="px-6 py-3 bg-accent text-white font-sans text-xs uppercase tracking-[0.15em] hover:bg-accent-light transition-colors disabled:opacity-60"
                >
                  {status === 'loading' ? '...' : t('sections.subscribe')}
                </button>
              </>
            )}
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-screen-xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <img src="/favicon.png" alt="ARCADA" className="h-12 w-auto object-contain mb-6" />
            <p className="font-sans text-sm text-white/50 leading-relaxed mb-6">
              {t('footer.tagline')}
            </p>
            <div className="flex gap-3">
              <a href="#" aria-label="Instagram" className="w-8 h-8 border border-white/20 flex items-center justify-center text-white/40 hover:border-accent-light hover:text-accent-light transition-colors">
                <Instagram size={14} strokeWidth={1.5} />
              </a>
              <a href="#" aria-label="Facebook" className="w-8 h-8 border border-white/20 flex items-center justify-center text-white/40 hover:border-accent-light hover:text-accent-light transition-colors">
                <Facebook size={14} strokeWidth={1.5} />
              </a>
              <a href="#" aria-label="YouTube" className="w-8 h-8 border border-white/20 flex items-center justify-center text-white/40 hover:border-accent-light hover:text-accent-light transition-colors">
                <Youtube size={14} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Collections */}
          <div>
            <h4 className="font-sans text-xs uppercase tracking-[0.2em] text-white mb-5">{t('footer.collections')}</h4>
            <ul className="space-y-3">
              {[
                { to: '/category/silos',   label: 'Silos' },
                { to: '/category/atelier', label: 'Atelier' },
                { to: '/category/ducal',   label: 'Ducal' },
                { to: '/category/leaf',    label: 'Leaf' },
                { to: '/category/gonos',   label: 'Gonos' },
                { to: '/category/chic',    label: 'Chic' },
                { to: '/category/kronfel', label: 'Kronfel' },
                { to: '/category/casbah',  label: 'Casbah' },
                { to: '/category/yasmine', label: 'Yasmine' },
              ].map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="font-sans text-sm text-white/50 hover:text-accent-light transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-sans text-xs uppercase tracking-[0.2em] text-white mb-5">{t('footer.quickLinks')}</h4>
            <ul className="space-y-3">
              {[
                { to: '/', label: t('nav.home') },
                { to: '/shop', label: t('nav.shop') },
                { to: '/contact', label: t('footer.contact') },
              ].map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="font-sans text-sm text-white/50 hover:text-accent-light transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-sans text-xs uppercase tracking-[0.2em] text-white mb-5">{t('footer.info')}</h4>
            <ul className="space-y-3">
              {[
                { to: '/privacy-policy', label: t('footer.privacy') },
                { to: '/terms', label: t('footer.terms') },
              ].map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="font-sans text-sm text-white/50 hover:text-accent-light transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-sans text-xs text-white/30 tracking-wide">{t('footer.rights')}</p>
          <p className="font-sans text-xs text-white/20">
            ARCADA — Surfaces Céramiques de Prestige
          </p>
        </div>
      </div>
    </footer>
  );
}


