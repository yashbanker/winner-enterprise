import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import api from '../utils/api';

const CATEGORIES = ['all', 'products', 'warehouse', 'packaging', 'team', 'other'];

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [cat, setCat] = useState('all');
  const [active, setActive] = useState(null);

  useEffect(() => {
    api.get('/gallery').then((r) => setItems(r.data || [])).catch(() => {});
  }, []);

  const filtered = cat === 'all' ? items : items.filter((i) => i.category === cat);
  const activeIdx = active ? filtered.findIndex((i) => i._id === active._id) : -1;
  const prev = () => setActive(filtered[(activeIdx - 1 + filtered.length) % filtered.length]);
  const next = () => setActive(filtered[(activeIdx + 1) % filtered.length]);

  return (
    <>
      <Helmet><title>Gallery — WINNER ENTERPRISE</title></Helmet>
      <PageHero title="Gallery Showcase" subtitle="A visual journey through our products, facility and craftsmanship."/>

      <section className="section">
        <div className="container-px max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {CATEGORIES.map((c) => (
              <button key={c} onClick={() => setCat(c)}
                className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-widest transition border ${cat===c?'bg-navy-900 text-white border-navy-900':'border-gold-200 text-navy-700 hover:bg-gold-50'}`}>
                {c === 'all' ? 'All' : c}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center text-navy-500 py-20">No images in this category yet.</div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
              {filtered.map((g, i) => (
                <motion.div key={g._id} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
                  transition={{delay:Math.min(i*0.04,0.4)}}
                  onClick={() => setActive(g)}
                  className="break-inside-avoid mb-5 cursor-pointer group relative overflow-hidden rounded-2xl shadow-navy">
                  <img src={g.image} alt={g.title} loading="lazy" className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-5 flex items-end">
                    <div className="text-white">
                      {g.title && <div className="heading-display text-lg">{g.title}</div>}
                      {g.caption && <div className="text-sm text-white/80 mt-1">{g.caption}</div>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            className="fixed inset-0 z-50 bg-navy-950/95 flex items-center justify-center p-6"
            onClick={() => setActive(null)}>
            <button onClick={(e)=>{e.stopPropagation();setActive(null);}} className="absolute top-6 right-6 text-white p-2 rounded-full hover:bg-white/10"><X size={28}/></button>
            {filtered.length > 1 && (
              <>
                <button onClick={(e)=>{e.stopPropagation();prev();}} className="absolute left-4 sm:left-10 text-white p-3 rounded-full hover:bg-white/10"><ChevronLeft size={32}/></button>
                <button onClick={(e)=>{e.stopPropagation();next();}} className="absolute right-4 sm:right-10 text-white p-3 rounded-full hover:bg-white/10"><ChevronRight size={32}/></button>
              </>
            )}
            <motion.img key={active._id} initial={{scale:0.9,opacity:0}} animate={{scale:1,opacity:1}} src={active.image}
              onClick={(e)=>e.stopPropagation()}
              className="max-h-[85vh] max-w-[90vw] rounded-2xl shadow-gold"/>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
