"use client";
import { useState, useEffect, useRef } from "react";
import { Globe, ArrowRight, ArrowDown, Check, ChevronDown, ChevronUp, Menu, X as XIcon, FileCheck, Users, Warehouse, Shield, TrendingUp, Scale, Clock, Zap, Phone, Mail, MessageSquare, Package, ClipboardCheck, Building2, Truck, Handshake, BadgeCheck, CircleDot, HelpCircle, Calendar, Star } from "lucide-react";

function useInView() {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.unobserve(el); } }, { threshold: 0.12 });
    o.observe(el);
    return () => o.disconnect();
  }, []);
  return [ref, v];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, v] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    }}>{children}</div>
  );
}

/* ─── Nav ─── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mob, setMob] = useState(false);
  useEffect(() => { const f = () => setScrolled(window.scrollY > 40); window.addEventListener("scroll", f); return () => window.removeEventListener("scroll", f); }, []);
  const links = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Pricing", href: "/pricing" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, background: scrolled ? "rgba(255,255,255,0.97)" : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none", borderBottom: scrolled ? "1px solid #E2E8F0" : "1px solid transparent", transition: "all 0.35s ease" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: "linear-gradient(135deg, #1E2761, #2D3A8C)", display: "flex", alignItems: "center", justifyContent: "center" }}><Globe size={20} color="#fff" strokeWidth={2.2} /></div>
          <div><span style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, color: "#1E2761" }}>EuroBranch</span><span style={{ display: "block", fontSize: 10, color: "#64748B", letterSpacing: "1.5px", textTransform: "uppercase", marginTop: -2 }}>Gateway to Europe</span></div>
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 28 }} className="nav-desktop">
          {links.map(l => <a key={l.label} href={l.href} style={{ textDecoration: "none", fontSize: 14, fontWeight: 500, color: "#475569", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = "#B91C1C"} onMouseLeave={e => e.target.style.color = "#475569"}>{l.label}</a>)}
          <a href="/contact" style={{ background: "linear-gradient(135deg, #B91C1C, #991B1B)", color: "#fff", padding: "10px 24px", borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: "none", boxShadow: "0 2px 8px rgba(185,28,28,0.25)", transition: "transform 0.2s" }} onMouseEnter={e => e.target.style.transform = "translateY(-1px)"} onMouseLeave={e => e.target.style.transform = "translateY(0)"}>Free Consultation</a>
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
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(#CBD5E1 1px, transparent 1px)", backgroundSize: "40px 40px", opacity: 0.35 }} />
      <div style={{ position: "absolute", top: -100, left: -100, width: 450, height: 450, borderRadius: "50%", background: "radial-gradient(circle, rgba(185,28,28,0.04) 0%, transparent 70%)" }} />
      <div style={{ position: "relative", maxWidth: 900, margin: "0 auto", padding: "80px 32px 72px", textAlign: "center" }}>
        <Reveal>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 100, padding: "6px 16px", marginBottom: 24 }}>
            <Clock size={14} color="#1D4ED8" />
            <span style={{ fontSize: 13, fontWeight: 600, color: "#1D4ED8" }}>From Inquiry to Operational in 2–4 Weeks</span>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(34px, 4.5vw, 52px)", lineHeight: 1.15, color: "#0F172A", fontWeight: 700, letterSpacing: "-0.8px", marginBottom: 20 }}>
            How It <span style={{ background: "linear-gradient(135deg, #B91C1C, #7F1D1D)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Works</span>
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p style={{ fontSize: 18, lineHeight: 1.7, color: "#475569", maxWidth: 600, margin: "0 auto 36px" }}>
            A simple, transparent 4-step process that takes you from first conversation to fully operational European branch — with zero paperwork headaches on your end.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <a href="#process" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#1E2761", fontSize: 15, fontWeight: 600, textDecoration: "none", padding: "12px 28px", borderRadius: 10, border: "2px solid #E2E8F0", transition: "border-color 0.2s, background 0.2s" }} onMouseEnter={e => { e.currentTarget.style.borderColor = "#1E2761"; e.currentTarget.style.background = "#F8FAFC"; }} onMouseLeave={e => { e.currentTarget.style.borderColor = "#E2E8F0"; e.currentTarget.style.background = "transparent"; }}>
            See the Steps <ArrowDown size={16} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Overview Bar ─── */
function Overview() {
  const items = [
    { icon: <MessageSquare size={20} />, label: "Consult", time: "Day 1" },
    { icon: <FileCheck size={20} />, label: "Register", time: "Week 1–2" },
    { icon: <Shield size={20} />, label: "Comply", time: "Week 2–3" },
    { icon: <Zap size={20} />, label: "Go Live", time: "Week 3–4" },
  ];
  return (
    <section id="overview" style={{ padding: "56px 32px", background: "#fff", borderBottom: "1px solid #E2E8F0" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <Reveal>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative" }} className="overview-bar">
            {/* Connecting line */}
            <div style={{ position: "absolute", top: 28, left: 56, right: 56, height: 2, background: "linear-gradient(to right, #B91C1C, #1E2761)", zIndex: 0 }} className="overview-line" />
            {items.map((it, i) => (
              <div key={i} style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 16, margin: "0 auto 12px",
                  background: i === 3 ? "linear-gradient(135deg, #B91C1C, #991B1B)" : "#fff",
                  border: i === 3 ? "none" : "2px solid #E2E8F0",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: i === 3 ? "#fff" : "#1E2761",
                  boxShadow: i === 3 ? "0 4px 16px rgba(185,28,28,0.25)" : "0 2px 8px rgba(0,0,0,0.04)",
                }}>{it.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#0F172A" }}>{it.label}</div>
                <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 2 }}>{it.time}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Detailed Process Steps ─── */
function Process() {
  const steps = [
    {
      num: "01", title: "Discovery & Consultation", timeline: "Day 1 – Week 1", color: "#1E2761",
      desc: "We start with a free, no-obligation consultation to understand your business, products, and European ambitions. This isn't a generic intake call — we dig deep into your specific situation.",
      details: [
        "Assess your product portfolio and target EU markets",
        "Identify the right entry strategy for your business type",
        "Review regulatory requirements specific to your industry",
        "Outline a clear timeline, cost breakdown, and action plan",
        "Answer every question you have about EU market entry",
      ],
      deliverable: "Custom EU Entry Strategy Document",
      icon: <MessageSquare size={24} />,
    },
    {
      num: "02", title: "Branch Registration & Setup", timeline: "Week 1 – 2", color: "#B91C1C",
      desc: "We handle the entire registration process with Dutch authorities. You provide the documents, we do everything else — from Chamber of Commerce filing to business address setup.",
      details: [
        "Register your European branch at the Netherlands KVK (Chamber of Commerce)",
        "Set up your official EU business address",
        "Prepare all legal documentation and articles of association",
        "Obtain your European business registration number",
        "Configure your branch structure to optimise for tax and liability",
      ],
      deliverable: "Official KVK Registration Certificate & EU Business Address",
      icon: <Building2 size={24} />,
    },
    {
      num: "03", title: "Compliance & Infrastructure", timeline: "Week 2 – 3", color: "#166534",
      desc: "While your branch is being registered, we simultaneously set up all the compliance infrastructure you need — VAT, accounting, tax, and warehouse access. No time wasted.",
      details: [
        "VAT registration with Dutch tax authorities (Belastingdienst)",
        "Set up accounting and bookkeeping systems",
        "GDPR compliance framework for your EU operations",
        "Warehouse allocation and inventory management setup",
        "Import/export documentation and customs procedures configured",
      ],
      deliverable: "VAT Number, Accounting System & Warehouse Access",
      icon: <ClipboardCheck size={24} />,
    },
    {
      num: "04", title: "Go Live & Represent", timeline: "Week 3 – 4", color: "#7C3AED",
      desc: "Your EU branch is now fully operational. We begin actively representing your brand — attending buyer meetings, managing logistics, and connecting you with European distribution channels.",
      details: [
        "Begin local representation and attend buyer meetings on your behalf",
        "Activate warehouse operations — receive, store, and ship your products",
        "Connect you with our network of EU retailers and distributors",
        "Handle all ongoing compliance — tax filings, accounting, regulatory updates",
        "Quarterly business reviews to track progress and optimise strategy",
      ],
      deliverable: "Your First EU Buyer Meeting & Active Operations",
      icon: <Handshake size={24} />,
    },
  ];

  return (
    <section id="process" style={{ padding: "80px 32px", background: "#F8FAFC" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2.5, color: "#B91C1C" }}>Step by Step</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3.5vw, 42px)", color: "#0F172A", marginTop: 12 }}>Your Journey to Europe — In Detail</h2>
            <p style={{ fontSize: 16, color: "#64748B", marginTop: 12, maxWidth: 550, margin: "12px auto 0" }}>Every step is designed to minimise your effort and maximise speed. Here's exactly what happens at each stage.</p>
          </div>
        </Reveal>

        <div style={{ position: "relative" }}>
          {/* Vertical timeline line */}
          <div style={{ position: "absolute", left: 31, top: 0, bottom: 0, width: 2, background: "linear-gradient(to bottom, #B91C1C, #1E2761, #166534, #7C3AED)", borderRadius: 2 }} className="timeline-line" />

          {steps.map((s, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div style={{ display: "flex", gap: 32, marginBottom: i < 3 ? 48 : 0, position: "relative" }} className="step-row">
                {/* Timeline node */}
                <div style={{ flexShrink: 0, position: "relative", zIndex: 2 }}>
                  <div style={{
                    width: 64, height: 64, borderRadius: 18,
                    background: `linear-gradient(135deg, ${s.color}, ${s.color}DD)`,
                    display: "flex", alignItems: "center", justifyContent: "center", color: "#fff",
                    boxShadow: `0 4px 20px ${s.color}30`,
                  }}>{s.icon}</div>
                </div>

                {/* Content card */}
                <div style={{
                  flex: 1, background: "#fff", borderRadius: 18, padding: 36, border: "1px solid #E2E8F0",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.03)", transition: "box-shadow 0.3s, border-color 0.3s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.07)"; e.currentTarget.style.borderColor = s.color + "40"; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.03)"; e.currentTarget.style.borderColor = "#E2E8F0"; }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14, flexWrap: "wrap" }}>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700, color: s.color }}>{s.num}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, background: s.color + "12", color: s.color, padding: "4px 12px", borderRadius: 20, letterSpacing: "0.5px", textTransform: "uppercase" }}>{s.timeline}</span>
                  </div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "#0F172A", marginBottom: 12 }}>{s.title}</h3>
                  <p style={{ fontSize: 15, color: "#64748B", lineHeight: 1.7, marginBottom: 20 }}>{s.desc}</p>

                  <div style={{ background: "#FAFBFC", borderRadius: 12, padding: 20, marginBottom: 16 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, color: "#94A3B8", marginBottom: 12 }}>What We Do in This Step</div>
                    {s.details.map((d, j) => (
                      <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "6px 0" }}>
                        <Check size={16} color={s.color} style={{ flexShrink: 0, marginTop: 2 }} />
                        <span style={{ fontSize: 14, color: "#475569", lineHeight: 1.55 }}>{d}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 10, background: s.color + "08", borderRadius: 10, padding: "12px 16px" }}>
                    <BadgeCheck size={18} color={s.color} style={{ flexShrink: 0 }} />
                    <div>
                      <span style={{ fontSize: 11, fontWeight: 700, color: s.color, textTransform: "uppercase", letterSpacing: 1 }}>Deliverable</span>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "#0F172A", marginTop: 2 }}>{s.deliverable}</div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── What's Included Section ─── */
function Included() {
  const groups = [
    {
      title: "Registration & Legal", icon: <FileCheck size={22} />, color: "#1E2761",
      items: ["Branch registration (Netherlands KVK)", "Official EU business address", "Legal documentation & articles", "Business registration number", "Annual registration renewals"],
    },
    {
      title: "Representation & Sales", icon: <Users size={22} />, color: "#B91C1C",
      items: ["In-person buyer meetings across EU", "Brand representation at trade events", "Negotiation with distributors & retailers", "Market feedback & opportunity reports", "Quarterly business strategy reviews"],
    },
    {
      title: "Warehouse & Logistics", icon: <Truck size={22} />, color: "#0369A1",
      items: ["Warehouse space in Netherlands", "Inventory receiving & management", "Pick, pack & ship operations", "EU-wide distribution coordination", "Customs clearance & documentation"],
    },
    {
      title: "Compliance & Tax", icon: <Shield size={22} />, color: "#166534",
      items: ["VAT registration & quarterly filings", "Accounting & bookkeeping", "Tax compliance management", "GDPR compliance framework", "Regulatory updates & advisory"],
    },
  ];
  return (
    <section id="included" style={{ padding: "80px 32px", background: "#fff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2.5, color: "#B91C1C" }}>All-Inclusive</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3.5vw, 42px)", color: "#0F172A", marginTop: 12 }}>Everything Included in Your Plan</h2>
            <p style={{ fontSize: 16, color: "#64748B", marginTop: 12, maxWidth: 520, margin: "12px auto 0" }}>No hidden fees. No surprise add-ons. Here's the full scope of what's covered in your €1,000 setup + €200/month retainer.</p>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          {groups.map((g, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div style={{
                background: "#FAFBFC", borderRadius: 16, padding: 28, border: "1px solid #E2E8F0", height: "100%",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.06)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: g.color + "10", display: "flex", alignItems: "center", justifyContent: "center", color: g.color }}>{g.icon}</div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: "#0F172A" }}>{g.title}</h3>
                </div>
                {g.items.map((item, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", borderBottom: j < g.items.length - 1 ? "1px solid #F1F5F9" : "none" }}>
                    <Check size={15} color={g.color} style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: 13.5, color: "#475569" }}>{item}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── What You Need to Provide ─── */
function YourPart() {
  const items = [
    { icon: <FileCheck size={20} />, title: "Company Documents", desc: "Certificate of incorporation, articles of association, and director ID/passport copies from your Indian company." },
    { icon: <Package size={20} />, title: "Product Information", desc: "Product catalogue, pricing, certifications, and any industry-specific documentation (CE marks, safety data sheets, etc.)." },
    { icon: <MessageSquare size={20} />, title: "Your Goals", desc: "Target EU markets, budget expectations, and growth ambitions — so we can tailor the strategy to your vision." },
    { icon: <Truck size={20} />, title: "Ship Your Products", desc: "When ready, ship your inventory to our Netherlands warehouse. We'll handle customs clearance and storage from there." },
  ];
  return (
    <section style={{ padding: "72px 32px", background: "linear-gradient(135deg, #0F172A, #1E293B)" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2.5, color: "#FCA5A5" }}>Your Part</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3vw, 36px)", color: "#fff", marginTop: 12 }}>What We Need From You</h2>
            <p style={{ fontSize: 15, color: "#94A3B8", marginTop: 12, maxWidth: 480, margin: "12px auto 0" }}>We handle 95% of the work. Here's the small part where we need your input.</p>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="two-col">
          {items.map((it, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 14, padding: 24, border: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "#CBD5E1" }}>{it.icon}</div>
                  <h4 style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>{it.title}</h4>
                </div>
                <p style={{ fontSize: 13.5, color: "#94A3B8", lineHeight: 1.6 }}>{it.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ─── */
function FAQ() {
  const [open, setOpen] = useState(null);
  const faqs = [
    { q: "How long does it take to get my EU branch operational?", a: "Typically 2–4 weeks from our first consultation to a fully operational branch. The exact timeline depends on how quickly you can provide the required documents and your product's regulatory requirements." },
    { q: "Do I need to visit the Netherlands in person?", a: "No. The entire process is handled remotely. You don't need to travel to Europe at any point. We act as your on-ground presence and handle all registrations, meetings, and logistics locally." },
    { q: "What types of businesses is this service best for?", a: "We primarily serve Indian manufacturers, exporters, and product companies looking to sell physical goods in Europe. This includes textiles, food products, engineering goods, consumer electronics, handicrafts, chemicals, and more." },
    { q: "Is my parent company in India affected legally?", a: "Your parent company remains in India with no changes to its structure. The European branch is registered as an extension of your Indian company — it's not a separate legal entity. Tax obligations are limited to the branch's European activities." },
    { q: "What happens after the branch is set up?", a: "That's where the real value begins. We actively represent your brand at buyer meetings, manage your warehouse inventory, handle all ongoing compliance (VAT filings, accounting, regulatory updates), and connect you with EU distribution channels. It's a continuous partnership, not a one-time setup." },
    { q: "Can I sell in all EU countries from a Netherlands branch?", a: "Yes. A Netherlands-registered branch gives you legal access to the entire EU Single Market — all 27 member states. Products can be shipped from our Netherlands warehouse to any EU country without additional customs barriers." },
    { q: "What if my products need specific certifications for Europe?", a: "We advise on CE marking, safety certifications, and industry-specific requirements as part of our onboarding process. If your products need additional testing or documentation, we'll guide you to the right bodies and help prepare the paperwork." },
    { q: "Are there any hidden costs beyond the €1,000 + €200/month?", a: "No hidden costs. The €1,000 covers setup and the €200/month covers ongoing representation, compliance, and warehouse access. The only additional costs would be actual shipping/freight charges for moving your goods to our warehouse, which vary by volume and origin." },
  ];
  return (
    <section id="faq" style={{ padding: "80px 32px", background: "#F8FAFC" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2.5, color: "#B91C1C" }}>FAQ</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3.5vw, 40px)", color: "#0F172A", marginTop: 12 }}>Common Questions</h2>
          </div>
        </Reveal>
        <div>
          {faqs.map((f, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div style={{
                background: "#fff", borderRadius: 14, marginBottom: 12, border: "1px solid #E2E8F0",
                overflow: "hidden", transition: "border-color 0.2s",
                borderColor: open === i ? "#B91C1C30" : "#E2E8F0",
              }}>
                <button onClick={() => setOpen(open === i ? null : i)} style={{
                  width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "20px 24px", background: "none", border: "none", cursor: "pointer", textAlign: "left",
                }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: "#0F172A", lineHeight: 1.4, paddingRight: 16 }}>{f.q}</span>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: open === i ? "#B91C1C10" : "#F1F5F9", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background 0.2s" }}>
                    {open === i ? <ChevronUp size={16} color="#B91C1C" /> : <ChevronDown size={16} color="#64748B" />}
                  </div>
                </button>
                <div style={{
                  maxHeight: open === i ? 300 : 0, overflow: "hidden",
                  transition: "max-height 0.35s ease, padding 0.35s ease",
                  padding: open === i ? "0 24px 20px" : "0 24px",
                }}>
                  <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.7, borderTop: "1px solid #F1F5F9", paddingTop: 16 }}>{f.a}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ─── */
function CTA() {
  return (
    <section id="start" style={{ padding: "80px 32px", background: "linear-gradient(135deg, #1E2761, #2D3A8C)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -80, right: -80, width: 300, height: 300, borderRadius: "50%", background: "rgba(255,255,255,0.03)" }} />
      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", position: "relative" }}>
        <Reveal>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3.5vw, 42px)", color: "#fff", lineHeight: 1.2, marginBottom: 16 }}>Ready to Start Your EU Journey?</h2>
          <p style={{ fontSize: 17, color: "#CBD5E1", lineHeight: 1.7, maxWidth: 520, margin: "0 auto 12px" }}>
            Book a free consultation — we'll assess your business, outline a clear plan, and answer every question. No commitment required.
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, marginBottom: 36, flexWrap: "wrap" }}>
            {["Free consultation", "Custom strategy", "No obligation"].map((t, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Check size={15} color="#86EFAC" />
                <span style={{ fontSize: 14, color: "#CBD5E1" }}>{t}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "#fff", color: "#1E2761", padding: "16px 36px", borderRadius: 10,
              fontSize: 16, fontWeight: 700, textDecoration: "none",
              boxShadow: "0 4px 20px rgba(0,0,0,0.15)", transition: "transform 0.2s",
            }} onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"} onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
              Book Free Consultation <ArrowRight size={18} />
            </a>
            <a href="#" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,0.3)",
              padding: "16px 32px", borderRadius: 10, fontSize: 16, fontWeight: 600,
              textDecoration: "none", transition: "border-color 0.2s",
            }} onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.7)"} onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"}>
              <Mail size={18} /> hello@eurobranch.eu
            </a>
          </div>
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
export default function HowItWorksPage() {
  return (
    <div style={{ "--font-display": "'DM Serif Display', Georgia, serif", fontFamily: "'DM Sans', -apple-system, sans-serif" }}>
      <Nav />
      <Hero />
      <Overview />
      <Process />
      <Included />
      <YourPart />
      <FAQ />
      <CTA />
      <Footer />
      <style>{`
        @media (max-width: 900px) {
          .two-col { grid-template-columns: 1fr !important; }
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: block !important; }
          .step-row { flex-direction: column !important; }
          .timeline-line { display: none !important; }
          .overview-line { display: none !important; }
          .overview-bar { flex-wrap: wrap !important; gap: 24px !important; justify-content: center !important; }
        }
        @media (min-width: 901px) {
          .nav-mobile-btn { display: none !important; }
          .nav-mobile-menu { display: none !important; }
        }
      `}</style>
    </div>
  );
}
