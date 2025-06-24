import '../styles/globals.css';
import { SkatPilotProvider } from '../context/SkatPilotContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="da">
      <body>
        <SkatPilotProvider>{children}</SkatPilotProvider>
      </body>
    </html>
  );
}