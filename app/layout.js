import { Inter } from "next/font/google";
import LayoutWrapper from "./components/LayoutWrapper"; // Importa o novo wrapper de layout
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <body className={inter.className}>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
