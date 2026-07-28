import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Personal Editorial｜筆記雜誌",
  description: "收集作品介紹、Skill 收藏、外語導遊口說與閱讀整理的個人報刊式部落格。",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
