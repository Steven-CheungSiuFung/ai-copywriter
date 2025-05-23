import "./globals.css";

import { Poppins } from "next/font/google"

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

import NavigationBar from "@/components/navigation-bar/bavigation-bar.component";
import Footer from "@/components/footer/footer.component";

export const metadata = {
  title: "CopyGenius",
  description: "AI powered Copywriter",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <body className="flex flex-col min-h-screen">
        <NavigationBar />
        <main className="flex-grow flex">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
