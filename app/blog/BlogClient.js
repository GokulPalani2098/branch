import { useState, useEffect, useRef } from "react";
import { Globe, ArrowRight, Search, Menu, X as XIcon, Clock, ChevronRight, BookOpen, FileText, Download, Mail, Tag, TrendingUp, Shield, Users, Truck, Scale, Landmark, Filter, Calendar, ArrowUpRight, Bookmark, Rss } from "lucide-react";

function useInView() {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.unobserve(el); } }, { threshold: 0.1 });
    o.observe(el);
    return () => o.disconnect();
  }, []);
  return [ref, v];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, v] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
    }}>{children}</div>
  );
}

/* ─── Nav ─── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mob, setMob] = useState(false);
  useEffect(() => { const f = () => setScrolled(window.scrollY > 40); window.addEventListener("scroll", f); return () => window.removeEventListener("scroll", f); }, []);
  const links = [
    { label: "Home", href: "#" },
    { label: "Articles", href: "#articles" },
    { label: "Guides", href: "#guides" },
    { label: "Resources", href: "#resources" },
    { label: "Newsletter", href: "#newsletter" },
  ];
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, background: scrolled ? "rgba(255,255,255,0.97)" : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none", borderBottom: scrolled ? "1px solid #E2E8F0" : "1px solid transparent", transition: "all 0.35s ease" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        <a href="#" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: "linear-gradient(135deg, #1E2761, #2D3A8C)", display: "flex", alignItems: "center", justifyContent: "center" }}><Globe size={20} color="#fff" strokeWidth={2.2} /></div>
          <div><span style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, color: "#1E2761" }}>EuroBranch</span><span style={{ display: "block", fontSize: 10, color: "#64748B", letterSpacing: "1.5px", textTransform: "uppercase", marginTop: -2 }}>Gateway to Europe</span></div>
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 28 }} className="nav-desktop">
          {links.map(l => <a key={l.label} href={l.href} style={{ textDecoration: "none", fontSize: 14, fontWeight: 500, color: "#475569", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = "#B91C1C"} onMouseLeave={e => e.target.style.color = "#475569"}>{l.label}</a>)}
          <a href="#" style={{ background: "linear-gradient(135deg, #B91C1C, #991B1B)", color: "#fff", padding: "10px 24px", borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: "none", boxShadow: "0 2px 8px rgba(185,28,28,0.25)" }}>Free Consultation</a>
        </div>
        <button className="nav-mobile-btn" onClick={() => setMob(!mob)} style={{ background: "none", border: "none", cursor: "pointer", padding: 8 }}>{mob ? <XIcon size={24} color="#1E2761" /> : <Menu size={24} color="#1E2761" />}</button>
      </div>
      {mob && <div style={{ background: "#fff", borderTop: "1px solid #E2E8F0", padding: "16px 32px 24px" }} className="nav-mobile-menu">{links.map(l => <a key={l.label} href={l.href} onClick={() => setMob(false)} style={{ display: "block", padding: "12px 0", fontSize: 15, fontWeight: 500, color: "#334155", textDecoration: "none", borderBottom: "1px solid #F1F5F9" }}>{l.label}</a>)}</div>}
    </nav>
  );
}

/* ─── Hero ─── */
function Hero() {
  return (
    <section style={{ position: "relative", paddingTop: 72, overflow: "hidden", background: "#FAFBFC" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(#CBD5E1 1px, transparent 1px)", backgroundSize: "40px 40px", opacity: 0.3 }} />
      <div style={{ position: "relative", maxWidth: 900, margin: "0 auto", padding: "80px 32px 56px", textAlign: "center" }}>
        <Reveal>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 100, padding: "6px 16px", marginBottom: 24 }}>
            <BookOpen size={14} color="#1D4ED8" />
            <span style={{ fontSize: 13, fontWeight: 600, color: "#1D4ED8" }}>Insights & Resources for EU Expansion</span>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(34px, 4.5vw, 50px)", lineHeight: 1.15, color: "#0F172A", fontWeight: 700, letterSpacing: "-0.8px", marginBottom: 20 }}>
            Blog & <span style={{ background: "linear-gradient(135deg, #B91C1C, #7F1D1D)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Resources</span>
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: "#475569", maxWidth: 540, margin: "0 auto" }}>
            Practical guides, market insights, and everything you need to know about expanding your Indian business into Europe.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Featured Article ─── */
function Featured() {
  return (
    <section style={{ padding: "0 32px 64px", background: "#FAFBFC" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <div style={{
            background: "linear-gradient(135deg, #1E2761, #2D3A8C)", borderRadius: 20, overflow: "hidden",
            display: "grid", gridTemplateColumns: "3fr 2fr", minHeight: 320,
          }} className="featured-grid">
            <div style={{ padding: "48px 48px 48px 48px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <span style={{ fontSize: 11, fontWeight: 700, background: "rgba(255,255,255,0.15)", color: "#FCD34D", padding: "4px 12px", borderRadius: 20, letterSpacing: "0.5px", textTransform: "uppercase" }}>Featured</span>
                <span style={{ fontSize: 12, color: "#94A3B8" }}>·  8 min read</span>
              </div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(22px, 2.5vw, 30px)", color: "#fff", lineHeight: 1.3, marginBottom: 14 }}>
                EU-India Free Trade Agreement 2026: What It Means for Indian Exporters
              </h2>
              <p style={{ fontSize: 14, color: "#CBD5E1", lineHeight: 1.7, marginBottom: 24, maxWidth: 420 }}>
                The landmark FTA eliminates tariffs on 90%+ of goods and opens services markets. Here's a practical breakdown of what changes, which sectors benefit most, and how to take advantage.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#fff", fontSize: 14, fontWeight: 600, textDecoration: "none", background: "rgba(255,255,255,0.12)", padding: "10px 20px", borderRadius: 8, transition: "background 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}
                >Read Article <ArrowRight size={15} /></a>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#94A3B8" }}>
                  <Calendar size={13} /> March 2026
                </div>
              </div>
            </div>
            <div style={{ background: "linear-gradient(135deg, rgba(185,28,28,0.2), rgba(30,39,97,0.3))", display: "flex", alignItems: "center", justifyContent: "center", padding: 40 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 72, marginBottom: 8 }}>🇪🇺🤝🇮🇳</div>
                <div style={{ fontSize: 14, color: "#CBD5E1", fontWeight: 600 }}>EU-India FTA</div>
                <div style={{ fontSize: 12, color: "#94A3B8" }}>January 2026</div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Blog Articles Grid ─── */
function Articles() {
  const [activeTag, setActiveTag] = useState("All");
  const tags = ["All", "Market Entry", "Compliance", "Logistics", "FTA Updates", "Case Studies"];

  const posts = [
    { title: "Step-by-Step Guide: Registering a Branch in the Netherlands", tag: "Market Entry", icon: <FileText size={20} />, time: "6 min", date: "Mar 2026", color: "#1E2761", desc: "Everything you need to know about KVK registration, required documents, timelines, and common pitfalls to avoid." },
    { title: "VAT in Europe: A Complete Guide for Indian Businesses", tag: "Compliance", icon: <Shield size={20} />, time: "10 min", date: "Mar 2026", color: "#166534", desc: "Understanding EU VAT registration, filing obligations, reverse charge mechanisms, and how to stay compliant from day one." },
    { title: "Netherlands vs. Germany vs. Belgium: Where to Base Your EU Branch", tag: "Market Entry", icon: <Landmark size={20} />, time: "7 min", date: "Feb 2026", color: "#7C3AED", desc: "A practical comparison of the three most popular entry points for Indian businesses — tax rates, logistics, costs, and more." },
    { title: "GDPR Compliance for Non-EU Companies: What You Actually Need to Do", tag: "Compliance", icon: <Shield size={20} />, time: "5 min", date: "Feb 2026", color: "#B91C1C", desc: "GDPR doesn't have to be scary. Here's a plain-language guide to what Indian businesses must comply with when operating in the EU." },
    { title: "How EU Customs Work: Import Duties, Documentation & Tips", tag: "Logistics", icon: <Truck size={20} />, time: "8 min", date: "Feb 2026", color: "#0369A1", desc: "From HS codes to customs clearance procedures — everything you need to get your products through EU borders smoothly." },
    { title: "EU-India FTA: Sector-by-Sector Tariff Reduction Guide", tag: "FTA Updates", icon: <TrendingUp size={20} />, time: "12 min", date: "Jan 2026", color: "#92400E", desc: "Which Indian export sectors benefit the most? Textiles, marine, engineering, spices — we break down the tariff changes for each." },
    { title: "5 Mistakes Indian Companies Make When Entering Europe", tag: "Market Entry", icon: <Users size={20} />, time: "5 min", date: "Jan 2026", color: "#B91C1C", desc: "From underestimating compliance costs to choosing the wrong legal structure — learn from others' mistakes before making your own." },
    { title: "How a Textile Exporter from Surat Started Selling in 4 EU Countries", tag: "Case Studies", icon: <BookOpen size={20} />, time: "4 min", date: "Jan 2026", color: "#1E2761", desc: "A real story of how a small textile manufacturer used our service to go from zero EU presence to active sales across Germany, Netherlands, France, and Belgium." },
    { title: "Understanding CE Marking: Which Products Need It?", tag: "Compliance", icon: <Scale size={20} />, time: "6 min", date: "Dec 2025", color: "#166534", desc: "CE marking is mandatory for many product categories in Europe. Here's how to determine if your products need it and how to get certified." },
  ];

  const filtered = activeTag === "All" ? posts : posts.filter(p => p.tag === activeTag);

  return (
    <section id="articles" style={{ padding: "80px 32px", background: "#fff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 36, flexWrap: "wrap", gap: 16 }}>
            <div>
              <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2.5, color: "#B91C1C" }}>Articles</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 3vw, 34px)", color: "#0F172A", marginTop: 6 }}>Latest Insights</h2>
            </div>
          </div>
        </Reveal>

        {/* Tags */}
        <Reveal delay={0.05}>
          <div style={{ display: "flex", gap: 8, marginBottom: 36, flexWrap: "wrap" }}>
            {tags.map(t => (
              <button key={t} onClick={() => setActiveTag(t)} style={{
                padding: "8px 18px", borderRadius: 100, border: "none", cursor: "pointer",
                fontSize: 13, fontWeight: 600, transition: "all 0.2s",
                background: activeTag === t ? "#1E2761" : "#F1F5F9",
                color: activeTag === t ? "#fff" : "#64748B",
              }}
                onMouseEnter={e => { if (activeTag !== t) e.target.style.background = "#E2E8F0"; }}
                onMouseLeave={e => { if (activeTag !== t) e.target.style.background = "#F1F5F9"; }}
              >{t}</button>
            ))}
          </div>
        </Reveal>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(330px, 1fr))", gap: 20 }}>
          {filtered.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <article style={{
                background: "#FAFBFC", borderRadius: 16, border: "1px solid #E2E8F0", overflow: "hidden",
                height: "100%", display: "flex", flexDirection: "column", transition: "transform 0.3s, box-shadow 0.3s, border-color 0.3s",
                cursor: "pointer",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.06)"; e.currentTarget.style.borderColor = p.color + "40"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "#E2E8F0"; }}
              >
                {/* Top accent bar */}
                <div style={{ height: 4, background: p.color }} />
                <div style={{ padding: "24px 24px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, background: p.color + "12", color: p.color, padding: "4px 10px", borderRadius: 6, textTransform: "uppercase", letterSpacing: "0.5px" }}>{p.tag}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12, color: "#94A3B8" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 3 }}><Clock size={12} /> {p.time}</span>
                      <span>{p.date}</span>
                    </div>
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: "#0F172A", lineHeight: 1.4, marginBottom: 10 }}>{p.title}</h3>
                  <p style={{ fontSize: 13.5, color: "#64748B", lineHeight: 1.6, flex: 1 }}>{p.desc}</p>
                  <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: p.color }}>
                    Read more <ArrowUpRight size={14} />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "48px 0", color: "#94A3B8" }}>
            <BookOpen size={32} style={{ marginBottom: 12, opacity: 0.4 }} />
            <p style={{ fontSize: 15 }}>No articles in this category yet. Check back soon!</p>
          </div>
        )}
      </div>
    </section>
  );
}

/* ─── Downloadable Guides ─── */
function Guides() {
  const guides = [
    { title: "EU Market Entry Checklist", desc: "A printable step-by-step checklist covering everything from documents to first shipment.", format: "PDF", pages: "4 pages", color: "#B91C1C", icon: <FileText size={22} /> },
    { title: "Netherlands Branch Registration Guide", desc: "Detailed walkthrough of the KVK registration process, required documents, and timelines.", format: "PDF", pages: "12 pages", color: "#1E2761", icon: <Landmark size={22} /> },
    { title: "EU VAT Quick Reference Card", desc: "One-page reference card with VAT rates across EU countries, filing deadlines, and key rules.", format: "PDF", pages: "1 page", color: "#166534", icon: <Shield size={22} /> },
    { title: "EU-India FTA Tariff Comparison Sheet", desc: "Sector-by-sector tariff comparison showing before and after FTA rates for key Indian exports.", format: "Excel", pages: "Spreadsheet", color: "#92400E", icon: <TrendingUp size={22} /> },
  ];
  return (
    <section id="guides" style={{ padding: "80px 32px", background: "#F8FAFC" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <div style={{ marginBottom: 40 }}>
            <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2.5, color: "#B91C1C" }}>Free Downloads</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 3vw, 34px)", color: "#0F172A", marginTop: 6 }}>Guides & Templates</h2>
            <p style={{ fontSize: 15, color: "#64748B", marginTop: 8 }}>Practical resources to help you plan your EU expansion. All free — no email required.</p>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
          {guides.map((g, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div style={{
                background: "#fff", borderRadius: 16, padding: 28, border: "1px solid #E2E8F0", height: "100%",
                display: "flex", flexDirection: "column", transition: "transform 0.3s, box-shadow 0.3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.06)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: g.color + "10", display: "flex", alignItems: "center", justifyContent: "center", color: g.color }}>{g.icon}</div>
                  <div>
                    <span style={{ fontSize: 11, fontWeight: 700, background: "#F1F5F9", color: "#64748B", padding: "3px 8px", borderRadius: 4, textTransform: "uppercase", letterSpacing: "0.5px" }}>{g.format}</span>
                    <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 2 }}>{g.pages}</div>
                  </div>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0F172A", marginBottom: 8, lineHeight: 1.35 }}>{g.title}</h3>
                <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.6, flex: 1 }}>{g.desc}</p>
                <button style={{
                  marginTop: 18, width: "100%", padding: "11px 16px", borderRadius: 10, border: "2px solid #E2E8F0", background: "#fff",
                  fontSize: 13, fontWeight: 600, color: "#1E2761", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  transition: "border-color 0.2s, background 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = g.color; e.currentTarget.style.background = g.color + "08"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#E2E8F0"; e.currentTarget.style.background = "#fff"; }}
                ><Download size={15} /> Download Free</button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Useful Links / Resources ─── */
function Resources() {
  const links = [
    { title: "Netherlands KVK (Chamber of Commerce)", url: "kvk.nl", desc: "Official business registration portal for the Netherlands." },
    { title: "Dutch Tax Authority (Belastingdienst)", url: "belastingdienst.nl", desc: "VAT registration, tax filings, and compliance information." },
    { title: "EU Single Market Portal", url: "europa.eu", desc: "Official EU resource for cross-border business regulations." },
    { title: "EU-India FTA Official Page", url: "ec.europa.eu", desc: "European Commission's summary of the India-EU trade agreement." },
    { title: "FIEO (Federation of Indian Export Organisations)", url: "fieo.org", desc: "India's apex export promotion body — trade data and resources." },
    { title: "Enterprise Europe Network", url: "een.ec.europa.eu", desc: "Free EU advisory service for businesses operating cross-border." },
  ];
  return (
    <section id="resources" style={{ padding: "80px 32px", background: "#fff" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <Reveal>
          <div style={{ marginBottom: 36 }}>
            <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2.5, color: "#B91C1C" }}>Useful Links</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 3vw, 34px)", color: "#0F172A", marginTop: 6 }}>External Resources</h2>
            <p style={{ fontSize: 15, color: "#64748B", marginTop: 8 }}>Official government portals and trade resources we recommend.</p>
          </div>
        </Reveal>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {links.map((l, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <a href="#" style={{
                display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
                background: "#FAFBFC", borderRadius: 12, padding: "18px 24px", border: "1px solid #E2E8F0",
                textDecoration: "none", transition: "border-color 0.2s, background 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#1E276140"; e.currentTarget.style.background = "#F8FAFC"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#E2E8F0"; e.currentTarget.style.background = "#FAFBFC"; }}
              >
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: "#0F172A", marginBottom: 2 }}>{l.title}</div>
                  <div style={{ fontSize: 13, color: "#64748B" }}>{l.desc}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#94A3B8", whiteSpace: "nowrap", flexShrink: 0 }}>
                  {l.url} <ArrowUpRight size={13} />
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Newsletter ─── */
function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  return (
    <section id="newsletter" style={{ padding: "80px 32px", background: "linear-gradient(135deg, #0F172A, #1E293B)" }}>
      <div style={{ maxWidth: 650, margin: "0 auto", textAlign: "center" }}>
        <Reveal>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            <Mail size={26} color="#CBD5E1" />
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 3vw, 34px)", color: "#fff", marginBottom: 12 }}>Stay Updated</h2>
          <p style={{ fontSize: 15, color: "#94A3B8", lineHeight: 1.7, maxWidth: 440, margin: "0 auto 32px" }}>
            Get the latest EU market insights, FTA updates, and expansion tips delivered to your inbox. No spam — just practical value, twice a month.
          </p>
          {subscribed ? (
            <div style={{ background: "rgba(34,197,94,0.1)", borderRadius: 12, padding: "20px 24px", border: "1px solid rgba(34,197,94,0.2)" }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: "#86EFAC", marginBottom: 4 }}>You're subscribed!</div>
              <div style={{ fontSize: 13, color: "#94A3B8" }}>Check your inbox for a confirmation. Welcome aboard.</div>
            </div>
          ) : (
            <div style={{ display: "flex", gap: 12, maxWidth: 480, margin: "0 auto" }} className="newsletter-form">
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" style={{
                flex: 1, padding: "14px 18px", borderRadius: 10, border: "1.5px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.06)", color: "#fff", fontSize: 14, outline: "none",
                fontFamily: "inherit", transition: "border-color 0.2s",
              }}
                onFocus={e => e.target.style.borderColor = "rgba(255,255,255,0.3)"}
                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.12)"}
              />
              <button onClick={() => { if (email) setSubscribed(true); }} style={{
                padding: "14px 28px", borderRadius: 10, border: "none",
                background: email ? "linear-gradient(135deg, #B91C1C, #991B1B)" : "rgba(255,255,255,0.08)",
                color: email ? "#fff" : "#64748B", fontSize: 14, fontWeight: 600, cursor: email ? "pointer" : "not-allowed",
                display: "flex", alignItems: "center", gap: 6, transition: "transform 0.2s",
                boxShadow: email ? "0 4px 16px rgba(185,28,28,0.3)" : "none",
                whiteSpace: "nowrap",
              }}
                onMouseEnter={e => { if (email) e.target.style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => e.target.style.transform = "translateY(0)"}
              ><Rss size={15} /> Subscribe</button>
            </div>
          )}
          <div style={{ marginTop: 16, fontSize: 12, color: "#64748B" }}>
            Join Indian exporters and business leaders already reading our newsletter.
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── CTA ─── */
function CTA() {
  return (
    <section style={{ padding: "64px 32px", background: "#FAFBFC" }}>
      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
        <Reveal>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(22px, 2.5vw, 30px)", color: "#0F172A", marginBottom: 12 }}>Ready to Take the Next Step?</h2>
          <p style={{ fontSize: 15, color: "#64748B", marginBottom: 24 }}>Reading is great. Doing is better. Let's talk about your EU expansion.</p>
          <a href="#" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "linear-gradient(135deg, #1E2761, #2D3A8C)", color: "#fff",
            padding: "14px 32px", borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: "none",
            boxShadow: "0 4px 16px rgba(30,39,97,0.25)", transition: "transform 0.2s",
          }} onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"} onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
            Book Free Consultation <ArrowRight size={16} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer style={{ background: "#0F172A", padding: "48px 32px 28px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, #2D3A8C, #4F46E5)", display: "flex", alignItems: "center", justifyContent: "center" }}><Globe size={16} color="#fff" /></div>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, color: "#fff" }}>EuroBranch</span>
        </div>
        <span style={{ fontSize: 13, color: "#64748B" }}>&copy; 2026 EuroBranch. All rights reserved.</span>
        <div style={{ display: "flex", gap: 20 }}>
          {["Privacy Policy", "Terms", "Contact"].map((t, i) => (
            <a key={i} href="#" style={{ fontSize: 13, color: "#64748B", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = "#fff"} onMouseLeave={e => e.target.style.color = "#64748B"}>{t}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ─── App ─── */
export default function BlogPage() {
  return (
    <div style={{ "--font-display": "'DM Serif Display', Georgia, serif", fontFamily: "'DM Sans', -apple-system, sans-serif" }}>
      <Nav />
      <Hero />
      <Featured />
      <Articles />
      <Guides />
      <Resources />
      <Newsletter />
      <CTA />
      <Footer />
      <style>{`
        @media (max-width: 900px) {
          .two-col, .featured-grid { grid-template-columns: 1fr !important; }
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: block !important; }
          .newsletter-form { flex-direction: column !important; }
        }
        @media (min-width: 901px) {
          .nav-mobile-btn { display: none !important; }
          .nav-mobile-menu { display: none !important; }
        }
      `}</style>
    </div>
  );
}
