import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Pause, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';
import { ProductCard } from '@/components/shop/ProductCard';
import { useFeaturedProducts, useProducts } from '@/hooks/useProducts';
import { api } from '@/lib/api';

/* ── Static editorial data ───────────────────────────────────────── */

const COLLECTIONS = [
  {
    slug: 'silos',
    label_en: 'Silos Collection',
    label_fr: 'Collection Silos',
    label_ar: 'مجموعة سيلوس',
    desc_en: 'Elongated picket-shaped ceramic tiles with artisanal glazed finishes.',
    desc_fr: 'Carreaux en forme de piquet allongué avec des finitions émaillées artisanales.',
    desc_ar: 'بلاط سيراميك بشكل لقطة مستطيلة بتشطيبات مزججة حرفية.',
    image: '/image1.jpg',
  },
  {
    slug: 'atelier',
    label_en: 'Atelier Collection',
    label_fr: 'Collection Atelier',
    label_ar: 'مجموعة أتيليه',
    desc_en: 'Artisan-crafted leaf-shaped tiles with embossed relief and metallic finishes.',
    desc_fr: 'Carreaux en forme de feuille avec textures en relief et finitions métalliques.',
    desc_ar: 'بلاط على شكل ورقة بنقوش بارزة وتشطيبات معدنية.',
    image: '/image2.jpg',
  },
  {
    slug: 'ducal',
    label_en: 'Ducal Collection',
    label_fr: 'Collection Ducal',
    label_ar: 'مجموعة دوكال',
    desc_en: 'Classic subway-style rectangular tiles with an aged handmade look.',
    desc_fr: 'Carreaux rectangulaires de style métro avec un aspect vieilli fait main.',
    desc_ar: 'بلاط مستطيل بأسلوب المترو بمظهر عتيق مصنوع يدوًا.',
    image: '/image3.jpg',
  },
  {
    slug: 'leaf',
    label_en: 'Leaf Collection',
    label_fr: 'Collection Leaf',
    label_ar: 'مجموعة ليف',
    desc_en: 'Leaf-shaped tiles in vibrant glazed and metallic finishes.',
    desc_fr: 'Carreaux en forme de feuille aux finitions émaillées et métalliques vibrantes.',
    desc_ar: 'بلاط على شكل ورقة بتشطيبات مزججة ومعدنية زاهية.',
    image: '/image4.jpg',
  },
  {
    slug: 'chic',
    label_en: 'Chic Collection',
    label_fr: 'Collection Chic',
    label_ar: 'مجموعة شيك',
    desc_en: 'Moroccan-inspired scallop and arabesque tiles in bold glazed and metallic finishes.',
    desc_fr: 'Carreaux en écaille et arabesque d\'inspiration marocaine.',
    desc_ar: 'بلاط صدفي وأرابيسك مستوحى من المغرب.',
    image: '/image5.jpg',
  },
  {
    slug: 'kronfel',
    label_en: 'Kronfel Collection',
    label_fr: 'Collection Kronfel',
    label_ar: 'مجموعة كرونفل',
    desc_en: 'Traditional hand-painted square tiles with rich ornamental patterns.',
    desc_fr: 'Carreaux carrés peints à la main avec riches motifs ornementaux.',
    desc_ar: 'بلاط مربع مطلي يدوًا بزخارف زخرفية غنية.',
    image: '/image6.jpg',
  },
];

const EFFECT_TABS = [
  { id: 'all', label_en: 'All', label_fr: 'Tous', label_ar: 'الكل' },
  { id: 'silos', label_en: 'Silos', label_fr: 'Silos', label_ar: 'سيلوس' },
  { id: 'atelier', label_en: 'Atelier', label_fr: 'Atelier', label_ar: 'أتيليه' },
  { id: 'leaf', label_en: 'Leaf', label_fr: 'Leaf', label_ar: 'ليف' },
  { id: 'chic', label_en: 'Chic', label_fr: 'Chic', label_ar: 'شيك' },
  { id: 'gonos', label_en: 'Gonos', label_fr: 'Gonos', label_ar: 'غونوس' },
  { id: 'kronfel', label_en: 'Kronfel', label_fr: 'Kronfel', label_ar: 'كرونفل' },
];

const HIGHLIGHTS = [
  {
    id: 'premium',
    category_en: 'Exclusive Line',
    category_fr: 'Ligne Exclusive',
    category_ar: 'خط حصري',
    title_en: 'Premium Marble',
    title_fr: 'Marbre Premium',
    title_ar: 'رخام فاخر',
    desc_en: 'Our premium marble collection merges timeless beauty with cutting-edge ceramic technology.',
    desc_fr: 'Notre collection de marbre premium unit beauté intemporelle et céramique haute technologie.',
    desc_ar: 'مجموعة الرخام الفاخر تجمع بين الجمال الخالد وأحدث تقنيات السيراميك.',
    image: '/image3.jpg',
    link: '/category/chic',
  },
  {
    id: 'carbonzero',
    category_en: 'Sustainability',
    category_fr: 'Durabilité',
    category_ar: 'الاستدامة',
    title_en: 'Eco Collection',
    title_fr: 'Collection Éco',
    title_ar: 'مجموعة إيكو',
    desc_en: 'Surfaces that compensate all CO₂ emitted throughout their entire lifecycle.',
    desc_fr: 'Surfaces compensant l\'ensemble du CO₂ émis tout au long de leur cycle de vie.',
    desc_ar: 'أسطح تعوض جميع انبعاثات ثاني أكسيد الكربون طوال دورة حياتها الكاملة.',
    image: '/image5.jpg',
    link: '/shop',
  },
  {
    id: 'magnum',
    category_en: 'Large Format',
    category_fr: 'Grand Format',
    category_ar: 'حجم كبير',
    title_en: 'Magnum Slabs',
    title_fr: 'Grandes Dalles',
    title_ar: 'ألواح ضخمة',
    desc_en: 'Our large ceramic slabs redefine the concept of continuous surfaces for modern design.',
    desc_fr: 'Nos grandes dalles redéfinissent la notion de surface continue pour un design moderne.',
    desc_ar: 'ألواحنا الخزفية الكبيرة تعيد تعريف مفهوم الأسطح المستمرة للتصميم الحديث.',
    image: '/image4.jpg',
    link: '/category/leaf',
  },
];

const PROJECTS = [
  {
    id: 1,
    title_en: 'Private Villa Algiers',
    title_fr: 'Villa Privée Alger',
    title_ar: 'فيلا خاصة بالجزائر',
    location: 'Alger, Algérie',
    image: '/image1.jpg',
  },
  {
    id: 2,
    title_en: 'Luxury Hotel Constantine',
    title_fr: 'Hôtel de Luxe Constantine',
    title_ar: 'فندق فاخر بقسنطينة',
    location: 'Constantine, Algérie',
    image: '/image4.jpg',
  },
  {
    id: 3,
    title_en: 'Private Residence Oran',
    title_fr: 'Résidence Privée Oran',
    title_ar: 'مسكن خاص بوهران',
    location: 'Oran, Algérie',
    image: '/image3.jpg',
  },
  {
    id: 4,
    title_en: 'Commercial Center Tlemcen',
    title_fr: 'Centre Commercial Tlemcen',
    title_ar: 'مركز تجاري بتلمسان',
    location: 'Tlemcen, Algérie',
    image: '/image2.jpg',
  },
  {
    id: 5,
    title_en: 'Spa & Wellness Annaba',
    title_fr: 'Spa & Wellness Annaba',
    title_ar: 'سبا ومركز عافية بعنابة',
    location: 'Annaba, Algérie',
    image: '/image5.jpg',
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

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) { videoRef.current.pause(); } else { videoRef.current.play(); }
    setIsPlaying((p) => !p);
  };

  const scrollSlider = (dir: 1 | -1) => {
    sliderRef.current?.scrollBy({ left: dir * 400, behavior: 'smooth' });
  };

  const { products: featured, loading: featLoading } = useFeaturedProducts();
  const { products: allProducts, loading: allLoading } = useProducts({ sort: 'newest', page: 1, limit: 60 });

  const getL = (obj: { label_en: string; label_fr: string; label_ar?: string }) =>
    lang === 'fr' ? obj.label_fr : lang === 'ar' ? (obj.label_ar ?? obj.label_en) : obj.label_en;

  const getD = (obj: { desc_en: string; desc_fr: string; desc_ar?: string }) =>
    lang === 'fr' ? obj.desc_fr : lang === 'ar' ? (obj.desc_ar ?? obj.desc_en) : obj.desc_en;

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

      <div className="overflow-x-hidden">

      {/* ══════════════════════════════════════════════════
          1. HERO — full-bleed 100vh
      ══════════════════════════════════════════════════ */}
      <section className="relative h-screen min-h-[600px] overflow-hidden">
        {/* Background video */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster="/image1.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/background.mp4" type="video/mp4" />
        </video>
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark/75 via-dark/20 to-dark/30" />

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
              className="flex flex-wrap items-center gap-6"
            >
              <Link
                to="/shop"
                className="inline-flex items-center gap-3 border border-white/70 text-white/90 hover:bg-white hover:text-[#1A1714] font-sans text-[11px] uppercase tracking-[0.25em] px-7 py-3.5 transition-all duration-300"
              >
                {t('hero.cta')}
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

        {/* Bottom-right: scroll indicator + play/pause */}
        <div className="absolute bottom-8 right-4 sm:right-8 md:right-16 hidden sm:flex flex-col items-center gap-4 z-10">
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
            className="w-9 h-9 flex items-center justify-center border border-white/30 text-white/50 hover:border-white/70 hover:text-white transition-all duration-200"
          >
            {isPlaying ? <Pause size={12} strokeWidth={1.5} /> : <Play size={12} strokeWidth={1.5} />}
          </button>
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
            style={{ backgroundImage: `url(${COLLECTIONS[0].image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
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
              {t('sections.newArrivals')}
            </p>
            <h2
              className="font-display text-dark font-light leading-tight mb-6"
              style={{ fontSize: 'clamp(30px, 4vw, 54px)' }}
            >
              {t('sections.categories')}
            </h2>
            <p className="font-sans text-muted text-sm leading-relaxed font-light mb-10 max-w-md">
              {getD(COLLECTIONS[0])}
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
              {t('sections.discover')}
              <ArrowRight size={12} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1 }}
            className="relative overflow-hidden min-h-[500px] lg:min-h-[680px] order-1 lg:order-2"
            style={{ backgroundImage: `url(${COLLECTIONS[2].image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
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
                {t('sections.ourProducts')}
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
          5. COLLECTIONS SLIDER — horizontal scroll with rounded images
      ══════════════════════════════════════════════════ */}
      <section className="bg-surface-warm py-20 md:py-28">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
          <div className="flex items-end justify-between mb-10">
            <div>
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
            <div className="flex gap-2">
              <button
                onClick={() => scrollSlider(-1)}
                aria-label="Previous"
                className="w-10 h-10 flex items-center justify-center border border-border text-muted hover:border-dark hover:text-dark transition-colors"
              >
                <ChevronLeft size={16} strokeWidth={1.5} />
              </button>
              <button
                onClick={() => scrollSlider(1)}
                aria-label="Next"
                className="w-10 h-10 flex items-center justify-center border border-border text-muted hover:border-dark hover:text-dark transition-colors"
              >
                <ChevronRight size={16} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          <div
            ref={sliderRef}
            className="flex gap-4 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-2"
          >
            {COLLECTIONS.map((col) => (
              <div
                key={col.slug}
                className="flex-shrink-0 w-[80vw] sm:w-[45vw] lg:w-[calc(33.333%-11px)] snap-start"
              >
                <Link to={`/category/${col.slug}`} className="group block">
                  <div
                    className="relative overflow-hidden rounded-xl transition-transform duration-700 group-hover:scale-[1.02]"
                    style={{ height: '360px', backgroundImage: `url(${col.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/65 via-dark/10 to-transparent rounded-xl" />
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <h3
                        className="font-display text-white font-light leading-none mb-2"
                        style={{ fontSize: 'clamp(20px, 2vw, 28px)' }}
                      >
                        {getL(col)}
                      </h3>
                      <span className="inline-flex items-center gap-2 font-sans text-white/60 text-[10px] uppercase tracking-[0.2em] group-hover:text-white transition-colors duration-300">
                        {t('sections.viewAll')}
                        <ArrowRight size={11} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
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
            <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-accent mb-3">{t('sections.highlightsLabel')}</p>
            <h2
              className="font-display text-dark font-light"
              style={{ fontSize: 'clamp(28px, 3.5vw, 48px)' }}
            >
              {t('sections.highlights')}
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
                    className="relative overflow-hidden mb-6 rounded-xl transition-transform duration-700 group-hover:scale-[1.02]"
                    style={{ height: '320px', backgroundImage: `url(${hl.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                  />
                  <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-muted mb-2">
                    {lang === 'fr' ? hl.category_fr : lang === 'ar' ? hl.category_ar : hl.category_en}
                  </p>
                  <h3
                    className="font-display text-dark font-light mb-3 group-hover:text-accent transition-colors duration-300"
                    style={{ fontSize: '24px' }}
                  >
                    {lang === 'fr' ? hl.title_fr : lang === 'ar' ? hl.title_ar : hl.title_en}
                  </h3>
                  <p className="font-sans text-muted text-sm font-light leading-relaxed mb-5">
                    {lang === 'fr' ? hl.desc_fr : lang === 'ar' ? hl.desc_ar : hl.desc_en}
                  </p>
                  <span className="inline-flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.22em] text-dark group-hover:text-accent transition-colors duration-300">
                    {t('sections.learnMore')}
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
              <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-accent mb-3">{t('sections.projectsLabel')}</p>
              <h2
                className="font-display text-dark font-light"
                style={{ fontSize: 'clamp(28px, 3.5vw, 48px)' }}
              >
                {t('sections.projects')}
              </h2>
            </div>
            <Link
              to="/shop"
              className="hidden md:inline-flex items-center gap-3 font-sans text-[11px] uppercase tracking-[0.22em] text-muted hover:text-accent transition-colors group"
            >
              {t('sections.viewAll')}
              <ArrowRight size={12} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Horizontal scrolling gallery */}{'}'}
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
                className="relative overflow-hidden mb-4 rounded-xl transition-transform duration-700 group-hover:scale-[1.02]"
                style={{ height: '520px', backgroundImage: `url(${project.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-dark/50 via-transparent to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="font-sans text-white/80 text-[10px] uppercase tracking-[0.22em]">
                    {t('sections.viewProject')}
                  </span>
                </div>
              </div>
              <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-muted mb-1">
                {project.location}
              </p>
              <h3 className="font-display text-dark font-light text-xl group-hover:text-accent transition-colors duration-300">
                {lang === 'fr' ? project.title_fr : lang === 'ar' ? project.title_ar : project.title_en}
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
            {t('sections.quote')}
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
                  {t('sections.featuredLabel')}
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

      </div>
    </>
  );
}
