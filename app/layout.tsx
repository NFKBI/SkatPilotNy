import '../styles/globals.css';
import { SkatPilotProvider } from '../context/SkatPilotContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="da">
      <head>
        <meta charSet="UTF-8" /> {/* <-- Her tilføjer du denne linje */}
        <title>SkatPilot</title>
        <link
          rel="icon"
          href="/skatpilot_favicon_32x32.png"
          type="image/png"
          sizes="32x32"
        />
      </head>
      <body>
        <SkatPilotProvider>{children}</SkatPilotProvider>
      </body>
    </html>
  );
}