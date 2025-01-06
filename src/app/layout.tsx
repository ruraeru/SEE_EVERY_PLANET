import type { Metadata } from "next";
import { Yeon_Sung } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/ui/navigation";

const yeonSung = Yeon_Sung({
  weight: ['400'],
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: {
    template: "See My Planet | %s",
    default: "See My Planet"
  },
  description: "Developed by taewoo",
  icons: {
    icon: "/openGraph_image.jpg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${yeonSung.className} antialiased w-screen h-screen`}>
        {children}
        <Navigation />
      </body>
    </html >
  );
}
