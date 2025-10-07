"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  SquareTerminal,
  ChevronDown,
  BookOpen,
  Coffee,
  CalendarDays,
  ShoppingBag,
  BellRing,
} from "lucide-react";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const isActive = (pathname: string, href: string) =>
  pathname === href || (href !== "/" && pathname.startsWith(href));

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="bg-[#FAFAFA]">
      {/* Header con logo */}
      <SidebarHeader>
        <div className="flex items-center gap-7 px-3 mb-2 h-[53px]">
          <Image src="/logoUADE.png" alt="Logo" width={80} height={80} />
          <span className="px-5 py-1 bg-[#193167] text-white text-sm font-bold rounded-2xl">
            CONNECT
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent className="border-t">
        <SidebarGroup>
          <SidebarGroupLabel>Plataforma</SidebarGroupLabel>

          <SidebarMenu>
            <Collapsible defaultOpen className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="justify-between">
                    <div className="flex items-center gap-2">
                      <SquareTerminal size={15} />
                      <span>Portal Estudiante</span>
                    </div>
                    <span className="transition-transform group-data-[state=open]/collapsible:rotate-180">
                      <ChevronDown size={15} />
                    </span>
                  </SidebarMenuButton>
                </CollapsibleTrigger>
              </SidebarMenuItem>

              {/* Este bloque VA FUERA del SidebarMenuItem */}
              <CollapsibleContent className="font-normal px-3">
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuButton
                      isActive={pathname === "/misCursos"}
                      className="data-[active=true]:text-[#6F97F0]  "
                    >
                      <Link href="/misCursos">Mis Cursos</Link>
                    </SidebarMenuButton>
                  </SidebarMenuSubItem>

                  <SidebarMenuSubItem>
                    <SidebarMenuButton
                      isActive={isActive(pathname, "/inscripciones")}
                    >
                      <Link href="/inscripciones">Inscripciones</Link>
                    </SidebarMenuButton>
                  </SidebarMenuSubItem>

                  <SidebarMenuSubItem>
                    <SidebarMenuButton
                      isActive={pathname === "/eventos"}
                      className="data-[active=true]:text-[#6F97F0]  "
                    >
                      <Link href="/eventos">Calendario</Link>
                    </SidebarMenuButton>
                  </SidebarMenuSubItem>

                  <SidebarMenuSubItem>
                    <SidebarMenuButton isActive={isActive(pathname, "/tienda")}>
                      <Link href="/tienda">Tienda</Link>
                    </SidebarMenuButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>

            {[
              { icon: BookOpen, label: "Biblioteca" },
              { icon: Coffee, label: "Comedor" },
              { icon: CalendarDays, label: "Eventos" },
              { icon: ShoppingBag, label: "Tienda" },
            ].map((item, i) => (
              <Collapsible key={i} className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="justify-between">
                      <div className="flex items-center gap-2">
                        {<item.icon size={15} />}
                        <span>{item.label}</span>
                      </div>
                      <span className="rotate-270">
                        <ChevronDown size={15} />
                      </span>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer con usuario */}
      <SidebarFooter className="flex flex-row justify-between p-4 border-t">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col ">
          <span className="text-xs  text-left font-semibold">Example</span>
          <span className="text-xs text-left font-normal">m@example.com</span>
        </div>
        <BellRing size={17} className="items-center justify-between" />
      </SidebarFooter>
    </Sidebar>
  );
}
