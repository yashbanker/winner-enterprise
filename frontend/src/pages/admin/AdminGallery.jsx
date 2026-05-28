import { useEffect, useState } from 'react';
import { Upload, Trash2, X, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../utils/api';

const CATS = ['products', 'warehouse', 'packaging', 'team', 'other'];

export default function AdminGallery() {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title:'', caption:'', image:'', category:'products', order:0 });
  const [uploading, setUploading] = useState(false);

  const load = () => api.get('/gallery/admin').then(r => setItems(r.data));
  useEffect(()=>{ load(); }, []);

  const upload = async (e) => {
    const file = e.target.files?.[0]; if (!file) return;
    setUploading(true);
    try {
      const data = new FormData(); data.append('image', file);
      const { data: r } = await api.post('/upload/single', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      setForm((f) => ({ ...f, image: r.url }));
    } catch (err) { toast.error('Upload failed'); }
    finally { setUploading(false); }
  };

  const save = async (e) => {
    e.preventDefault();
    if (!form.image) return toast.error('Please upload an image');
    await api.post('/gallery', form);
    toast.success('Added'); setOpen(false); setForm({ title:'', caption:'', image:'', category:'products', order:0 }); load();
  };
  const del = async (i) => {
    if (!confirm('Delete this image?')) return;
    await api.delete(`/gallery/${i._id}`); toast.success('Deleted'); load();
  };

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <div><h1 className="heading-display text-3xl text-navy-900">Gallery</h1><p className="text-slate-600 text-sm">{items.length} items</p></div>
        <button onClick={()=>setOpen(true)} className="btn-gold"><Plus size={16}/> Add Image</button>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {items.map((g) => (
          <div key={g._id} className="bg-white border border-slate-100 rounded-2xl overflow-hidden group">
            <div className="aspect-square overflow-hidden"><img src={g.image} className="w-full h-full object-cover"/></div>
            <div className="p-3">
              <div className="text-xs uppercase tracking-widest text-gold-600 font-semibold">{g.category}</div>
              {g.title && <div className="font-semibold text-navy-900 text-sm mt-1 line-clamp-1">{g.title}</div>}
              <button onClick={()=>del(g)} className="mt-2 text-xs text-rose-600 flex items-center gap-1 hover:underline"><Trash2 size={12}/> Remove</button>
            </div>
          </div>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-navy-950/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={()=>setOpen(false)}>
          <div className="bg-white rounded-3xl w-full max-w-md" onClick={(e)=>e.stopPropagation()}>
            <div className="p-5 border-b flex justify-between items-center"><h2 className="heading-display text-lg">Add Gallery Image</h2><button onClick={()=>setOpen(false)}><X size={18}/></button></div>
            <form onSubmit={save} className="p-5 space-y-4">
              <div>
                <label className="label-field">Image</label>
                {form.image ? (
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-slate-200">
                    <img src={form.image} className="w-full h-full object-cover"/>
                    <button type="button" onClick={()=>setForm({...form,image:''})} className="absolute top-2 right-2 bg-white/90 p-1 rounded-full"><X size={14}/></button>
                  </div>
                ) : (
                  <label className="w-full aspect-video rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-500 cursor-pointer hover:border-gold-500 hover:text-gold-600">
                    <Upload size={24}/><span className="text-xs mt-2">{uploading?'Uploading...':'Click to upload'}</span>
                    <input type="file" accept="image/*" className="hidden" onChange={upload}/>
                  </label>
                )}
              </div>
              <div><label className="label-field">Title</label><input className="input-field" value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})}/></div>
              <div><label className="label-field">Caption</label><input className="input-field" value={form.caption} onChange={(e)=>setForm({...form,caption:e.target.value})}/></div>
              <div><label className="label-field">Category</label>
                <select className="input-field" value={form.category} onChange={(e)=>setForm({...form,category:e.target.value})}>
                  {CATS.map((c)=><option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="flex justify-end gap-3"><button type="button" onClick={()=>setOpen(false)} className="btn border border-slate-200">Cancel</button><button className="btn-gold">Add</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
