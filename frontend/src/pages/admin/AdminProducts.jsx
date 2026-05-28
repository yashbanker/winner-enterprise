import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Star, Upload, X, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../utils/api';

const empty = {
  name: '', code: '', category: '', color: '', size: '',
  description: '', shortDescription: '', images: [], primaryImage: '',
  availability: 'in_stock', minOrderQty: '', packaging: '',
  isFeatured: false, isActive: true,
};

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState('');
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    const [p, c] = await Promise.all([api.get('/products?limit=200'), api.get('/categories')]);
    setProducts(p.data.items);
    setCategories(c.data);
  };
  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm({...empty, category: categories[0]?._id || ''}); setOpen(true); };
  const openEdit = (p) => { setEditing(p); setForm({...p, category: p.category?._id || p.category}); setOpen(true); };

  const uploadImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const data = new FormData();
      data.append('image', file);
      const { data: res } = await api.post('/upload/single', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      setForm((f) => ({ ...f, images: [...(f.images||[]), res.url], primaryImage: f.primaryImage || res.url }));
      toast.success('Image uploaded');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed');
    } finally { setUploading(false); }
  };

  const removeImage = (url) => {
    setForm((f) => ({
      ...f,
      images: f.images.filter((i) => i !== url),
      primaryImage: f.primaryImage === url ? (f.images.find((i) => i !== url) || '') : f.primaryImage,
    }));
  };

  const save = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await api.put(`/products/${editing._id}`, form);
        toast.success('Product updated');
      } else {
        await api.post('/products', form);
        toast.success('Product created');
      }
      setOpen(false);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed');
    }
  };

  const del = async (p) => {
    if (!confirm(`Delete ${p.name}?`)) return;
    await api.delete(`/products/${p._id}`);
    toast.success('Deleted');
    load();
  };

  const toggleFeat = async (p) => {
    await api.patch(`/products/${p._id}/featured`);
    load();
  };

  const filtered = products.filter((p) =>
    !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="heading-display text-3xl text-navy-900">Products</h1>
          <p className="text-slate-600 text-sm">{products.length} total products</p>
        </div>
        <button onClick={openCreate} className="btn-gold"><Plus size={16}/> Add Product</button>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
        <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search products..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white"/>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-600">
            <tr><th className="px-4 py-3">Image</th><th className="px-4 py-3">Name</th><th className="px-4 py-3">Code</th><th className="px-4 py-3">Category</th><th className="px-4 py-3">Stock</th><th className="px-4 py-3">Featured</th><th className="px-4 py-3 text-right">Actions</th></tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p._id} className="border-t border-slate-100 hover:bg-slate-50">
                <td className="px-4 py-3"><img src={p.primaryImage || p.images?.[0]} className="w-12 h-12 rounded-lg object-cover"/></td>
                <td className="px-4 py-3 font-semibold text-navy-900">{p.name}</td>
                <td className="px-4 py-3 text-slate-600">{p.code}</td>
                <td className="px-4 py-3 text-slate-600">{p.category?.name || '-'}</td>
                <td className="px-4 py-3"><span className={`text-[10px] px-2 py-1 rounded-full font-semibold ${p.availability==='in_stock'?'bg-emerald-50 text-emerald-700':'bg-slate-100 text-slate-600'}`}>{p.availability.replace('_',' ')}</span></td>
                <td className="px-4 py-3"><button onClick={()=>toggleFeat(p)}><Star size={16} className={p.isFeatured?'text-gold-500 fill-gold-500':'text-slate-300'}/></button></td>
                <td className="px-4 py-3 text-right">
                  <button onClick={()=>openEdit(p)} className="p-2 text-navy-600 hover:bg-navy-50 rounded-lg"><Edit2 size={14}/></button>
                  <button onClick={()=>del(p)} className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg ml-1"><Trash2 size={14}/></button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan={7} className="text-center py-12 text-slate-400">No products</td></tr>}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 bg-navy-950/60 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto" onClick={()=>setOpen(false)}>
          <div className="bg-white rounded-3xl w-full max-w-3xl my-8" onClick={(e)=>e.stopPropagation()}>
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="heading-display text-xl text-navy-900">{editing ? 'Edit Product' : 'New Product'}</h2>
              <button onClick={()=>setOpen(false)} className="p-2 rounded-full hover:bg-slate-100"><X size={18}/></button>
            </div>
            <form onSubmit={save} className="p-6 grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2"><label className="label-field">Product Name *</label><input required className="input-field" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})}/></div>
              <div><label className="label-field">Code *</label><input required className="input-field" value={form.code} onChange={(e)=>setForm({...form,code:e.target.value.toUpperCase()})}/></div>
              <div><label className="label-field">Category *</label>
                <select required className="input-field" value={form.category} onChange={(e)=>setForm({...form,category:e.target.value})}>
                  <option value="">Select category</option>
                  {categories.map((c)=><option key={c._id} value={c._id}>{c.name}</option>)}
                </select>
              </div>
              <div><label className="label-field">Color *</label><input required className="input-field" value={form.color} onChange={(e)=>setForm({...form,color:e.target.value})}/></div>
              <div><label className="label-field">Size</label><input className="input-field" value={form.size} placeholder="e.g. 0.3 - 0.6 mm" onChange={(e)=>setForm({...form,size:e.target.value})}/></div>
              <div><label className="label-field">Packaging</label><input className="input-field" value={form.packaging} placeholder="e.g. 25 kg HDPE bags" onChange={(e)=>setForm({...form,packaging:e.target.value})}/></div>
              <div><label className="label-field">Min Order Qty</label><input className="input-field" value={form.minOrderQty} placeholder="e.g. 500 kg" onChange={(e)=>setForm({...form,minOrderQty:e.target.value})}/></div>
              <div><label className="label-field">Availability</label>
                <select className="input-field" value={form.availability} onChange={(e)=>setForm({...form,availability:e.target.value})}>
                  <option value="in_stock">In Stock</option><option value="limited">Limited</option><option value="on_order">On Order</option><option value="out_of_stock">Out of Stock</option>
                </select>
              </div>
              <div className="sm:col-span-2"><label className="label-field">Short Description</label><input className="input-field" value={form.shortDescription} onChange={(e)=>setForm({...form,shortDescription:e.target.value})}/></div>
              <div className="sm:col-span-2"><label className="label-field">Description</label><textarea rows={4} className="input-field" value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})}/></div>

              <div className="sm:col-span-2">
                <label className="label-field">Product Images</label>
                <div className="flex flex-wrap gap-3 mb-3">
                  {(form.images||[]).map((url) => (
                    <div key={url} className={`relative w-24 h-24 rounded-xl overflow-hidden border-2 ${form.primaryImage===url?'border-gold-500':'border-slate-200'}`}>
                      <img src={url} className="w-full h-full object-cover cursor-pointer" onClick={()=>setForm({...form,primaryImage:url})}/>
                      <button type="button" onClick={()=>removeImage(url)} className="absolute top-1 right-1 bg-white/90 rounded-full p-0.5 hover:bg-rose-500 hover:text-white"><X size={12}/></button>
                    </div>
                  ))}
                  <label className="w-24 h-24 rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-500 cursor-pointer hover:border-gold-500 hover:text-gold-600">
                    <Upload size={20}/><span className="text-[10px] mt-1">{uploading?'Uploading':'Upload'}</span>
                    <input type="file" accept="image/*" className="hidden" onChange={uploadImage}/>
                  </label>
                </div>
                <p className="text-xs text-slate-500">Click an image to set as primary. JPG/PNG/WEBP up to 8MB.</p>
              </div>

              <div className="flex items-center gap-4 sm:col-span-2">
                <label className="flex items-center gap-2 text-sm font-medium"><input type="checkbox" checked={form.isFeatured} onChange={(e)=>setForm({...form,isFeatured:e.target.checked})}/> Featured</label>
                <label className="flex items-center gap-2 text-sm font-medium"><input type="checkbox" checked={form.isActive} onChange={(e)=>setForm({...form,isActive:e.target.checked})}/> Active</label>
              </div>

              <div className="sm:col-span-2 flex justify-end gap-3 pt-2 border-t border-slate-100">
                <button type="button" onClick={()=>setOpen(false)} className="btn border border-slate-200 text-slate-700">Cancel</button>
                <button className="btn-gold">{editing ? 'Update' : 'Create'} Product</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
