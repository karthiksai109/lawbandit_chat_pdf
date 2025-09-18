import "@/styles/globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "LawBandit — Chat with PDFs",
  description: "Upload a PDF and ask questions about it",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">{children}</body>
    </html>
  );
}
