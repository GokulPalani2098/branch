"use client";
import { useState, useEffect, useRef } from "react";
import { Globe, ArrowRight, Users, Target, Eye, Anchor, Ship, Plane, MapPin, Building2, Handshake, Award, CheckCircle, ChevronRight, Mail, Phone, Linkedin, Shield, TrendingUp, Heart, Menu, X as XIcon } from "lucide-react";

function useInView() {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsInView(true); obs.unobserve(el); }
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, isInView];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, isInView] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: isInView ? 1 : 0,
      transform: isInView ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    }}>{children}</div>
  );
}

// ─── Navigation ───
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Pricing", href: "/pricing" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid #E2E8F0" : "1px solid transparent",
      transition: "all 0.35s ease",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: "linear-gradient(135deg, #1E2761, #2D3A8C)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Globe size={20} color="#fff" strokeWidth={2.2} />
          </div>
          <div>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, color: "#1E2761", letterSpacing: "-0.3px" }}>EuroBranch</span>
            <span style={{ display: "block", fontSize: 10, color: "#64748B", letterSpacing: "1.5px", textTransform: "uppercase", marginTop: -2 }}>Gateway to Europe</span>
          </div>
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 32 }} className="nav-desktop">
          {links.map(l => (
            <a key={l.label} href={l.href} style={{ textDecoration: "none", fontSize: 14, fontWeight: 500, color: "#475569", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = "#B91C1C"}
              onMouseLeave={e => e.target.style.color = "#475569"}
            >{l.label}</a>
          ))}
          <a href="/contact" style={{
            background: "linear-gradient(135deg, #B91C1C, #991B1B)", color: "#fff", padding: "10px 24px", borderRadius: 8,
            fontSize: 14, fontWeight: 600, textDecoration: "none", boxShadow: "0 2px 8px rgba(185,28,28,0.25)",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
            onMouseEnter={e => { e.target.style.transform = "translateY(-1px)"; e.target.style.boxShadow = "0 4px 16px rgba(185,28,28,0.35)"; }}
            onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 2px 8px rgba(185,28,28,0.25)"; }}
          >Free Consultation</a>
        </div>
        <button className="nav-mobile-btn" onClick={() => setMobileOpen(!mobileOpen)} style={{ background: "none", border: "none", cursor: "pointer", padding: 8 }}>
          {mobileOpen ? <XIcon size={24} color="#1E2761" /> : <Menu size={24} color="#1E2761" />}
        </button>
      </div>
      {mobileOpen && (
        <div style={{ background: "#fff", borderTop: "1px solid #E2E8F0", padding: "16px 32px 24px" }} className="nav-mobile-menu">
          {links.map(l => (
            <a key={l.label} href={l.href} onClick={() => setMobileOpen(false)} style={{ display: "block", padding: "12px 0", fontSize: 15, fontWeight: 500, color: "#334155", textDecoration: "none", borderBottom: "1px solid #F1F5F9" }}>{l.label}</a>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── Page Hero ───
function PageHero() {
  return (
    <section style={{ position: "relative", paddingTop: 72, overflow: "hidden", background: "#FAFBFC" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(#CBD5E1 1px, transparent 1px)", backgroundSize: "40px 40px", opacity: 0.35 }} />
      <div style={{ position: "absolute", top: -100, right: -100, width: 450, height: 450, borderRadius: "50%", background: "radial-gradient(circle, rgba(30,39,97,0.06) 0%, transparent 70%)" }} />
      <div style={{ position: "relative", maxWidth: 900, margin: "0 auto", padding: "80px 32px 72px", textAlign: "center" }}>
        <Reveal>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 100, padding: "6px 16px", marginBottom: 24 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#1D4ED8" }}>About EuroBranch</span>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(34px, 4.5vw, 52px)", lineHeight: 1.15, color: "#0F172A", fontWeight: 700, letterSpacing: "-0.8px", marginBottom: 20 }}>
            Bridging India & Europe,<br />
            <span style={{ background: "linear-gradient(135deg, #B91C1C, #7F1D1D)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>One Business at a Time</span>
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p style={{ fontSize: 18, lineHeight: 1.7, color: "#475569", maxWidth: 620, margin: "0 auto" }}>
            We're a Netherlands-based team with deep roots in Indian business culture. We exist because too many great Indian businesses are locked out of Europe's massive market — and we're here to change that.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Our Story ───
function Story() {
  return (
    <section id="story" style={{ padding: "80px 32px", background: "#fff" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="two-col">
          <Reveal>
            <div>
              <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2.5, color: "#B91C1C" }}>Our Story</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3vw, 36px)", color: "#0F172A", marginTop: 12, lineHeight: 1.25 }}>Born from a Problem We Saw Firsthand</h2>
              <p style={{ fontSize: 15, color: "#64748B", lineHeight: 1.75, marginTop: 20 }}>
                We watched Indian manufacturers — companies making world-class products — struggle to enter Europe. Not because their products weren't good enough, but because the system was stacked against them.
              </p>
              <p style={{ fontSize: 15, color: "#64748B", lineHeight: 1.75, marginTop: 16 }}>
                No EU legal entity meant no access to procurement channels. Complex VAT rules, GDPR compliance, and import regulations created a maze. And setting up independently cost €18,000–€25,000+ in just the first year — a barrier most SMEs couldn't cross.
              </p>
              <p style={{ fontSize: 15, color: "#64748B", lineHeight: 1.75, marginTop: 16 }}>
                So we built EuroBranch — a service that eliminates every barrier. We register your European branch, act as your local representative, store and distribute your products from our Netherlands warehouse, and connect you directly with EU buyers. All for a fraction of what it would cost to go it alone.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div style={{ position: "relative" }}>
              {/* Timeline */}
              <div style={{ position: "relative", paddingLeft: 32 }}>
                <div style={{ position: "absolute", left: 11, top: 8, bottom: 8, width: 2, background: "linear-gradient(to bottom, #B91C1C, #1E2761)", borderRadius: 2 }} />
                {[
                  { year: "The Problem", text: "Indian SMEs face €18K–25K+ costs and 6+ months to set up in Europe independently." },
                  { year: "The Insight", text: "What if one partner could handle registration, representation, logistics, and compliance — all under one roof?" },
                  { year: "The Solution", text: "EuroBranch launches from the Netherlands — offering complete EU market access for €200/month." },
                  { year: "The Impact", text: "Indian businesses start selling in Europe within weeks, not months. The playing field is levelled." },
                ].map((item, i) => (
                  <div key={i} style={{ position: "relative", marginBottom: i < 3 ? 32 : 0 }}>
                    <div style={{
                      position: "absolute", left: -32, top: 2, width: 24, height: 24, borderRadius: "50%",
                      background: i === 2 ? "linear-gradient(135deg, #B91C1C, #991B1B)" : "#fff",
                      border: i === 2 ? "none" : "2px solid #CBD5E1",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      {i === 2 && <CheckCircle size={14} color="#fff" />}
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: i === 2 ? "#B91C1C" : "#1E2761", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 6 }}>{item.year}</div>
                    <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.6 }}>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── Mission, Vision, Values ───
function Mission() {
  const cards = [
    {
      icon: <Target size={24} />, title: "Our Mission", color: "#B91C1C",
      text: "To make European market access affordable, fast, and hassle-free for every Indian business — regardless of size. We believe great products deserve global markets.",
    },
    {
      icon: <Eye size={24} />, title: "Our Vision", color: "#1E2761",
      text: "To become the most trusted bridge between India and Europe — the first name every Indian exporter thinks of when they're ready to go global.",
    },
    {
      icon: <Heart size={24} />, title: "Our Values", color: "#166534",
      text: "Transparency in pricing. Hands-on representation. Long-term partnerships over quick transactions. We succeed only when our clients succeed in Europe.",
    },
  ];
  return (
    <section id="mission" style={{ padding: "80px 32px", background: "#F8FAFC" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2.5, color: "#B91C1C" }}>What Drives Us</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3.5vw, 40px)", color: "#0F172A", marginTop: 12 }}>Mission, Vision & Values</h2>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {cards.map((c, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div style={{
                background: "#fff", borderRadius: 16, padding: 36, border: "1px solid #E2E8F0", height: "100%",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)", transition: "transform 0.3s, box-shadow 0.3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.07)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)"; }}
              >
                <div style={{ width: 52, height: 52, borderRadius: 14, background: c.color + "10", display: "flex", alignItems: "center", justifyContent: "center", color: c.color, marginBottom: 20 }}>{c.icon}</div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "#0F172A", marginBottom: 14 }}>{c.title}</h3>
                <p style={{ fontSize: 15, color: "#64748B", lineHeight: 1.7 }}>{c.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Why Netherlands ───
function WhyNetherlands() {
  const facts = [
    { icon: <Ship size={20} />, title: "Port of Rotterdam", desc: "Europe's largest seaport — handling 440+ million tonnes of cargo annually. Your products enter the EU's busiest trade gateway." },
    { icon: <Plane size={20} />, title: "Schiphol Airport", desc: "One of Europe's top 3 cargo airports, just minutes from our warehouse. Air freight to any EU city within hours." },
    { icon: <MapPin size={20} />, title: "Central Location", desc: "500 million consumers within a 24-hour delivery radius. Germany, France, Belgium, and the UK are all next door." },
    { icon: <Building2 size={20} />, title: "Business-Friendly", desc: "The Netherlands consistently ranks among the top 5 EU countries for ease of doing business. Efficient digital systems and English-speaking workforce." },
    { icon: <Shield size={20} />, title: "Tax Efficiency", desc: "Competitive corporate tax rates, extensive double tax treaty network (including India), and VAT deferment schemes for importers." },
    { icon: <Handshake size={20} />, title: "India-NL Trade History", desc: "The Netherlands is among India's top 5 EU trading partners. Strong diplomatic and trade ties dating back centuries — the Dutch East India Company era." },
  ];
  return (
    <section id="netherlands" style={{ padding: "80px 32px", background: "#fff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 3fr", gap: 64, alignItems: "start" }} className="two-col">
          <Reveal>
            <div style={{ position: "sticky", top: 100 }}>
              <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2.5, color: "#B91C1C" }}>Strategic Base</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3vw, 36px)", color: "#0F172A", marginTop: 12, lineHeight: 1.25 }}>Why We Chose the Netherlands</h2>
              <p style={{ fontSize: 15, color: "#64748B", lineHeight: 1.7, marginTop: 20 }}>
                The Netherlands isn't just where we're based — it's the strategic heart of European trade. Every decision about our location was made to give your business the best possible advantage in the EU market.
              </p>
              <div style={{
                marginTop: 32, background: "linear-gradient(135deg, #1E2761, #2D3A8C)", borderRadius: 16, padding: 28,
              }}>
                <div style={{ fontSize: 48, lineHeight: 1, marginBottom: 12 }}>🇳🇱</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 20, color: "#fff", marginBottom: 8 }}>The Gateway to Europe</div>
                <p style={{ fontSize: 13, color: "#94A3B8", lineHeight: 1.6 }}>From our Netherlands warehouse, your products can reach 170 million consumers in Germany, France, Belgium, and the UK — within one business day.</p>
              </div>
            </div>
          </Reveal>
          <div>
            {facts.map((f, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div style={{
                  background: "#FAFBFC", borderRadius: 14, padding: 28, border: "1px solid #E2E8F0",
                  marginBottom: i < facts.length - 1 ? 16 : 0,
                  transition: "border-color 0.3s",
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "#B91C1C40"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "#E2E8F0"}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center", color: "#1E2761", flexShrink: 0 }}>{f.icon}</div>
                    <div>
                      <h4 style={{ fontSize: 16, fontWeight: 700, color: "#0F172A", marginBottom: 6 }}>{f.title}</h4>
                      <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.6 }}>{f.desc}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Numbers / Social Proof ───
function Numbers() {
  const stats = [
    { value: "€200", label: "Monthly Cost", sub: "All-inclusive retainer" },
    { value: "85%+", label: "Cost Savings", sub: "Compared to going alone" },
    { value: "2–4 Weeks", label: "Time to Launch", sub: "Not months" },
    { value: "500M+", label: "Consumers Reached", sub: "From Netherlands base" },
  ];
  return (
    <section style={{ padding: "72px 32px", background: "linear-gradient(135deg, #0F172A, #1E293B)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 32 }}>
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 3.5vw, 44px)", fontWeight: 700, color: "#fff", lineHeight: 1.1 }}>{s.value}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#CBD5E1", marginTop: 8 }}>{s.label}</div>
                <div style={{ fontSize: 12, color: "#64748B", marginTop: 4 }}>{s.sub}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Team Section ───
function Team() {
  const team = [
    {
      name: "Founder & Managing Director",
      role: "Strategy & Client Relations",
      bio: "Brings years of experience in India-EU trade, with deep expertise in import/export operations, European market dynamics, and building cross-border business relationships.",
      skills: ["EU Market Entry", "Client Strategy", "Trade Relations"],
    },
    {
      name: "Head of Operations",
      role: "Logistics & Warehouse Management",
      bio: "Manages our Netherlands warehouse and distribution network. Ensures smooth customs clearance, inventory management, and timely delivery across the EU.",
      skills: ["Supply Chain", "Customs & VAT", "Distribution"],
    },
    {
      name: "Compliance & Legal Lead",
      role: "Regulatory & Tax Compliance",
      bio: "Handles branch registration, VAT enrollment, accounting, and ongoing regulatory compliance. Keeps your European branch fully compliant with Dutch and EU law.",
      skills: ["EU Regulations", "VAT & Tax", "Branch Registration"],
    },
    {
      name: "Business Development",
      role: "Buyer Connections & Representation",
      bio: "Our on-ground representative who attends meetings, negotiates with European buyers, and builds the distribution partnerships that drive your revenue growth.",
      skills: ["Buyer Relations", "Negotiations", "EU Retail"],
    },
  ];
  return (
    <section id="team" style={{ padding: "80px 32px", background: "#F8FAFC" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2.5, color: "#B91C1C" }}>Our Team</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3.5vw, 40px)", color: "#0F172A", marginTop: 12 }}>The People Behind Your EU Expansion</h2>
            <p style={{ fontSize: 16, color: "#64748B", marginTop: 12, maxWidth: 560, margin: "12px auto 0" }}>A dedicated team that understands both Indian business culture and European market dynamics.</p>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          {team.map((m, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div style={{
                background: "#fff", borderRadius: 16, padding: 28, border: "1px solid #E2E8F0", height: "100%",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.07)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                {/* Avatar placeholder */}
                <div style={{
                  width: 64, height: 64, borderRadius: 16,
                  background: `linear-gradient(135deg, ${["#1E2761","#B91C1C","#166534","#7C3AED"][i]}, ${["#2D3A8C","#991B1B","#15803D","#6D28D9"][i]})`,
                  display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20,
                }}>
                  <Users size={28} color="#fff" />
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: "#0F172A", marginBottom: 4 }}>{m.name}</h3>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#B91C1C", marginBottom: 14 }}>{m.role}</div>
                <p style={{ fontSize: 13.5, color: "#64748B", lineHeight: 1.65, marginBottom: 16 }}>{m.bio}</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {m.skills.map((s, j) => (
                    <span key={j} style={{ fontSize: 11, fontWeight: 600, color: "#1E2761", background: "#EFF6FF", padding: "4px 10px", borderRadius: 6 }}>{s}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Trust Signals ───
function Trust() {
  return (
    <section style={{ padding: "72px 32px", background: "#fff" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 3vw, 32px)", color: "#0F172A" }}>Built on Trust & Compliance</h2>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
          {[
            { icon: <Award size={22} />, label: "Netherlands KVK Registered", sub: "Official Dutch Chamber of Commerce" },
            { icon: <Shield size={22} />, label: "EU VAT Compliant", sub: "Full tax registration & filing" },
            { icon: <CheckCircle size={22} />, label: "GDPR Ready", sub: "Data protection compliant" },
            { icon: <TrendingUp size={22} />, label: "EU-India FTA Aligned", sub: "Maximising new trade advantages" },
          ].map((t, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div style={{ background: "#F8FAFC", borderRadius: 14, padding: 24, border: "1px solid #E2E8F0", textAlign: "center" }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center", color: "#1E2761", margin: "0 auto 14px" }}>{t.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#0F172A", marginBottom: 4 }}>{t.label}</div>
                <div style={{ fontSize: 12, color: "#94A3B8" }}>{t.sub}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA Section ───
function CTA() {
  return (
    <section id="cta" style={{ padding: "80px 32px", background: "linear-gradient(135deg, #1E2761, #2D3A8C)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -80, right: -80, width: 300, height: 300, borderRadius: "50%", background: "rgba(255,255,255,0.03)" }} />
      <div style={{ position: "absolute", bottom: -60, left: -60, width: 250, height: 250, borderRadius: "50%", background: "rgba(185,28,28,0.08)" }} />
      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", position: "relative" }}>
        <Reveal>
          <div style={{ fontSize: 48, marginBottom: 20 }}>🇳🇱 🤝 🇮🇳</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3.5vw, 42px)", color: "#fff", lineHeight: 1.2, marginBottom: 16 }}>Ready to Expand into Europe?</h2>
          <p style={{ fontSize: 17, color: "#CBD5E1", lineHeight: 1.7, maxWidth: 520, margin: "0 auto 36px" }}>
            Your EU branch can be operational in weeks. Schedule a free consultation and let's build your European presence together.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "#fff", color: "#1E2761",
              padding: "16px 36px", borderRadius: 10, fontSize: 16, fontWeight: 700,
              textDecoration: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
              transition: "transform 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
            >Book Free Consultation <ArrowRight size={18} /></a>
            <a href="#" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,0.3)",
              padding: "16px 32px", borderRadius: 10, fontSize: 16, fontWeight: 600,
              textDecoration: "none", transition: "border-color 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.7)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"}
            >hello@eurobranch.eu</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Footer ───
function Footer() {
  return (
    <footer style={{ background: "#0F172A", padding: "48px 32px 28px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, #2D3A8C, #4F46E5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Globe size={16} color="#fff" />
            </div>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, color: "#fff" }}>EuroBranch</span>
          </div>
          <span style={{ fontSize: 13, color: "#64748B" }}>&copy; 2026 EuroBranch. All rights reserved.</span>
          <div style={{ display: "flex", gap: 20 }}>
            {["Privacy Policy", "Terms", "Contact"].map((t, i) => (
              <a key={i} href="#" style={{ fontSize: 13, color: "#64748B", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = "#fff"}
                onMouseLeave={e => e.target.style.color = "#64748B"}
              >{t}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Main ───
export default function AboutPage() {
  return (
    <div style={{ "--font-display": "'DM Serif Display', Georgia, serif", fontFamily: "'DM Sans', -apple-system, sans-serif" }}>
      <Nav />
      <PageHero />
      <Story />
      <Mission />
      <WhyNetherlands />
      <Numbers />
      <Team />
      <Trust />
      <CTA />
      <Footer />
      <style>{`
        @media (max-width: 900px) {
          .two-col { grid-template-columns: 1fr !important; }
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: block !important; }
        }
        @media (min-width: 901px) {
          .nav-mobile-btn { display: none !important; }
          .nav-mobile-menu { display: none !important; }
        }
      `}</style>
    </div>
  );
}
