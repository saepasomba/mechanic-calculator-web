import MainLayout from "@/layouts/MainLayout";
import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/react";
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
    <head>
      <meta name="google-adsense-account" content="ca-pub-3484021851390412"/>
      <title>Mekalkulator</title>
    </head>
    <body>
    <Providers>
      <MainLayout>{children}</MainLayout>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
