'use client';
import { useState } from 'react';

export default function Profile(){
  const [tab, setTab] = useState('personal');
  return (
    <div style={{display:"grid", gridTemplateColumns:"280px 1fr", gap:16}}>
      <aside style={{background:"#fff", border:"1px solid #e5e7eb", borderRadius:12, padding:16}}>
        <div style={{width:64, height:64, borderRadius:999, background:"#e5e7eb", display:"flex", alignItems:"center", justifyContent:"center"}}>RM</div>
        <div style={{fontWeight:700, marginTop:8}}>Ruhullah Quadri Mohammed</div>
        <div style={{fontSize:12, color:"#6b7280"}}>Parent</div>
        <div style={{marginTop:10}}>
          <div style={{fontSize:12, color:"#6b7280"}}>Profile Completion</div>
          <div style={{height:8, background:"#e5e7eb", borderRadius:999, overflow:"hidden", marginTop:4}}>
            <div style={{height:8, width:"75%", background:"#2563eb"}} />
          </div>
        </div>
      </aside>
      <section style={{background:"#fff", border:"1px solid #e5e7eb", borderRadius:12, padding:16}}>
        <h1 style={{fontSize:22, fontWeight:800}}>My Profile</h1>
        <div style={{marginTop:12, display:"flex", gap:8}}>
          {['personal','children','preferences'].map(t => (
            <button key={t} onClick={()=>setTab(t)}
              style={{padding:"8px 12px", borderRadius:8, background: tab===t?"#111827":"#fff", color: tab===t?"#fff":"#111827"}}>
              {t==='personal'?'Personal Info':t==='children'?'Children':'Preferences'}
            </button>
          ))}
        </div>
        <div style={{marginTop:12, display:"grid", gap:8}}>
          {tab==='personal' && (
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:8}}>
              <input placeholder="First Name" defaultValue="Ruhullah" style={{border:"1px solid #e5e7eb", padding:"10px 12px", borderRadius:8}}/>
              <input placeholder="Last Name" defaultValue="Mohammed" style={{border:"1px solid #e5e7eb", padding:"10px 12px", borderRadius:8}}/>
              <input placeholder="Email" style={{gridColumn:"1 / span 2", border:"1px solid #e5e7eb", padding:"10px 12px", borderRadius:8}}/>
              <input placeholder="Address" style={{gridColumn:"1 / span 2", border:"1px solid #e5e7eb", padding:"10px 12px", borderRadius:8}}/>
              <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, gridColumn:"1 / span 2"}}>
                <input placeholder="City" style={{border:"1px solid #e5e7eb", padding:"10px 12px", borderRadius:8}}/>
                <select style={{border:"1px solid #e5e7eb", padding:"10px 12px", borderRadius:8}}><option>IL</option></select>
                <input placeholder="ZIP" style={{border:"1px solid #e5e7eb", padding:"10px 12px", borderRadius:8}}/>
              </div>
              <textarea rows={4} placeholder="Bio" style={{gridColumn:"1 / span 2", border:"1px solid #e5e7eb", padding:"10px 12px", borderRadius:8}}/>
              <button style={{gridColumn:"1 / span 2", background:"#000", color:"#fff", padding:"10px 14px", borderRadius:8, width:160}}>Save Changes</button>
            </div>
          )}
          {tab==='children' && <div style={{fontSize:14, color:"#6b7280"}}>Add child profiles with ages and preferences (demo).</div>}
          {tab==='preferences' && <div style={{fontSize:14, color:"#6b7280"}}>Language, appointment times, and distance preferences (demo).</div>}
        </div>
      </section>
    </div>
  );
}
