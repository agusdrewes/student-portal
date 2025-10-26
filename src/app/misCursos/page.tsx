// src/app/miscursos/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { PanelLeft, Clock, SquareUser, MapPin } from "lucide-react";
import {
  getAcademicHistoryByUser,
  getEnrollmentsByUser,
} from "@/lib/api/enrollments";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

export default function MisCursosPage() {
  const [semestreSeleccionado, setSemestreSeleccionado] = useState<string>("");
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [historicEnrollments, sethistoricEnrollments] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const userId = 1;
        const data = await getEnrollmentsByUser(userId);
        setEnrollments(data as any[]);
        console.log(data);
      } catch (err) {
        console.error("❌ Error al traer inscripciones:", err);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const userId = 1;
        const data = await getAcademicHistoryByUser(userId);
        sethistoricEnrollments(data as any[]);
      } catch (err) {
        console.error("❌ Error al traer inscripciones:", err);
      }
    }

    fetchData();
  }, []);

  const semestresPorAnio = {
    "2024": ["1er semestre", "2do semestre"],
    "2025": ["1er semestre", "2do semestre", "Verano"],
    "2026": ["1er semestre"],
  };

  const semestresUnicos = Array.from(
    new Set(historicEnrollments.map(e => `${e.year}-${e.semester}`))
  ).sort((a, b) => b.localeCompare(a)); // Orden descendente

  const historialFiltrado = semestreSeleccionado
    ? historicEnrollments.filter(
        h => `${h.year}-${h.semester}` === semestreSeleccionado
      )
    : historicEnrollments;

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
              <BreadcrumbPage>Mis Cursos</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="pl-8 pr-8">
        {/* Cursos actuales */}
        <section>
          <h1 className="text-2xl font-medium">Cursos Actuales</h1>

          <div className="pt-8 pl-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrollments.map(enrollment => (
              <Link
                href={`/misCursos/${enrollment.course.id}`}
                key={enrollment.course.id}
              >
                <div className="cursor-pointer border rounded-xl bg-white space-y-1 hover:shadow-md transition-shadow duration-300">
                  <div className="flex flex-row items-center p-4 pr-6 rounded-t-xl justify-between bg-[#6F97F0]">
                    <h3 className="font-medium text-base">
                      {enrollment.course.name}
                    </h3>
                    <Badge variant="secondary" className="font-light">
                      En curso
                    </Badge>
                  </div>
                  <div className="p-4 gap-4 pl-6">
                    <div className="flex flex-row gap-5 items-center pb-5">
                      <Clock size={20} color="#757575" />
                      <span>{enrollment.commission.days} </span>
                      <span>
                        {enrollment.commission.startTime} -{" "}
                        {enrollment.commission.endTime}
                      </span>
                    </div>
                    <div className="flex flex-row gap-5 items-center pb-5">
                      <SquareUser size={20} color="#757575" />
                      <span>{enrollment.commission.professorName} </span>
                    </div>
                    <div className="flex flex-row gap-5 items-center">
                      <MapPin size={20} color="#757575" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Historial académico */}
        <section className="pt-9">
          <div className="flex flex-row justify-between items-center pb-6">
            <h1 className="text-2xl font-medium">Historial Académico</h1>
            <Select onValueChange={setSemestreSeleccionado}>
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Todos los semestres" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {semestresUnicos.map(semestre => (
                    <SelectItem key={semestre} value={semestre}>
                      {semestre}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Tabla */}
          <div className="overflow-auto pl-4">
            <table className="w-full border-collapse text-sm text-left rounded-md overflow-hidden pr-6">
              <thead className="bg-gray-100">
                <tr className="border-l border-r border-b font-medium">
                  <th className="p-2 font-normal text-[#595959]">Materia</th>
                  <th className="p-2 font-normal text-[#595959]">Semestre</th>
                  <th className="p-2 font-normal text-[#595959]">Profesor</th>
                  <th className="p-2 font-normal text-[#595959]">
                    Clasificación
                  </th>
                  <th className="p-2 font-normal text-[#595959]">Estado</th>
                </tr>
              </thead>
              <tbody>
                {historicEnrollments.map(enrollment => (
                  <tr
                    key={enrollment.id}
                    className="border-l border-r border-b"
                  >
                    <td className="p-2">{enrollment.course.name}</td>
                    <td className="p-2">{enrollment.semester}</td>
                    <td className="p-2">
                      {enrollment.commission.professorName}
                    </td>
                    <td className="p-2">{enrollment.course.finalnote}</td>
                    <td className="p-2">
                      <Badge variant="secondary" className="font-light">
                        {enrollment.status === "in_progress"
                          ? "En curso"
                          : enrollment.status === "completed"
                            ? "Completado"
                            : "Desaprobado"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
