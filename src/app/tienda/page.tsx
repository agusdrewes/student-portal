"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PanelLeft, Plus, X } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";

// --- Datos de Ejemplo ---
const saldoData = [
  { label: "Saldo disponible", amount: 2450.0 },
  { label: "Gastado este mes", amount: 850.0 },
  { label: "Total cargado", amount: 3300.0 },
];

const historialCompras = [
  {
    id: 1,
    description: "Compra en Biblioteca",
    date: "28 de Agosto 2025",
    amount: 20000.0,
  },
  {
    id: 2,
    description: "Almuerzo Cafetería",
    date: "27 de Agosto 2025",
    amount: 15300.0,
  },
  {
    id: 3,
    description: "Café Cafetería",
    date: "25 de Agosto 2025",
    amount: 6000.0,
  },
];

// --- Componente ---
export default function TiendaPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Función para el formato de Saldo
  const formatCurrency = (amount: number) => {
    const options: Intl.NumberFormatOptions = {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    };
    return new Intl.NumberFormat("es-AR", options).format(amount);
  };

  //función de formato solo para el Historial
  const formatHistoryAmount = (amount: number) => {
    const options: Intl.NumberFormatOptions = {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    };
    const formattedAmount = new Intl.NumberFormat("es-AR", options).format(
      amount
    );
    return `$${formattedAmount}`;
  };

  // Datos estáticos para el popup
  const purchaseDetails = {
    date: "25 Octubre 2025",
    time: "10:06",
    entity: "Biblioteca",
    items: [
      { name: "Libro - Calculo diferencial e integral x 1", price: 24300 },
      { name: "Libro - Probabilidad y estadística x 1", price: 26700 },
    ],
    total: 50000,
  };

  return (
    <main className="w-full flex flex-col bg-white">
      {/* Header con Breadcrumbs */}
      <div className="pt-9.5 pb-9.5 pl-8 flex gap-4 items-center space-x-2 text-sm text-muted-foreground border-b h-[53px] shrink-0 bg-white">
        <PanelLeft size={15} />
        <span className="text-muted-foreground">|</span>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Tienda</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Contenido Principal de la Página */}
      <div className="p-8 flex-grow overflow-auto">
        {/* Sección de Saldo Institucional */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Saldo institucional</h1>
            <Link href="/tienda/cargarSaldo" passHref>
              <Button className="bg-[#6F97F0] hover:bg-[#5a81d4]">
                <Plus className="mr-2 h-4 w-4" /> Cargar Saldo
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {saldoData.map(item => (
              <div
                key={item.label}
                className="bg-gray-100 rounded-lg p-6 flex flex-col gap-2"
              >
                <span className="text-2xl font-bold text-gray-800">
                  {formatCurrency(item.amount)}
                </span>
                <span className="text-sm text-gray-500">{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Sección de Historial de Compras */}
        <section className="mt-8 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-6">Historial de compras</h2>
          <div className="space-y-4">
            {historialCompras.map(compra => (
              <div
                key={compra.id}
                className="bg-white border border-gray-200 rounded-xl p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setIsModalOpen(true)}
              >
                <div>
                  <p className="font-semibold text-gray-800 text-lg">
                    {compra.description}
                  </p>
                  <p className="text-sm text-gray-500">{compra.date}</p>
                </div>
                <p className="font-semibold text-gray-900 text-lg">
                  {formatHistoryAmount(compra.amount)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Popup de Resumen de Compra */}
        <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <AlertDialogContent className="sm:max-w-md">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-center text-2xl font-bold pt-4">
                Resumen de compra
              </AlertDialogTitle>
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none"
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Cerrar</span>
              </button>
            </AlertDialogHeader>

            <Separator />

            <div className="py-2 space-y-3">
              <div className="text-base">
                <span className="font-bold text-gray-900">Fecha: </span>
                <span className="text-gray-600">
                  {purchaseDetails.date} {purchaseDetails.time}
                </span>
              </div>
              <div className="text-base">
                <span className="font-bold text-gray-900">Entidad: </span>
                <span className="text-gray-600">{purchaseDetails.entity}</span>
              </div>
            </div>

            <Separator />

            <div className="py-2 space-y-4">
              <h3 className="text-lg font-bold">Detalles de Pago</h3>
              <div className="space-y-3">
                {purchaseDetails.items.map(item => (
                  <div key={item.name} className="flex justify-between text-sm">
                    <span className="text-gray-600">{item.name}</span>
                    <span className="font-medium text-gray-900">
                      {formatHistoryAmount(item.price)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div className="py-2 flex justify-between">
              <span className="text-lg font-bold">Total</span>
              <span className="text-lg font-bold">
                {formatHistoryAmount(purchaseDetails.total)}
              </span>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </main>
  );
}
