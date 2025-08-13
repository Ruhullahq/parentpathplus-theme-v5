'use client';
import { useState } from 'react';

export default function Insurance(){
  const [tab, setTab] = useState('coverage');
  return (
    <div style={{display:"grid", gap:12}}>
      <h1 style={{fontSize:22, fontWeight:800}}>Insurance Help Center</h1>
      <div style={{background:"#fff", border:"1px solid #e5e7eb", borderRadius:12, padding:6, display:"inline-flex", gap:6}}>
        {['coverage','preauth','faq'].map(t => (
          <button key={t} onClick={()=>setTab(t)}
            style={{padding:"8px 12px", borderRadius:8, background: tab===t?"#111827":"#fff", color: tab===t?"#fff":"#111827"}}>
            {t==='coverage'?'Coverage Guides':t==='preauth'?'Pre-Authorization Help':'FAQ & Terms'}
          </button>
        ))}
      </div>

      {tab==='coverage' && (
        <section style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:12}}>
          <div style={{background:"#fff", border:"1px solid #e5e7eb", borderRadius:12, padding:16}}>
            <div style={{fontWeight:700}}>Insurance Coverage Search</div>
            <input placeholder="Enter insurance provider" style={{marginTop:8, border:"1px solid #e5e7eb", padding:"8px 10px", borderRadius:8, width:"100%"}} />
            <button style={{marginTop:10, background:"#000", color:"#fff", padding:"8px 12px", borderRadius:8}}>View Coverage Details</button>
          </div>
          <div style={{background:"#fff", border:"1px solid #e5e7eb", borderRadius:12, padding:16}}>
            <div style={{fontWeight:700}}>Need Help?</div>
            <div style={{fontSize:14, color:"#4b5563", marginTop:6}}>Our insurance specialists can help you navigate benefits.</div>
            <a href="/concierge" style={{marginTop:10, display:"inline-block", border:"1px solid #e5e7eb", padding:"8px 12px", borderRadius:8, textDecoration:"none", color:"#111827"}}>Schedule a Consultation</a>
          </div>
        </section>
      )}

      {tab==='preauth' && (
        <section style={{background:"#fff", border:"1px solid #e5e7eb", borderRadius:12, padding:16}}>
          <div style={{fontWeight:700}}>Pre-Authorization Support</div>
          <div style={{fontSize:14, color:"#4b5563", marginTop:6}}>We’ll help complete forms, gather documentation, and submit to your insurer.</div>
          <a href="/preauth" style={{marginTop:10, display:"inline-block", background:"#000", color:"#fff", padding:"8px 12px", borderRadius:8, textDecoration:"none"}}>Request Pre-Auth Support</a>
        </section>
      )}

      {tab==='faq' && (
        <section style={{background:"#fff", border:"1px solid #e5e7eb", borderRadius:12, padding:16}}>
          <div style={{fontWeight:700}}>FAQ & Terms</div>
          <div style={{fontSize:14, color:"#4b5563", marginTop:6}}>General guidance; always verify with your specific plan.</div>
        </section>
      )}
    </div>
  );
}
