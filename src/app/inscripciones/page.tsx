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

import { PanelLeft, FunnelPlus, Circle, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

import { getAvailableCoursesByUserId } from "@/lib/api/enrollments";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Loader from "@/components/ui/loader";

const mockCursos = [
  {
    id: "1",
    nombre: "Programación I",
    codigo: "2530",
    prerrequisitos: "Inicio en algoritmos",
    horario: "Martes 13:30 - 18:30",
    clase: "2327",
    modalidad: "Virtual",
    cupos: "15/30",
    disponible: true,
  },
  {
    id: "2",
    nombre: "Programación I",
    codigo: "2530",
    prerrequisitos: "Inicio en algoritmos",
    horario: "Martes 13:30 - 18:30",
    clase: "2327",
    modalidad: "Virtual",
    cupos: "0/30",
    disponible: false,
  },
];

export default function InscripcionesPage() {
  const [selectedCurso, setSelectedCurso] = useState<string | null>(null);
  const [availableCourses, setAvailableCourses] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [insConfirmada, setinsConfirmada] = useState(false);
  const [selectedCourseFilter, setSelectedCourseFilter] =
    useState<string>("todas");
  const [filteredCourses, setFilteredCourses] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await getAvailableCoursesByUserId();
        setAvailableCourses(data || []);
      } catch (err) {
        console.error("❌ Error al traer datos del curso:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleFilterChange = (value: string) => {
    setSelectedCourseFilter(value);

    if (value === "todas") {
      setFilteredCourses(availableCourses); // ✅ reset
    } else {
      const filtered = availableCourses.filter(
        course => String(course.id) === value
      );
      setFilteredCourses(filtered);
    }
  };

  // ✅ Loader va después del useEffect
  if (loading) {
    return <Loader message="Cargando inscripciones..." />;
  }

  const handleCursoClick = (id: string) => {
    setSelectedCurso(id === selectedCurso ? null : id);
  };

  return (
    <main className="w-full flex flex-col gap-8 bg-white">
      {/* BREADCRUMB */}
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
              <BreadcrumbPage>Inscripciones</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* CONTENIDO */}
      <div className="pl-8 pr-8">
        <h1 className="text-2xl font-medium pb-3">Inscripción Materias</h1>
        <span className="text-sm font-base text-[#737373]">
          Selecciona las materias y cursos para el período
        </span>

        <div className="grid grid-cols-3 gap-5 justify-between pt-5">
          {/* FILTROS + RESUMEN */}
          <div>
            {/* FILTROS */}
            <div className="border rounded-xl p-4">
              <div className="flex flex-row gap-2 items-center p-2">
                <FunnelPlus size={16} />
                <span className="font-bold">Filtros</span>
              </div>

              <div className="flex flex-col pr-3">
                <span className="text-sm p-2">Materias</span>
                <Select
                  value={selectedCourseFilter}
                  onValueChange={handleFilterChange}
                >
                  <SelectTrigger className="w-full shadow-none text-sm text-black">
                    <SelectValue placeholder="Seleccionar materia" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="todas">Todas las materias</SelectItem>

                    {availableCourses.length > 0 ? (
                      availableCourses.map(course => (
                        <SelectItem key={course.id} value={String(course.id)}>
                          {course.name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="none" disabled>
                        No hay materias disponibles
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col pr-3 mt-4">
                <span className="text-sm p-2">Turno</span>
                <Select>
                  <SelectTrigger className="w-full shadow-none ml-2 text-xs text-black-500">
                    <SelectValue
                      className="text-xs text-light"
                      placeholder="Todos los turnos"
                    />
                  </SelectTrigger>
                  <SelectContent />
                </Select>
              </div>
            </div>

            {/* RESUMEN DE INSCRIPCIÓN */}
            <div className="border rounded-xl p-5 mt-5">
              <span className="font-bold">Resumen de inscripción</span>
              <div className="flex flex-row justify-between mt-6">
                <span className="text-sm font-light">
                  Materias seleccionadas
                </span>
                <span className="text-sm font-light">
                  {selectedCurso ? 1 : 0}
                </span>
              </div>
              <div className="flex flex-row justify-between mt-6">
                <span className="text-sm font-light">Total compra</span>
                <span className="text-sm font-light">
                  {selectedCurso ? "320.000$" : "-"}
                </span>
              </div>
              <button
                disabled={!selectedCurso}
                className="text-base font-light text-white justify-center bg-[#6F97F0] w-full mt-5 mb-5 p-2 rounded-sm disabled:opacity-50"
                onClick={() => setinsConfirmada(true)}
              >
                Confirmar inscripción
              </button>
            </div>
          </div>

          {/* CURSOS DISPONIBLES */}
          <div className="border rounded-xl ml-4 col-span-2">
            <div className="p-8 pb-2 border-b">
              <h2 className="text-lg font-light">Materias Disponibles</h2>
              <h3 className="text-sm font-light mt-3 pb-5">
                Selecciona materias y turnos deseados
              </h3>
            </div>

            {mockCursos.map(curso => (
              <div
                key={curso.id}
                className={`border-b  ${
                  !curso.disponible
                    ? "opacity-40 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
                onClick={() => curso.disponible && handleCursoClick(curso.id)}
              >
                <div className="flex flex-row justify-between p-8 pb-0">
                  <span className="text-base font-light">{curso.nombre}</span>
                  <Badge variant="secondary" className="pl-3 pr-3">
                    {curso.disponible ? "Disponible" : "Sin cupos"}
                  </Badge>
                </div>

                <span className="font-light text-sm p-8 pt-3 block">
                  Código: {curso.codigo} - Prerrequisitos:{" "}
                  {curso.prerrequisitos}
                </span>

                <div
                  className={` items-center gap-4 border rounded-xl ml-6 mr-6 p-4 pl-8 mb-5 ${
                    selectedCurso === curso.id ? "border-[#6F97F0]" : ""
                  }`}
                >
                  <RadioGroup
                    value={selectedCurso || ""}
                    onValueChange={val => handleCursoClick(val)}
                  >
                    <div
                      key={curso.id}
                      className={` ${
                        !curso.disponible
                          ? "opacity-40 cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                    >
                      <div
                        className={`grid grid-cols-[auto_1fr_auto] items-center gap-4 p-2 pl-4  ${
                          selectedCurso === curso.id ? "border-[#6F97F0] " : ""
                        }`}
                      >
                        <RadioGroupItem
                          value={curso.id}
                          disabled={!curso.disponible}
                          className="mt-1"
                        />

                        <div className="flex flex-col text-sm gap-1">
                          <span className="font-base">{curso.horario}</span>
                          <span className="text-[#737373]">
                            Clase: {curso.clase}
                          </span>
                          <span className="text-[#737373]">
                            Modalidad: {curso.modalidad}
                          </span>
                        </div>

                        <div className="text-sm text-right text-[#737373] pr-6">
                          {curso.cupos} cupos
                        </div>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            ))}
          </div>
        </div>
        <AlertDialog open={insConfirmada} onOpenChange={setinsConfirmada}>
          <AlertDialogContent className="text-center w-[500px]">
            <AlertDialogHeader>
              <div className="jutify-start">
                <Link
                  href={"/misCursos"}
                  onClick={() => setinsConfirmada(false)}
                  className="justify-start"
                >
                  <X color={"black"} className="justify-start">
                    {" "}
                  </X>
                </Link>
              </div>

              <AlertDialogTitle className="text-center">
                Inscripción confirmada{" "}
              </AlertDialogTitle>
              <AlertDialogDescription className="text-center">
                Tus inscripciones a las materias en el periodo lectivo fueron
                confirmadas. Verás el resumen en la tienda.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="justify-center"></AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </main>
  );
}
