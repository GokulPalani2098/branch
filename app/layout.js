import './globals.css';

export const metadata = {
  title: 'EuroBranch — Your Gateway to Europe',
  description: 'We register your Europe branch, act as your local representative, and connect you to EU buyers — so you can sell in Europe without relocating. Starting at €200/month.',
  keywords: 'Europe branch registration, EU market entry, Indian business Europe, Netherlands branch setup, EU expansion, trade, export',
  openGraph: {
    title: 'EuroBranch — Your Gateway to Europe',
    description: 'Branch registration, local representation, warehouse & logistics, and full compliance — all for €200/month.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
