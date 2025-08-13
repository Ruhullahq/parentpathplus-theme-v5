export default function Home(){
  return (
    <div style={{display:"grid", gap:16}}>
      <section style={{background:"#fff", border:"1px solid #e5e7eb", borderRadius:16, padding:24}}>
        <h1 style={{fontSize:28, fontWeight:800}}>Your Guide on the <span style={{color:"#2563eb"}}>Autism Journey</span></h1>
        <p style={{marginTop:8, color:"#4b5563"}}>Find providers, navigate insurance, and access practical resources.</p>
        <div style={{marginTop:12, display:"flex", gap:10, flexWrap:"wrap"}}>
          <a href="/providers" style={{background:"#000", color:"#fff", padding:"10px 14px", borderRadius:8, textDecoration:"none"}}>Find Providers</a>
          <a href="/pricing" style={{border:"1px solid #e5e7eb", padding:"10px 14px", borderRadius:8, textDecoration:"none"}}>See Pricing</a>
        </div>
      </section>
      <section style={{display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:12}}>
        {[
          {title:"Provider Directory", desc:"Filter by location, specialty, insurer, telehealth.", href:"/providers"},
          {title:"Insurance Navigator", desc:"Decode benefits & generate pre-auth packets.", href:"/insurance"},
          {title:"Resource Library", desc:"Guides, tools, videos, templates.", href:"/resources"},
          {title:"Concierge Scheduling", desc:"White-glove assistance to book care.", href:"/concierge"},
        ].map(card => (
          <a key={card.title} href={card.href} style={{background:"#fff", border:"1px solid #e5e7eb", borderRadius:16, padding:16, textDecoration:"none", color:"#111827"}}>
            <div style={{fontWeight:700}}>{card.title}</div>
            <div style={{marginTop:4, color:"#4b5563", fontSize:14}}>{card.desc}</div>
          </a>
        ))}
      </section>
    </div>
  );
}
