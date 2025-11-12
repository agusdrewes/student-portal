import type { Metadata } from "next";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import NotificationPopup from "@/components/ui/NotificationsPuopup"; // 🔔 importamos componente cliente

export const metadata: Metadata = {
  title: "UADE Connect",
  description: "Portal del estudiante",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="flex h-screen">
        <SidebarProvider>
          <AppSidebar />
          <main className="flex-1 bg-white overflow-y-auto">{children}</main>
        </SidebarProvider>

        {/* 🔔 Notificación global */}
        <NotificationPopup />
      </body>
    </html>
  );
}
