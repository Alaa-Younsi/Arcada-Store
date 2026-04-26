import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MapPin, Clock, Phone, Mail, ArrowRight } from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';

const INFO = [
  {
    icon: MapPin,
    titleKey: 'showroom.addressTitle',
    valueKey: 'showroom.address',
  },
  {
    icon: Clock,
    titleKey: 'showroom.hoursTitle',
    valueKey: 'showroom.hours',
  },
  {
    icon: Phone,
    titleKey: 'showroom.phoneTitle',
    valueKey: 'showroom.phone',
  },
  {
    icon: Mail,
    titleKey: 'showroom.emailTitle',
    valueKey: 'showroom.email',
  },
];

export default function Showroom() {
  const { t } = useTranslation();

  return (
    <>
      <SEOHead
        title={`${t('showroom.title')} — ARCADA`}
        description={t('showroom.subtitle')}
      />

      {/* Hero */}
      <div
        className="relative pt-[120px] pb-20 md:pb-28 overflow-hidden"
        style={{
          backgroundImage: 'url(/image1.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-dark/70 via-dark/40 to-dark/80" />
        <div className="relative z-10 max-w-screen-2xl mx-auto px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/50 mb-4">ARCADA</p>
            <h1
              className="font-display text-white font-light leading-none mb-5"
              style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}
            >
              {t('showroom.title')}
            </h1>
            <p className="font-sans text-white/60 text-sm leading-relaxed max-w-lg">
              {t('showroom.subtitle')}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Info cards */}
      <section className="bg-bg py-20 md:py-28">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {INFO.map(({ icon: Icon, titleKey, valueKey }, i) => (
              <motion.div
                key={titleKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-surface p-8 border border-border rounded-2xl"
              >
                <div className="w-10 h-10 flex items-center justify-center border border-border mb-5 rounded-xl">
                  <Icon size={16} strokeWidth={1.5} className="text-accent" />
                </div>
                <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-muted mb-2">
                  {t(titleKey)}
                </p>
                <p className="font-sans text-dark text-sm leading-relaxed">{t(valueKey)}</p>
              </motion.div>
            ))}
          </div>

          {/* Map placeholder */}
          <div className="bg-surface border border-border overflow-hidden mb-16">
            <div className="relative h-[400px] md:h-[500px] bg-surface-warm flex items-center justify-center">
              <div className="text-center">
                <MapPin size={32} strokeWidth={1} className="text-accent mx-auto mb-3" />
                <p className="font-sans text-xs uppercase tracking-[0.2em] text-muted">
                  {t('showroom.mapTitle')}
                </p>
                <p className="font-sans text-sm text-dark mt-2">{t('showroom.address')}</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="font-sans text-sm text-muted mb-6">
              {t('showroom.subtitle')}
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-3 border border-dark text-dark hover:bg-dark hover:text-white font-sans text-[11px] uppercase tracking-[0.25em] px-8 py-4 transition-all duration-300"
            >
              {t('showroom.ctaShop')}
              <ArrowRight size={13} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
