import MainLayout from "@/layouts/MainLayout";
import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <MainLayout>{children}</MainLayout>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
