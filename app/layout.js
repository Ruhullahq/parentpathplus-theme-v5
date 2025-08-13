import React from "react";

export const metadata = {
  title: "ParentPath+",
  description: "MGX-style UI with provider search, resources, insurance, profile, and payments",
};

function NavLink({ href, children }) {
  return <a href={href} style={{fontSize:14, color:"#374151", fontWeight:600, textDecoration:"none", marginLeft:16}}>{children}</a>;
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{background:"#f9fafb", color:"#111827", fontFamily:"Inter,ui-sans-serif,system-ui"}}>
        <header style={{position:"sticky", top:0, zIndex:50, background:"#fff", borderBottom:"1px solid #e5e7eb"}}>
          <div style={{maxWidth:1100, margin:"0 auto", padding:"10px 16px", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
            <a href="/" style={{fontWeight:800, fontSize:18, textDecoration:"none", color:"#111827"}}>ParentPath<span style={{color:"#2563eb"}}>+</span></a>
            <nav style={{display:"flex", alignItems:"center"}}>
              <NavLink href="/providers">Find Providers</NavLink>
              <NavLink href="/resources">Resources</NavLink>
              <NavLink href="/insurance">Insurance</NavLink>
              <NavLink href="/forums">Forums</NavLink>
              <NavLink href="/profile">Profile</NavLink>
            </nav>
            <div style={{display:"flex", gap:8}}>
              <a href="/pricing" style={{border:"1px solid #e5e7eb", padding:"8px 12px", borderRadius:8, textDecoration:"none", color:"#111827"}}>Pricing</a>
              <a href="/account" style={{background:"#000", color:"#fff", padding:"8px 12px", borderRadius:8, textDecoration:"none"}}>Get Plus</a>
            </div>
          </div>
        </header>
        <main style={{maxWidth:1100, margin:"0 auto", padding:"24px 16px"}}>{children}</main>
        <footer style={{borderTop:"1px solid #e5e7eb", marginTop:40}}>
          <div style={{maxWidth:1100, margin:"0 auto", padding:"24px 16px", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:16, fontSize:14, color:"#6b7280"}}>
            <div>
              <div style={{fontWeight:700, color:"#111827"}}>ParentPath<span style={{color:"#2563eb"}}>+</span></div>
              <div style={{marginTop:6}}>Connecting autism families with trusted providers, resources, and community.</div>
            </div>
            <div>
              <div style={{fontWeight:600, color:"#111827"}}>Quick Links</div>
              <div style={{marginTop:6}}><a href="/providers">Find Providers</a></div>
              <div><a href="/insurance">Insurance</a></div>
              <div><a href="/resources">Resources</a></div>
            </div>
            <div>
              <div style={{fontWeight:600, color:"#111827"}}>Account</div>
              <div style={{marginTop:6}}><a href="/account">My Account</a></div>
              <div><a href="/profile">Profile</a></div>
            </div>
          </div>
          <div style={{textAlign:"center", fontSize:12, color:"#6b7280", padding:"12px 0"}}>© {new Date().getFullYear()} ParentPath+</div>
        </footer>
      </body>
    </html>
  );
}
