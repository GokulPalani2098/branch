import { useState, useEffect, useRef } from "react";
import { Globe, ArrowRight, Check, Menu, X as XIcon, Mail, Phone, MapPin, Clock, Send, MessageSquare, Calendar, Building2, Linkedin, ChevronRight, Shield, Users, Truck, FileCheck, HelpCircle, CheckCircle, Loader } from "lucide-react";

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
    { label: "Book Consultation", href: "#form" },
    { label: "Contact Info", href: "#info" },
    { label: "Office", href: "#office" },
    { label: "FAQ", href: "#quick-faq" },
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
          <a href="#form" style={{ background: "linear-gradient(135deg, #B91C1C, #991B1B)", color: "#fff", padding: "10px 24px", borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: "none", boxShadow: "0 2px 8px rgba(185,28,28,0.25)", transition: "transform 0.2s" }} onMouseEnter={e => e.target.style.transform = "translateY(-1px)"} onMouseLeave={e => e.target.style.transform = "translateY(0)"}>Book Consultation</a>
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
      <div style={{ position: "absolute", bottom: -120, right: -120, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(30,39,97,0.05) 0%, transparent 70%)" }} />
      <div style={{ position: "relative", maxWidth: 900, margin: "0 auto", padding: "80px 32px 64px", textAlign: "center" }}>
        <Reveal>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 100, padding: "6px 16px", marginBottom: 24 }}>
            <Calendar size={14} color="#1D4ED8" />
            <span style={{ fontSize: 13, fontWeight: 600, color: "#1D4ED8" }}>Free Consultation · No Obligation</span>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(34px, 4.5vw, 52px)", lineHeight: 1.15, color: "#0F172A", fontWeight: 700, letterSpacing: "-0.8px", marginBottom: 20 }}>
            Let's Build Your <span style={{ background: "linear-gradient(135deg, #B91C1C, #7F1D1D)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>European Presence</span>
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p style={{ fontSize: 18, lineHeight: 1.7, color: "#475569", maxWidth: 560, margin: "0 auto" }}>
            Whether you're ready to start or just exploring options, we'd love to hear about your business. Every conversation starts with understanding your goals.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Contact Methods Bar ─── */
function ContactMethods() {
  const methods = [
    { icon: <Mail size={20} />, label: "Email Us", value: "hello@eurobranch.eu", sub: "Response within 24 hours", color: "#1E2761" },
    { icon: <Phone size={20} />, label: "Call Us", value: "+31 (0) XX XXX XXXX", sub: "Mon–Fri, 9:00–18:00 CET", color: "#B91C1C" },
    { icon: <MessageSquare size={20} />, label: "WhatsApp", value: "+31 (0) XX XXX XXXX", sub: "Quick questions welcome", color: "#166534" },
  ];
  return (
    <section style={{ padding: "0 32px 56px", background: "#FAFBFC" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          {methods.map((m, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div style={{
                background: "#fff", borderRadius: 16, padding: "24px 28px", border: "1px solid #E2E8F0",
                display: "flex", alignItems: "center", gap: 16, transition: "transform 0.3s, box-shadow 0.3s, border-color 0.3s",
                cursor: "pointer",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.06)"; e.currentTarget.style.borderColor = m.color + "40"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "#E2E8F0"; }}
              >
                <div style={{ width: 48, height: 48, borderRadius: 14, background: m.color + "10", display: "flex", alignItems: "center", justifyContent: "center", color: m.color, flexShrink: 0 }}>{m.icon}</div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, color: "#94A3B8", marginBottom: 2 }}>{m.label}</div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: "#0F172A" }}>{m.value}</div>
                  <div style={{ fontSize: 12, color: "#64748B", marginTop: 2 }}>{m.sub}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Main Form Section ─── */
function FormSection() {
  const [step, setStep] = useState(1);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", country: "India", products: "", markets: "", timeline: "", heard: "" });

  const update = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = () => {
    setSending(true);
    setTimeout(() => { setSending(false); setDone(true); }, 1500);
  };

  const inputStyle = {
    width: "100%", padding: "13px 16px", borderRadius: 10, border: "1.5px solid #E2E8F0",
    fontSize: 14, color: "#0F172A", outline: "none", transition: "border-color 0.2s", background: "#FAFBFC",
    fontFamily: "inherit",
  };

  const labelStyle = { display: "block", fontSize: 13, fontWeight: 600, color: "#334155", marginBottom: 7 };

  if (done) {
    return (
      <section id="form" style={{ padding: "80px 32px", background: "#fff" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#DCFCE7", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
              <CheckCircle size={40} color="#166534" />
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 32, color: "#0F172A", marginBottom: 12 }}>Thank You!</h2>
            <p style={{ fontSize: 16, color: "#64748B", lineHeight: 1.7, maxWidth: 450, margin: "0 auto 24px" }}>
              We've received your details and will get back to you within 24 hours with a personalised EU entry assessment.
            </p>
            <div style={{ background: "#F8FAFC", borderRadius: 14, padding: 24, textAlign: "left", maxWidth: 400, margin: "0 auto" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#1E2761", marginBottom: 12, textTransform: "uppercase", letterSpacing: 1 }}>What Happens Next</div>
              {[
                "We review your business details",
                "Schedule a free consultation call",
                "Prepare a custom EU entry strategy",
                "Share a clear timeline and action plan",
              ].map((t, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0" }}>
                  <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#1E2761", flexShrink: 0 }}>{i + 1}</div>
                  <span style={{ fontSize: 14, color: "#475569" }}>{t}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <section id="form" style={{ padding: "80px 32px", background: "#fff" }}>
      <div style={{ maxWidth: 1050, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "5fr 3fr", gap: 48 }} className="form-grid">
          {/* Form */}
          <Reveal>
            <div style={{ background: "#fff", borderRadius: 20, padding: 40, border: "1px solid #E2E8F0", boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "#0F172A" }}>Book Your Free Consultation</h2>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#94A3B8" }}>Step {step} of 2</div>
              </div>

              {/* Progress */}
              <div style={{ display: "flex", gap: 8, marginBottom: 32 }}>
                <div style={{ flex: 1, height: 4, borderRadius: 4, background: "#1E2761" }} />
                <div style={{ flex: 1, height: 4, borderRadius: 4, background: step >= 2 ? "#1E2761" : "#E2E8F0", transition: "background 0.3s" }} />
              </div>

              {step === 1 && (
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#1E2761", marginBottom: 20 }}>Your Details</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="form-inner-grid">
                    <div>
                      <label style={labelStyle}>Full Name *</label>
                      <input value={form.name} onChange={e => update("name", e.target.value)} style={inputStyle} placeholder="Your name"
                        onFocus={e => e.target.style.borderColor = "#1E2761"} onBlur={e => e.target.style.borderColor = "#E2E8F0"} />
                    </div>
                    <div>
                      <label style={labelStyle}>Company Name *</label>
                      <input value={form.company} onChange={e => update("company", e.target.value)} style={inputStyle} placeholder="Your company"
                        onFocus={e => e.target.style.borderColor = "#1E2761"} onBlur={e => e.target.style.borderColor = "#E2E8F0"} />
                    </div>
                    <div>
                      <label style={labelStyle}>Email Address *</label>
                      <input type="email" value={form.email} onChange={e => update("email", e.target.value)} style={inputStyle} placeholder="you@company.com"
                        onFocus={e => e.target.style.borderColor = "#1E2761"} onBlur={e => e.target.style.borderColor = "#E2E8F0"} />
                    </div>
                    <div>
                      <label style={labelStyle}>Phone Number</label>
                      <input type="tel" value={form.phone} onChange={e => update("phone", e.target.value)} style={inputStyle} placeholder="+91 XXXXX XXXXX"
                        onFocus={e => e.target.style.borderColor = "#1E2761"} onBlur={e => e.target.style.borderColor = "#E2E8F0"} />
                    </div>
                  </div>
                  <div style={{ marginTop: 16 }}>
                    <label style={labelStyle}>Country</label>
                    <select value={form.country} onChange={e => update("country", e.target.value)} style={{ ...inputStyle, cursor: "pointer", appearance: "auto" }}>
                      <option>India</option>
                      <option>Bangladesh</option>
                      <option>Sri Lanka</option>
                      <option>Pakistan</option>
                      <option>Nepal</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <button onClick={() => setStep(2)} disabled={!form.name || !form.email} style={{
                    marginTop: 28, width: "100%", padding: 14, borderRadius: 10, border: "none",
                    background: form.name && form.email ? "linear-gradient(135deg, #1E2761, #2D3A8C)" : "#E2E8F0",
                    color: form.name && form.email ? "#fff" : "#94A3B8",
                    fontSize: 15, fontWeight: 600, cursor: form.name && form.email ? "pointer" : "not-allowed",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    boxShadow: form.name && form.email ? "0 4px 16px rgba(30,39,97,0.25)" : "none",
                  }}
                    onMouseEnter={e => { if (form.name && form.email) { e.target.style.transform = "translateY(-1px)"; } }}
                    onMouseLeave={e => e.target.style.transform = "translateY(0)"}
                  >Continue <ChevronRight size={16} style={{ verticalAlign: "middle", marginLeft: 4 }} /></button>
                </div>
              )}

              {step === 2 && (
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#1E2761", marginBottom: 20 }}>About Your Business</div>
                  <div style={{ marginBottom: 16 }}>
                    <label style={labelStyle}>What products do you sell? *</label>
                    <textarea rows={3} value={form.products} onChange={e => update("products", e.target.value)} style={{ ...inputStyle, resize: "vertical" }} placeholder="e.g. Organic spices, cotton textiles, engineering components..."
                      onFocus={e => e.target.style.borderColor = "#1E2761"} onBlur={e => e.target.style.borderColor = "#E2E8F0"} />
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <label style={labelStyle}>Which EU markets are you targeting?</label>
                    <input value={form.markets} onChange={e => update("markets", e.target.value)} style={inputStyle} placeholder="e.g. Germany, Netherlands, France, All EU..."
                      onFocus={e => e.target.style.borderColor = "#1E2761"} onBlur={e => e.target.style.borderColor = "#E2E8F0"} />
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <label style={labelStyle}>When are you looking to start?</label>
                    <select value={form.timeline} onChange={e => update("timeline", e.target.value)} style={{ ...inputStyle, cursor: "pointer", appearance: "auto" }}>
                      <option value="">Select a timeline</option>
                      <option>Immediately</option>
                      <option>Within 1–3 months</option>
                      <option>Within 3–6 months</option>
                      <option>Just exploring for now</option>
                    </select>
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <label style={labelStyle}>How did you hear about us?</label>
                    <select value={form.heard} onChange={e => update("heard", e.target.value)} style={{ ...inputStyle, cursor: "pointer", appearance: "auto" }}>
                      <option value="">Select an option</option>
                      <option>Google Search</option>
                      <option>LinkedIn</option>
                      <option>Referral</option>
                      <option>Trade Association</option>
                      <option>Trade Show / Event</option>
                      <option>WhatsApp Group</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
                    <button onClick={() => setStep(1)} style={{
                      padding: "14px 24px", borderRadius: 10, border: "2px solid #E2E8F0", background: "#fff",
                      color: "#334155", fontSize: 15, fontWeight: 600, cursor: "pointer", transition: "border-color 0.2s",
                    }} onMouseEnter={e => e.target.style.borderColor = "#1E2761"} onMouseLeave={e => e.target.style.borderColor = "#E2E8F0"}>Back</button>
                    <button onClick={handleSubmit} disabled={!form.products || sending} style={{
                      flex: 1, padding: 14, borderRadius: 10, border: "none",
                      background: form.products && !sending ? "linear-gradient(135deg, #B91C1C, #991B1B)" : "#E2E8F0",
                      color: form.products && !sending ? "#fff" : "#94A3B8",
                      fontSize: 15, fontWeight: 600, cursor: form.products && !sending ? "pointer" : "not-allowed",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                      boxShadow: form.products && !sending ? "0 4px 16px rgba(185,28,28,0.25)" : "none",
                      transition: "transform 0.2s",
                    }}
                      onMouseEnter={e => { if (form.products && !sending) e.target.style.transform = "translateY(-1px)"; }}
                      onMouseLeave={e => e.target.style.transform = "translateY(0)"}
                    >
                      {sending ? <><Loader size={16} style={{ animation: "spin 1s linear infinite" }} /> Sending...</> : <><Send size={16} /> Submit & Book Consultation</>}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </Reveal>

          {/* Sidebar */}
          <div>
            <Reveal delay={0.15}>
              <div style={{ background: "#F8FAFC", borderRadius: 16, padding: 28, border: "1px solid #E2E8F0", marginBottom: 20 }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, color: "#0F172A", marginBottom: 16 }}>What to Expect</h3>
                {[
                  { icon: <Calendar size={16} />, text: "We respond within 24 hours" },
                  { icon: <Phone size={16} />, text: "30-min free strategy call" },
                  { icon: <FileCheck size={16} />, text: "Custom EU entry assessment" },
                  { icon: <Shield size={16} />, text: "No obligation, no pressure" },
                ].map((w, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < 3 ? "1px solid #E2E8F0" : "none" }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center", color: "#1E2761", flexShrink: 0 }}>{w.icon}</div>
                    <span style={{ fontSize: 14, color: "#475569" }}>{w.text}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <div style={{ background: "linear-gradient(135deg, #1E2761, #2D3A8C)", borderRadius: 16, padding: 28 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 12 }}>Quick Recap</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 4 }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 700, color: "#fff" }}>€1,000</span>
                  <span style={{ fontSize: 14, color: "#94A3B8" }}>setup</span>
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 16 }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 700, color: "#fff" }}>€200</span>
                  <span style={{ fontSize: 14, color: "#94A3B8" }}>/month</span>
                </div>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 16 }}>
                  {["Branch registration", "Local representation", "Warehouse access", "Full compliance"].map((t, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0" }}>
                      <Check size={14} color="#86EFAC" />
                      <span style={{ fontSize: 13, color: "#CBD5E1" }}>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.35}>
              <div style={{ marginTop: 20, background: "#FFFBEB", borderRadius: 14, padding: 20, border: "1px solid #FDE68A" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#92400E", marginBottom: 6 }}>EU-India FTA is Active</div>
                <p style={{ fontSize: 12, color: "#A16207", lineHeight: 1.6 }}>Tariffs on 90%+ of goods are being eliminated. Indian businesses entering Europe now get the best terms in history.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Contact Info & Office ─── */
function OfficeSection() {
  return (
    <section id="info" style={{ padding: "80px 32px", background: "#F8FAFC" }}>
      <div style={{ maxWidth: 1050, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2.5, color: "#B91C1C" }}>Our Office</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3.5vw, 40px)", color: "#0F172A", marginTop: 12 }}>Where to Find Us</h2>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="two-col">
          {/* Map placeholder */}
          <Reveal>
            <div id="office" style={{ borderRadius: 18, overflow: "hidden", border: "1px solid #E2E8F0", height: "100%", minHeight: 380 }}>
              <div style={{
                width: "100%", height: "100%", background: "linear-gradient(135deg, #EFF6FF, #DBEAFE)",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 40,
              }}>
                <div style={{ fontSize: 56, marginBottom: 16 }}>🇳🇱</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "#1E2761", marginBottom: 8 }}>Netherlands</div>
                <p style={{ fontSize: 14, color: "#64748B", textAlign: "center", lineHeight: 1.6, maxWidth: 280 }}>
                  Strategically located near Rotterdam Port and Schiphol Airport — the heart of European logistics.
                </p>
                <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
                  {[
                    { icon: <Building2 size={14} />, text: "Office & Warehouse" },
                    { icon: <Truck size={14} />, text: "Distribution Hub" },
                  ].map((b, i) => (
                    <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, color: "#1E2761", background: "#fff", padding: "6px 12px", borderRadius: 8, border: "1px solid #E2E8F0" }}>
                      {b.icon} {b.text}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Info cards */}
          <div>
            <Reveal delay={0.1}>
              <div style={{ background: "#fff", borderRadius: 16, padding: 28, border: "1px solid #E2E8F0", marginBottom: 16 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0F172A", marginBottom: 20 }}>Contact Details</h3>
                {[
                  { icon: <MapPin size={18} />, label: "Address", value: "Netherlands (Full address shared after inquiry)", color: "#1E2761" },
                  { icon: <Mail size={18} />, label: "Email", value: "hello@eurobranch.eu", color: "#B91C1C" },
                  { icon: <Phone size={18} />, label: "Phone", value: "+31 (0) XX XXX XXXX", color: "#166534" },
                  { icon: <MessageSquare size={18} />, label: "WhatsApp", value: "+31 (0) XX XXX XXXX", color: "#0369A1" },
                ].map((c, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderBottom: i < 3 ? "1px solid #F1F5F9" : "none" }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: c.color + "10", display: "flex", alignItems: "center", justifyContent: "center", color: c.color, flexShrink: 0 }}>{c.icon}</div>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: 1 }}>{c.label}</div>
                      <div style={{ fontSize: 14, fontWeight: 500, color: "#0F172A" }}>{c.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div style={{ background: "#fff", borderRadius: 16, padding: 28, border: "1px solid #E2E8F0" }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0F172A", marginBottom: 20 }}>Business Hours</h3>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                  <Clock size={18} color="#1E2761" />
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#0F172A" }}>Central European Time (CET)</span>
                </div>
                {[
                  { day: "Monday – Friday", hours: "9:00 AM – 6:00 PM", active: true },
                  { day: "Saturday", hours: "By appointment only", active: false },
                  { day: "Sunday", hours: "Closed", active: false },
                ].map((d, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < 2 ? "1px solid #F1F5F9" : "none" }}>
                    <span style={{ fontSize: 14, color: "#334155", fontWeight: 500 }}>{d.day}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: d.active ? "#166534" : "#94A3B8", background: d.active ? "#DCFCE7" : "#F1F5F9", padding: "3px 10px", borderRadius: 6 }}>{d.hours}</span>
                  </div>
                ))}
                <div style={{ marginTop: 16, background: "#F8FAFC", borderRadius: 10, padding: "12px 16px" }}>
                  <div style={{ fontSize: 12, color: "#64748B" }}>
                    <strong style={{ color: "#334155" }}>India time:</strong> CET is 3.5–4.5 hours behind IST. When it's 9 AM in Netherlands, it's 1:30 PM in India.
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Quick FAQ ─── */
function QuickFAQ() {
  const items = [
    { q: "Is the consultation really free?", a: "Yes, completely free with no obligation. We'll discuss your business, goals, and whether our service is the right fit. No pressure." },
    { q: "How quickly will you respond?", a: "We respond to all inquiries within 24 hours during business days. For urgent matters, WhatsApp or phone is fastest." },
    { q: "I'm not ready to start yet. Can I still reach out?", a: "Absolutely. Many of our clients start with a preliminary conversation months before they're ready. It helps us prepare a better strategy when you are ready." },
    { q: "Do you work with businesses outside India?", a: "Our service is optimised for Indian businesses expanding to Europe, but we also work with companies from Bangladesh, Sri Lanka, Pakistan, Nepal, and other South Asian countries." },
  ];
  const [open, setOpen] = useState(null);
  return (
    <section id="quick-faq" style={{ padding: "64px 32px", background: "#fff" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <Reveal>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "#0F172A", marginBottom: 24, textAlign: "center" }}>Quick Questions</h2>
        </Reveal>
        {items.map((f, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <div style={{ background: "#F8FAFC", borderRadius: 12, marginBottom: 10, border: "1px solid #E2E8F0", overflow: "hidden" }}>
              <button onClick={() => setOpen(open === i ? null : i)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#0F172A", paddingRight: 12 }}>{f.q}</span>
                <ChevronRight size={16} color="#94A3B8" style={{ transform: open === i ? "rotate(90deg)" : "rotate(0)", transition: "transform 0.25s", flexShrink: 0 }} />
              </button>
              <div style={{ maxHeight: open === i ? 200 : 0, overflow: "hidden", transition: "max-height 0.3s ease" }}>
                <p style={{ padding: "0 20px 16px", fontSize: 13, color: "#64748B", lineHeight: 1.65 }}>{f.a}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─── CTA Banner ─── */
function CTABanner() {
  return (
    <section style={{ padding: "64px 32px", background: "linear-gradient(135deg, #1E2761, #2D3A8C)" }}>
      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
        <Reveal>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 3vw, 34px)", color: "#fff", marginBottom: 12 }}>Your EU Branch, Weeks Away</h2>
          <p style={{ fontSize: 15, color: "#CBD5E1", lineHeight: 1.7, maxWidth: 480, margin: "0 auto 28px" }}>Every great European expansion starts with a single conversation. Take that step today.</p>
          <a href="#form" style={{
            display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", color: "#1E2761",
            padding: "14px 32px", borderRadius: 10, fontSize: 15, fontWeight: 700, textDecoration: "none",
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)", transition: "transform 0.2s",
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
          {["Privacy Policy", "Terms", "Pricing"].map((t, i) => (
            <a key={i} href="#" style={{ fontSize: 13, color: "#64748B", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = "#fff"} onMouseLeave={e => e.target.style.color = "#64748B"}>{t}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ─── App ─── */
export default function ContactPage() {
  return (
    <div style={{ "--font-display": "'DM Serif Display', Georgia, serif", fontFamily: "'DM Sans', -apple-system, sans-serif" }}>
      <Nav />
      <Hero />
      <ContactMethods />
      <FormSection />
      <OfficeSection />
      <QuickFAQ />
      <CTABanner />
      <Footer />
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (max-width: 900px) {
          .two-col, .form-grid { grid-template-columns: 1fr !important; }
          .form-inner-grid { grid-template-columns: 1fr !important; }
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
