// src/app/layout.tsx
import '../styles/globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <title>Webhook Inspector</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
