import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, Layers, Inbox, Image as ImageIcon, ImagePlay, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import Logo from '../../components/Logo';
import { useAuth } from '../../context/AuthContext';

const NAV = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/categories', label: 'Categories', icon: Layers },
  { to: '/admin/inquiries', label: 'Inquiries', icon: Inbox },
  { to: '/admin/gallery', label: 'Gallery', icon: ImageIcon },
  { to: '/admin/banners', label: 'Banners', icon: ImagePlay },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const onLogout = () => { logout(); navigate('/admin/login'); };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-72 bg-navy-950 text-white transform transition-transform ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <Logo variant="light"/>
          <button className="lg:hidden text-white" onClick={()=>setOpen(false)}><X size={22}/></button>
        </div>
        <nav className="p-4 space-y-1">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.end}
              onClick={()=>setOpen(false)}
              className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${isActive ? 'bg-gold-gradient text-white shadow-gold' : 'text-white/70 hover:text-white hover:bg-white/5'}`}>
              <n.icon size={18}/> {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="absolute bottom-0 inset-x-0 p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-3 px-2">
            <div className="w-9 h-9 rounded-full bg-gold-gradient flex items-center justify-center font-bold">{user?.name?.[0] || 'A'}</div>
            <div>
              <div className="text-sm font-semibold">{user?.name}</div>
              <div className="text-[11px] text-white/60">{user?.email}</div>
            </div>
          </div>
          <button onClick={onLogout} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/10 hover:bg-rose-500 text-sm transition">
            <LogOut size={15}/> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0">
        <header className="lg:hidden bg-white border-b px-4 py-3 flex items-center justify-between sticky top-0 z-30">
          <button onClick={()=>setOpen(true)} className="p-2"><Menu size={22}/></button>
          <Logo/>
          <div className="w-8"/>
        </header>
        <main className="p-5 lg:p-8 max-w-7xl mx-auto">
          <Outlet/>
        </main>
      </div>

      {open && <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={()=>setOpen(false)}/>}
    </div>
  );
}
