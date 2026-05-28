import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send, Star, Package } from 'lucide-react';

const availabilityBadge = (a) => {
  if (a === 'in_stock') return { cls: 'badge-stock', txt: 'In Stock' };
  if (a === 'limited') return { cls: 'badge-limited', txt: 'Limited' };
  if (a === 'on_order') return { cls: 'badge-limited', txt: 'On Order' };
  return { cls: 'badge-out', txt: 'Out of Stock' };
};

export default function ProductCard({ product, onInquire, index = 0 }) {
  const a = availabilityBadge(product.availability);
  const img = product.primaryImage || product.images?.[0] || '/assets/product-white.png';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group card-premium gold-border-glow"
    >
      {/* Image */}
      <Link to={`/products/${product.slug || product._id}`} className="block relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-navy-50 to-gold-50">
        <img src={img} alt={product.name} className="w-full h-full object-cover product-img-zoom" loading="lazy"/>
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={a.cls}>{a.txt}</span>
          {product.isFeatured && (
            <span className="badge bg-gold-gradient text-white border-0">
              <Star size={11} className="mr-1"/> Featured
            </span>
          )}
        </div>
      </Link>

      {/* Body */}
      <div className="p-5">
        <div className="text-xs tracking-widest font-semibold text-gold-600 uppercase mb-1.5">
          {product.category?.name || 'Glass Beads'}
        </div>
        <Link to={`/products/${product.slug || product._id}`}>
          <h3 className="heading-display text-lg text-navy-900 leading-snug line-clamp-2 group-hover:text-gold-700 transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="mt-2 flex items-center gap-3 text-xs text-navy-600">
          <span className="font-medium">{product.code}</span>
          {product.size && <><span>•</span><span>{product.size}</span></>}
        </div>
        {product.shortDescription && (
          <p className="text-sm text-navy-600 mt-3 line-clamp-2">{product.shortDescription}</p>
        )}

        <div className="flex items-center justify-between mt-5 pt-4 border-t border-gold-100">
          <div className="text-xs text-navy-500 flex items-center gap-1.5">
            <Package size={13} className="text-gold-500"/>
            <span>{product.minOrderQty || 'MOQ on request'}</span>
          </div>
          <button
            onClick={() => onInquire?.(product)}
            className="btn-gold !py-2 !px-4 !text-xs"
          >
            <Send size={13}/> Inquire
          </button>
        </div>
      </div>
    </motion.div>
  );
}
