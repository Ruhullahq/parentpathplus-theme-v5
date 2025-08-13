export default function ProviderProfile({ params }){
  const id = decodeURIComponent(params.id || '');
  return (
    <div style={{display:"grid", gridTemplateColumns:"1fr 300px", gap:16}}>
      <section style={{background:"#fff", border:"1px solid #e5e7eb", borderRadius:12, padding:16}}>
        <h1 style={{fontSize:22, fontWeight:800}}>Provider Profile</h1>
        <div style={{fontSize:14, color:"#6b7280", marginTop:4}}>ID: {id}</div>
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginTop:16}}>
          <div>
            <div style={{fontWeight:700}}>Overview</div>
            <div style={{fontSize:14, color:"#4b5563", marginTop:4}}>Specialties, ages served, languages, and treatment approaches.</div>
            <div style={{display:"flex", gap:6, marginTop:8, flexWrap:"wrap"}}>
              <span style={{background:"#eff6ff", color:"#1d4ed8", border:"1px solid #93c5fd", borderRadius:6, padding:"2px 8px", fontSize:12}}>Telehealth</span>
              <span style={{background:"#ecfdf5", color:"#065f46", border:"1px solid #6ee7b7", borderRadius:6, padding:"2px 8px", fontSize:12}}>Accepting New Patients</span>
            </div>
          </div>
          <div>
            <div style={{fontWeight:700}}>Accepted Insurance</div>
            <ul style={{fontSize:14, color:"#4b5563", marginTop:6, paddingLeft:18}}>
              <li>Aetna</li><li>BCBSIL</li><li>UnitedHealthcare</li>
            </ul>
          </div>
        </div>
        <div style={{marginTop:16, display:"flex", gap:8}}>
          <a href="tel:+18005550123" style={{border:"1px solid #e5e7eb", padding:"8px 12px", borderRadius:8, textDecoration:"none", color:"#111827"}}>Call</a>
          <a href="/concierge" style={{background:"#000", color:"#fff", padding:"8px 12px", borderRadius:8, textDecoration:"none"}}>Request Concierge</a>
        </div>
      </section>
      <aside style={{background:"#fff", border:"1px solid #e5e7eb", borderRadius:12, padding:16}}>
        <div style={{fontWeight:700}}>Hours</div>
        <div style={{fontSize:14, color:"#4b5563", marginTop:4}}>Mon–Fri 9am–5pm</div>
        <div style={{fontWeight:700, marginTop:12}}>Ages Served</div>
        <div style={{fontSize:14, color:"#4b5563", marginTop:4}}>2–18</div>
        <div style={{fontWeight:700, marginTop:12}}>Languages</div>
        <div style={{fontSize:14, color:"#4b5563", marginTop:4}}>English, Spanish</div>
      </aside>
    </div>
  );
}
