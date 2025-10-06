// src/app/miscursos/page.tsx
import React from "react";
import { PanelLeft, Clock, SquareUser, MapPin } from "lucide-react";

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
  const cursosActuales = [
    {
      nombre: "Cálculo Diferencial",
      horario: "Lun 16:00-18:00",
      profesor: "Claudio Godio",
      aula: "3003",
      estado: "En curso",
    },
    {
      nombre: "Cálculo Diferencial",
      horario: "Lun 16:00-18:00",
      profesor: "Claudio Godio",
      aula: "3003",
      estado: "En curso",
    },
    {
      nombre: "Cálculo Diferencial",
      horario: "Lun 16:00-18:00",
      profesor: "Claudio Godio",
      aula: "3003",
      estado: "En curso",
    },
    {
      nombre: "Cálculo Diferencial",
      horario: "Lun 16:00-18:00",
      profesor: "Claudio Godio",
      aula: "3003",
      estado: "En curso",
    },
  ];

  const historial = [
    {
      materia: "Álgebra Lineal",
      semestre: "2024-II",
      profesor: "Carmen Vega",
      nota: "8.5",
      estado: "Aprobado",
    },
    {
      materia: "Estadística I",
      semestre: "2024-I",
      profesor: "Alejandra Gogni",
      nota: "2",
      estado: "Desaprobado",
    },
  ];

  const semestresPorAnio = {
    "2024": ["1er semestre", "2do semestre"],
    "2025": ["1er semestre", "2do semestre", "Verano"],
    "2026": ["1er semestre"],
  };

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
            {cursosActuales.map((curso, i) => (
              <Link href={`/curso/${i}`} key={i}>
                <div className="cursor-pointer border rounded-xl bg-white space-y-1 hover:shadow-md transition-shadow duration-300">
                  <div className="flex flex-row items-center p-4 pr-6 rounded-t-xl justify-between bg-[#6F97F0]">
                    <h3 className="font-medium text-base">{curso.nombre}</h3>
                    <Badge variant="secondary" className="font-light">
                      {curso.estado}
                    </Badge>
                  </div>
                  <div className="p-4 gap-4 pl-6">
                    <div className="flex flex-row gap-5 items-center pb-5">
                      <Clock size={20} color="#757575" />
                      <span>{curso.horario}</span>
                    </div>
                    <div className="flex flex-row gap-5 items-center pb-5">
                      <SquareUser size={20} color="#757575" />
                      <span>{curso.profesor}</span>
                    </div>
                    <div className="flex flex-row gap-5 items-center">
                      <MapPin size={20} color="#757575" />
                      <span>{curso.aula}</span>
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
            <Select>
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Todos los semestres" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(semestresPorAnio).map(([anio, semestres]) => (
                  <SelectGroup key={anio}>
                    <SelectLabel>{anio}</SelectLabel>
                    {semestres.map(semestre => (
                      <SelectItem
                        key={`${anio}-${semestre}`}
                        value={`${anio}-${semestre}`}
                      >
                        {semestre}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </div>
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
                {historial.map((h, i) => (
                  <tr key={i} className="border-l border-r border-b">
                    <td className="p-2">{h.materia}</td>
                    <td className="p-2">{h.semestre}</td>
                    <td className="p-2">{h.profesor}</td>
                    <td className="p-2">{h.nota}</td>
                    <td className="p-2">
                      <Badge variant="secondary" className="font-light">
                        {h.estado}
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
