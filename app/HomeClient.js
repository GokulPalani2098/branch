"use client";
import { useState, useEffect, useRef } from "react";
import { ChevronRight, Globe, Shield, Warehouse, Users, FileCheck, TrendingUp, Check, X, Minus, ArrowRight, Menu, X as XIcon, MapPin, Phone, Mail, Star, Building2, Scale, Truck, BadgeCheck, ChevronDown } from "lucide-react";

// ─── Intersection Observer Hook ───
function useInView(options = {}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsInView(true); obs.unobserve(el); }
    }, { threshold: 0.15, ...options });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, isInView];
}

// ─── Animated Section Wrapper ───
function Reveal({ children, delay = 0, className = "" }) {
  const [ref, isInView] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: isInView ? 1 : 0,
      transform: isInView ? "translateY(0)" : "translateY(32px)",
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
            <span style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, color: scrolled ? "#1E2761" : "#1E2761", letterSpacing: "-0.3px" }}>EuroBranch</span>
            <span style={{ display: "block", fontSize: 10, color: "#64748B", letterSpacing: "1.5px", textTransform: "uppercase", marginTop: -2 }}>Gateway to Europe</span>
          </div>
        </a>
        {/* Desktop Links */}
        <div style={{ display: "flex", alignItems: "center", gap: 32 }} className="nav-desktop">
          {links.map(l => (
            <a key={l.label} href={l.href} style={{ textDecoration: "none", fontSize: 14, fontWeight: 500, color: scrolled ? "#334155" : "#475569", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = "#B91C1C"}
              onMouseLeave={e => e.target.style.color = scrolled ? "#334155" : "#475569"}
            >{l.label}</a>
          ))}
          <a href="/contact" style={{
            background: "linear-gradient(135deg, #B91C1C, #991B1B)", color: "#fff", padding: "10px 24px", borderRadius: 8,
            fontSize: 14, fontWeight: 600, textDecoration: "none", transition: "transform 0.2s, box-shadow 0.2s",
            boxShadow: "0 2px 8px rgba(185,28,28,0.25)",
          }}
            onMouseEnter={e => { e.target.style.transform = "translateY(-1px)"; e.target.style.boxShadow = "0 4px 16px rgba(185,28,28,0.35)"; }}
            onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 2px 8px rgba(185,28,28,0.25)"; }}
          >Free Consultation</a>
        </div>
        {/* Mobile Toggle */}
        <button className="nav-mobile-btn" onClick={() => setMobileOpen(!mobileOpen)} style={{ background: "none", border: "none", cursor: "pointer", padding: 8 }}>
          {mobileOpen ? <XIcon size={24} color="#1E2761" /> : <Menu size={24} color="#1E2761" />}
        </button>
      </div>
      {/* Mobile Menu */}
      {mobileOpen && (
        <div style={{ background: "#fff", borderTop: "1px solid #E2E8F0", padding: "16px 32px 24px" }} className="nav-mobile-menu">
          {links.map(l => (
            <a key={l.label} href={l.href} onClick={() => setMobileOpen(false)} style={{ display: "block", padding: "12px 0", fontSize: 15, fontWeight: 500, color: "#334155", textDecoration: "none", borderBottom: "1px solid #F1F5F9" }}>{l.label}</a>
          ))}
          <a href="/contact" onClick={() => setMobileOpen(false)} style={{ display: "block", marginTop: 16, background: "#B91C1C", color: "#fff", padding: "12px 24px", borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: "none", textAlign: "center" }}>Free Consultation</a>
        </div>
      )}
    </nav>
  );
}

// ─── Hero Section ───
function Hero() {
  const stats = [
    { value: "€200", label: "Per Month", sub: "All-inclusive" },
    { value: "85%+", label: "Cost Savings", sub: "vs. Going Alone" },
    { value: "2-4", label: "Weeks Setup", sub: "Not Months" },
  ];
  return (
    <section id="hero" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden", background: "#FAFBFC" }}>
      {/* Subtle grid pattern */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(#CBD5E1 1px, transparent 1px)", backgroundSize: "40px 40px", opacity: 0.4 }} />
      {/* Accent shapes */}
      <div style={{ position: "absolute", top: -120, right: -120, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(30,39,97,0.06) 0%, transparent 70%)" }} />
      <div style={{ position: "absolute", bottom: -80, left: -80, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(185,28,28,0.05) 0%, transparent 70%)" }} />

      <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto", padding: "120px 32px 80px", width: "100%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="hero-grid">
          {/* Left */}
          <div>
            <Reveal>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 100, padding: "6px 16px", marginBottom: 24 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22C55E", animation: "pulse 2s infinite" }} />
                <span style={{ fontSize: 13, fontWeight: 600, color: "#1D4ED8" }}>EU-India FTA Now Active — Perfect Time to Expand</span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 4.5vw, 58px)", lineHeight: 1.12, color: "#0F172A", fontWeight: 700, letterSpacing: "-1px", marginBottom: 20 }}>
                Your Gateway<br />
                <span style={{ background: "linear-gradient(135deg, #B91C1C, #7F1D1D)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>to Europe</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p style={{ fontSize: 18, lineHeight: 1.7, color: "#475569", maxWidth: 520, marginBottom: 32 }}>
                We register your Europe branch, act as your local representative, and connect you to EU buyers — so you can sell in Europe without relocating.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <a href="/contact" style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "linear-gradient(135deg, #1E2761, #2D3A8C)", color: "#fff",
                  padding: "14px 32px", borderRadius: 10, fontSize: 15, fontWeight: 600,
                  textDecoration: "none", boxShadow: "0 4px 20px rgba(30,39,97,0.3)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(30,39,97,0.4)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(30,39,97,0.3)"; }}
                >Start Your EU Expansion <ArrowRight size={18} /></a>
                <a href="/how-it-works" style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "#fff", color: "#1E2761", border: "2px solid #E2E8F0",
                  padding: "14px 28px", borderRadius: 10, fontSize: 15, fontWeight: 600,
                  textDecoration: "none", transition: "border-color 0.2s",
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "#1E2761"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "#E2E8F0"}
                >See How It Works</a>
              </div>
            </Reveal>
            <Reveal delay={0.4}>
              <div style={{ display: "flex", gap: 40, marginTop: 48 }}>
                {stats.map((s, i) => (
                  <div key={i}>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700, color: "#1E2761", lineHeight: 1 }}>{s.value}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#334155", marginTop: 4 }}>{s.label}</div>
                    <div style={{ fontSize: 11, color: "#94A3B8" }}>{s.sub}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
          {/* Right — Trust card */}
          <Reveal delay={0.2}>
            <div style={{ position: "relative" }}>
              <div style={{
                background: "#fff", borderRadius: 20, padding: 40, border: "1px solid #E2E8F0",
                boxShadow: "0 20px 60px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: "linear-gradient(135deg, #1E2761, #2D3A8C)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Building2 size={24} color="#fff" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: "#0F172A", fontSize: 16 }}>Europe Branch Setup</div>
                    <div style={{ fontSize: 13, color: "#64748B" }}>Netherlands-based · Fully Managed</div>
                  </div>
                </div>
                {[
                  { icon: <FileCheck size={18} />, text: "Branch Registration & Business Address" },
                  { icon: <Users size={18} />, text: "Local Representation & Buyer Meetings" },
                  { icon: <Truck size={18} />, text: "Warehouse & Distribution (Netherlands)" },
                  { icon: <Shield size={18} />, text: "Full VAT, Accounting & Legal Compliance" },
                  { icon: <TrendingUp size={18} />, text: "EU Market Access & Buyer Connections" },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0", borderBottom: i < 4 ? "1px solid #F1F5F9" : "none" }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: "#F1F5F9", display: "flex", alignItems: "center", justifyContent: "center", color: "#1E2761", flexShrink: 0 }}>{item.icon}</div>
                    <span style={{ fontSize: 14.5, color: "#334155", fontWeight: 500 }}>{item.text}</span>
                  </div>
                ))}
                <div style={{ marginTop: 24, background: "linear-gradient(135deg, #FEF3C7, #FDE68A)", borderRadius: 12, padding: "16px 20px", display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 28 }}>🇪🇺</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#92400E" }}>EU-India FTA Advantage</div>
                    <div style={{ fontSize: 12, color: "#A16207" }}>90%+ tariff elimination — expand now at the lowest cost ever</div>
                  </div>
                </div>
              </div>
              {/* Floating badge */}
              <div style={{
                position: "absolute", top: -16, right: -16, background: "#fff", borderRadius: 14,
                padding: "12px 18px", boxShadow: "0 8px 30px rgba(0,0,0,0.1)", border: "1px solid #E2E8F0",
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: "#DCFCE7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <BadgeCheck size={18} color="#166534" />
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#166534" }}>Save 85%+</div>
                  <div style={{ fontSize: 10, color: "#64748B" }}>vs. DIY setup</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Trusted by bar */}
        <Reveal delay={0.5}>
          <div style={{ marginTop: 72, paddingTop: 32, borderTop: "1px solid #E2E8F0", textAlign: "center" }}>
            <p style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: 2, color: "#94A3B8", marginBottom: 20 }}>Trusted Framework & Compliance</p>
            <div style={{ display: "flex", justifyContent: "center", gap: 48, flexWrap: "wrap", alignItems: "center", opacity: 0.5 }}>
              {["Netherlands KVK Registered", "EU VAT Compliant", "GDPR Ready", "EU-India FTA Aligned", "Dutch Warehouse Certified"].map((t, i) => (
                <span key={i} style={{ fontSize: 13, fontWeight: 600, color: "#64748B", whiteSpace: "nowrap" }}>{t}</span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: block !important; }
        }
        @media (min-width: 901px) {
          .nav-mobile-btn { display: none !important; }
          .nav-mobile-menu { display: none !important; }
        }
      `}</style>
    </section>
  );
}

// ─── Services Section ───
function Services() {
  const services = [
    { icon: <FileCheck size={24} />, title: "Branch Registration", desc: "We register your European branch office in the Netherlands, providing you with a legitimate EU business address and legal presence — without forming a separate company.", color: "#1E2761" },
    { icon: <Users size={24} />, title: "Local Representation", desc: "Our team attends meetings, negotiates with buyers, and represents your brand in person across Europe. You get a face on the ground without relocating.", color: "#B91C1C" },
    { icon: <Warehouse size={24} />, title: "Warehouse & Logistics", desc: "Store, manage, and distribute your products from our Netherlands warehouse — the gateway to 500M+ European consumers with 24-hour delivery reach.", color: "#0369A1" },
    { icon: <Shield size={24} />, title: "Compliance & Legal", desc: "Full VAT registration, accounting, tax filing, and GDPR compliance. We handle the regulatory maze so you can focus on selling.", color: "#166534" },
    { icon: <TrendingUp size={24} />, title: "Buyer Connections", desc: "We connect you directly with EU retailers, distributors, and procurement channels. Leveraging our network to open doors that would take years to access alone.", color: "#7C3AED" },
    { icon: <Scale size={24} />, title: "Import & Export Support", desc: "Navigate customs, duties, and trade documentation with expert guidance. Post-FTA tariff advantages maximised for every shipment.", color: "#92400E" },
  ];
  return (
    <section id="services" style={{ padding: "100px 32px", background: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2.5, color: "#B91C1C" }}>What We Do</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3.5vw, 42px)", color: "#0F172A", marginTop: 12, lineHeight: 1.2 }}>Everything You Need to<br />Sell in Europe</h2>
            <p style={{ fontSize: 16, color: "#64748B", marginTop: 16, maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>One partner. One monthly fee. Complete European market access — from registration to your first buyer meeting.</p>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 24 }}>
          {services.map((s, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div style={{
                background: "#FAFBFC", borderRadius: 16, padding: 32, border: "1px solid #E2E8F0",
                transition: "transform 0.3s, box-shadow 0.3s, border-color 0.3s", cursor: "default", height: "100%",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.08)"; e.currentTarget.style.borderColor = s.color + "40"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "#E2E8F0"; }}
              >
                <div style={{ width: 52, height: 52, borderRadius: 14, background: s.color + "10", display: "flex", alignItems: "center", justifyContent: "center", color: s.color, marginBottom: 20 }}>{s.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0F172A", marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontSize: 14.5, color: "#64748B", lineHeight: 1.65 }}>{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Process Section ───
function Process() {
  const steps = [
    { num: "01", title: "Consultation & Onboarding", desc: "We assess your business, target markets, and product portfolio. Within days, we outline your EU entry strategy.", duration: "Week 1" },
    { num: "02", title: "Branch Registration", desc: "We register your European branch in the Netherlands, set up your business address, and complete all legal formalities.", duration: "Week 1–2" },
    { num: "03", title: "Compliance Setup", desc: "VAT registration, tax enrolment, accounting systems, and GDPR compliance — all handled by our team.", duration: "Week 2–3" },
    { num: "04", title: "Go Live & Represent", desc: "Your EU branch is operational. We begin attending buyer meetings, managing logistics, and representing your brand across Europe.", duration: "Week 3–4" },
  ];
  return (
    <section id="process" style={{ padding: "100px 32px", background: "#F8FAFC" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2.5, color: "#B91C1C" }}>How It Works</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3.5vw, 42px)", color: "#0F172A", marginTop: 12 }}>Operational in Weeks, Not Months</h2>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 32 }}>
          {steps.map((s, i) => (
            <Reveal key={i} delay={i * 0.12}>
              <div style={{ position: "relative", background: "#fff", borderRadius: 16, padding: 32, border: "1px solid #E2E8F0", height: "100%" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 48, fontWeight: 700, color: "#F1F5F9", position: "absolute", top: 16, right: 20, lineHeight: 1 }}>{s.num}</div>
                <div style={{ display: "inline-block", background: "#EFF6FF", color: "#1D4ED8", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 20, marginBottom: 16, letterSpacing: "0.5px" }}>{s.duration}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0F172A", marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.65 }}>{s.desc}</p>
                {i < 3 && <div className="process-arrow" style={{ position: "absolute", top: "50%", right: -20, transform: "translateY(-50%)", color: "#CBD5E1" }}><ChevronRight size={24} /></div>}
              </div>
            </Reveal>
          ))}
        </div>
        <style>{`.process-arrow { display: block; } @media(max-width:900px) { .process-arrow { display: none !important; } }`}</style>
      </div>
    </section>
  );
}

// ─── Comparison Table ───
function Compare() {
  const features = [
    { name: "Branch Registration", you: "yes", reg: "yes", law: "yes", eor: "no", tpl: "no" },
    { name: "Business Address", you: "yes", reg: "yes", law: "yes", eor: "no", tpl: "no" },
    { name: "Local Representation", you: "yes", reg: "partial", law: "no", eor: "no", tpl: "no" },
    { name: "Buyer Meetings", you: "yes", reg: "no", law: "no", eor: "no", tpl: "no" },
    { name: "Warehouse & Logistics", you: "yes", reg: "no", law: "no", eor: "no", tpl: "yes" },
    { name: "VAT & Tax Compliance", you: "yes", reg: "yes", law: "yes", eor: "yes", tpl: "partial" },
    { name: "India-Specific Focus", you: "yes", reg: "no", law: "no", eor: "no", tpl: "no" },
    { name: "Multi-Country EU", you: "partial", reg: "yes", law: "yes", eor: "yes", tpl: "yes" },
    { name: "Digital Platform", you: "no", reg: "partial", law: "no", eor: "yes", tpl: "yes" },
  ];
  const Tag = ({ val }) => {
    if (val === "yes") return <span style={{ background: "#DCFCE7", color: "#166534", fontSize: 12, fontWeight: 600, padding: "3px 12px", borderRadius: 20, display: "inline-flex", alignItems: "center", gap: 4 }}><Check size={13} /> Yes</span>;
    if (val === "no") return <span style={{ background: "#FEE2E2", color: "#B91C1C", fontSize: 12, fontWeight: 600, padding: "3px 12px", borderRadius: 20, display: "inline-flex", alignItems: "center", gap: 4 }}><X size={13} /> No</span>;
    return <span style={{ background: "#FEF3C7", color: "#92400E", fontSize: 12, fontWeight: 600, padding: "3px 12px", borderRadius: 20, display: "inline-flex", alignItems: "center", gap: 4 }}><Minus size={13} /> Partial</span>;
  };
  return (
    <section id="compare" style={{ padding: "100px 32px", background: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2.5, color: "#B91C1C" }}>Why Choose Us</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3.5vw, 42px)", color: "#0F172A", marginTop: 12 }}>See How We Compare</h2>
            <p style={{ fontSize: 16, color: "#64748B", marginTop: 12, maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>We're the only provider that bundles branch registration, local representation, warehouse logistics, and buyer connections — all for €200/month.</p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div style={{ overflowX: "auto", borderRadius: 16, border: "1px solid #E2E8F0", boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
              <thead>
                <tr>
                  <th style={{ background: "#1E2761", color: "#fff", padding: "16px 20px", textAlign: "left", fontSize: 13, fontWeight: 600, letterSpacing: "0.3px" }}>Feature</th>
                  <th style={{ background: "linear-gradient(135deg, #B91C1C, #991B1B)", color: "#fff", padding: "16px 20px", textAlign: "center", fontSize: 13, fontWeight: 600 }}>EuroBranch<br /><span style={{ fontSize: 11, opacity: 0.8, fontWeight: 400 }}>€200/mo</span></th>
                  <th style={{ background: "#1E2761", color: "#fff", padding: "16px 20px", textAlign: "center", fontSize: 13, fontWeight: 600 }}>Registration Firms<br /><span style={{ fontSize: 11, opacity: 0.7, fontWeight: 400 }}>€500–2K+/mo</span></th>
                  <th style={{ background: "#1E2761", color: "#fff", padding: "16px 20px", textAlign: "center", fontSize: 13, fontWeight: 600 }}>Law Firms<br /><span style={{ fontSize: 11, opacity: 0.7, fontWeight: 400 }}>Custom rates</span></th>
                  <th style={{ background: "#1E2761", color: "#fff", padding: "16px 20px", textAlign: "center", fontSize: 13, fontWeight: 600 }}>EOR Providers<br /><span style={{ fontSize: 11, opacity: 0.7, fontWeight: 400 }}>$500–700/emp</span></th>
                  <th style={{ background: "#1E2761", color: "#fff", padding: "16px 20px", textAlign: "center", fontSize: 13, fontWeight: 600, borderRadius: "0 16px 0 0" }}>3PL Logistics<br /><span style={{ fontSize: 11, opacity: 0.7, fontWeight: 400 }}>Per order</span></th>
                </tr>
              </thead>
              <tbody>
                {features.map((f, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? "#FAFBFC" : "#fff" }}>
                    <td style={{ padding: "14px 20px", fontSize: 14, fontWeight: 600, color: "#1E2761", borderBottom: "1px solid #F1F5F9" }}>{f.name}</td>
                    <td style={{ padding: "14px 20px", textAlign: "center", borderBottom: "1px solid #F1F5F9", background: i % 2 === 0 ? "#FFF7ED08" : "transparent" }}><Tag val={f.you} /></td>
                    <td style={{ padding: "14px 20px", textAlign: "center", borderBottom: "1px solid #F1F5F9" }}><Tag val={f.reg} /></td>
                    <td style={{ padding: "14px 20px", textAlign: "center", borderBottom: "1px solid #F1F5F9" }}><Tag val={f.law} /></td>
                    <td style={{ padding: "14px 20px", textAlign: "center", borderBottom: "1px solid #F1F5F9" }}><Tag val={f.eor} /></td>
                    <td style={{ padding: "14px 20px", textAlign: "center", borderBottom: "1px solid #F1F5F9" }}><Tag val={f.tpl} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Cost Comparison ───
function CostCompare() {
  const items = [
    { label: "Setup / Deposit", alone: "€3,000 deposit", us: "€1,000 one-time" },
    { label: "Monthly Rent", alone: "€1,000+ / month", us: "Included" },
    { label: "Utilities", alone: "€200–400 / month", us: "Included" },
    { label: "Physical Presence", alone: "Person required", us: "We handle it" },
    { label: "Local Representation", alone: "Hire separately", us: "Included" },
    { label: "Est. Monthly Cost", alone: "€1,400–1,800+", us: "€200/mo", highlight: true },
  ];
  return (
    <section style={{ padding: "80px 32px", background: "#0F172A" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3.5vw, 38px)", color: "#fff" }}>The Real Cost of Going It Alone</h2>
            <p style={{ fontSize: 16, color: "#94A3B8", marginTop: 12 }}>Year 1 estimated cost of DIY: <strong style={{ color: "#FCA5A5" }}>€18,000–€25,000+</strong></p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid #334155" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", background: "#1E293B" }}>
              <div style={{ padding: "16px 24px", fontSize: 13, fontWeight: 600, color: "#94A3B8" }}>Cost Item</div>
              <div style={{ padding: "16px 24px", fontSize: 13, fontWeight: 600, color: "#FCA5A5", textAlign: "center" }}>Going It Alone</div>
              <div style={{ padding: "16px 24px", fontSize: 13, fontWeight: 600, color: "#86EFAC", textAlign: "center" }}>With Us</div>
            </div>
            {items.map((item, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
                background: item.highlight ? "linear-gradient(135deg, #1E2761, #2D3A8C)" : i % 2 === 0 ? "#0F172A" : "#1E293B10",
                borderTop: "1px solid #334155",
              }}>
                <div style={{ padding: "16px 24px", fontSize: 14, fontWeight: item.highlight ? 700 : 500, color: item.highlight ? "#fff" : "#CBD5E1" }}>{item.label}</div>
                <div style={{ padding: "16px 24px", fontSize: 14, color: item.highlight ? "#FCA5A5" : "#94A3B8", textAlign: "center", fontWeight: item.highlight ? 700 : 400 }}>{item.alone}</div>
                <div style={{ padding: "16px 24px", fontSize: 14, color: item.highlight ? "#86EFAC" : "#86EFAC", textAlign: "center", fontWeight: item.highlight ? 700 : 500 }}>{item.us}</div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <span style={{ display: "inline-block", background: "linear-gradient(135deg, #166534, #15803D)", color: "#fff", padding: "10px 28px", borderRadius: 100, fontSize: 15, fontWeight: 700 }}>Save 85%+ with our managed service</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Pricing Section ───
function Pricing() {
  return (
    <section id="pricing" style={{ padding: "100px 32px", background: "#F8FAFC" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2.5, color: "#B91C1C" }}>Simple Pricing</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3.5vw, 42px)", color: "#0F172A", marginTop: 12 }}>Transparent. No Hidden Fees.</h2>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="pricing-grid">
          <Reveal delay={0.1}>
            <div style={{ background: "#fff", borderRadius: 20, padding: 40, border: "2px solid #E2E8F0", textAlign: "center", height: "100%" }}>
              <div style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: "#64748B", marginBottom: 16 }}>One-Time Setup</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 56, fontWeight: 700, color: "#1E2761", lineHeight: 1 }}>€1,000</div>
              <div style={{ fontSize: 14, color: "#94A3B8", marginTop: 8, marginBottom: 24 }}>Paid once at onboarding</div>
              <div style={{ borderTop: "1px solid #F1F5F9", paddingTop: 24, textAlign: "left" }}>
                {["Branch registration in Europe", "Business address setup", "Legal documentation", "Onboarding & strategy session"].map((t, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", fontSize: 14, color: "#475569" }}>
                    <Check size={16} color="#166534" />{t}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div style={{ background: "linear-gradient(135deg, #1E2761, #2D3A8C)", borderRadius: 20, padding: 40, textAlign: "center", position: "relative", height: "100%" }}>
              <div style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: "#94A3B8", marginBottom: 16 }}>Monthly Retainer</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 56, fontWeight: 700, color: "#fff", lineHeight: 1 }}>€200<span style={{ fontSize: 20, fontWeight: 400, opacity: 0.7 }}>/mo</span></div>
              <div style={{ fontSize: 14, color: "#94A3B8", marginTop: 8, marginBottom: 24 }}>Billed monthly</div>
              <div style={{ borderTop: "1px solid #334155", paddingTop: 24, textAlign: "left" }}>
                {["Local representation & buyer meetings", "Full VAT & accounting compliance", "Warehouse & distribution access", "Ongoing legal & regulatory support", "Quarterly business review"].map((t, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", fontSize: 14, color: "#CBD5E1" }}>
                    <Check size={16} color="#86EFAC" />{t}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
        <style>{`@media(max-width:700px) { .pricing-grid { grid-template-columns: 1fr !important; } }`}</style>
      </div>
    </section>
  );
}

// ─── About Section ───
function About() {
  return (
    <section id="about" style={{ padding: "100px 32px", background: "#fff" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="about-grid">
          <Reveal>
            <div>
              <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2.5, color: "#B91C1C" }}>About Us</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3.5vw, 38px)", color: "#0F172A", marginTop: 12, lineHeight: 1.25 }}>Built by People Who Understand Both Worlds</h2>
              <p style={{ fontSize: 15, color: "#64748B", lineHeight: 1.7, marginTop: 20 }}>
                We're a Netherlands-based team with deep roots in Indian business culture. We saw how Indian SMEs struggled to break into Europe — blocked by regulations, high costs, and lack of local networks. So we built a service that eliminates every barrier.
              </p>
              <p style={{ fontSize: 15, color: "#64748B", lineHeight: 1.7, marginTop: 16 }}>
                With our own warehouse in the Netherlands, import/export expertise, and a strong network of European buyers and distributors, we're not just filing paperwork — we're actively building your European business alongside you.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 32 }}>
                {[
                  { val: "Netherlands", label: "Based" },
                  { val: "India-EU", label: "Specialisation" },
                  { val: "Full-Service", label: "Model" },
                  { val: "Weeks", label: "To Go Live" },
                ].map((s, i) => (
                  <div key={i} style={{ background: "#F8FAFC", borderRadius: 12, padding: "16px 20px" }}>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, color: "#1E2761" }}>{s.val}</div>
                    <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 2 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div style={{ background: "linear-gradient(135deg, #F8FAFC, #EFF6FF)", borderRadius: 20, padding: 48, border: "1px solid #E2E8F0", position: "relative" }}>
              <div style={{ fontSize: 64, lineHeight: 1, marginBottom: 24 }}>🇳🇱 🤝 🇮🇳</div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "#0F172A", marginBottom: 16 }}>Netherlands ↔ India</h3>
              <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.7 }}>The Netherlands is Europe's logistics gateway — home to Rotterdam (Europe's largest port) and Schiphol Airport. From our base here, your products can reach 500 million European consumers within 24 hours.</p>
              <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 12 }}>
                {["Strategic EU gateway location", "Direct access to major ports & airports", "Business-friendly regulatory environment", "Strong India-Netherlands trade history"].map((t, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#475569" }}>
                    <Check size={15} color="#166534" style={{ flexShrink: 0 }} />{t}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
        <style>{`@media(max-width:800px) { .about-grid { grid-template-columns: 1fr !important; } }`}</style>
      </div>
    </section>
  );
}

// ─── CTA / Contact Section ───
function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" style={{ padding: "100px 32px", background: "linear-gradient(180deg, #F8FAFC, #EFF6FF)" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }} className="contact-grid">
          <Reveal>
            <div>
              <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2.5, color: "#B91C1C" }}>Get Started</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3.5vw, 38px)", color: "#0F172A", marginTop: 12, lineHeight: 1.25 }}>Schedule Your Free Consultation</h2>
              <p style={{ fontSize: 15, color: "#64748B", lineHeight: 1.7, marginTop: 16 }}>Your EU branch can be operational in weeks. Let's discuss your expansion goals and create a tailored plan — no obligation, no cost.</p>
              <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 20 }}>
                {[
                  { icon: <MapPin size={18} />, label: "Netherlands (Warehouse & Office)" },
                  { icon: <Mail size={18} />, label: "hello@eurobranch.eu" },
                  { icon: <Phone size={18} />, label: "+31 (0) XX XXX XXXX" },
                ].map((c, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center", color: "#1E2761" }}>{c.icon}</div>
                    <span style={{ fontSize: 15, color: "#334155" }}>{c.label}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 40, background: "linear-gradient(135deg, #FEF3C7, #FDE68A)", borderRadius: 14, padding: "20px 24px" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#92400E", marginBottom: 6 }}>EU-India FTA is Active</div>
                <div style={{ fontSize: 13, color: "#A16207", lineHeight: 1.6 }}>Tariffs on 90%+ of goods are being eliminated. This is the best time in history for Indian businesses to enter Europe. Don't wait.</div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div style={{ background: "#fff", borderRadius: 20, padding: 36, border: "1px solid #E2E8F0", boxShadow: "0 8px 30px rgba(0,0,0,0.06)" }}>
              {sent ? (
                <div style={{ textAlign: "center", padding: "48px 0" }}>
                  <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#DCFCE7", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                    <Check size={32} color="#166534" />
                  </div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "#0F172A" }}>Thank You!</h3>
                  <p style={{ fontSize: 14, color: "#64748B", marginTop: 8 }}>We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, color: "#0F172A", marginBottom: 24 }}>Tell Us About Your Business</h3>
                  {[
                    { label: "Full Name", type: "text", placeholder: "Your name" },
                    { label: "Company Name", type: "text", placeholder: "Your company" },
                    { label: "Email", type: "email", placeholder: "you@company.com" },
                    { label: "Phone", type: "tel", placeholder: "+91 XXXXX XXXXX" },
                  ].map((f, i) => (
                    <div key={i} style={{ marginBottom: 18 }}>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#334155", marginBottom: 6 }}>{f.label}</label>
                      <input type={f.type} placeholder={f.placeholder} style={{
                        width: "100%", padding: "12px 16px", borderRadius: 10, border: "1.5px solid #E2E8F0",
                        fontSize: 14, color: "#0F172A", outline: "none", transition: "border-color 0.2s", background: "#FAFBFC",
                      }}
                        onFocus={e => e.target.style.borderColor = "#1E2761"}
                        onBlur={e => e.target.style.borderColor = "#E2E8F0"}
                      />
                    </div>
                  ))}
                  <div style={{ marginBottom: 24 }}>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#334155", marginBottom: 6 }}>What products do you sell?</label>
                    <textarea rows={3} placeholder="Brief description of your products and target EU market..." style={{
                      width: "100%", padding: "12px 16px", borderRadius: 10, border: "1.5px solid #E2E8F0",
                      fontSize: 14, color: "#0F172A", outline: "none", resize: "vertical", fontFamily: "inherit", background: "#FAFBFC",
                    }}
                      onFocus={e => e.target.style.borderColor = "#1E2761"}
                      onBlur={e => e.target.style.borderColor = "#E2E8F0"}
                    />
                  </div>
                  <button onClick={() => setSent(true)} style={{
                    width: "100%", padding: "14px", borderRadius: 10, border: "none",
                    background: "linear-gradient(135deg, #1E2761, #2D3A8C)", color: "#fff",
                    fontSize: 15, fontWeight: 600, cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s",
                    boxShadow: "0 4px 16px rgba(30,39,97,0.25)",
                  }}
                    onMouseEnter={e => { e.target.style.transform = "translateY(-1px)"; e.target.style.boxShadow = "0 6px 24px rgba(30,39,97,0.35)"; }}
                    onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 4px 16px rgba(30,39,97,0.25)"; }}
                  >Book Free Consultation <ArrowRight size={16} style={{ marginLeft: 8, verticalAlign: "middle" }} /></button>
                </>
              )}
            </div>
          </Reveal>
        </div>
        <style>{`@media(max-width:800px) { .contact-grid { grid-template-columns: 1fr !important; } }`}</style>
      </div>
    </section>
  );
}

// ─── Footer ───
function Footer() {
  return (
    <footer style={{ background: "#0F172A", padding: "64px 32px 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48 }} className="footer-grid">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #2D3A8C, #4F46E5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Globe size={18} color="#fff" />
              </div>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, color: "#fff" }}>EuroBranch</span>
            </div>
            <p style={{ fontSize: 14, color: "#94A3B8", lineHeight: 1.7, maxWidth: 300 }}>Your gateway to Europe. We register your branch, represent your brand, and connect you to EU buyers — so you can sell in Europe without relocating.</p>
          </div>
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 16, textTransform: "uppercase", letterSpacing: 1 }}>Services</h4>
            {["Branch Registration", "Local Representation", "Warehouse & Logistics", "Compliance & Legal", "Buyer Connections"].map((t, i) => (
              <a key={i} href="/how-it-works" style={{ display: "block", fontSize: 14, color: "#94A3B8", textDecoration: "none", padding: "4px 0", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = "#fff"}
                onMouseLeave={e => e.target.style.color = "#94A3B8"}
              >{t}</a>
            ))}
          </div>
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 16, textTransform: "uppercase", letterSpacing: 1 }}>Company</h4>
            {[{label:"About Us",href:"/about"},{label:"How It Works",href:"/how-it-works"},{label:"Pricing",href:"/pricing"},{label:"Blog",href:"/blog"},{label:"Contact",href:"/contact"}].map((l, i) => (
              <a key={i} href={l.href} style={{ display: "block", fontSize: 14, color: "#94A3B8", textDecoration: "none", padding: "4px 0", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = "#fff"}
                onMouseLeave={e => e.target.style.color = "#94A3B8"}
              >{l.label}</a>
            ))}
          </div>
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 16, textTransform: "uppercase", letterSpacing: 1 }}>Contact</h4>
            <p style={{ fontSize: 14, color: "#94A3B8", lineHeight: 1.8 }}>
              Netherlands<br />
              hello@eurobranch.eu<br />
              +31 (0) XX XXX XXXX
            </p>
          </div>
        </div>
        <div style={{ borderTop: "1px solid #1E293B", marginTop: 48, paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <span style={{ fontSize: 13, color: "#64748B" }}>© 2026 EuroBranch. All rights reserved.</span>
          <div style={{ display: "flex", gap: 24 }}>
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((t, i) => (
              <a key={i} href="#" style={{ fontSize: 13, color: "#64748B", textDecoration: "none" }}>{t}</a>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:800px) { .footer-grid { grid-template-columns: 1fr 1fr !important; } }`}</style>
      </div>
    </footer>
  );
}

// ─── Main App ───
export default function App() {
  return (
    <div style={{ "--font-display": "'DM Serif Display', Georgia, serif", fontFamily: "'DM Sans', -apple-system, sans-serif" }}>
      <Nav />
      <Hero />
      <Services />
      <Process />
      <Compare />
      <CostCompare />
      <Pricing />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
