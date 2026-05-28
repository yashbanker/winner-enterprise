import { useEffect, useState } from 'react';
import { Upload, Trash2, Edit2, X, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../utils/api';

const initForm = { title:'', subtitle:'', image:'', ctaText:'', ctaLink:'', order:0, isActive:true };

export default function AdminBanners() {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(initForm);
  const [uploading, setUploading] = useState(false);

  const load = () => api.get('/banners/admin').then(r => setItems(r.data));
  useEffect(()=>{ load(); }, []);

  const upload = async (e) => {
    const file = e.target.files?.[0]; if (!file) return;
    setUploading(true);
    try {
      const data = new FormData(); data.append('image', file);
      const { data: r } = await api.post('/upload/single', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      setForm((f) => ({ ...f, image: r.url }));
    } catch { toast.error('Upload failed'); }
    finally { setUploading(false); }
  };

  const save = async (e) => {
    e.preventDefault();
    if (!form.image) return toast.error('Upload an image');
    if (editing) await api.put(`/banners/${editing._id}`, form);
    else await api.post('/banners', form);
    toast.success('Saved'); setOpen(false); setForm(initForm); setEditing(null); load();
  };
  const del = async (i) => { if (!confirm('Delete?')) return; await api.delete(`/banners/${i._id}`); toast.success('Deleted'); load(); };

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <div><h1 className="heading-display text-3xl text-navy-900">Hero Banners</h1><p className="text-slate-600 text-sm">{items.length} banners</p></div>
        <button onClick={()=>{setEditing(null);setForm(initForm);setOpen(true);}} className="btn-gold"><Plus size={16}/> Add Banner</button>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {items.map((b) => (
          <div key={b._id} className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
            <div className="aspect-[16/7] overflow-hidden bg-navy-50"><img src={b.image} className="w-full h-full object-cover"/></div>
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <h3 className="heading-display text-lg text-navy-900 line-clamp-1">{b.title}</h3>
                  {b.subtitle && <p className="text-sm text-slate-600 mt-1 line-clamp-2">{b.subtitle}</p>}
                </div>
                <div className="flex gap-1 ml-3">
                  <button onClick={()=>{setEditing(b);setForm(b);setOpen(true);}} className="p-2 text-navy-600 hover:bg-navy-50 rounded-lg"><Edit2 size={14}/></button>
                  <button onClick={()=>del(b)} className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg"><Trash2 size={14}/></button>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <span className={`badge ${b.isActive?'badge-stock':'bg-slate-100 text-slate-600 border-slate-200'}`}>{b.isActive?'Active':'Inactive'}</span>
                <span className="badge bg-slate-100 text-slate-600 border-slate-200">Order: {b.order}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-navy-950/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={()=>setOpen(false)}>
          <div className="bg-white rounded-3xl w-full max-w-lg" onClick={(e)=>e.stopPropagation()}>
            <div className="p-5 border-b flex justify-between items-center"><h2 className="heading-display text-lg">{editing?'Edit':'New'} Banner</h2><button onClick={()=>setOpen(false)}><X size={18}/></button></div>
            <form onSubmit={save} className="p-5 space-y-4 max-h-[70vh] overflow-y-auto scroll-thin">
              <div>
                <label className="label-field">Image *</label>
                {form.image ? (
                  <div className="relative w-full aspect-[16/7] rounded-xl overflow-hidden">
                    <img src={form.image} className="w-full h-full object-cover"/>
                    <button type="button" onClick={()=>setForm({...form,image:''})} className="absolute top-2 right-2 bg-white/90 p-1 rounded-full"><X size={14}/></button>
                  </div>
                ) : (
                  <label className="w-full aspect-[16/7] rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-500 cursor-pointer hover:border-gold-500">
                    <Upload size={24}/><span className="text-xs mt-2">{uploading?'Uploading...':'Click to upload'}</span>
                    <input type="file" accept="image/*" className="hidden" onChange={upload}/>
                  </label>
                )}
              </div>
              <div><label className="label-field">Title *</label><input required className="input-field" value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})}/></div>
              <div><label className="label-field">Subtitle</label><textarea rows={2} className="input-field" value={form.subtitle} onChange={(e)=>setForm({...form,subtitle:e.target.value})}/></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="label-field">CTA Text</label><input className="input-field" value={form.ctaText} onChange={(e)=>setForm({...form,ctaText:e.target.value})}/></div>
                <div><label className="label-field">CTA Link</label><input className="input-field" value={form.ctaLink} onChange={(e)=>setForm({...form,ctaLink:e.target.value})}/></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="label-field">Order</label><input type="number" className="input-field" value={form.order} onChange={(e)=>setForm({...form,order:Number(e.target.value)})}/></div>
                <label className="flex items-end gap-2 pb-3"><input type="checkbox" checked={form.isActive} onChange={(e)=>setForm({...form,isActive:e.target.checked})}/> Active</label>
              </div>
              <div className="flex justify-end gap-3 pt-2 border-t"><button type="button" onClick={()=>setOpen(false)} className="btn border border-slate-200">Cancel</button><button className="btn-gold">Save</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
