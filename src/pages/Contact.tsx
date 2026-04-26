import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, User, MessageSquare, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SEOHead } from '@/components/seo/SEOHead';
import { Button } from '@/components/ui/Button';
import { api } from '@/lib/api';
import { toast } from '@/components/ui/Toast';

export default function Contact() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setLoading(true);
    try {
      await api.messages.create(form);
      setSent(true);
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full bg-white border border-border px-4 py-3 font-sans text-sm text-dark placeholder-stone focus:border-accent focus:outline-none transition-colors';

  return (
    <>
      <SEOHead title="Contact — ARCADA" />

      <div className="bg-surface-warm border-b border-border pt-[72px]">
        <div className="max-w-screen-xl mx-auto px-4 py-16 md:py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-accent mb-3">ARCADA</p>
            <h1 className="font-display text-dark mb-2" style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 400 }}>
              {t('contact.title')}
            </h1>
            <p className="font-sans text-muted text-sm max-w-lg font-light">
              {t('contact.subtitle')}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 max-w-4xl">
            {/* Info column */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2 space-y-8"
            >
              {[
                { icon: Mail, label: t('contact.emailLabel'), value: t('contact.emailAddress') },
                { icon: MessageSquare, label: t('contact.responseTime'), value: t('contact.responseValue') },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-surface-warm border border-border flex items-center justify-center flex-shrink-0 rounded-xl">
                    <Icon size={14} strokeWidth={1.5} className="text-accent" />
                  </div>
                  <div>
                    <p className="font-sans text-xs text-muted uppercase tracking-[0.15em] mb-1">{label}</p>
                    <p className="font-sans text-sm text-dark">{value}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="lg:col-span-3"
            >
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-surface-warm border border-border p-12 text-center rounded-2xl"
                >
                  <div className="w-14 h-14 bg-white border border-border flex items-center justify-center mx-auto mb-6 rounded-xl">
                    <Send size={20} strokeWidth={1.5} className="text-accent" />
                  </div>
                  <h2 className="font-display text-dark font-light text-2xl mb-3">
                    {t('contact.successTitle')}
                  </h2>
                  <p className="font-sans text-muted text-sm mb-6">
                    {t('contact.successText')}
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="font-sans text-xs text-accent hover:text-accent-dark uppercase tracking-[0.15em] transition-colors"
                  >
                    {t('contact.messageSentAgain')}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                    <label className="flex items-center gap-2 font-sans text-xs text-muted uppercase tracking-[0.15em] mb-2">
                        <User size={12} />
                        {t('contact.nameLabel')} *
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        required
                        className={inputClass}
                        placeholder={t('contact.namePlaceholder')}
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 font-sans text-xs text-muted uppercase tracking-[0.15em] mb-2">
                        <Mail size={12} />
                        {t('contact.emailLabel')} *
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        required
                        className={inputClass}
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 font-sans text-xs text-muted uppercase tracking-[0.15em] mb-2">
                      <MessageSquare size={12} />
                      {t('contact.messageLabel')} *
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      required
                      rows={8}
                      className={`${inputClass} resize-none`}
                      placeholder={t('contact.messagePlaceholder')}
                    />
                  </div>

                  <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full sm:w-auto">
                    {loading ? t('contact.sending') : t('contact.send')}
                  </Button>
                </form>
              )}
            </motion.div>
        </div>
      </div>
    </>
  );
}
