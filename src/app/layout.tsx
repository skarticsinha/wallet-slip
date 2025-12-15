// src/app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/components/AuthProvider';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Wrap the entire application with the AuthProvider */}
        <AuthProvider> 
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}