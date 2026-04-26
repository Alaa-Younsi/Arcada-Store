import { useEffect, useState } from 'react';
import { Outlet, useNavigate, NavLink, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LayoutDashboard, Package, ShoppingBag, LogOut, Tag, Settings2, Store, MessageSquare, Mail } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';

export default function AdminLayout() {
  const { token, logout } = useAuthStore();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [clock, setClock] = useState(() => new Date().toLocaleTimeString());

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
    }
  }, [token, navigate]);

  useEffect(() => {
    const id = setInterval(() => setClock(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(id);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { to: '/admin', label: t('admin.dashboard'), icon: LayoutDashboard, end: true },
    { to: '/admin/products', label: t('admin.products'), icon: Package, end: false },
    { to: '/admin/orders', label: t('admin.orders'), icon: ShoppingBag, end: false },
    { to: '/admin/categories', label: t('admin.categories'), icon: Tag, end: false },
    { to: '/admin/messages', label: t('admin.messages'), icon: MessageSquare, end: false },
    { to: '/admin/newsletter', label: t('admin.newsletter'), icon: Mail, end: false },
    { to: '/admin/settings', label: t('admin.settings'), icon: Settings2, end: false },
  ];

  return (
    <div className="min-h-screen flex bg-[#F7F7F5]">
      {/* Sidebar */}
      <aside className="flex flex-col bg-white border-r border-[#E8E2D9] w-12 lg:w-64 flex-shrink-0">
        {/* Logo area */}
        <div className="border-b border-[#E8E2D9]">
          <div className="hidden lg:block p-6">
            <Link to="/admin" className="flex items-center gap-3 mb-3">
              <img src="/logo.png" alt="ARCADA" className="h-8 w-auto" />
              <div>
                <div className="font-sans font-semibold text-[#1A1714] text-sm tracking-[0.15em] uppercase">
                  ARCADA
                </div>
                <div className="font-sans text-xs text-[#8B7355] uppercase tracking-[0.15em]">
                  {t('admin.adminPanel')}
                </div>
              </div>
            </Link>
            <div className="flex items-center justify-between">
              <span className="font-sans text-xs text-[#9E9189]">{clock}</span>
              <span className="flex items-center gap-1.5 font-sans text-xs text-green-600">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                {t('admin.online')}
              </span>
            </div>
          </div>
          <div className="lg:hidden flex justify-center py-3">
            <Link to="/admin">
              <img src="/logo.png" alt="ARCADA" className="h-5 w-auto" />
            </Link>
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1 py-2 lg:p-4 lg:space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center justify-center lg:justify-start gap-3 px-0 lg:px-4 py-3 font-sans text-sm transition-colors ${
                  isActive
                    ? 'text-[#1A1714] bg-[#F2EDE6] border-l-2 border-[#8B7355]'
                    : 'text-[#6B6459] hover:text-[#1A1714] hover:bg-[#F7F7F5]'
                }`
              }
              title={item.label}
            >
              <item.icon size={16} strokeWidth={1.5} className="flex-shrink-0" />
              <span className="hidden lg:block">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom actions */}
        <div className="border-t border-[#E8E2D9] py-2 lg:p-4 lg:space-y-2">
          <div className="hidden lg:flex items-center justify-start px-4 py-2">
            <LanguageSwitcher />
          </div>
          <Link
            to="/"
            title="Back to Store"
            className="flex items-center justify-center lg:justify-start gap-3 w-full px-0 lg:px-4 py-3 font-sans text-sm text-[#6B6459] hover:text-[#1A1714] hover:bg-[#F7F7F5] transition-colors"
          >
            <Store size={16} strokeWidth={1.5} className="flex-shrink-0" />
            <span className="hidden lg:block">{t('nav.home')}</span>
          </Link>
          <button
            onClick={handleLogout}
            title={t('admin.logout')}
            className="flex items-center justify-center lg:justify-start gap-3 w-full px-0 lg:px-4 py-3 font-sans text-sm text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut size={16} strokeWidth={1.5} className="flex-shrink-0" />
            <span className="hidden lg:block">{t('admin.logout')}</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
