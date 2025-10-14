import React from "react";
import Link from "next/link";
import { PanelLeft, Plus } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";

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
  // Función para el formato de Saldo (con decimales)
  const formatCurrency = (amount: number) => {
    const options: Intl.NumberFormatOptions = {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    };
    return new Intl.NumberFormat("es-AR", options).format(amount);
  };

  // Nueva función de formato solo para el Historial (sin decimales y sin espacio)
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
              {/* CAMBIO: Se agregó className para el color del botón */}
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
                className="bg-white border border-gray-200 rounded-xl p-4 flex justify-between items-center"
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
      </div>
    </main>
  );
}
