import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

interface AuthState {
  token: string | null;
  user: User | null;
  isAdmin: boolean;
  setSession: (token: string, user: User) => void;
  logout: () => Promise<void>;
  restoreSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAdmin: false,

      setSession: (token, user) => {
        const isAdmin =
          user.user_metadata?.is_admin === true ||
          user.app_metadata?.is_admin === true;
        set({ token, user, isAdmin });
      },

      logout: async () => {
        await supabase.auth.signOut();
        set({ token: null, user: null, isAdmin: false });
      },

      // Call this once on app mount (App.tsx) to re-hydrate from Supabase session
      restoreSession: async () => {
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          const user = data.session.user;
          const isAdmin =
            user.user_metadata?.is_admin === true ||
            user.app_metadata?.is_admin === true;
          set({ token: data.session.access_token, user, isAdmin });
        } else {
          set({ token: null, user: null, isAdmin: false });
        }
      },
    }),
    {
      name: 'arcada-admin-auth',
      // Only persist the token; user is restored from Supabase on mount
      partialize: (state) => ({ token: state.token }),
    }
  )
);