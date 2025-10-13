// src/app/tienda/page.tsx
import React from "react";
import { PanelLeft } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

export default function TiendaPage() {
  console.log("tienda cargada"); // 👈

  return (
    <main className="w-full flex flex-col gap-8 bg-white">
      <div className="pt-9.5 pb-9.5 pl-8 flex gap-4 items-center space-x-2 text-sm text-muted-foreground border-b h-[53px]">
        <PanelLeft size={15} />
        <span className="text-muted-foreground">|</span>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbPage>Tienda</BreadcrumbPage>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
      <button>
        {" "}
        <Link href="/tienda/cargarSaldo">Tienda</Link>
      </button>
    </main>
  );
}
