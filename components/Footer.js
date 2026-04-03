import Link from 'next/link';
import { Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ background: '#0F172A', padding: '64px 32px 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48 }} className="footer-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #2D3A8C, #4F46E5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Globe size={18} color="#fff" />
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: '#fff' }}>EuroBranch</span>
            </div>
            <p style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.7, maxWidth: 300 }}>Your gateway to Europe. We register your branch, represent your brand, and connect you to EU buyers — so you can sell in Europe without relocating.</p>
          </div>
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 16, textTransform: 'uppercase', letterSpacing: 1 }}>Services</h4>
            {['Branch Registration', 'Local Representation', 'Warehouse & Logistics', 'Compliance & Legal', 'Buyer Connections'].map((t, i) => (
              <Link key={i} href="/how-it-works" style={{ display: 'block', fontSize: 14, color: '#94A3B8', padding: '4px 0', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#fff'}
                onMouseLeave={e => e.target.style.color = '#94A3B8'}
              >{t}</Link>
            ))}
          </div>
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 16, textTransform: 'uppercase', letterSpacing: 1 }}>Company</h4>
            {[
              { label: 'About Us', href: '/about' },
              { label: 'How It Works', href: '/how-it-works' },
              { label: 'Pricing', href: '/pricing' },
              { label: 'Blog', href: '/blog' },
              { label: 'Contact', href: '/contact' },
            ].map((l, i) => (
              <Link key={i} href={l.href} style={{ display: 'block', fontSize: 14, color: '#94A3B8', padding: '4px 0', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#fff'}
                onMouseLeave={e => e.target.style.color = '#94A3B8'}
              >{l.label}</Link>
            ))}
          </div>
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 16, textTransform: 'uppercase', letterSpacing: 1 }}>Contact</h4>
            <p style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.8 }}>
              Netherlands<br />
              hello@eurobranch.eu<br />
              +31 (0) XX XXX XXXX
            </p>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #1E293B', marginTop: 48, paddingTop: 24, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <span style={{ fontSize: 13, color: '#64748B' }}>© 2026 EuroBranch. All rights reserved.</span>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((t, i) => (
              <Link key={i} href="#" style={{ fontSize: 13, color: '#64748B' }}>{t}</Link>
            ))}
          </div>
        </div>
      </div>
      <style jsx global>{`
        @media (max-width: 800px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
