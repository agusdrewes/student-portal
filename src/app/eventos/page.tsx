// src/app/miscursos/page.tsx
"use client";

import React, { useState } from "react";
import { PanelLeft, Clock, SquareUser, MapPin } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function eventosPage() {
  return (
    <main className=" w-full flex flex-col gap-8 bg-white">
      <div className="pt-9.5 pb-9.5 pl-8 flex gap-4 items-center space-x-2 text-sm text-muted-foreground border-b h-[53px]">
        <PanelLeft size={15}></PanelLeft>
        <span className="text-muted-foreground">|</span>

        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink>Portal Estudiante</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Calendario</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="pl-8 pr-8"></div>
    </main>
  );
}
