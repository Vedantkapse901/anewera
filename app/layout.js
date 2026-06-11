import { Playfair_Display, Cinzel, Raleway, Josefin_Sans, Lato } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['400', '600', '700', '900'],
});

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '600', '700', '900'],
});

const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-ui',
  weight: ['300', '400', '500', '600', '700'],
});

const josefin = Josefin_Sans({
  subsets: ['latin'],
  variable: '--font-label',
  weight: ['300', '400', '600', '700'],
});

const lato = Lato({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '700'],
});

export const metadata = {
  title: 'A New Era Developers | Building Tomorrow\'s Legacy',
  description: 'A New Era Developers crafts landmark land and construction opportunities across Dholera SIR and Mira Road.',
  icons: {
    icon: '/images/logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${cinzel.variable} ${raleway.variable} ${josefin.variable} ${lato.variable}`}
    >
      <body className="font-body bg-ivory text-text-mid">
        {children}
      </body>
    </html>
  );
}
