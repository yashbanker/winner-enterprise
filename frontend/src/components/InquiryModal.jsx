import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../utils/api';

export default function InquiryModal({ open, onClose, product, type = 'product' }) {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '', country: 'India',
    quantity: '', message: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && product) {
      setForm((f) => ({ ...f, message: `I would like to inquire about: ${product.name} (${product.code}).\n\n` }));
    }
  }, [open, product]);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/inquiries', {
        ...form,
        type,
        product: product?._id,
      });
      toast.success('Inquiry sent! We will contact you shortly.');
      onClose();
      setForm({ name: '', email: '', phone: '', company: '', country: 'India', quantity: '', message: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send inquiry');
    } finally { setLoading(false); }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm"
          onClick={onClose}>
          <motion.div
            initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-gold-200 overflow-hidden"
          >
            <div className="p-6 border-b border-gold-100 bg-gradient-to-r from-navy-50 to-gold-50/30">
              <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-navy-100">
                <X size={18}/>
              </button>
              <div className="text-xs tracking-widest text-gold-600 font-semibold mb-1">QUICK INQUIRY</div>
              <h3 className="heading-display text-xl text-navy-900">
                {product ? `Inquire about ${product.name}` : 'Send us your inquiry'}
              </h3>
              {product && <div className="text-xs text-navy-600 mt-1">Code: {product.code}</div>}
            </div>

            <form onSubmit={submit} className="p-6 grid sm:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto scroll-thin">
              <div>
                <label className="label-field">Full Name *</label>
                <input required className="input-field" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})}/>
              </div>
              <div>
                <label className="label-field">Email *</label>
                <input required type="email" className="input-field" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})}/>
              </div>
              <div>
                <label className="label-field">Phone *</label>
                <input required className="input-field" value={form.phone} onChange={(e)=>setForm({...form,phone:e.target.value})}/>
              </div>
              <div>
                <label className="label-field">Company</label>
                <input className="input-field" value={form.company} onChange={(e)=>setForm({...form,company:e.target.value})}/>
              </div>
              <div>
                <label className="label-field">Country</label>
                <input className="input-field" value={form.country} onChange={(e)=>setForm({...form,country:e.target.value})}/>
              </div>
              <div>
                <label className="label-field">Quantity Needed</label>
                <input className="input-field" placeholder="e.g. 1000 kg" value={form.quantity} onChange={(e)=>setForm({...form,quantity:e.target.value})}/>
              </div>
              <div className="sm:col-span-2">
                <label className="label-field">Message *</label>
                <textarea required rows={4} className="input-field" value={form.message} onChange={(e)=>setForm({...form,message:e.target.value})}/>
              </div>
              <div className="sm:col-span-2 flex justify-end gap-3 mt-2">
                <button type="button" onClick={onClose} className="btn border border-navy-200 text-navy-700 hover:bg-navy-50">Cancel</button>
                <button disabled={loading} className="btn-gold">
                  <Send size={15}/> {loading ? 'Sending...' : 'Send Inquiry'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
