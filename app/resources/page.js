const items = [
  { id:1, title:'Understanding Autism Spectrum Disorder: A Comprehensive Guide', tag:'📘 Guide', type:'PDF', date:'Feb 14, 2023' },
  { id:2, title:'Visual Schedules: Customizable Templates', tag:'🧰 Tool', type:'PDF', date:'May 9, 2023' },
  { id:3, title:'Supporting Communication Development at Home', tag:'🎥 Video', type:'Video', date:'Jan 28, 2023' },
  { id:4, title:'Social Stories Creator Tool', tag:'🧰 Tool', type:'Web App', date:'Apr 11, 2023' },
];
export default function Resources(){
  return (
    <div style={{display:"grid", gap:16}}>
      <h1 style={{fontSize:22, fontWeight:800}}>Autism Resource Library</h1>
      <section style={{display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:12}}>
        {items.map(it => (
          <article key={it.id} style={{background:"#fff", border:"1px solid #e5e7eb", borderRadius:12, padding:16}}>
            <div style={{fontSize:12, color:"#6b7280"}}>{it.tag}</div>
            <div style={{fontWeight:700, marginTop:4}}>{it.title}</div>
            <div style={{fontSize:12, color:"#6b7280", marginTop:4}}>{it.type} • {it.date}</div>
            <button style={{marginTop:10, border:"1px solid #e5e7eb", padding:"8px 12px", borderRadius:8}}>{it.type==='Video'?'Watch':'Download'}</button>
          </article>
        ))}
      </section>
    </div>
  );
}
