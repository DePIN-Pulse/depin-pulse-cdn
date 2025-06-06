import type { Metadata } from "next";
export const metadata: Metadata = {title: "DePIN Pulse CDN", description: "DePIN Pulse CDN",};
export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {return (<html lang="en"><body>{children}</body></html>);}