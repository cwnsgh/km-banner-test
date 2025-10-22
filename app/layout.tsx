import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "배너 관리 시스템",
  description: "웹에이전시 배너 관리 시스템",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
