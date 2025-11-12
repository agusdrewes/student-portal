"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PanelLeft, WalletMinimal, X } from "lucide-react";

// CAMBIO: Importamos CardDetails desde types.ts
import { getSaldo, cargarSaldo } from "@/lib/api/tienda";
import { CardDetails } from "@/lib/api/types";

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
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Definimos un tipo para nuestro objeto de errores
type FormErrors = {
  cardNumber?: string;
  expiration?: string;
  cvv?: string;
  amount?: string;
};

export default function CargaSaldoPage() {
  const [selectedAmount, setSelectedAmount] = React.useState<number | null>(
    null
  );
  const [saldoConfirmado, setSaldoConfirmado] = useState(false);
  const [saldoActual, setSaldoActual] = useState<number | null>(null);
  const [montoManual, setMontoManual] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  // Estados para los campos de la tarjeta
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState(""); // Estado para el nombre
  const [expiration, setExpiration] = useState("");
  const [cvv, setCvv] = useState("");

  const [errors, setErrors] = useState<FormErrors>({});
  const [apiError, setApiError] = useState<string | null>(null);

  const router = useRouter();

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
    });
  };

  useEffect(() => {
    const fetchSaldo = async () => {
      setIsLoading(true);
      try {
        const data = await getSaldo();
        setSaldoActual(data.balance);
      } catch (error: any) {
        console.error("No se pudo obtener el saldo:", error.message);
        setSaldoActual(0);
      }
      setIsLoading(false);
    };

    fetchSaldo();
  }, []);

  const handleMontoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMontoManual(e.target.value);
    setSelectedAmount(null);
    if (errors.amount) setErrors(prev => ({ ...prev, amount: undefined }));
    setApiError(null);
  };

  const handleSelectMonto = (amount: number) => {
    setSelectedAmount(amount);
    setMontoManual(String(amount));
    if (errors.amount) setErrors(prev => ({ ...prev, amount: undefined }));
    setApiError(null);
  };

  // Validación de formulario avanzada
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const amountAsNumber = parseFloat(montoManual);

    if (isNaN(amountAsNumber) || amountAsNumber <= 0) {
      newErrors.amount = "El monto a cargar debe ser mayor a 0.";
    }
    if (cardNumber.replace(/\D/g, "").length !== 16) {
      newErrors.cardNumber = "El número de tarjeta debe tener 16 dígitos.";
    }
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiration)) {
      newErrors.expiration = "El formato de vencimiento debe ser MM/YY.";
    }
    if (!/^\d{3,4}$/.test(cvv)) {
      newErrors.cvv = "El CVV debe tener 3 o 4 dígitos.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCargarSaldo = async () => {
    setApiError(null);
    if (!validateForm()) {
      return;
    }

    const amountAsNumber = parseFloat(montoManual);
    // Creamos el DTO (cardName no se envía, pero lo validamos)
    const depositData: CardDetails = {
      cardNumber,
      expiration,
      cvv,
      amount: amountAsNumber,
    };

    try {
      await cargarSaldo(depositData);
      setSaldoConfirmado(true);
      setSaldoActual(prevSaldo => (prevSaldo || 0) + amountAsNumber);

      setMontoManual("");
      setCardNumber("");
      setCardName("");
      setExpiration("");
      setCvv("");
      setSelectedAmount(null);
      setErrors({});
    } catch (error: any) {
      console.error("Error de red al cargar saldo:", error.message);
      setApiError(`Error al cargar el saldo: ${error.message}`);
    }
  };

  return (
    <main className="w-full flex flex-col gap-8 bg-white">
      {/* ... (Header sin cambios) ... */}
      <div className="pt-9.5 pb-9.5 pl-8 flex gap-4 items-center space-x-2 text-sm text-muted-foreground border-b h-[53px]">
        <PanelLeft size={15} />
        <span className="text-muted-foreground">|</span>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Portal Estudiante</BreadcrumbLink>
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
        {/* ... (Saldo Actual sin cambios) ... */}
        <div className="border rounded-xl flex flex-row justify-between m-8 mt-4 p-5 pl-6 pt-8 pr-10">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">Saldo Actual</h2>
            <h3 className="text-xl text-[#404040] font-bold">
              {isLoading ? "Cargando..." : formatCurrency(saldoActual ?? 0.0)}
            </h3>
          </div>
          <div className="bg-[#D9D9D9] rounded-full p-3 fit-content h-12">
            <WalletMinimal color="#757575"></WalletMinimal>
          </div>
        </div>

        {/* Formulario de Carga */}
        <div className="border rounded-xl m-8 mt-4 pt-8 ">
          <div className="pb-3 border-b">
            <h4 className="text-base font-bold pl-6 pb-5 ">
              Tarjeta de Débito/Crédito
            </h4>
          </div>
          <div className=" border-b">
            <div className="grid grid-cols-2  pt-8 ml-6 pb-8 gap-x-8 gap-y-3 mr-8">
              {/* --- Campo Número de Tarjeta --- */}
              <div className="space-y-1">
                <span className="font-light text-sm">Número de la tarjeta</span>
                <Input
                  placeholder="0000 0000 0000 0000"
                  value={cardNumber}
                  onChange={e => {
                    setCardNumber(e.target.value);
                    if (errors.cardNumber)
                      setErrors(prev => ({ ...prev, cardNumber: undefined }));
                    setApiError(null);
                  }}
                  className={cn(errors.cardNumber && "border-red-500")}
                />
                {errors.cardNumber && (
                  <p className="text-red-500 text-xs">{errors.cardNumber}</p>
                )}
              </div>

              {/* --- Campo Nombre y Apellido --- */}
              <div className="space-y-1">
                <span className="font-light text-sm">
                  Nombre y apellido que aparece en la tarjeta
                </span>
                <Input
                  placeholder="Juan Perez"
                  value={cardName}
                  onChange={e => setCardName(e.target.value)}
                />
              </div>

              {/* --- Campo Fecha de Vencimiento --- */}
              <div className="space-y-1 pt-4">
                <span className="font-light text-sm">Fecha de Vencimiento</span>
                <Input
                  placeholder="MM/YY"
                  value={expiration}
                  onChange={e => {
                    setExpiration(e.target.value);
                    if (errors.expiration)
                      setErrors(prev => ({ ...prev, expiration: undefined }));
                    setApiError(null);
                  }}
                  className={cn(errors.expiration && "border-red-500")}
                />
                {errors.expiration && (
                  <p className="text-red-500 text-xs">{errors.expiration}</p>
                )}
              </div>

              {/* --- Campo CVV --- */}
              <div className="space-y-1 pt-4">
                <span className="font-light text-sm">CVV</span>
                <Input
                  placeholder="123"
                  value={cvv}
                  onChange={e => {
                    setCvv(e.target.value);
                    if (errors.cvv)
                      setErrors(prev => ({ ...prev, cvv: undefined }));
                    setApiError(null);
                  }}
                  className={cn(errors.cvv && "border-red-500")}
                />
                {errors.cvv && (
                  <p className="text-red-500 text-xs">{errors.cvv}</p>
                )}
              </div>
            </div>
          </div>

          {/* ... (Sección de Monto sin cambios) ... */}
          <div className="p-6">
            <h3 className="font-light">Monto a cargar</h3>
            <div
              className={cn(
                "flex items-center border border-input rounded-full px-3 mt-5 py-2 w-full bg-white text-sm",
                errors.amount && "border-red-500"
              )}
            >
              <span className="text-gray-500 mr-2">$</span>
              <input
                type="number"
                inputMode="decimal"
                placeholder="0.00"
                className="bg-transparent outline-none flex-1 text-black placeholder:text-muted-foreground"
                value={montoManual}
                onChange={handleMontoChange}
              />
            </div>
            {errors.amount && (
              <p className="text-red-500 text-xs pl-2 mt-1">{errors.amount}</p>
            )}
          </div>

          {/* ... (Botones de monto sin cambios) ... */}
          <div className="grid grid-cols-4 gap-4 justify-between pl-5 pr-5">
            <div className="w-[100%] justify-between">
              <Button
                onClick={() => handleSelectMonto(5000)}
                className={`w-full border border-gray text-black ${
                  selectedAmount === 5000 ? "bg-gray-200" : "bg-white"
                } hover:bg-gray-100 cursor-pointer`}
              >
                $5.000
              </Button>
            </div>
            <div className="w-[100%] justify-between">
              <Button
                onClick={() => handleSelectMonto(7000)}
                className={`w-full border border-gray text-black ${
                  selectedAmount === 7000 ? "bg-gray-200" : "bg-white"
                } hover:bg-gray-100 cursor-pointer`}
              >
                $7.000
              </Button>
            </div>{" "}
            <div className="w-[100%] justify-between">
              <Button
                onClick={() => handleSelectMonto(10000)}
                className={`w-full border border-gray text-black ${
                  selectedAmount === 10000 ? "bg-gray-200" : "bg-white"
                } hover:bg-gray-100 cursor-pointer`}
              >
                $10.000
              </Button>
            </div>{" "}
            <div className="w-[100%] justify-between">
              <Button
                onClick={() => handleSelectMonto(20000)}
                className={`w-full border border-gray text-black ${
                  selectedAmount === 20000 ? "bg-gray-200" : "bg-white"
                } hover:bg-gray-100 cursor-pointer`}
              >
                $20.000
              </Button>
            </div>
          </div>

          <div className="p-5 slign-center justify-self-center align-content-center">
            {apiError && (
              <p className="text-red-500 text-sm text-center mb-4">
                {apiError}
              </p>
            )}
            <Button
              className="w-[350px] cursor-pointer"
              onClick={handleCargarSaldo}
            >
              Confirmar Saldo Tarjeta
            </Button>
          </div>
        </div>

        {/* ... (Popup de confirmación sin cambios) ... */}
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
