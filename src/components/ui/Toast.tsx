import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { create } from 'zustand';

export type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastStore {
  toasts: Toast[];
  add: (message: string, type?: ToastType) => void;
  remove: (id: string) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  add: (message, type = 'info') => {
    const id = Math.random().toString(36).slice(2);
    set((s) => ({ toasts: [...s.toasts, { id, message, type }] }));
    setTimeout(() => {
      set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
    }, 4000);
  },
  remove: (id) =>
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));

export const toast = {
  success: (msg: string) => useToastStore.getState().add(msg, 'success'),
  error: (msg: string) => useToastStore.getState().add(msg, 'error'),
  info: (msg: string) => useToastStore.getState().add(msg, 'info'),
};

const icons = {
  success: <CheckCircle size={16} strokeWidth={1.5} className="text-green-600" />,
  error: <XCircle size={16} strokeWidth={1.5} className="text-red-600" />,
  info: <Info size={16} strokeWidth={1.5} className="text-accent" />,
};

export function ToastContainer() {
  const { toasts, remove } = useToastStore();

  return createPortal(
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 80, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 80, scale: 0.95 }}
            className="pointer-events-auto flex items-center gap-3 bg-white border border-border shadow-card px-4 py-3 min-w-[280px] rounded-xl"
          >
            {icons[t.type]}
            <span className="font-sans text-sm text-dark flex-1">{t.message}</span>
            <button
              onClick={() => remove(t.id)}
              className="text-muted hover:text-dark ml-2 transition-colors"
              aria-label="Dismiss"
            >
              <X size={14} strokeWidth={1.5} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>,
    document.body
  );
}
