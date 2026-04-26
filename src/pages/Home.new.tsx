import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';
import { ProductCard } from '@/components/shop/ProductCard';
import { useFeaturedProducts, useProducts } from '@/hooks/useProducts';
import { api } from '@/lib/api';

/* ── Static editorial data ───────────────────────────────────────── */

const COLLECTIONS = [
  {
    slug: 'carrelage-sol',
    label_en: 'Floor Tiles',
    label_fr: 'Carrelage Sol',
    label_ar: 'بلاط الأرضية',
    desc_en: 'Exceptional ceramic surfaces that transform every interior and exterior floor into a work of art.',
    desc_fr: 'Des surfaces céramiques d\'exception qui transforment chaque sol intérieur et extérieur en œuvre d\'art.',
    bg: 'linear-gradient(135deg, #8B7355 0%, #6A5840 40%, #3D2E20 100%)',
  },
  {
    slug: 'revetement-mural',
    label_en: 'Wall Cladding',
    label_fr: 'Revêtement Mural',
    label_ar: 'تكسية الجدران',
    desc_en: 'Refined wall surfaces that redefine contemporary architectural expression.',
    desc_fr: 'Des revêtements muraux raffinés qui redéfinissent l\'expression architecturale contemporaine.',
    bg: 'linear-gradient(135deg, #C8BFB0 0%, #9E9189 50%, #6B6459 100%)',
  },
  {
    slug: 'grandes-dalles',
    label_en: 'Large Format',
    label_fr: 'Grandes Dalles',
    label_ar: 'بلاط كبير الحجم',
    desc_en: 'Our large-format slabs revolutionise the concept of continuous surfaces.',
    desc_fr: 'Nos grandes dalles révolutionnent le concept de surfaces continues.',
    bg: 'linear-gradient(160deg, #2D2926 0%, #1A1714 60%, #0F0C0A 100%)',
  },
  {
    slug: 'exterieur',
    label_en: 'Outdoor',
    label_fr: 'Extérieur',
    label_ar: 'الخارجي',
    desc_en: 'Durable and beautiful outdoor ceramic surfaces designed for any climate.',
    desc_fr: 'Surfaces céramiques extérieures alliant durabilité et beauté pour tout climat.',
    bg: 'linear-gradient(135deg, #B8A88A 0%, #8B7355 60%, #6A5840 100%)',
  },
  {
    slug: 'salle-de-bain',
    label_en: 'Bathroom',
    label_fr: 'Salle de Bain',
    label_ar: 'الحمام',
    desc_en: 'Create your ultimate sanctuary with our exclusive bathroom collections.',
    desc_fr: 'Créez votre sanctuaire ultime avec nos collections exclusives pour salle de bain.',
    bg: 'linear-gradient(135deg, #E8E4DF 0%, #D4CEC8 50%, #C8BFB0 100%)',
  },
  {
    slug: 'plans-de-travail',
    label_en: 'Countertops',
    label_fr: 'Plans de Travail',
    label_ar: 'سطح العمل',
    desc_en: 'Elegant ceramic countertops combining aesthetics with maximum durability.',
    desc_fr: 'Plans de travail en céramique alliant élégance et durabilité maximale.',
    bg: 'linear-gradient(135deg, #9E9189 0%, #6B6459 50%, #2D2926 100%)',
  },
];

const EFFECT_TABS = [
  { id: 'all', label_en: 'All', label_fr: 'Tous' },
  { id: 'carrelage-sol', label_en: 'Stone', label_fr: 'Pierre' },
  { id: 'revetement-mural', label_en: 'Marble', label_fr: 'Marbre' },
  { id: 'grandes-dalles', label_en: 'Large Format', label_fr: 'Grand Format' },
  { id: 'exterieur', label_en: 'Outdoor', label_fr: 'Extérieur' },
  { id: 'salle-de-bain', label_en: 'Bathroom', label_fr: 'Salle de Bain' },
  { id: 'plans-de-travail', label_en: 'Countertops', label_fr: 'Plans de Travail' },
];

const HIGHLIGHTS = [
  {
    id: 'premium',
    category_en: 'Exclusive Line',
    category_fr: 'Ligne Exclusive',
    title_en: 'Premium Marble',
    title_fr: 'Marbre Premium',
    desc_en: 'Our premium marble collection merges timeless beauty with cutting-edge ceramic technology.',
    desc_fr: 'Notre collection de marbre premium unit beauté intemporelle et céramique haute technologie.',
    bg: 'linear-gradient(160deg, #E8E4DF 0%, #C8BFB0 60%, #9E9189 100%)',
    link: '/category/revetement-mural',
  },
  {
    id: 'carbonzero',
    category_en: 'Sustainability',
    category_fr: 'Durabilité',
    title_en: 'Eco Collection',
    title_fr: 'Collection Éco',
    desc_en: 'Surfaces that compensate all CO₂ emitted throughout their entire lifecycle.',
    desc_fr: 'Surfaces compensant l\'ensemble du CO₂ émis tout au long de leur cycle de vie.',
    bg: 'linear-gradient(160deg, #8B7355 0%, #6A5840 50%, #3D2E20 100%)',
    link: '/shop',
  },
  {
    id: 'magnum',
    category_en: 'Large Format',
    category_fr: 'Grand Format',
    title_en: 'Magnum Slabs',
    title_fr: 'Grandes Dalles',
    desc_en: 'Our large ceramic slabs redefine the concept of continuous surfaces for modern design.',
    desc_fr: 'Nos grandes dalles redéfinissent la notion de surface continue pour un design moderne.',
    bg: 'linear-gradient(160deg, #2D2926 0%, #1A1714 100%)',
    link: '/category/grandes-dalles',
  },
];

const PROJECTS = [
  {
    id: 1,
    title: 'Villa Privée Casablanca',
    location: 'Casablanca, Maroc',
    bg: 'linear-gradient(160deg, #8B7355 0%, #6A5840 100%)',
  },
  {
    id: 2,
    title: 'Hôtel de Luxe Marrakech',
    location: 'Marrakech, Maroc',
    bg: 'linear-gradient(160deg, #C8BFB0 0%, #9E9189 100%)',
  },
  {
    id: 3,
    title: 'Résidence Privée Rabat',
    location: 'Rabat, Maroc',
    bg: 'linear-gradient(160deg, #2D2926 0%, #1A1714 100%)',
  },
  {
    id: 4,
    title: 'Centre Commercial Tanger',
    location: 'Tanger, Maroc',
    bg: 'linear-gradient(160deg, #B8A88A 0%, #8B7355 100%)',
  },
  {
    id: 5,
    title: 'Spa & Wellness Agadir',
    location: 'Agadir, Maroc',
    bg: 'linear-gradient(160deg, #E8E4DF 0%, #C8BFB0 100%)',
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 36 },
  animate: { opacity: 1, y: 0 },
};

/* ── Component ───────────────────────────────────────────────────── */

export default function Home() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'en' | 'fr' | 'ar';
  const [activeTab, setActiveTab] = useState('all');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [subscribing, setSubscribing] = useState(false);

  const { products: featured, loading: featLoading } = useFeaturedProducts();
  const { products: allProducts, loading: allLoading } = useProducts({ sort: 'newest', page: 1 });

  const getL = (obj: { label_en: string; label_fr: string }) =>
    lang === 'fr' ? obj.label_fr : obj.label_en;

  const getD = (obj: { desc_en: string; desc_fr: string }) =>
    lang === 'fr' ? obj.desc_fr : obj.desc_en;

  const filteredProducts =
    activeTab === 'all'
      ? allProducts.slice(0, 8)
      : allProducts.filter((p) => p.category?.slug === activeTab).slice(0, 8);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribing(true);
    try {
      await api.newsletter.subscribe(email);
    } catch {
      // ignore
    } finally {
      setSubscribed(true);
      setEmail('');
      setSubscribing(false);
    }
  };

  return (
    <>
      <SEOHead
        title="ARCADA — Surfaces Céramiques de Luxe"
        description="Découvrez les collections ARCADA, surfaces en céramique de prestige pour l'architecture et le design d'intérieur."
      />

      {/* ══════════════════════════════════════════════════
          1. HERO — full-bleed 100vh
      ══════════════════════════════════════════════════ */}
      <section className="relative h-screen min-h-[600px] overflow-hidden">
        {/* Background image / gradient */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/hero-ceramic.jpg')`,
            background: 'linear-gradient(160deg, #1A1714 0%, #2D2926 35%, #3D3830 65%, #1A1714 100%)',
          }}
        />
        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-dark/30" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-16 lg:px-24 pb-20 md:pb-28">
          <motion.div
            initial="initial"
            animate="animate"
            transition={{ staggerChildren: 0.18 }}
            className="max-w-4xl"
          >
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.8 }}
              className="font-sans text-white/50 text-[11px] uppercase tracking-[0.35em] mb-6"
            >
              {t('hero.tagline')}
            </motion.p>

            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.9 }}
              className="font-display text-white font-light leading-none mb-8"
              style={{ fontSize: 'clamp(52px, 9vw, 120px)', letterSpacing: '-0.01em' }}
            >
              {t('hero.title')}
            </motion.h1>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.8 }}
              className="flex flex-wrap items-center gap-8"
            >
              <Link
                to="/shop"
                className="group inline-flex items-center gap-3 font-sans text-white/75 text-[11px] uppercase tracking-[0.25em] hover:text-white transition-colors duration-300"
              >
                {t('hero.cta')}
                <span className="w-8 h-px bg-white/50 group-hover:w-12 group-hover:bg-white transition-all duration-500" />
              </Link>
              <a
                href="/CATALOGUE-2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-white/40 text-[11px] uppercase tracking-[0.25em] hover:text-white/70 transition-colors duration-300"
              >
                {t('hero.catalogue')}
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-8 md:right-16 flex flex-col items-center gap-3 z-10">
          <div className="w-px h-14 bg-white/20 animate-pulse" />
          <span
            className="font-sans text-white/30 text-[9px] uppercase tracking-[0.25em]"
            style={{ writingMode: 'vertical-rl' }}
          >
            Scroll
          </span>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          2. ABOUT TEXT — centered
      ══════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-surface">
        <div className="max-w-3xl mx-auto text-center px-6">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="font-display text-dark font-light leading-snug mb-6"
            style={{ fontSize: 'clamp(26px, 3.5vw, 44px)' }}
          >
            {t('sections.introTitle')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="font-sans text-muted text-base leading-relaxed font-light mb-10"
          >
            {t('sections.introText')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 font-sans text-[11px] uppercase tracking-[0.25em] text-text-main hover:text-accent transition-colors group"
            >
              En savoir plus
              <ArrowRight size={12} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          3. NEW COLLECTIONS — editorial split panels
      ══════════════════════════════════════════════════ */}
      <section className="bg-surface-warm">
        {/* First panel: image left, text right */}
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1 }}
            className="relative overflow-hidden min-h-[500px] lg:min-h-[680px]"
            style={{ background: COLLECTIONS[0].bg }}
          >
            <div className="absolute inset-0 flex items-end p-8 md:p-12">
              <span
                className="font-display text-white/10 font-light"
                style={{ fontSize: 'clamp(80px, 12vw, 160px)' }}
              >
                01
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="flex flex-col justify-center px-8 md:px-14 lg:px-20 py-16 lg:py-24"
          >
            <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-accent mb-6">
              Nouvelles Collections
            </p>
            <h2
              className="font-display text-dark font-light leading-tight mb-6"
              style={{ fontSize: 'clamp(30px, 4vw, 54px)' }}
            >
              {t('sections.categories')}
            </h2>
            <p className="font-sans text-muted text-sm leading-relaxed font-light mb-10 max-w-md">
              {lang === 'fr' ? COLLECTIONS[0].desc_fr : COLLECTIONS[0].desc_en}
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-3 font-sans text-[11px] uppercase tracking-[0.25em] text-dark hover:text-accent transition-colors group self-start"
            >
              {t('sections.viewAll')}
              <ArrowRight size={12} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Second panel: text left, image right */}
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="flex flex-col justify-center px-8 md:px-14 lg:px-20 py-16 lg:py-24 order-2 lg:order-1"
          >
            <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-accent mb-6">
              {lang === 'fr' ? COLLECTIONS[2].label_fr : COLLECTIONS[2].label_en}
            </p>
            <h2
              className="font-display text-dark font-light leading-tight mb-6"
              style={{ fontSize: 'clamp(30px, 4vw, 54px)' }}
            >
              {lang === 'fr' ? COLLECTIONS[2].label_fr : COLLECTIONS[2].label_en}
            </h2>
            <p className="font-sans text-muted text-sm leading-relaxed font-light mb-10 max-w-md">
              {getD(COLLECTIONS[2])}
            </p>
            <Link
              to={`/category/${COLLECTIONS[2].slug}`}
              className="inline-flex items-center gap-3 font-sans text-[11px] uppercase tracking-[0.25em] text-dark hover:text-accent transition-colors group self-start"
            >
              Découvrir
              <ArrowRight size={12} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1 }}
            className="relative overflow-hidden min-h-[500px] lg:min-h-[680px] order-1 lg:order-2"
            style={{ background: COLLECTIONS[2].bg }}
          >
            <div className="absolute inset-0 flex items-end justify-end p-8 md:p-12">
              <span
                className="font-display text-white/10 font-light"
                style={{ fontSize: 'clamp(80px, 12vw, 160px)' }}
              >
                02
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          4. PRODUCTS WITH FILTER TABS
      ══════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-surface">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-accent mb-3">
                {t('sections.featuredLabel')}
              </p>
              <h2
                className="font-display text-dark font-light"
                style={{ fontSize: 'clamp(28px, 3.5vw, 48px)' }}
              >
                Nos Produits
              </h2>
            </div>
            <Link
              to="/shop"
              className="inline-flex items-center gap-3 font-sans text-[11px] uppercase tracking-[0.22em] text-muted hover:text-accent transition-colors group self-start"
            >
              {t('sections.viewAll')}
              <ArrowRight size={12} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Filter tabs */}
          <div className="flex border-b border-border mb-12 overflow-x-auto scrollbar-none">
            {EFFECT_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 font-sans text-[11px] uppercase tracking-[0.22em] px-5 py-4 border-b-2 -mb-px transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'border-dark text-dark'
                    : 'border-transparent text-muted hover:text-text-main'
                }`}
              >
                {getL(tab)}
              </button>
            ))}
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {(allLoading ? Array.from({ length: 8 }) : filteredProducts).map((product, i) =>
              product ? (
                <ProductCard key={(product as any).id} product={product as any} />
              ) : (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[3/4] bg-surface-warm mb-3" />
                  <div className="h-3 bg-surface-warm w-1/3 mb-2" />
                  <div className="h-4 bg-surface-warm w-2/3" />
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          5. COLLECTIONS GRID — 6 large panels
      ══════════════════════════════════════════════════ */}
      <section className="bg-surface-warm py-20 md:py-28">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
          <div className="mb-12">
            <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-accent mb-3">
              {t('sections.categoriesLabel')}
            </p>
            <h2
              className="font-display text-dark font-light"
              style={{ fontSize: 'clamp(28px, 3.5vw, 48px)' }}
            >
              {t('sections.categories')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {COLLECTIONS.map((col, i) => (
              <motion.div
                key={col.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
              >
                <Link
                  to={`/category/${col.slug}`}
                  className="group block relative overflow-hidden"
                  style={{ height: i < 2 ? '460px' : '340px' }}
                >
                  <div
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                    style={{ background: col.bg }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-dark/10 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-7">
                    <p className="font-sans text-white/50 text-[10px] uppercase tracking-[0.25em] mb-2">
                      Collection
                    </p>
                    <h3
                      className="font-display text-white font-light leading-none mb-3"
                      style={{ fontSize: 'clamp(22px, 2.5vw, 34px)' }}
                    >
                      {getL(col)}
                    </h3>
                    <span className="inline-flex items-center gap-2 font-sans text-white/60 text-[10px] uppercase tracking-[0.2em] group-hover:text-white transition-colors duration-300">
                      Découvrir
                      <ArrowRight size={11} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          6. FEATURED HIGHLIGHTS — 3 cards
      ══════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-surface">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
          <div className="mb-12">
            <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-accent mb-3">En vedette</p>
            <h2
              className="font-display text-dark font-light"
              style={{ fontSize: 'clamp(28px, 3.5vw, 48px)' }}
            >
              À la Une
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {HIGHLIGHTS.map((hl, i) => (
              <motion.div
                key={hl.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.12 }}
              >
                <Link to={hl.link} className="group block">
                  <div
                    className="relative overflow-hidden mb-6 transition-transform duration-700 group-hover:scale-[1.02]"
                    style={{ height: '320px', background: hl.bg }}
                  />
                  <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-muted mb-2">
                    {lang === 'fr' ? hl.category_fr : hl.category_en}
                  </p>
                  <h3
                    className="font-display text-dark font-light mb-3 group-hover:text-accent transition-colors duration-300"
                    style={{ fontSize: '24px' }}
                  >
                    {lang === 'fr' ? hl.title_fr : hl.title_en}
                  </h3>
                  <p className="font-sans text-muted text-sm font-light leading-relaxed mb-5">
                    {lang === 'fr' ? hl.desc_fr : hl.desc_en}
                  </p>
                  <span className="inline-flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.22em] text-dark group-hover:text-accent transition-colors duration-300">
                    En savoir plus
                    <ArrowRight size={11} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          7. PROJECTS — horizontal scroll
      ══════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-surface-warm overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16 mb-10">
          <div className="flex items-end justify-between">
            <div>
              <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-accent mb-3">Réalisations</p>
              <h2
                className="font-display text-dark font-light"
                style={{ fontSize: 'clamp(28px, 3.5vw, 48px)' }}
              >
                Nos Projets
              </h2>
            </div>
            <Link
              to="/shop"
              className="hidden md:inline-flex items-center gap-3 font-sans text-[11px] uppercase tracking-[0.22em] text-muted hover:text-accent transition-colors group"
            >
              Voir tous
              <ArrowRight size={12} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Horizontal scrolling gallery */}
        <div className="flex gap-4 overflow-x-auto pb-6 px-6 lg:px-16 scrollbar-none">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="flex-shrink-0 w-72 md:w-96 lg:w-[420px] group cursor-pointer"
            >
              <div
                className="relative overflow-hidden mb-4 transition-transform duration-700 group-hover:scale-[1.02]"
                style={{ height: '520px', background: project.bg }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-dark/50 via-transparent to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="font-sans text-white/80 text-[10px] uppercase tracking-[0.22em]">
                    Voir le projet →
                  </span>
                </div>
              </div>
              <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-muted mb-1">
                {project.location}
              </p>
              <h3 className="font-display text-dark font-light text-xl group-hover:text-accent transition-colors duration-300">
                {project.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          8. EDITORIAL QUOTE BAND
      ══════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-dark overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-display text-white/90 font-light italic leading-relaxed"
            style={{ fontSize: 'clamp(22px, 3vw, 40px)' }}
          >
            "La beauté réside dans les détails. Chaque surface ARCADA est conçue pour durer, inspirer et transformer."
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 flex items-center justify-center gap-4"
          >
            <div className="w-12 h-px bg-accent" />
            <span className="font-sans text-accent text-[10px] uppercase tracking-[0.35em]">ARCADA</span>
            <div className="w-12 h-px bg-accent" />
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          9. FEATURED PRODUCTS — from database
      ══════════════════════════════════════════════════ */}
      {featured.length > 0 && (
        <section className="py-20 md:py-28 bg-surface">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-accent mb-3">
                  Sélection
                </p>
                <h2
                  className="font-display text-dark font-light"
                  style={{ fontSize: 'clamp(28px, 3.5vw, 48px)' }}
                >
                  {t('sections.featured')}
                </h2>
              </div>
              <Link
                to="/shop"
                className="inline-flex items-center gap-3 font-sans text-[11px] uppercase tracking-[0.22em] text-muted hover:text-accent transition-colors group self-start"
              >
                {t('sections.viewAll')}
                <ArrowRight size={12} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
              {featured.slice(0, 4).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════
          10. NEWSLETTER
      ══════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-surface-warm border-t border-border">
        <div className="max-w-xl mx-auto text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-accent mb-6">Newsletter</p>
            <h2
              className="font-display text-dark font-light mb-4"
              style={{ fontSize: 'clamp(28px, 3.5vw, 48px)' }}
            >
              {t('sections.joinGrid')}
            </h2>
            <p className="font-sans text-muted text-sm font-light mb-10 leading-relaxed">
              {t('sections.joinGridSub')}
            </p>

            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="font-sans text-accent text-sm uppercase tracking-[0.2em]"
              >
                ✓ {lang === 'fr' ? 'Vous êtes abonné(e)' : 'You are subscribed'}
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('sections.emailPlaceholder')}
                  required
                  className="flex-1 px-5 py-4 border border-border bg-white text-text-main placeholder-stone font-sans text-sm focus:outline-none focus:border-accent transition-colors"
                />
                <button
                  type="submit"
                  disabled={subscribing}
                  className="px-8 py-4 bg-dark text-white font-sans text-[11px] uppercase tracking-[0.22em] hover:bg-accent transition-colors duration-300 disabled:opacity-60 whitespace-nowrap"
                >
                  {subscribing ? '...' : t('sections.subscribe')}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
}
