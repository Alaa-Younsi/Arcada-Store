import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Trash2, Eye, EyeOff, RefreshCw } from 'lucide-react';
import { api } from '@/lib/api';
import { toast } from '@/components/ui/Toast';
import { Badge } from '@/components/ui/Badge';

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export default function Messages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await api.admin.messages.getAll();
      setMessages(data as Message[]);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleSelect = async (msg: Message) => {
    setSelected(selected === msg.id ? null : msg.id);
    if (!msg.is_read) {
      try {
        await api.admin.messages.markRead(msg.id);
        setMessages((prev) => prev.map((m) => m.id === msg.id ? { ...m, is_read: true } : m));
      } catch { /* non-critical */ }
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Delete this message?')) return;
    try {
      await api.admin.messages.delete(id);
      setMessages((prev) => prev.filter((m) => m.id !== id));
      if (selected === id) setSelected(null);
      toast.success('Message deleted');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Delete failed');
    }
  };

  const unreadCount = messages.filter((m) => !m.is_read).length;

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display font-light text-[#1A1714] uppercase tracking-[0.15em] text-2xl flex items-center gap-3">
            <Mail size={22} className="text-[#8B7355]" />
            Messages
            {unreadCount > 0 && (
              <span className="font-sans text-xs bg-[#1A1714] text-black px-2 py-0.5 rounded-full">
                {unreadCount} new
              </span>
            )}
          </h1>
          <p className="font-sans text-xs text-[#6B6459] mt-1">
            Contact form submissions from your website visitors.
          </p>
        </div>
        <button
          onClick={load}
          className="flex items-center gap-2 font-sans text-xs text-[#6B6459] hover:text-[#1A1714] border border-[#E8E2D9] px-3 py-2 hover:border-[#333] transition-colors"
        >
          <RefreshCw size={12} />
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white border border-[#E8E2D9] p-4 animate-pulse">
              <div className="h-4 bg-[#1a1a1a] rounded w-1/3 mb-2" />
              <div className="h-3 bg-[#1a1a1a] rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : messages.length === 0 ? (
        <div className="bg-white border border-[#E8E2D9] p-16 text-center rounded-xl">
          <Mail size={40} className="text-[#333] mx-auto mb-4" />
          <p className="font-sans text-[#6B6459] text-sm">No messages yet.</p>
          <p className="font-sans text-[#555] text-xs mt-1">Messages from your contact form will appear here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((msg, i) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <div
                onClick={() => handleSelect(msg)}
                className={`bg-white border cursor-pointer transition-all ${
                  selected === msg.id
                    ? 'border-[#8B7355]/40'
                    : msg.is_read
                    ? 'border-[#E8E2D9] hover:border-[#333]'
                    : 'border-[#8B7355]/20 hover:border-[#8B7355]/40'
                }`}
              >
                {/* Message header row */}
                <div className="flex items-center justify-between px-4 py-3 gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${msg.is_read ? 'bg-[#333]' : 'bg-[#1A1714]'}`} />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-sans text-sm text-[#1A1714] font-semibold truncate">
                          {msg.name}
                        </span>
                        <span className="font-sans text-xs text-[#555]">{msg.email}</span>
                        {!msg.is_read && (
                          <Badge variant="red">New</Badge>
                        )}
                      </div>
                      <p className="font-sans text-xs text-[#666] truncate mt-0.5">
                        {msg.message.slice(0, 80)}{msg.message.length > 80 ? '…' : ''}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="font-sans text-xs text-[#555] hidden sm:block">
                      {new Date(msg.created_at).toLocaleDateString()}
                    </span>
                    <button
                      onClick={(e) => handleDelete(msg.id, e)}
                      className="text-[#555] hover:text-[#8B7355] transition-colors p-1"
                      aria-label="Delete message"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* Expanded message */}
                {selected === msg.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="border-t border-[#E8E2D9] px-4 py-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="font-sans text-xs text-[#555] uppercase tracking-[0.15em] mb-1">From</p>
                        <p className="font-sans text-sm text-[#1A1714]">{msg.name}</p>
                      </div>
                      <div>
                        <p className="font-sans text-xs text-[#555] uppercase tracking-[0.15em] mb-1">Email</p>
                        <a
                          href={`mailto:${msg.email}`}
                          className="font-sans text-sm text-[#8B7355] hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {msg.email}
                        </a>
                      </div>
                      <div>
                        <p className="font-sans text-xs text-[#555] uppercase tracking-[0.15em] mb-1">Date</p>
                        <p className="font-sans text-sm text-[#1A1714]">
                          {new Date(msg.created_at).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="font-sans text-xs text-[#555] uppercase tracking-[0.15em] mb-1">Status</p>
                        <span className="font-sans text-sm text-[#1A1714]">
                          {msg.is_read ? (
                            <span className="flex items-center gap-1 text-[#6B6459]"><Eye size={12} /> Read</span>
                          ) : (
                            <span className="flex items-center gap-1 text-[#8B7355]"><EyeOff size={12} /> Unread</span>
                          )}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="font-sans text-xs text-[#555] uppercase tracking-[0.15em] mb-2">Message</p>
                      <div className="bg-[#F7F7F5] border border-[#E8E2D9] p-4">
                        <p className="font-sans text-sm text-[#cccccc] leading-relaxed whitespace-pre-wrap">
                          {msg.message}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <a
                        href={`mailto:${msg.email}?subject=Re: Your message to ARCADA`}
                        onClick={(e) => e.stopPropagation()}
                        className="font-sans text-xs text-[#8B7355] hover:underline uppercase tracking-[0.15em]"
                      >
                        Reply via Email →
                      </a>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

