// src/app/misCursos/[id]/page.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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

import { Button } from "@/components/ui/button";
import { PanelLeft, FolderOpen, UserCheck, Check, X } from "lucide-react";
import { use, useState } from "react";
import Link from "next/link";

interface CursoPageProps {
  params: Promise<{ id: string }>;
}

export default function CursoPage({ params }: CursoPageProps) {
  const { id } = use(params); // ✅ Desempaquetás el Promise con use()

  const [popUpBaja, setPopUpBaja] = useState(false);
  const [bajaConfirmada, setBajaConfirmada] = useState(false);

  const deBajaPopUp = () => {
    setPopUpBaja(true);
  };

  return (
    <main className="w-full flex flex-col gap-8 bg-white">
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
              <BreadcrumbLink href="/misCursos">Mis Cursos</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbPage>Curso</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="pl-8 pr-8">
        <div className="flex flex-row justify-between items-center pb-6 pt-4">
          <h1 className="text-2xl font-medium">Nombre del curso</h1>

          {/* Botón para dar de baja */}
          <Badge
            variant="deBaja"
            className="font-light pr-6 pl-6 hover:cursor-pointer shadow-md transition-shadow duration-300"
            onClick={() => setPopUpBaja(true)}
          >
            Dar de baja
          </Badge>
        </div>

        {/* AlertDialog Confirmación */}
        <AlertDialog open={popUpBaja} onOpenChange={setPopUpBaja}>
          <AlertDialogContent className="text-center w-[500px] justify-center">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-center">
                ¿Seguro que quieres darte de baja de este curso?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-center">
                Esta acción no se puede revertir. El último mes cursado debe ser
                abonado.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex justify-center  space-x-4">
              <AlertDialogCancel
                onClick={() => setPopUpBaja(false)}
                className="mr-4 justify-center"
              >
                Cancelar
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  setPopUpBaja(false);
                  setBajaConfirmada(true);
                }}
              >
                Confirmar baja
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* AlertDialog Baja confirmada */}
        <AlertDialog open={bajaConfirmada} onOpenChange={setBajaConfirmada}>
          <AlertDialogContent className="text-center w-[500px]">
            <AlertDialogHeader>
              <div className="jutify-end">
                <Link
                  href={"/misCursos"}
                  onClick={() => setBajaConfirmada(false)}
                  className="justify-end"
                >
                  <X color={"black"} className="justify-end">
                    {" "}
                  </X>
                </Link>
              </div>

              <AlertDialogTitle className="text-center">
                Baja confirmada
              </AlertDialogTitle>
              <AlertDialogDescription className="text-center">
                El curso ya no se encuentra en tus inscripciones.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="justify-center"></AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <div className="flex flex-row items-start gap-6">
          {/* INFORMACIÓN GENERAL */}
          <div className="border rounded-xl bg-white w-[370px] mr-8 flex flex-col">
            <div className="flex items-center p-4 pr-6 rounded-t-xl bg-[#6F97F0]">
              <FolderOpen size={18} />
              <span className="pl-5 text-base font-medium">
                Información general
              </span>
            </div>
            <div className="flex justify-between items-center p-4 pb-2 pr-6">
              <span className="text-sm text-[#8C8C8C] font-light">
                Profesor:
              </span>
              <span className="text-sm">Nombre Profesor</span>
            </div>
            <div className="flex justify-between items-center p-4 pb-2 pr-6">
              <span className="text-sm text-[#8C8C8C] font-light">
                Horario:
              </span>
              <span className="text-sm">Lun 16:00–18:00</span>
            </div>
            <div className="flex justify-between items-center p-4 pb-5 pr-6">
              <span className="text-sm text-[#8C8C8C] font-light">Aula:</span>
              <span className="text-sm">3003</span>
            </div>
          </div>

          {/* ASISTENCIAS */}
          <div className="border rounded-xl bg-white w-[370px] flex flex-col">
            <div className="flex items-center p-4 pr-6 rounded-t-xl bg-[#6F97F0]">
              <UserCheck size={18} />
              <span className="pl-5 text-base font-medium">Asistencias</span>
            </div>
            <div className="flex justify-between items-center p-4 pb-2 pr-6">
              <span className="text-sm text-[#8C8C8C] font-light">
                Total de clases:
              </span>
              <span className="text-sm">24</span>
            </div>
            <div className="flex justify-between items-center p-4 pb-2 pr-6">
              <span className="text-sm text-[#8C8C8C] font-light">
                Asistencias:
              </span>
              <span className="text-sm">5</span>
            </div>
            <div className="flex justify-between items-center p-4 pb-5 pr-6 border-b">
              <span className="text-sm text-[#8C8C8C] font-light">Faltas:</span>
              <span className="text-sm">1</span>
            </div>
            <div className="flex justify-between items-center p-4 pb-5 pr-6">
              <span className="text-sm text-[#8C8C8C] font-light">
                Porcentaje:
              </span>
              <span className="text-sm">83%</span>
            </div>
          </div>
        </div>

        {/* Clasificaciones */}

        <div className="overflow-auto pl-4 pt-12">
          <h1 className="text-xl font-medium pb-5">Clasificaciones</h1>

          <table className="w-full border-collapse text-sm text-left rounded-md overflow-hidden pr-6 ">
            <thead className="bg-gray-100">
              <tr className="border-l border-r border-b font-medium">
                <th className="p-2 pl-8 font-normal text-[#595959]">
                  Evaluación
                </th>
                <th className="p-2 font-normal text-[#595959]">Fecha</th>
                <th className="p-2 font-normal text-[#595959]">Peso</th>
                <th className="p-2 font-normal text-[#595959]">
                  Clasificación
                </th>
                <th className="p-2 font-normal text-[#595959]">Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-l border-r border-b">
                <td className="p-2 pl-8">Primer Parcial</td>
                <td className="p-2">15 Feb 2025</td>
                <td className="p-2">30%</td>
                <td className="p-2">8.5</td>
                <td className="p-2">
                  <Badge variant="secondary" className="font-light">
                    Aprobado
                  </Badge>
                </td>
              </tr>
              <tr className="border-l border-r border-b">
                <td className="p-2 pl-8">Primer Parcial</td>
                <td className="p-2">15 Feb 2025</td>
                <td className="p-2">30%</td>
                <td className="p-2">8.5</td>
                <td className="p-2">
                  <Badge variant="secondary" className="font-light">
                    Aprobado
                  </Badge>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Asistencias */}

        <div className="overflow-auto pl-4 pt-12">
          <h1 className="text-xl font-medium pb-5">Asistencias</h1>

          <div className="grid auto-cols-max grid-flow-col gap-5 pl-4">
            <div className="bg-gray-100 w-[290px] h-[90px] flex flex-row justify-between p-2 rounded-lg">
              <div className="flex flex-col justify-between p-4 gap-1  pr-6">
                <span className="text-sm">Lun 03 Feb</span>
                <span className="text-sm">16:00</span>
              </div>
              <div className="pr-4  justify-center items-center flex">
                <Check size={30} color={"#6D9C66"}></Check>
              </div>
            </div>
            <div className="bg-gray-100 w-[290px] h-[90px] flex flex-row justify-between p-2 rounded-lg">
              <div className="flex flex-col justify-between p-4 gap-1  pr-6">
                <span className="text-sm">Lun 03 Feb</span>
                <span className="text-sm">16:00</span>
              </div>
              <div className="pr-4  justify-center items-center flex">
                <Check size={30} color={"#6D9C66"}></Check>
              </div>
            </div>{" "}
          </div>
        </div>
      </div>
    </main>
  );
}
