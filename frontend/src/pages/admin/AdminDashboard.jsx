import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Inbox, Layers, Image as ImageIcon, TrendingUp, ArrowRight, Star } from 'lucide-react';
import api from '../../utils/api';

const Stat = ({ icon:Icon, label, value, color, link }) => (
  <Link to={link} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-gold-soft transition-all hover:-translate-y-0.5">
    <div className="flex justify-between items-start">
      <div>
        <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold">{label}</div>
        <div className="heading-display text-3xl text-navy-900 mt-2">{value}</div>
      </div>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
        <Icon size={22} className="text-white"/>
      </div>
    </div>
  </Link>
);

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products:0, categories:0, gallery:0, inquiries:0, newInquiries:0 });
  const [recent, setRecent] = useState([]);
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    (async () => {
      const [p, c, g, i, f] = await Promise.all([
        api.get('/products?limit=1'),
        api.get('/categories'),
        api.get('/gallery'),
        api.get('/inquiries/stats'),
        api.get('/products/featured'),
      ]);
      setStats({
        products: p.data.total || 0,
        categories: c.data.length || 0,
        gallery: g.data.length || 0,
        inquiries: i.data.total || 0,
        newInquiries: i.data.newCount || 0,
      });
      setRecent(i.data.recent || []);
      setFeatured(f.data.slice(0,5));
    })();
  }, []);

  return (
    <div className="space-y-7">
      <div>
        <h1 className="heading-display text-3xl text-navy-900">Dashboard</h1>
        <p className="text-slate-600 mt-1 text-sm">Welcome to the WINNER ENTERPRISE admin panel.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Stat icon={Package} label="Products" value={stats.products} color="bg-gradient-to-br from-gold-400 to-gold-600" link="/admin/products"/>
        <Stat icon={Layers} label="Categories" value={stats.categories} color="bg-gradient-to-br from-navy-600 to-navy-800" link="/admin/categories"/>
        <Stat icon={Inbox} label="Inquiries" value={`${stats.inquiries}${stats.newInquiries?` · ${stats.newInquiries} new`:''}`} color="bg-gradient-to-br from-emerald-500 to-emerald-700" link="/admin/inquiries"/>
        <Stat icon={ImageIcon} label="Gallery Items" value={stats.gallery} color="bg-gradient-to-br from-rose-500 to-rose-700" link="/admin/gallery"/>
      </div>

      <div className="grid lg:grid-cols-2 gap-7">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="heading-display text-lg text-navy-900">Recent Inquiries</h3>
            <Link to="/admin/inquiries" className="text-xs text-gold-600 font-semibold flex items-center gap-1">View all <ArrowRight size={12}/></Link>
          </div>
          {recent.length === 0 ? <div className="text-sm text-slate-400 py-6 text-center">No inquiries yet.</div> : (
            <ul className="space-y-3">
              {recent.map((r) => (
                <li key={r._id} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:bg-slate-50">
                  <div>
                    <div className="font-semibold text-navy-900 text-sm">{r.name}</div>
                    <div className="text-xs text-slate-500">{r.email} · {r.type}</div>
                  </div>
                  <span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold ${r.status==='new'?'bg-emerald-50 text-emerald-700':'bg-slate-100 text-slate-600'}`}>{r.status}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="heading-display text-lg text-navy-900">Featured Products</h3>
            <Link to="/admin/products" className="text-xs text-gold-600 font-semibold flex items-center gap-1">Manage <ArrowRight size={12}/></Link>
          </div>
          {featured.length === 0 ? <div className="text-sm text-slate-400 py-6 text-center">No featured products.</div> : (
            <ul className="space-y-3">
              {featured.map((p) => (
                <li key={p._id} className="flex items-center gap-3 p-2 rounded-xl border border-slate-100">
                  <img src={p.primaryImage || p.images?.[0]} className="w-12 h-12 object-cover rounded-lg"/>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-navy-900 text-sm truncate">{p.name}</div>
                    <div className="text-xs text-slate-500">{p.code}</div>
                  </div>
                  <Star size={14} className="text-gold-500 fill-gold-500"/>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
