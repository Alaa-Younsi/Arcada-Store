import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SEOHead } from '@/components/seo/SEOHead';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/store/authStore';
import { supabase } from '@/lib/supabase';
import { toast } from '@/components/ui/Toast';

const schema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(1, 'Mot de passe requis'),
});
type LoginForm = z.infer<typeof schema>;

export default function AdminLogin() {
  const navigate = useNavigate();
  const setSession = useAuthStore((s) => s.setSession);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) throw new Error(error.message);
      if (!authData.session) throw new Error('No session returned');

      // Check admin claim in user metadata
      const isAdmin =
        authData.user?.user_metadata?.is_admin === true ||
        authData.user?.app_metadata?.is_admin === true;

      if (!isAdmin) {
        await supabase.auth.signOut();
        throw new Error('Accès refusé — compte non administrateur');
      }

      setSession(authData.session.access_token, authData.user!);
      navigate('/admin');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Connexion échouée');
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full bg-white border border-[#E8E2D9] px-4 py-3 font-sans text-sm text-[#2D2926] placeholder-[#9E9189] focus:border-[#8B7355] focus:outline-none transition-colors';

  return (
    <>
      <SEOHead title="Admin — ARCADA" />

      <div className="min-h-screen flex items-center justify-center px-4 bg-[#F2EDE6]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', damping: 20 }}
          className="w-full max-w-sm bg-white border border-[#E8E2D9] p-8 shadow-card rounded-2xl"
        >
          <div className="text-center mb-8">
            <img src="/logo.png" alt="ARCADA" className="h-12 w-auto mx-auto mb-4" />
            <h1 className="font-display text-[#1A1714] font-light text-2xl mb-1">
              Espace Admin
            </h1>
            <p className="font-sans text-[#6B6459] text-xs tracking-[0.15em] uppercase">
              ARCADA Administration
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block font-sans text-xs text-[#6B6459] uppercase tracking-[0.15em] mb-2">
                Email
              </label>
              <input
                {...register('email')}
                type="email"
                autoComplete="email"
                className={inputClass}
              />
              {errors.email && (
                <p className="font-sans text-xs text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block font-sans text-xs text-[#6B6459] uppercase tracking-[0.15em] mb-2">
                Mot de passe
              </label>
              <input
                {...register('password')}
                type="password"
                autoComplete="current-password"
                className={inputClass}
              />
              {errors.password && (
                <p className="font-sans text-xs text-[#8B7355] mt-1">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full mt-4"
            >
              SE CONNECTER
            </Button>
          </form>
        </motion.div>
      </div>
    </>
  );
}