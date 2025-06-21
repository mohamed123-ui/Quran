import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import ClientLayout from "./Client-Layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "قرآن كريم - تطبيق تفاعلي",
    template: "%s | قرآن كريم",
  },
  description:
    "استعرض واستمع إلى سور وآيات القرآن الكريم بترتيب النزول أو المصحف، مع اختبارات تفاعلية لحفظ الآيات.",
  keywords: [
    "قرآن",
    "Quran",
    "ترتيب النزول",
    "سور",
    "القرآن الكريم",
    "تطبيق",
    "تجويد",
    "مشاري العفاسي",
  ],
  authors: [{ name: "سليم" }],
  creator: "سليم",
  metadataBase: new URL("https://quran-app.vercel.app"),
  openGraph: {
    title: "تطبيق القرآن الكريم التفاعلي",
    description: "تعلم واستعرض آيات وسور القرآن الكريم بطريقة تفاعلية سهلة.",
    url: "https://quran-app.vercel.app",
    siteName: "Quran Interactive",
    locale: "ar_EG",
    type: "website",
  },
  themeColor: "#ffffff",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
