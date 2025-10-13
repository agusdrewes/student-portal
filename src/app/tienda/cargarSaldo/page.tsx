// src/app/tienda/page.tsx
"use client";
import React, { useState } from "react";
import { PanelLeft, WalletMinimal, X } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "next/link";

export default function CargaSaldoPage() {
  const [selectedAmount, setSelectedAmount] = React.useState<number | null>(
    null
  );

  const [saldoConfirmado, setSaldoConfirmado] = useState(false);

  return (
    <main className="w-full flex flex-col gap-8 bg-white">
      <div className="pt-9.5 pb-9.5 pl-8 flex gap-4 items-center space-x-2 text-sm text-muted-foreground border-b h-[53px]">
        <PanelLeft size={15} />
        <span className="text-muted-foreground">|</span>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink>Portal Estudiante</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/tienda">Tienda</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbPage>Cargar Saldo</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div>
        <div className="border rounded-xl flex flex-row justify-between m-8 mt-4 p-5 pl-6 pt-8 pr-10">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">Saldo Actual</h2>
            <h3 className="text-xl text-[#404040] font-bold">$2,450.00</h3>
          </div>
          <div className="bg-[#D9D9D9] rounded-full p-3 fit-content h-12">
            <WalletMinimal color="#757575"></WalletMinimal>
          </div>
        </div>

        <div className="border rounded-xl m-8 mt-4  pt-8 ">
          <div className="pb-3 border-b  ">
            <h4 className="text-base font-bold pl-6 pb-5 ">
              Tarjeta de Débito/Crédito
            </h4>
          </div>
          <div className=" border-b">
            <div className="grid grid-cols-2  pt-8 ml-6 pb-8 gap-3 mr-8">
              <div className=" font-light">
                <span>Número de la tarjeta</span>
              </div>
              <div className="font-light">
                <span>Nombre y apellido que aparece en la tarjeta</span>
              </div>
              <div>
                <Input placeholder="1234 5678 9012 345"></Input>
              </div>
              <div>
                <Input placeholder="Juan Perez"></Input>
              </div>

              <div className=" font-light pt-6">
                <span>Fecha de nacimiento</span>
              </div>
              <div className="font-light pt-6">
                <span>CVV</span>
              </div>
              <div>
                <Input placeholder="MM/AA"></Input>
              </div>
              <div>
                <Input placeholder="123"></Input>
              </div>
            </div>
          </div>

          <div className="p-6">
            <h3 className="font-light">Monto a cargar</h3>
            <div className="flex items-center border border-input rounded-full px-3 mt-5 py-2 w-full bg-white text-sm">
              <span className="text-gray-500 mr-2">$</span>
              <input
                type="number"
                inputMode="decimal"
                placeholder="0.00"
                className="bg-transparent outline-none flex-1 text-black placeholder:text-muted-foreground"
              />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 justify-between pl-5 pr-5">
            <div className="w-[100%] justify-between">
              <Button
                onClick={() => setSelectedAmount(5000)}
                className={`w-full border border-gray text-black ${
                  selectedAmount === 5000 ? "bg-gray-200" : "bg-white"
                } hover:bg-gray-100`}
              >
                $5.000
              </Button>
            </div>
            <div className="w-[100%] justify-between">
              <Button
                onClick={() => setSelectedAmount(7000)}
                className={`w-full border border-gray text-black ${
                  selectedAmount === 7000 ? "bg-gray-200" : "bg-white"
                } hover:bg-gray-100`}
              >
                $7.000
              </Button>
            </div>{" "}
            <div className="w-[100%] justify-between">
              <Button
                onClick={() => setSelectedAmount(10000)}
                className={`w-full border border-gray text-black ${
                  selectedAmount === 10000 ? "bg-gray-200" : "bg-white"
                } hover:bg-gray-100`}
              >
                $10.000
              </Button>
            </div>{" "}
            <div className="w-[100%] justify-between">
              <Button
                onClick={() => setSelectedAmount(20000)}
                className={`w-full border border-gray text-black ${
                  selectedAmount === 20000 ? "bg-gray-200" : "bg-white"
                } hover:bg-gray-100`}
              >
                $20.000
              </Button>
            </div>
          </div>

          <div
            className="p-5 slign-center justify-self-center align-content-center

"
          >
            <Button
              className="w-[350px]"
              onClick={() => setSaldoConfirmado(true)}
            >
              Confirmar Saldo Tarjeta
            </Button>
          </div>
        </div>

        <AlertDialog open={saldoConfirmado} onOpenChange={setSaldoConfirmado}>
          <AlertDialogContent className="text-center w-[500px]">
            <AlertDialogHeader>
              <div className="jutify-start">
                <Link
                  href={"/tienda"}
                  onClick={() => setSaldoConfirmado(false)}
                  className="justify-start"
                >
                  <X color={"black"} className="justify-start">
                    {" "}
                  </X>
                </Link>
              </div>

              <AlertDialogTitle className="text-center">
                Confirmación de saldo{" "}
              </AlertDialogTitle>
              <AlertDialogDescription className="text-center">
                Ya podes encontrar tu nueva carga en la Tienda
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="justify-center"></AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </main>
  );
}
