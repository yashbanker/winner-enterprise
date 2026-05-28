import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
  Sparkles, Truck, ShieldCheck, Users, Award, ArrowRight,
  Send, MessageCircle, Phone, Route, Gem, Factory, Zap, Building2, ChevronRight, Star,
} from 'lucide-react';

import SectionHeading from '../components/SectionHeading';
import ProductCard from '../components/ProductCard';
import InquiryModal from '../components/InquiryModal';
import GoldenWave from '../components/GoldenWave';
import { COMPANY, STATS, INDUSTRIES } from '../utils/constants';
import api from '../utils/api';

const iconMap = { route: Route, gem: Gem, factory: Factory, zap: Zap, 'building-2': Building2 };

const Counter = ({ value, suffix }) => {
  const [n, setN] = useState(0);
  const [start, setStart] = useState(false);
  useEffect(() => {
    if (!start) return;
    const dur = 1800, fps = 60, steps = Math.round(dur / (1000 / fps));
    let i = 0;
    const id = setInterval(() => {
      i++;
      setN(Math.round((value * i) / steps));
      if (i >= steps) clearInterval(id);
    }, 1000 / fps);
    return () => clearInterval(id);
  }, [start, value]);
  return (
    <motion.span
      onViewportEnter={() => setStart(true)}
      viewport={{ once: true }}
    >
      {n.toLocaleString()}{suffix}
    </motion.span>
  );
};

export default function Home() {
  const [products, setProducts] = useState([]);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 120]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    api.get('/products/featured').then((r) => setProducts(r.data)).catch(() => {});
  }, []);

  const openInquiry = (p) => { setActiveProduct(p); setInquiryOpen(true); };

  return (
    <>
      <Helmet>
        <title>WINNER ENTERPRISE — Leading Supplier of Premium Glass Beads | Surat, India</title>
        <meta name="description" content="WINNER ENTERPRISE — Premium glass beads supplier in Surat. Bulk orders, reflective, decorative, white, golden, industrial beads. Fast delivery & trusted B2B service." />
      </Helmet>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-navy-950 text-white">
        {/* Background */}
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0">
          <img src="/assets/hero.png" alt="" className="w-full h-full object-cover scale-110"/>
          <div className="absolute inset-0 bg-hero-vignette"/>
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-900/60 to-transparent"/>
        </motion.div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gold-400/30"
              style={{
                width: 4 + Math.random() * 8,
                height: 4 + Math.random() * 8,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{ y: [0, -30, 0], opacity: [0.2, 0.7, 0.2] }}
              transition={{ duration: 4 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 3 }}
            />
          ))}
        </div>

        {/* Golden wave decoration */}
        <svg className="absolute top-1/3 left-0 w-full opacity-50" viewBox="0 0 1440 200" preserveAspectRatio="none">
          <defs>
            <linearGradient id="hw" x1="0" x2="1">
              <stop offset="0%" stopColor="#c9a227" stopOpacity="0"/>
              <stop offset="50%" stopColor="#f4df8e" stopOpacity="0.7"/>
              <stop offset="100%" stopColor="#c9a227" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <path d="M0,100 C360,200 720,0 1440,120" stroke="url(#hw)" strokeWidth="2" fill="none"/>
        </svg>

        <div className="container-px max-w-7xl mx-auto relative z-10 pt-24 pb-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-gold-300 mb-6 glass px-4 py-2 rounded-full">
              <Sparkles size={14}/> Trusted Glass Beads Manufacturer & Supplier
            </div>
            <h1 className="heading-display text-4xl sm:text-5xl lg:text-7xl leading-[1.05]">
              Leading Supplier of <br/><span className="gold-text">Premium Glass Beads</span>
            </h1>
            <p className="mt-7 text-lg sm:text-xl text-white/80 max-w-2xl leading-relaxed">
              Providing high-quality glass beads with trusted service, bulk availability, and reliable delivery — engineered for road marking, industrial, decorative and construction applications.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/products" className="btn-gold !px-7 !py-3.5">
                View Products <ArrowRight size={16}/>
              </Link>
              <button onClick={() => setInquiryOpen(true)} className="btn-ghost-light !px-7 !py-3.5">
                <Send size={16}/> Request Quotation
              </button>
              <Link to="/contact" className="btn-ghost-light !px-7 !py-3.5">
                <Phone size={16}/> Contact Us
              </Link>
            </div>

            {/* Quick stats */}
            <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl">
              {STATS.map((s) => (
                <div key={s.label} className="glass rounded-2xl p-4 lg:p-5">
                  <div className="heading-display text-2xl lg:text-3xl gold-text"><Counter value={s.value} suffix={s.suffix}/></div>
                  <div className="text-[11px] uppercase tracking-widest text-white/70 mt-1.5">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom curve */}
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0,40 C320,80 720,0 1440,40 L1440,80 L0,80 Z" fill="#fff"/>
        </svg>
      </section>

      {/* ABOUT TEASER */}
      <section className="section relative">
        <div className="container-px max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="relative">
              <img src="/assets/warehouse.png" className="rounded-3xl shadow-navy w-full" alt="Winner Enterprise warehouse"/>
              <div className="absolute -bottom-6 -right-6 bg-gold-gradient text-white p-6 rounded-2xl shadow-gold hidden sm:block">
                <Award size={32}/>
                <div className="heading-display text-xl mt-2">15+ Years</div>
                <div className="text-xs tracking-widest opacity-90">OF EXCELLENCE</div>
              </div>
              <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-gold-400/40 rounded-full hidden sm:block"/>
            </div>
          </motion.div>

          <div>
            <div className="text-xs tracking-[0.3em] font-semibold uppercase text-gold-600 mb-3">About Winner Enterprise</div>
            <h2 className="heading-display text-3xl sm:text-4xl lg:text-5xl text-navy-900 leading-tight">
              Crafting Excellence in <span className="gold-text">Premium Glass Beads</span>
            </h2>
            <p className="mt-6 text-navy-600 text-base lg:text-lg leading-relaxed">
              Headquartered in Surat — India's industrial hub — <b>WINNER ENTERPRISE</b> is a trusted B2B supplier of premium quality glass beads. We combine quality sourcing, bulk supply capability, and fast delivery to serve clients across road marking, decorative, construction and industrial sectors.
            </p>
            <div className="mt-8 grid sm:grid-cols-2 gap-5">
              {[
                { icon: ShieldCheck, t: 'Quality Sourcing', d: 'Premium-grade raw material from verified partners' },
                { icon: Truck, t: 'Fast Delivery', d: 'Pan-India dispatch with reliable logistics' },
                { icon: Users, t: 'B2B Bulk Supply', d: 'Scalable capacity for large industrial orders' },
                { icon: Award, t: 'Trusted Network', d: 'Long-term partnerships with 500+ clients' },
              ].map((f) => (
                <div key={f.t} className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gold-50 text-gold-600 flex items-center justify-center shrink-0">
                    <f.icon size={18}/>
                  </div>
                  <div>
                    <div className="font-semibold text-navy-900">{f.t}</div>
                    <div className="text-sm text-navy-600 mt-0.5">{f.d}</div>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/about" className="btn-outline mt-8">
              Discover Our Story <ArrowRight size={15}/>
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="section bg-gradient-to-b from-white via-gold-50/30 to-white relative overflow-hidden">
        <GoldenWave className="top-0"/>
        <div className="container-px max-w-7xl mx-auto relative">
          <SectionHeading
            eyebrow="Our Premium Range"
            title="Featured Glass Beads Collection"
            subtitle="Discover our curated selection of premium glass beads engineered for quality, consistency and performance."
          />
          {products.length === 0 ? (
            <div className="text-center text-navy-500 py-10">Loading products...</div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
              {products.slice(0, 8).map((p, i) => <ProductCard key={p._id} product={p} index={i} onInquire={openInquiry}/>)}
            </div>
          )}
          <div className="text-center mt-12">
            <Link to="/products" className="btn-navy"> Browse All Products <ArrowRight size={16}/></Link>
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="section bg-navy-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 20% 20%, #c9a227 0%, transparent 35%), radial-gradient(circle at 80% 80%, #c9a227 0%, transparent 35%)'
        }}/>
        <div className="container-px max-w-7xl mx-auto relative">
          <SectionHeading
            light
            eyebrow="Industries We Serve"
            title="Powering Diverse B2B Sectors"
            subtitle="Our glass beads serve mission-critical applications across multiple industries with consistent quality."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {INDUSTRIES.map((ind, i) => {
              const Icon = iconMap[ind.icon] || Sparkles;
              return (
                <motion.div
                  key={ind.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="glass rounded-2xl p-6 text-center group hover:bg-white/15 transition-all"
                >
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-gold-gradient flex items-center justify-center shadow-gold-soft group-hover:scale-110 transition-transform">
                    <Icon size={24}/>
                  </div>
                  <h3 className="heading-display text-lg mt-4">{ind.name}</h3>
                  <p className="text-sm text-white/70 mt-2 leading-relaxed">{ind.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="section relative">
        <div className="container-px max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="Why Choose Us"
            title="The WINNER ENTERPRISE Advantage"
            subtitle="Built on a foundation of trust, quality, and uncompromised service."
          />
          <div className="grid lg:grid-cols-3 gap-7">
            {[
              { icon: ShieldCheck, t: 'Uncompromised Quality', d: 'Every batch is tested for sphericity, refractive index and purity.' },
              { icon: Truck, t: 'Reliable Logistics', d: 'Pan-India delivery network with timely dispatch and tracking.' },
              { icon: Users, t: 'Dedicated B2B Support', d: '24/7 sales support, custom packaging and bulk pricing.' },
            ].map((f, i) => (
              <motion.div key={f.t}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="card-premium gold-border-glow p-8 text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gold-gradient flex items-center justify-center shadow-gold">
                  <f.icon size={28} className="text-white"/>
                </div>
                <h3 className="heading-display text-xl mt-5 text-navy-900">{f.t}</h3>
                <p className="text-navy-600 mt-3 leading-relaxed">{f.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section relative overflow-hidden">
        <div className="container-px max-w-7xl mx-auto">
          <div className="relative rounded-[2rem] bg-navy-gradient text-white p-10 sm:p-16 overflow-hidden">
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: 'radial-gradient(circle at 80% 50%, #c9a227 0%, transparent 50%)'
            }}/>
            <GoldenWave className="top-1/2"/>

            <div className="relative grid lg:grid-cols-[2fr_1fr] gap-8 items-center">
              <div>
                <div className="text-xs tracking-[0.3em] font-semibold uppercase text-gold-300 mb-3">Get In Touch</div>
                <h2 className="heading-display text-3xl sm:text-4xl lg:text-5xl leading-tight">
                  Ready for a <span className="gold-text">premium quotation?</span>
                </h2>
                <p className="mt-4 text-white/75 max-w-xl">
                  Connect with our specialists for bulk pricing, custom requirements and fast delivery.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <button onClick={() => setInquiryOpen(true)} className="btn-gold !py-3.5"><Send size={16}/> Request Quotation</button>
                <a href={`https://wa.me/${COMPANY.whatsapp}`} target="_blank" rel="noreferrer" className="btn-ghost-light !py-3.5">
                  <MessageCircle size={16}/> WhatsApp Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <InquiryModal open={inquiryOpen} onClose={() => setInquiryOpen(false)} product={activeProduct} type={activeProduct ? 'product' : 'quotation'}/>
    </>
  );
}
