"use client"; // Este componente precisa ser um Client Component

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/register" || pathname === "/auth" || pathname.startsWith("/trips/export") && pathname.endsWith("/link") || pathname === "/" ; // Verifica rotas como "/trips/export/[id]/pdf"; // Adicione mais rotas conforme necessário

  if (isAuthPage) {
    return (
      <main className=" flex justify-center items-center h-screen bg-gray-900">
        {children}
      </main>
    );
  }

  return (
    <div className="flex h-screen bg-gray-900">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="p-4 flex-1 overflow-auto custom-scrollbar">{children}</main>
      </div>
    </div>
  );
}
