import "./globals.css";
import { Header } from "@/components/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="dark"
    >
      <body
        className="min-h-full flex flex-col"
        suppressHydrationWarning
      >
        <Header />
        <div className="flex-1">{children}</div>
      </body>
    </html>
  );
}
