import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { api } from '@/lib/api';
import { ScrollToTop } from '@/components/ui/ScrollToTop';

export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    api.visits.track(location.pathname);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-bg">
      <Navbar />
      <main className="flex-1 overflow-x-hidden">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
