// src/app/layout.js
import './globals.css';
import Navbar from './components/Navbar';


export const metadata = {
  title: 'Beauty Service',
  description: 'Advanced Beauty Treatments',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
            <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap"
          rel="stylesheet"
        />
      </head>

      <body>
        <Navbar />
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
