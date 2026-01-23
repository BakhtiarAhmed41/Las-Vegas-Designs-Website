import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Las Vegas Designs",
  description: "Get your custom designs for Las Vegas-themed projects.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className={`${geistSans.className} max-w-full overflow-x-hidden antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
