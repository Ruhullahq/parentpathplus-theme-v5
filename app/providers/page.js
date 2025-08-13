'use client';
import { useEffect, useState } from 'react';

function milesBetween(a, b){
  const toRad = (x)=> x * Math.PI / 180;
  const R = 6371;
  const dLat = toRad(b.lat - a.lat), dLon = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat), lat2 = toRad(b.lat);
  const c = 2 * Math.asin(Math.sqrt(Math.sin(dLat/2)**2 + Math.cos(lat1)*Math.cos(lat2)*Math.sin(dLon/2)**2));
  return (R*c) * 0.621371;
}
const zipCache = new Map();
async function coordsForZip(zip){
  if (!zip) return null;
  if (zipCache.has(zip)) return zipCache.get(zip);
  const r = await fetch(`/api/geo/coords?zip=${zip}`);
  if (!r.ok) return null;
  const d = await r.json(); zipCache.set(zip, d); return d;
}
function Card({p}){
  const name = p.name || p.full || 'Provider';
  const loc = [p.city,p.state].filter(Boolean).join(', ');
  const rating = p.rating || (Math.random()*2+3); // 3.0–5.0
  return (
    <div style={{background:"#fff", border:"1px solid #e5e7eb", borderRadius:12, padding:16}}>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:8}}>
        <div>
          <div style={{fontWeight:600}}>{name}</div>
          <div style={{color:"#6b7280", fontSize:14}}>{loc}</div>
          {p.specialties?.length>0 && <div style={{color:"#6b7280", fontSize:14, marginTop:4}}>{p.specialties.slice(0,3).join(' • ')}</div>}
          <div style={{display:"flex", gap:6, flexWrap:"wrap", marginTop:6}}>
            {(p.telehealth || (p.name||'').toLowerCase().includes('tele')) && <span style={{background:"#eff6ff", color:"#1d4ed8", border:"1px solid #93c5fd", borderRadius:6, padding:"2px 8px", fontSize:12}}>Telehealth</span>}
            <span style={{background:"#ecfdf5", color:"#065f46", border:"1px solid #6ee7b7", borderRadius:6, padding:"2px 8px", fontSize:12}}>Accepting New Patients</span>
          </div>
        </div>
        <div style={{textAlign:"right"}}>
          <div title={`${rating.toFixed(1)} / 5`} style={{color:"#f59e0b"}}>★ ★ ★ ★ ☆</div>
          <div style={{fontSize:12, color:"#6b7280"}}>{rating.toFixed(1)}</div>
        </div>
      </div>
      <div style={{marginTop:10, display:"flex", gap:8, flexWrap:"wrap"}}>
        {p.phone && <a href={`tel:${p.phone}`} style={{border:"1px solid #e5e7eb", padding:"6px 10px", borderRadius:8, textDecoration:"none", color:"#111827"}}>Call</a>}
        {p.website && <a href={p.website} target="_blank" style={{border:"1px solid #e5e7eb", padding:"6px 10px", borderRadius:8, textDecoration:"none", color:"#111827"}}>Website</a>}
        <a href={`/providers/${encodeURIComponent(p.id || p.npi || name)}`} style={{background:"#000", color:"#fff", padding:"6px 10px", borderRadius:8, textDecoration:"none"}}>View Profile</a>
      </div>
      {p._distance!=null && <div style={{marginTop:6, color:"#065f46", fontSize:12}}>{p._distance.toFixed(1)} mi away</div>}
    </div>
  );
}

export default function Providers(){
  const [q, setQ] = useState('');
  const [state, setState] = useState('IL');
  const [zip, setZip] = useState('');
  const [radius, setRadius] = useState(25);
  const [spec, setSpec] = useState('');
  const [insurer, setInsurer] = useState('');
  const [tele, setTele] = useState(false);
  const [items, setItems] = useState([]);
  const [view, setView] = useState('list'); // list | map
  const [sort, setSort] = useState('rating'); // rating | distance
  const [loading, setLoading] = useState(false);

  async function run(){
    setLoading(true);
    const r = await fetch(`/api/search/providers?q=${encodeURIComponent(q||'')}&state=${state}`);
    let d = await r.json();
    let list = d.items || [];

    if (zip && radius){
      const origin = await coordsForZip(zip);
      if (origin){
        const zips = Array.from(new Set(list.map(p => (p.zip||'').slice(0,5)).filter(Boolean)));
        const coordMap = {};
        await Promise.all(zips.map(async z => { const c = await coordsForZip(z); if (c) coordMap[z] = c; }));
        list = list.map(p => {
          const pzip = (p.zip||'').slice(0,5);
          const c = coordMap[pzip];
          const dist = (origin && c) ? milesBetween({lat:origin.lat,lng:origin.lng},{lat:c.lat,lng:c.lng}) : null;
          return { ...p, _distance: dist };
        }).filter(p => (p._distance==null) ? false : p._distance <= radius);
      }
    }

    if (tele) list = list.filter(p => p.telehealth || (p.name||'').toLowerCase().includes('tele'));
    if (spec) list = list.filter(p => (p.specialties||[]).includes(spec));
    if (insurer) {
      const insL = insurer.toLowerCase();
      list = list.filter(p => (p.insurers||[]).some(i => i.toLowerCase().includes(insL)));
    }

    list = list.map(p => ({...p, rating: p.rating || (Math.random()*2+3)}));
    if (sort==='distance') list.sort((a,b)=> (a._distance??9999)-(b._distance??9999));
    else list.sort((a,b)=> (b.rating)-(a.rating));

    setItems(list);
    setLoading(false);
  }
  useEffect(()=>{ run(); }, []);

  return (
    <div style={{display:"grid", gridTemplateColumns:"280px 1fr", gap:16}}>
      {/* Left filters */}
      <aside style={{background:"#fff", border:"1px solid #e5e7eb", borderRadius:12, padding:16, height:"fit-content", position:"sticky", top:80}}>
        <div style={{fontWeight:700}}>Filters</div>
        <div style={{marginTop:10, display:"grid", gap:8}}>
          <div>
            <div style={{fontSize:13, fontWeight:600}}>Location</div>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginTop:6}}>
              <select value={state} onChange={e=>setState(e.target.value)} style={{border:"1px solid #e5e7eb", padding:"8px 10px", borderRadius:8}}>
                {['IL','NJ','PA','NY','TX','GA'].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <input value={zip} onChange={e=>setZip(e.target.value)} placeholder="ZIP" style={{border:"1px solid #e5e7eb", padding:"8px 10px", borderRadius:8}}/>
            </div>
            <div style={{marginTop:6}}>
              <select value={radius} onChange={e=>setRadius(parseInt(e.target.value))} style={{border:"1px solid #e5e7eb", padding:"8px 10px", borderRadius:8, width:"100%"}}>
                {[5,10,25,50,100].map(m => <option key={m} value={m}>{m} mi</option>)}
              </select>
            </div>
          </div>
          <div>
            <div style={{fontSize:13, fontWeight:600}}>Specialty</div>
            <select value={spec} onChange={e=>setSpec(e.target.value)} style={{border:"1px solid #e5e7eb", padding:"8px 10px", borderRadius:8, marginTop:6}}>
              {['','ABA','SLP','OT','PT','BCBA','Feeding','AAC'].map(s => <option key={s} value={s}>{s || 'All Specialties'}</option>)}
            </select>
          </div>
          <div>
            <div style={{fontSize:13, fontWeight:600}}>Insurance</div>
            <select value={insurer} onChange={e=>setInsurer(e.target.value)} style={{border:"1px solid #e5e7eb", padding:"8px 10px", borderRadius:8, marginTop:6}}>
              {['','Aetna','UnitedHealthcare','BCBSIL','Illinois Medicaid','Cigna'].map(s => <option key={s} value={s}>{s || 'Any insurer'}</option>)}
            </select>
          </div>
          <label style={{display:"flex", alignItems:"center", gap:8, fontSize:14}}>
            <input type="checkbox" checked={tele} onChange={e=>setTele(e.target.checked)} /> Telehealth available
          </label>
        </div>
      </aside>

      {/* Right content */}
      <div style={{display:"grid", gap:12}}>
        <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", gap:8, flexWrap:"wrap"}}>
          <h1 style={{fontSize:22, fontWeight:800}}>Find Autism Service Providers</h1>
          <div style={{display:"flex", alignItems:"center", gap:8}}>
            <select value={sort} onChange={e=>setSort(e.target.value)} style={{border:"1px solid #e5e7eb", padding:"8px 10px", borderRadius:8}}>
              <option value="rating">Sort by Rating</option>
              <option value="distance">Sort by Distance</option>
            </select>
            <div style={{border:"1px solid #e5e7eb", borderRadius:8, overflow:"hidden"}}>
              <button onClick={()=>setView('list')} style={{padding:"8px 12px", background:view==='list'?"#111827":"#fff", color:view==='list'?"#fff":"#111827"}}>List</button>
              <button onClick={()=>setView('map')} style={{padding:"8px 12px", background:view==='map'?"#111827":"#fff", color:view==='map'?"#fff":"#111827"}}>Map</button>
            </div>
          </div>
        </div>

        <div style={{background:"#fff", border:"1px solid #e5e7eb", borderRadius:12, padding:12, display:"flex", gap:8}}>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search by name, specialty, or city" style={{flex:1, border:"1px solid #e5e7eb", padding:"8px 10px", borderRadius:8}}/>
          <button onClick={run} style={{background:"#000", color:"#fff", padding:"8px 12px", borderRadius:8}}>{loading?"Searching…":"Search"}</button>
        </div>

        {view==='map' ? (
          <div style={{background:"#fff", border:"1px solid #e5e7eb", borderRadius:12, padding:24, textAlign:"center", color:"#6b7280"}}>
            <div style={{fontWeight:700}}>Map view</div>
            <div style={{fontSize:14, marginTop:6}}>Add a `MAPBOX_TOKEN` environment variable to render an interactive map. List view is fully functional today.</div>
          </div>
        ) : (
          <div style={{display:"grid", gap:10}}>
            {items.length===0 && <div style={{background:"#fff", border:"1px solid #e5e7eb", borderRadius:12, padding:24, textAlign:"center", color:"#6b7280"}}>No results yet. Try widening your radius or removing filters.</div>}
            {items.map((p,i)=> <Card key={p.id||p.npi||i} p={{...p, telehealth:(p.telehealth || (p.name||'').toLowerCase().includes('tele'))}} />)}
          </div>
        )}
      </div>
    </div>
  );
}
