import type { Metadata } from 'next';
import { ReduxProvider } from '@redux/provider';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import ThemeRegistry from '../theme/ThemeRegistry';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <UserProvider>
        <body>
          <ReduxProvider>
            <ThemeRegistry>{children}</ThemeRegistry>
          </ReduxProvider>
        </body>
      </UserProvider>
    </html>
  );
}
