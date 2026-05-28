import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ChevronRight, Send, MessageCircle, Package, Palette, Ruler, ShieldCheck, Truck, Star } from 'lucide-react';
import InquiryModal from '../components/InquiryModal';
import api from '../utils/api';
import { COMPANY } from '../utils/constants';

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.get(`/products/${slug}`).then(async (r) => {
      setProduct(r.data);
      setActiveImg(0);
      if (r.data.category?._id) {
        const rel = await api.get(`/products?category=${r.data.category.slug}&limit=4`);
        setRelated(rel.data.items.filter((p) => p._id !== r.data._id).slice(0, 4));
      }
    }).finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-10 h-10 rounded-full border-4 border-gold-200 border-t-gold-500 animate-spin"/></div>;
  if (!product) return <div className="min-h-screen pt-32 text-center text-navy-500">Product not found</div>;

  const imgs = product.images?.length ? product.images : [product.primaryImage || '/assets/product-white.png'];
  const a = {
    in_stock: { c: 'badge-stock', t: 'In Stock' },
    limited: { c: 'badge-limited', t: 'Limited Stock' },
    on_order: { c: 'badge-limited', t: 'On Order' },
    out_of_stock: { c: 'badge-out', t: 'Out of Stock' },
  }[product.availability] || { c: 'badge-stock', t: 'In Stock' };

  return (
    <>
      <Helmet><title>{product.name} — WINNER ENTERPRISE</title></Helmet>

      <section className="pt-28 pb-10 bg-gradient-to-b from-navy-50 to-white">
        <div className="container-px max-w-7xl mx-auto">
          <div className="text-xs text-navy-500 flex items-center gap-1.5">
            <Link to="/" className="hover:text-gold-600">Home</Link><ChevronRight size={12}/>
            <Link to="/products" className="hover:text-gold-600">Products</Link><ChevronRight size={12}/>
            <span className="text-navy-700">{product.name}</span>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-px max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Gallery */}
          <div>
            <motion.div layoutId={`p-${product._id}`} className="aspect-square rounded-3xl overflow-hidden bg-navy-50 shadow-navy">
              <img src={imgs[activeImg]} alt={product.name} className="w-full h-full object-cover"/>
            </motion.div>
            {imgs.length > 1 && (
              <div className="grid grid-cols-5 gap-3 mt-4">
                {imgs.map((src, i) => (
                  <button key={i} onClick={() => setActiveImg(i)} className={`aspect-square rounded-xl overflow-hidden border-2 ${activeImg===i?'border-gold-500':'border-transparent'}`}>
                    <img src={src} className="w-full h-full object-cover"/>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs uppercase tracking-widest font-semibold text-gold-600">{product.category?.name}</span>
              <span className={a.c}>{a.t}</span>
              {product.isFeatured && <span className="badge bg-gold-gradient text-white border-0"><Star size={11} className="mr-1"/> Featured</span>}
            </div>
            <h1 className="heading-display text-3xl lg:text-4xl text-navy-900 leading-tight">{product.name}</h1>
            <div className="text-sm text-navy-500 mt-2">Product Code: <span className="font-semibold text-navy-800">{product.code}</span></div>

            {product.shortDescription && <p className="mt-5 text-navy-600 text-lg leading-relaxed">{product.shortDescription}</p>}

            <div className="mt-7 grid sm:grid-cols-2 gap-4">
              {[
                { icon: Palette, l: 'Color', v: product.color },
                { icon: Ruler, l: 'Size', v: product.size },
                { icon: Package, l: 'Packaging', v: product.packaging },
                { icon: ShieldCheck, l: 'MOQ', v: product.minOrderQty },
              ].filter((s) => s.v).map((s) => (
                <div key={s.l} className="card-premium p-4 flex gap-3 items-center">
                  <s.icon size={20} className="text-gold-500"/>
                  <div>
                    <div className="text-[11px] uppercase tracking-widest text-navy-500">{s.l}</div>
                    <div className="font-semibold text-navy-900">{s.v}</div>
                  </div>
                </div>
              ))}
            </div>

            {product.description && (
              <div className="mt-7">
                <h3 className="heading-display text-lg text-navy-900">Description</h3>
                <p className="mt-2 text-navy-600 leading-relaxed whitespace-pre-line">{product.description}</p>
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => setOpen(true)} className="btn-gold !px-7"><Send size={16}/> Request Quotation</button>
              <a href={`https://wa.me/${COMPANY.whatsapp}?text=Hello, I would like to inquire about ${product.name} (${product.code})`} target="_blank" rel="noreferrer" className="btn bg-emerald-500 hover:bg-emerald-600 text-white !px-7">
                <MessageCircle size={16}/> WhatsApp Inquiry
              </a>
            </div>

            <div className="mt-7 flex items-center gap-3 text-sm text-navy-600 p-4 rounded-xl bg-gold-50/50 border border-gold-200">
              <Truck size={18} className="text-gold-600"/>
              <span>Pan-India dispatch · Custom packaging available · Bulk pricing on request</span>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="section bg-gradient-to-b from-white to-gold-50/30">
          <div className="container-px max-w-7xl mx-auto">
            <h3 className="heading-display text-2xl lg:text-3xl text-navy-900 mb-8">Related Products</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-7">
              {related.map((p) => (
                <Link key={p._id} to={`/products/${p.slug}`} className="card-premium block">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={p.primaryImage || p.images?.[0]} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"/>
                  </div>
                  <div className="p-4">
                    <div className="text-xs uppercase tracking-widest text-gold-600 font-semibold">{p.category?.name}</div>
                    <div className="heading-display text-base text-navy-900 mt-1 line-clamp-2">{p.name}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <InquiryModal open={open} onClose={() => setOpen(false)} product={product}/>
    </>
  );
}
