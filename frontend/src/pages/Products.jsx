import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, Filter, X } from 'lucide-react';
import { motion } from 'framer-motion';
import PageHero from '../components/PageHero';
import ProductCard from '../components/ProductCard';
import InquiryModal from '../components/InquiryModal';
import api from '../utils/api';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('all');
  const [color, setColor] = useState('all');
  const [avail, setAvail] = useState('all');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    Promise.all([api.get('/products?limit=200'), api.get('/categories')])
      .then(([p, c]) => {
        setProducts(p.data.items || []);
        setCategories(c.data || []);
      })
      .finally(() => setLoading(false));
  }, []);

  const colors = useMemo(() => Array.from(new Set(products.map((p) => p.color).filter(Boolean))), [products]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (cat !== 'all' && p.category?.slug !== cat) return false;
      if (color !== 'all' && p.color !== color) return false;
      if (avail !== 'all' && p.availability !== avail) return false;
      if (search) {
        const s = search.toLowerCase();
        if (!(p.name?.toLowerCase().includes(s) || p.code?.toLowerCase().includes(s) || p.description?.toLowerCase().includes(s) || p.color?.toLowerCase().includes(s)))
          return false;
      }
      return true;
    });
  }, [products, cat, color, avail, search]);

  const openInquiry = (p) => { setActive(p); setOpen(true); };
  const reset = () => { setSearch(''); setCat('all'); setColor('all'); setAvail('all'); };

  return (
    <>
      <Helmet><title>Products — WINNER ENTERPRISE Glass Beads Catalogue</title></Helmet>
      <PageHero title="Our Premium Products" subtitle="Explore our complete catalogue of glass beads engineered for performance."/>

      <section className="section">
        <div className="container-px max-w-7xl mx-auto">
          {/* Search bar */}
          <div className="card-premium p-5 mb-8 flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-navy-400"/>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, code, color..."
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gold-200 focus:outline-none focus:ring-2 focus:ring-gold-400"
              />
            </div>
            <button onClick={() => setShowFilters((s) => !s)} className="btn-outline lg:hidden w-full">
              <Filter size={16}/> {showFilters ? 'Hide' : 'Show'} Filters
            </button>
            <div className={`flex-wrap gap-3 ${showFilters ? 'flex' : 'hidden'} lg:flex`}>
              <select value={cat} onChange={(e)=>setCat(e.target.value)} className="px-4 py-3 rounded-xl border border-gold-200 bg-white text-sm">
                <option value="all">All Categories</option>
                {categories.map((c) => <option key={c._id} value={c.slug}>{c.name}</option>)}
              </select>
              <select value={color} onChange={(e)=>setColor(e.target.value)} className="px-4 py-3 rounded-xl border border-gold-200 bg-white text-sm">
                <option value="all">All Colors</option>
                {colors.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <select value={avail} onChange={(e)=>setAvail(e.target.value)} className="px-4 py-3 rounded-xl border border-gold-200 bg-white text-sm">
                <option value="all">Any Availability</option>
                <option value="in_stock">In Stock</option>
                <option value="limited">Limited</option>
                <option value="on_order">On Order</option>
                <option value="out_of_stock">Out of Stock</option>
              </select>
              {(search || cat!=='all' || color!=='all' || avail!=='all') && (
                <button onClick={reset} className="btn text-rose-600 hover:bg-rose-50"><X size={16}/> Reset</button>
              )}
            </div>
          </div>

          {/* Category quick pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button onClick={()=>setCat('all')} className={`px-4 py-2 rounded-full text-xs font-semibold border transition ${cat==='all'?'bg-navy-900 text-white border-navy-900':'border-gold-200 text-navy-700 hover:bg-gold-50'}`}>All Products</button>
            {categories.map((c) => (
              <button key={c._id} onClick={()=>setCat(c.slug)} className={`px-4 py-2 rounded-full text-xs font-semibold border transition ${cat===c.slug?'bg-navy-900 text-white border-navy-900':'border-gold-200 text-navy-700 hover:bg-gold-50'}`}>
                {c.name} {c.productCount ? <span className="ml-1 opacity-70">({c.productCount})</span> : null}
              </button>
            ))}
          </div>

          {/* Grid */}
          {loading ? (
            <div className="text-center py-20 text-navy-500">Loading products...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="heading-display text-2xl text-navy-700">No products found</div>
              <p className="text-navy-500 mt-2">Try adjusting your filters or contact us for custom requirements.</p>
            </div>
          ) : (
            <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
              {filtered.map((p, i) => <ProductCard key={p._id} product={p} index={i} onInquire={openInquiry}/>)}
            </motion.div>
          )}
        </div>
      </section>

      <InquiryModal open={open} onClose={()=>setOpen(false)} product={active}/>
    </>
  );
}
