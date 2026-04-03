import { useState, useEffect, useRef } from "react";
import { Globe, ArrowRight, Check, X, ChevronDown, ChevronUp, Menu, X as XIcon, Shield, TrendingUp, Clock, Zap, Mail, AlertCircle, Calculator, FileCheck, Users, Truck, Warehouse, BadgeCheck, HelpCircle, ArrowDown, Star, Building2, Scale } from "lucide-react";

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
    { label: "Home", href: "#" },
    { label: "Plans", href: "#plans" },
    { label: "What's Included", href: "#details" },
    { label: "Cost Comparison", href: "#compare" },
    { label: "Calculator", href: "#calc" },
    { label: "FAQ", href: "#faq" },
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
          <a href="#start" style={{ background: "linear-gradient(135deg, #B91C1C, #991B1B)", color: "#fff", padding: "10px 24px", borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: "none", boxShadow: "0 2px 8px rgba(185,28,28,0.25)", transition: "transform 0.2s" }} onMouseEnter={e => e.target.style.transform = "translateY(-1px)"} onMouseLeave={e => e.target.style.transform = "translateY(0)"}>Get Started</a>
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
      <div style={{ position: "relative", maxWidth: 900, margin: "0 auto", padding: "80px 32px 64px", textAlign: "center" }}>
        <Reveal>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#DCFCE7", border: "1px solid #BBF7D0", borderRadius: 100, padding: "6px 16px", marginBottom: 24 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#166534" }}>Save 85%+ compared to setting up on your own</span>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(34px, 4.5vw, 52px)", lineHeight: 1.15, color: "#0F172A", fontWeight: 700, letterSpacing: "-0.8px", marginBottom: 20 }}>
            Simple, Transparent <span style={{ background: "linear-gradient(135deg, #B91C1C, #7F1D1D)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Pricing</span>
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p style={{ fontSize: 18, lineHeight: 1.7, color: "#475569", maxWidth: 580, margin: "0 auto" }}>
            One setup fee. One monthly retainer. Everything included — branch registration, local representation, warehouse access, and full compliance. No surprises.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Pricing Cards ─── */
function Plans() {
  return (
    <section id="plans" style={{ padding: "0 32px 80px", background: "#FAFBFC" }}>
      <div style={{ maxWidth: 950, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="two-col">
          {/* Setup Fee */}
          <Reveal delay={0.1}>
            <div style={{ background: "#fff", borderRadius: 20, border: "2px solid #E2E8F0", overflow: "hidden", height: "100%" }}>
              <div style={{ padding: "36px 36px 0" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center", color: "#1E2761" }}><Zap size={22} /></div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: "#64748B" }}>One-Time Setup</div>
                    <div style={{ fontSize: 12, color: "#94A3B8" }}>Paid once at onboarding</div>
                  </div>
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 60, fontWeight: 700, color: "#1E2761", lineHeight: 1, marginBottom: 6 }}>€1,000</div>
                <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.6, marginBottom: 28 }}>
                  Covers the complete setup of your European branch — registration, legal documentation, address, and strategic onboarding.
                </p>
              </div>
              <div style={{ background: "#F8FAFC", padding: "24px 36px 36px", borderTop: "1px solid #F1F5F9" }}>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, color: "#94A3B8", marginBottom: 14 }}>Includes</div>
                {[
                  "Branch registration at Netherlands KVK",
                  "Official EU business address",
                  "Legal documentation & articles of association",
                  "Business registration number (KVK number)",
                  "Strategic onboarding session",
                  "EU entry strategy document",
                ].map((t, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0" }}>
                    <Check size={16} color="#166534" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: 14, color: "#475569" }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Monthly Retainer */}
          <Reveal delay={0.2}>
            <div style={{ background: "linear-gradient(135deg, #1E2761, #2D3A8C)", borderRadius: 20, overflow: "hidden", height: "100%", position: "relative" }}>
              <div style={{ padding: "36px 36px 0" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}><Shield size={22} /></div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: "#94A3B8" }}>Monthly Retainer</div>
                    <div style={{ fontSize: 12, color: "#64748B" }}>Billed monthly</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 60, fontWeight: 700, color: "#fff", lineHeight: 1 }}>€200</span>
                  <span style={{ fontSize: 20, color: "#94A3B8", fontWeight: 400 }}>/month</span>
                </div>
                <p style={{ fontSize: 14, color: "#CBD5E1", lineHeight: 1.6, marginTop: 6, marginBottom: 28 }}>
                  Covers all ongoing operations — local representation, compliance, warehouse access, buyer connections, and regulatory support.
                </p>
              </div>
              <div style={{ background: "rgba(0,0,0,0.15)", padding: "24px 36px 36px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, color: "#94A3B8", marginBottom: 14 }}>Includes</div>
                {[
                  "Local representation & buyer meetings",
                  "Full VAT registration & quarterly filings",
                  "Accounting & bookkeeping",
                  "Warehouse & distribution access",
                  "Ongoing legal & regulatory support",
                  "GDPR compliance management",
                  "Quarterly business review & strategy",
                  "EU buyer & distributor connections",
                ].map((t, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0" }}>
                    <Check size={16} color="#86EFAC" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: 14, color: "#CBD5E1" }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Total Year 1 */}
        <Reveal delay={0.3}>
          <div style={{ marginTop: 24, background: "#fff", borderRadius: 14, border: "1px solid #E2E8F0", padding: "20px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Calculator size={20} color="#1E2761" />
              <span style={{ fontSize: 15, fontWeight: 600, color: "#0F172A" }}>Your Total Year 1 Investment</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
              <div style={{ textAlign: "right" }}>
                <span style={{ fontSize: 13, color: "#94A3B8" }}>€1,000 + (€200 × 12) = </span>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: "#1E2761" }}>€3,400</span>
                <span style={{ fontSize: 13, color: "#94A3B8" }}> /year</span>
              </div>
              <div style={{ height: 40, width: 1, background: "#E2E8F0" }} />
              <div style={{ textAlign: "right" }}>
                <span style={{ fontSize: 13, color: "#94A3B8" }}>DIY cost: </span>
                <span style={{ fontSize: 16, fontWeight: 600, color: "#B91C1C", textDecoration: "line-through" }}>€18,000–25,000+</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Detailed Breakdown ─── */
function Details() {
  const categories = [
    {
      title: "Registration & Legal", icon: <FileCheck size={20} />, color: "#1E2761", fee: "Setup",
      items: [
        { name: "Netherlands KVK branch registration", setup: true, monthly: false },
        { name: "EU business address", setup: true, monthly: true },
        { name: "Legal documentation & articles", setup: true, monthly: false },
        { name: "KVK registration number", setup: true, monthly: false },
        { name: "Annual registration renewal", setup: false, monthly: true },
      ]
    },
    {
      title: "Representation & Sales", icon: <Users size={20} />, color: "#B91C1C", fee: "Monthly",
      items: [
        { name: "In-person buyer meetings", setup: false, monthly: true },
        { name: "Brand representation at events", setup: false, monthly: true },
        { name: "Distributor & retailer negotiations", setup: false, monthly: true },
        { name: "Market opportunity reports", setup: false, monthly: true },
        { name: "Quarterly strategy reviews", setup: false, monthly: true },
      ]
    },
    {
      title: "Warehouse & Logistics", icon: <Truck size={20} />, color: "#0369A1", fee: "Monthly",
      items: [
        { name: "Warehouse space (Netherlands)", setup: false, monthly: true },
        { name: "Inventory receiving & management", setup: false, monthly: true },
        { name: "Pick, pack & ship operations", setup: false, monthly: true },
        { name: "EU distribution coordination", setup: false, monthly: true },
        { name: "Customs clearance support", setup: false, monthly: true },
      ]
    },
    {
      title: "Compliance & Tax", icon: <Shield size={20} />, color: "#166534", fee: "Monthly",
      items: [
        { name: "VAT registration", setup: true, monthly: false },
        { name: "Quarterly VAT filings", setup: false, monthly: true },
        { name: "Accounting & bookkeeping", setup: false, monthly: true },
        { name: "Tax compliance management", setup: false, monthly: true },
        { name: "GDPR compliance framework", setup: true, monthly: true },
      ]
    },
  ];
  return (
    <section id="details" style={{ padding: "80px 32px", background: "#fff" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2.5, color: "#B91C1C" }}>Full Breakdown</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3.5vw, 40px)", color: "#0F172A", marginTop: 12 }}>What's Covered — Line by Line</h2>
            <p style={{ fontSize: 16, color: "#64748B", marginTop: 12, maxWidth: 520, margin: "12px auto 0" }}>See exactly which services are covered under setup vs. monthly retainer.</p>
          </div>
        </Reveal>
        {categories.map((cat, ci) => (
          <Reveal key={ci} delay={ci * 0.08}>
            <div style={{ marginBottom: 24, borderRadius: 16, border: "1px solid #E2E8F0", overflow: "hidden" }}>
              <div style={{ background: "#F8FAFC", padding: "16px 24px", display: "flex", alignItems: "center", gap: 12, borderBottom: "1px solid #E2E8F0" }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: cat.color + "10", display: "flex", alignItems: "center", justifyContent: "center", color: cat.color }}>{cat.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0F172A" }}>{cat.title}</h3>
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#FAFBFC" }}>
                    <th style={{ textAlign: "left", padding: "10px 24px", fontSize: 11, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: 1 }}>Service</th>
                    <th style={{ textAlign: "center", padding: "10px 16px", fontSize: 11, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: 1, width: 100 }}>Setup (€1,000)</th>
                    <th style={{ textAlign: "center", padding: "10px 16px", fontSize: 11, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: 1, width: 100 }}>Monthly (€200)</th>
                  </tr>
                </thead>
                <tbody>
                  {cat.items.map((item, ii) => (
                    <tr key={ii} style={{ borderTop: "1px solid #F1F5F9" }}>
                      <td style={{ padding: "12px 24px", fontSize: 14, color: "#334155" }}>{item.name}</td>
                      <td style={{ padding: "12px 16px", textAlign: "center" }}>
                        {item.setup ? <Check size={16} color="#166534" /> : <span style={{ color: "#D1D5DB" }}>—</span>}
                      </td>
                      <td style={{ padding: "12px 16px", textAlign: "center" }}>
                        {item.monthly ? <Check size={16} color="#166534" /> : <span style={{ color: "#D1D5DB" }}>—</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─── Cost Comparison ─── */
function CostCompare() {
  const rows = [
    { item: "Security Deposit", alone: "€3,000", us: "€0", note: "Non-refundable until lease ends" },
    { item: "Branch Registration", alone: "€1,500–3,000", us: "Included", note: "Legal fees + notary costs" },
    { item: "Monthly Rent (warehouse)", alone: "€1,000+ /mo", us: "Included", note: "Basic unit in NL" },
    { item: "Utilities", alone: "€200–400 /mo", us: "Included", note: "Gas, water, electricity" },
    { item: "Physical Presence", alone: "€2,000–5,000", us: "Included", note: "Flights, accommodation, time" },
    { item: "Local Representative", alone: "€2,000–4,000 /mo", us: "Included", note: "Hire separately" },
    { item: "VAT & Accounting", alone: "€300–600 /mo", us: "Included", note: "External accountant" },
    { item: "Legal Compliance", alone: "€150–300 /hr", us: "Included", note: "Per consultation" },
  ];
  return (
    <section id="compare" style={{ padding: "80px 32px", background: "#0F172A" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2.5, color: "#FCA5A5" }}>Cost Comparison</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3.5vw, 40px)", color: "#fff", marginTop: 12 }}>The Real Cost of Going It Alone</h2>
            <p style={{ fontSize: 15, color: "#94A3B8", marginTop: 12 }}>Here's what you'd actually spend setting up and running a European operation independently.</p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid #334155" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#1E293B" }}>
                  <th style={{ padding: "14px 20px", textAlign: "left", fontSize: 12, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: 1 }}>Cost Item</th>
                  <th style={{ padding: "14px 20px", textAlign: "center", fontSize: 12, fontWeight: 700, color: "#FCA5A5", textTransform: "uppercase", letterSpacing: 1 }}>DIY</th>
                  <th style={{ padding: "14px 20px", textAlign: "center", fontSize: 12, fontWeight: 700, color: "#86EFAC", textTransform: "uppercase", letterSpacing: 1 }}>With EuroBranch</th>
                  <th style={{ padding: "14px 20px", textAlign: "left", fontSize: 12, fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: 1 }} className="note-col">Note</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} style={{ borderTop: "1px solid #334155", background: i % 2 === 0 ? "rgba(15,23,42,0.5)" : "transparent" }}>
                    <td style={{ padding: "14px 20px", fontSize: 14, fontWeight: 500, color: "#CBD5E1" }}>{r.item}</td>
                    <td style={{ padding: "14px 20px", textAlign: "center", fontSize: 14, color: "#FCA5A5", fontWeight: 500 }}>{r.alone}</td>
                    <td style={{ padding: "14px 20px", textAlign: "center", fontSize: 14, color: "#86EFAC", fontWeight: 600 }}>{r.us}</td>
                    <td style={{ padding: "14px 20px", fontSize: 12, color: "#64748B" }} className="note-col">{r.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Totals */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderTop: "2px solid #334155" }}>
              <div style={{ padding: "20px 24px", background: "rgba(185,28,28,0.1)", textAlign: "center" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#FCA5A5", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Estimated DIY Year 1</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700, color: "#FCA5A5" }}>€18,000 – €25,000+</div>
              </div>
              <div style={{ padding: "20px 24px", background: "rgba(22,101,52,0.1)", textAlign: "center" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#86EFAC", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>With EuroBranch Year 1</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700, color: "#86EFAC" }}>€3,400</div>
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <span style={{ display: "inline-block", background: "linear-gradient(135deg, #166534, #15803D)", color: "#fff", padding: "10px 28px", borderRadius: 100, fontSize: 15, fontWeight: 700 }}>That's up to 85%+ in savings</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── ROI Calculator ─── */
function CalcSection() {
  const [orders, setOrders] = useState(20);
  const [avgOrder, setAvgOrder] = useState(500);
  const revenue = orders * avgOrder * 12;
  const cost = 3400;
  const roi = revenue > 0 ? (((revenue - cost) / cost) * 100).toFixed(0) : 0;

  return (
    <section id="calc" style={{ padding: "80px 32px", background: "#F8FAFC" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2.5, color: "#B91C1C" }}>ROI Calculator</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3.5vw, 40px)", color: "#0F172A", marginTop: 12 }}>Calculate Your Return</h2>
            <p style={{ fontSize: 16, color: "#64748B", marginTop: 12 }}>See how quickly your EU investment pays for itself.</p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div style={{ background: "#fff", borderRadius: 20, padding: 40, border: "1px solid #E2E8F0", boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }} className="two-col">
              <div>
                <div style={{ marginBottom: 28 }}>
                  <label style={{ display: "flex", justifyContent: "space-between", fontSize: 14, fontWeight: 600, color: "#334155", marginBottom: 10 }}>
                    <span>Expected EU Orders / Month</span>
                    <span style={{ color: "#1E2761", fontFamily: "var(--font-display)" }}>{orders}</span>
                  </label>
                  <input type="range" min={1} max={200} value={orders} onChange={e => setOrders(+e.target.value)} style={{ width: "100%", accentColor: "#1E2761", height: 6, cursor: "pointer" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#94A3B8", marginTop: 4 }}><span>1</span><span>200</span></div>
                </div>
                <div style={{ marginBottom: 28 }}>
                  <label style={{ display: "flex", justifyContent: "space-between", fontSize: 14, fontWeight: 600, color: "#334155", marginBottom: 10 }}>
                    <span>Average Order Value (€)</span>
                    <span style={{ color: "#1E2761", fontFamily: "var(--font-display)" }}>€{avgOrder}</span>
                  </label>
                  <input type="range" min={50} max={5000} step={50} value={avgOrder} onChange={e => setAvgOrder(+e.target.value)} style={{ width: "100%", accentColor: "#1E2761", height: 6, cursor: "pointer" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#94A3B8", marginTop: 4 }}><span>€50</span><span>€5,000</span></div>
                </div>
                <div style={{ background: "#F8FAFC", borderRadius: 12, padding: 16 }}>
                  <div style={{ fontSize: 12, color: "#94A3B8", marginBottom: 4 }}>Your EuroBranch Year 1 Cost</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: "#1E2761" }}>€3,400</div>
                  <div style={{ fontSize: 12, color: "#94A3B8" }}>€1,000 setup + €200 × 12 months</div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 20 }}>
                <div style={{ background: "#EFF6FF", borderRadius: 14, padding: 24, textAlign: "center" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#1D4ED8", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>Projected Annual EU Revenue</div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 40, fontWeight: 700, color: "#1E2761" }}>€{revenue.toLocaleString()}</div>
                </div>
                <div style={{ background: revenue > cost ? "#DCFCE7" : "#FEF3C7", borderRadius: 14, padding: 24, textAlign: "center" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: revenue > cost ? "#166534" : "#92400E", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>Return on Investment</div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 40, fontWeight: 700, color: revenue > cost ? "#166534" : "#92400E" }}>{roi > 0 ? `${roi}%` : "—"}</div>
                  <div style={{ fontSize: 12, color: revenue > cost ? "#15803D" : "#A16207", marginTop: 4 }}>
                    {revenue > cost ? `€${(revenue - cost).toLocaleString()} net return` : "Increase volume for positive ROI"}
                  </div>
                </div>
                <div style={{ fontSize: 12, color: "#94A3B8", textAlign: "center", fontStyle: "italic" }}>
                  *Simplified projection. Actual results depend on product margins, market conditions, and execution.
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── What's NOT Included ─── */
function NotIncluded() {
  return (
    <section style={{ padding: "56px 32px", background: "#fff" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <Reveal>
          <div style={{ background: "#FFFBEB", borderRadius: 16, border: "1px solid #FDE68A", padding: "28px 32px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <AlertCircle size={20} color="#92400E" />
              <h3 style={{ fontSize: 17, fontWeight: 700, color: "#92400E" }}>What's Not Included (and Why)</h3>
            </div>
            <p style={{ fontSize: 14, color: "#A16207", lineHeight: 1.65, marginBottom: 16 }}>
              To keep our pricing honest and transparent, here are the costs that are outside our retainer — because they depend entirely on your specific situation:
            </p>
            {[
              { item: "Freight & shipping costs", reason: "Varies by product volume, weight, and origin. You arrange shipment to our NL warehouse." },
              { item: "Product certifications (CE, safety)", reason: "Depends on product type. We guide you to the right testing bodies." },
              { item: "Custom marketing & sales campaigns", reason: "Available as an add-on if needed. Base plan includes buyer introductions." },
              { item: "Additional warehouse volume beyond base allocation", reason: "Discussed during onboarding based on your needs." },
            ].map((n, i) => (
              <div key={i} style={{ display: "flex", gap: 12, padding: "10px 0", borderTop: i > 0 ? "1px solid #FDE68A50" : "none" }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#D97706", marginTop: 7, flexShrink: 0 }} />
                <div>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#92400E" }}>{n.item}</span>
                  <span style={{ fontSize: 13, color: "#A16207" }}> — {n.reason}</span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── FAQ ─── */
function FAQ() {
  const [open, setOpen] = useState(null);
  const faqs = [
    { q: "Are there any long-term contracts?", a: "There is no long-term lock-in. We work on a monthly retainer basis. We believe in earning your business every month through results, not contracts." },
    { q: "When does the monthly billing start?", a: "Monthly billing begins once your branch registration is complete and your EU operations are officially active — not from the day you sign up." },
    { q: "Can the monthly retainer increase over time?", a: "Our €200/month retainer is fixed and won't increase without prior discussion. If your operations scale significantly and require additional resources, we'll discuss options transparently." },
    { q: "What payment methods do you accept?", a: "We accept bank transfers (SEPA and international wire), and can accommodate most standard business payment methods. Invoices are issued monthly with clear itemisation." },
    { q: "Is the setup fee refundable?", a: "The setup fee covers actual registration costs with Dutch authorities, legal documentation, and onboarding work. As these are real costs incurred, the setup fee is non-refundable once the registration process begins." },
    { q: "What if I need services beyond the base plan?", a: "We're flexible. If you need additional warehouse space, marketing support, or expanded representation, we'll create a custom quote. There's no pressure to upgrade — the base plan is designed to be comprehensive for most businesses." },
    { q: "How does this compare to hiring a local agent or distributor?", a: "A local sales agent in Europe typically costs €2,000–4,000/month plus commissions. A distributor takes 30–50% margin on your products. With us, you pay €200/month and maintain full control over your pricing and customer relationships." },
    { q: "Do I need to pay VAT on your fees?", a: "For Indian companies, our services are typically classified as B2B cross-border services and may be VAT-exempt under reverse charge rules. We'll clarify the exact tax treatment during onboarding based on your situation." },
  ];
  return (
    <section id="faq" style={{ padding: "80px 32px", background: "#F8FAFC" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2.5, color: "#B91C1C" }}>Pricing FAQ</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3.5vw, 40px)", color: "#0F172A", marginTop: 12 }}>Questions About Pricing</h2>
          </div>
        </Reveal>
        <div>
          {faqs.map((f, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <div style={{ background: "#fff", borderRadius: 14, marginBottom: 12, border: "1px solid #E2E8F0", overflow: "hidden", borderColor: open === i ? "#B91C1C30" : "#E2E8F0", transition: "border-color 0.2s" }}>
                <button onClick={() => setOpen(open === i ? null : i)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: "#0F172A", lineHeight: 1.4, paddingRight: 16 }}>{f.q}</span>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: open === i ? "#B91C1C10" : "#F1F5F9", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {open === i ? <ChevronUp size={16} color="#B91C1C" /> : <ChevronDown size={16} color="#64748B" />}
                  </div>
                </button>
                <div style={{ maxHeight: open === i ? 300 : 0, overflow: "hidden", transition: "max-height 0.35s ease, padding 0.35s ease", padding: open === i ? "0 24px 20px" : "0 24px" }}>
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
          <div style={{ fontFamily: "var(--font-display)", fontSize: 48, color: "#fff", marginBottom: 8 }}>€200<span style={{ fontSize: 22, color: "#94A3B8" }}>/month</span></div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 3vw, 36px)", color: "#fff", lineHeight: 1.3, marginBottom: 16 }}>Start Selling in Europe Today</h2>
          <p style={{ fontSize: 16, color: "#CBD5E1", lineHeight: 1.7, maxWidth: 480, margin: "0 auto 32px" }}>
            Book a free consultation. We'll assess your business, outline a plan, and give you a clear timeline — no obligation.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", color: "#1E2761", padding: "16px 36px", borderRadius: 10, fontSize: 16, fontWeight: 700, textDecoration: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.15)", transition: "transform 0.2s" }} onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"} onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
              Book Free Consultation <ArrowRight size={18} />
            </a>
            <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,0.3)", padding: "16px 32px", borderRadius: 10, fontSize: 16, fontWeight: 600, textDecoration: "none", transition: "border-color 0.2s" }} onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.7)"} onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"}>
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
export default function PricingPage() {
  return (
    <div style={{ "--font-display": "'DM Serif Display', Georgia, serif", fontFamily: "'DM Sans', -apple-system, sans-serif" }}>
      <Nav />
      <Hero />
      <Plans />
      <Details />
      <CostCompare />
      <CalcSection />
      <NotIncluded />
      <FAQ />
      <CTA />
      <Footer />
      <style>{`
        @media (max-width: 900px) {
          .two-col { grid-template-columns: 1fr !important; }
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: block !important; }
          .note-col { display: none !important; }
        }
        @media (min-width: 901px) {
          .nav-mobile-btn { display: none !important; }
          .nav-mobile-menu { display: none !important; }
        }
      `}</style>
    </div>
  );
}
