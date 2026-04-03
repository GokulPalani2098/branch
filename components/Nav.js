'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Globe, Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid #E2E8F0' : '1px solid transparent',
      transition: 'all 0.35s ease',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: 'linear-gradient(135deg, #1E2761, #2D3A8C)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Globe size={20} color="#fff" strokeWidth={2.2} />
          </div>
          <div>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: '#1E2761', letterSpacing: '-0.3px' }}>EuroBranch</span>
            <span style={{ display: 'block', fontSize: 10, color: '#64748B', letterSpacing: '1.5px', textTransform: 'uppercase', marginTop: -2 }}>Gateway to Europe</span>
          </div>
        </Link>

        {/* Desktop */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }} className="nav-desktop">
          {navLinks.map(l => (
            <Link key={l.label} href={l.href} style={{ fontSize: 14, fontWeight: 500, color: '#475569', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = '#B91C1C'}
              onMouseLeave={e => e.target.style.color = '#475569'}
            >{l.label}</Link>
          ))}
          <Link href="/contact" style={{
            background: 'linear-gradient(135deg, #B91C1C, #991B1B)', color: '#fff', padding: '10px 24px', borderRadius: 8,
            fontSize: 14, fontWeight: 600, boxShadow: '0 2px 8px rgba(185,28,28,0.25)', transition: 'transform 0.2s',
          }}
            onMouseEnter={e => e.target.style.transform = 'translateY(-1px)'}
            onMouseLeave={e => e.target.style.transform = 'translateY(0)'}
          >Free Consultation</Link>
        </div>

        {/* Mobile button */}
        <button className="nav-mobile-btn" onClick={() => setMobileOpen(!mobileOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}>
          {mobileOpen ? <X size={24} color="#1E2761" /> : <Menu size={24} color="#1E2761" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{ background: '#fff', borderTop: '1px solid #E2E8F0', padding: '16px 32px 24px' }} className="nav-mobile-menu">
          {navLinks.map(l => (
            <Link key={l.label} href={l.href} onClick={() => setMobileOpen(false)}
              style={{ display: 'block', padding: '12px 0', fontSize: 15, fontWeight: 500, color: '#334155', borderBottom: '1px solid #F1F5F9' }}
            >{l.label}</Link>
          ))}
          <Link href="/contact" onClick={() => setMobileOpen(false)}
            style={{ display: 'block', marginTop: 16, background: '#B91C1C', color: '#fff', padding: '12px 24px', borderRadius: 8, fontSize: 14, fontWeight: 600, textAlign: 'center' }}
          >Free Consultation</Link>
        </div>
      )}

      <style jsx global>{`
        @media (max-width: 900px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: block !important; }
        }
        @media (min-width: 901px) {
          .nav-mobile-btn { display: none !important; }
          .nav-mobile-menu { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
