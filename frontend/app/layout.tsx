import './globals.css';
import { ReactNode } from 'react';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { Providers } from './provider';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen">
      <Providers>{children}</Providers>
      </body>
    </html>
  );
}
