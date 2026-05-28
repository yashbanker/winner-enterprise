import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/products', label: 'Products' },
  { to: '/industries', label: 'Industries' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/catalogue', label: 'Catalogue' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  const onHome = location.pathname === '/';
  const transparent = onHome && !scrolled;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
        transparent
          ? 'bg-transparent'
          : 'bg-white/90 backdrop-blur-lg shadow-[0_2px_20px_rgba(10,26,61,0.08)] border-b border-gold-100'
      }`}
    >
      <div className="container-px mx-auto max-w-7xl flex items-center justify-between py-3 lg:py-4">
        <Logo variant={transparent ? 'light' : 'dark'} />

        {/* Desktop */}
        <nav className="hidden lg:flex items-center gap-8">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''} ${
                  transparent ? 'text-white hover:text-gold-300' : 'text-navy-800 hover:text-gold-600'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <NavLink
            to="/admin/login"
            className={`btn-gold !py-2 !px-5 !text-xs`}
          >
            <ShieldCheck size={14} /> Admin
          </NavLink>
        </nav>

        {/* Mobile toggle */}
        <button
          className={`lg:hidden p-2 rounded-lg transition ${
            transparent ? 'text-white' : 'text-navy-900'
          }`}
          onClick={() => setOpen((s) => !s)}
          aria-label="Toggle menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-white border-t border-gold-100"
          >
            <div className="container-px py-4 flex flex-col gap-1">
              {LINKS.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === '/'}
                  className={({ isActive }) =>
                    `px-3 py-3 rounded-lg font-medium ${
                      isActive ? 'bg-gold-50 text-gold-700' : 'text-navy-800 hover:bg-navy-50'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <NavLink to="/admin/login" className="btn-gold mt-3 self-start">
                <ShieldCheck size={16} /> Admin Login
              </NavLink>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
