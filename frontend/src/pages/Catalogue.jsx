import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Download, FileText, Printer } from 'lucide-react';
import { motion } from 'framer-motion';
import PageHero from '../components/PageHero';
import api from '../utils/api';
import { COMPANY } from '../utils/constants';

export default function Catalogue() {
  const [products, setProducts] = useState([]);
  useEffect(() => { api.get('/products?limit=100').then((r) => setProducts(r.data.items || [])); }, []);

  const onPrint = () => window.print();

  return (
    <>
      <Helmet><title>Catalogue — WINNER ENTERPRISE</title></Helmet>
      <PageHero title="Product Catalogue" subtitle="Download our latest premium glass beads catalogue."/>

      <section className="section">
        <div className="container-px max-w-7xl mx-auto">
          <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
            className="card-premium gold-border-glow always p-10 text-center mb-12 bg-gradient-to-br from-white to-gold-50/40">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gold-gradient flex items-center justify-center shadow-gold">
              <FileText size={36} className="text-white"/>
            </div>
            <h2 className="heading-display text-3xl mt-6 text-navy-900">WINNER ENTERPRISE — Master Catalogue 2026</h2>
            <p className="mt-3 text-navy-600 max-w-2xl mx-auto">Complete product specifications, sizing charts, packaging options and applications across our entire premium glass beads range.</p>
            <div className="mt-7 flex flex-wrap gap-3 justify-center">
              <button onClick={onPrint} className="btn-gold"><Download size={16}/> Download / Print Catalogue</button>
              <a href={`https://wa.me/${COMPANY.whatsapp}?text=Please send me the latest catalogue`} target="_blank" rel="noreferrer" className="btn-outline">
                Request via WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Print-ready cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7 print:gap-3">
            {products.map((p, i) => (
              <motion.div key={p._id} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:Math.min(i*0.04,0.4)}}
                className="card-premium overflow-hidden">
                <div className="aspect-[4/3] overflow-hidden bg-navy-50">
                  <img src={p.primaryImage || p.images?.[0]} alt={p.name} className="w-full h-full object-cover"/>
                </div>
                <div className="p-5">
                  <div className="text-xs uppercase tracking-widest text-gold-600 font-semibold">{p.category?.name}</div>
                  <h3 className="heading-display text-lg text-navy-900 mt-1">{p.name}</h3>
                  <div className="mt-2 text-xs text-navy-500">Code: <span className="font-semibold text-navy-800">{p.code}</span></div>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                    {p.color && <div><span className="text-navy-500">Color:</span> <span className="font-medium">{p.color}</span></div>}
                    {p.size && <div><span className="text-navy-500">Size:</span> <span className="font-medium">{p.size}</span></div>}
                    {p.packaging && <div className="col-span-2"><span className="text-navy-500">Packaging:</span> <span className="font-medium">{p.packaging}</span></div>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-2xl bg-navy-50 text-center print:hidden">
            <Printer size={20} className="text-gold-500 mx-auto mb-2"/>
            <p className="text-navy-700 text-sm">
              Tip: use your browser's <b>Print → Save as PDF</b> to download this catalogue.
            </p>
          </div>
        </div>
      </section>

      <style>{`
        @media print {
          .btn, header, footer, nav, [class*="WhatsApp"] { display: none !important; }
          .card-premium { box-shadow: none !important; border: 1px solid #ddd; break-inside: avoid; }
          body { background: white !important; }
        }
      `}</style>
    </>
  );
}
