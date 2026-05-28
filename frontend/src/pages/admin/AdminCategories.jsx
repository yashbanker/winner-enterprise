import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../utils/api';

export default function AdminCategories() {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name:'', description:'', icon:'', order:0 });
  const [editing, setEditing] = useState(null);

  const load = () => api.get('/categories').then(r => setItems(r.data));
  useEffect(()=>{ load(); }, []);

  const save = async (e) => {
    e.preventDefault();
    try {
      if (editing) await api.put(`/categories/${editing._id}`, form);
      else await api.post('/categories', form);
      toast.success('Saved'); setOpen(false); load();
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
  };
  const del = async (i) => {
    if (!confirm(`Delete ${i.name}?`)) return;
    try { await api.delete(`/categories/${i._id}`); toast.success('Deleted'); load(); }
    catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
  };

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <div><h1 className="heading-display text-3xl text-navy-900">Categories</h1><p className="text-slate-600 text-sm">Manage your product categories</p></div>
        <button onClick={()=>{setEditing(null);setForm({name:'',description:'',icon:'',order:0});setOpen(true);}} className="btn-gold"><Plus size={16}/> Add Category</button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((c) => (
          <div key={c._id} className="bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-gold-soft transition">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="heading-display text-lg text-navy-900">{c.name}</h3>
                <div className="text-xs text-slate-500 mt-1">{c.productCount || 0} products</div>
              </div>
              <div className="flex gap-1">
                <button onClick={()=>{setEditing(c);setForm(c);setOpen(true);}} className="p-2 text-navy-600 hover:bg-navy-50 rounded-lg"><Edit2 size={14}/></button>
                <button onClick={()=>del(c)} className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg"><Trash2 size={14}/></button>
              </div>
            </div>
            {c.description && <p className="text-sm text-slate-600 mt-3">{c.description}</p>}
          </div>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-navy-950/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={()=>setOpen(false)}>
          <div className="bg-white rounded-3xl w-full max-w-md" onClick={(e)=>e.stopPropagation()}>
            <div className="p-5 border-b flex justify-between items-center">
              <h2 className="heading-display text-lg text-navy-900">{editing?'Edit':'New'} Category</h2>
              <button onClick={()=>setOpen(false)}><X size={18}/></button>
            </div>
            <form onSubmit={save} className="p-5 space-y-4">
              <div><label className="label-field">Name *</label><input required className="input-field" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})}/></div>
              <div><label className="label-field">Description</label><textarea rows={3} className="input-field" value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})}/></div>
              <div><label className="label-field">Order</label><input type="number" className="input-field" value={form.order} onChange={(e)=>setForm({...form,order:Number(e.target.value)})}/></div>
              <div className="flex justify-end gap-3"><button type="button" onClick={()=>setOpen(false)} className="btn border border-slate-200">Cancel</button><button className="btn-gold">Save</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
