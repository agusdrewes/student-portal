"use client";

import React, { useState /*, useEffect*/ } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Notification {
  id: number;
  type: "examen" | "sancion" | "evento";
  title: string;
  description: string;
  date: string;
  link: string;
  context: string;
  contextLink: string;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    type: "evento",
    title: "Próximo examen Final",
    description:
      "Examen final de Calculo Diferencial programado para el 15 de Febrero de 2025 a las 8:00.",
    date: "2025-10-06T09:00:00Z",
    link: "/examen/calculo",
    context: "Cálculo Diferencial",
    contextLink: "/misCursos/calculo",
  },
  {
    id: 2,
    type: "examen",
    title: "Nueva clasificación disponible",
    description: "Tu clasificación de programación II ya está disponible.",
    date: "2025-10-06T08:00:00Z",
    link: "/resultados/programacion",
    context: "Programación III",
    contextLink: "/misCursos/programacion-iii",
  },
  {
    id: 3,
    type: "evento",
    title: "Reunión informativa nuevas carreras",
    description:
      "Nueva reunión informativa de carreras el día 25 Febrero. Anotate ya.",
    date: "2025-10-06T07:30:00Z",
    link: "/eventos/reunion",
    context: "Calendario",
    contextLink: "/calendario",
  },
  {
    id: 4,
    type: "sancion",
    title: "Nueva sanción publicada",
    description: "Se encontró una nueva sanción en tu registro académico.",
    date: "2025-10-06T07:00:00Z",
    link: "/biblioteca/sanciones",
    context: "Biblioteca",
    contextLink: "/biblioteca",
  },
];

const getBadgeProps = (type: Notification["type"]) => {
  switch (type) {
    case "examen":
      return { text: "Exámenes", class: "bg-[#6F97F0] text-[#FFFFFF]" };
    case "sancion":
      return { text: "Sanción", class: "bg-[#6E2F2C] text-[#FFFFFF]" };
    case "evento":
      return { text: "Evento", class: "bg-[#9A6D38] text-[#FFFFFF]" };
    default:
      return { text: "General", class: "bg-gray-200 text-gray-700" };
  }
};

const timeAgo = (date: string) => {
  const diff = new Date().getTime() - new Date(date).getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours < 1) return "Hace minutos";
  return `Hace ${hours} horas`;
};

// 🔔 Componente de notificación individual
const NotificationItem: React.FC<{ notification: Notification }> = ({
  notification,
}) => {
  const { text, class: badgeClass } = getBadgeProps(notification.type);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm hover:shadow-md transition-all">
      <div className="flex justify-between items-start">
        <div className="flex-grow space-y-2">
          <p className="font-semibold text-gray-800">{notification.title}</p>
          <p className="text-sm text-gray-500">{notification.description}</p>

          <div className="flex items-center gap-4 pt-2">
            <Badge
              className={`font-medium rounded-md px-2 py-0.5 ${badgeClass}`}
              variant="default"
            >
              {text}
            </Badge>

            <div className="flex items-center text-sm text-gray-500 hover:text-gray-700">
              <ArrowUpRight size={14} className="mr-1" />
              <Link href={notification.contextLink}>
                {notification.context}
              </Link>
            </div>
          </div>
        </div>

        <div className="text-xs text-gray-400 mt-1">
          {timeAgo(notification.date)}
        </div>
      </div>
    </div>
  );
};

// 📋 Lista completa
export default function NotificationList() {
  const [notifications, setNotifications] =
    useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [activeTab, setActiveTab] = useState<
    "todos" | "examenes" | "eventos" | "sanciones"
  >("todos");

  // 🔄 FUTURO: Carga dinámica desde backend
  /*
  useEffect(() => {
    fetch("/api/notifications")
      .then(res => res.json())
      .then((data: Notification[]) => setNotifications(data))
      .catch(err => console.error("Error al obtener notificaciones:", err));
  }, []);
  */

  // ✅ Filtrado corregido
  const filtered =
    activeTab === "todos"
      ? notifications
      : notifications.filter(n => {
          const map: Record<string, Notification["type"]> = {
            examenes: "examen",
            eventos: "evento",
            sanciones: "sancion",
          };
          return n.type === map[activeTab];
        });

  // 📊 Contadores dinámicos
  const counts = {
    todos: notifications.length,
    examenes: notifications.filter(n => n.type === "examen").length,
    eventos: notifications.filter(n => n.type === "evento").length,
    sanciones: notifications.filter(n => n.type === "sancion").length,
  };

  const tabs = [
    { id: "todos", label: `Todos (${counts.todos})` },
    { id: "examenes", label: `Exámenes (${counts.examenes})` },
    { id: "eventos", label: `Eventos (${counts.eventos})` },
    { id: "sanciones", label: `Sanciones (${counts.sanciones})` },
  ];

  return (
    <section className="bg-white w-full">
      {/* Tabs estilo Figma */}
      <div className="flex gap-8 border-b border-gray-200 mb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`pb-3 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "text-gray-900 border-b-2 border-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Lista de notificaciones */}
      <div className="grid gap-4">
        {filtered.map(notif => (
          <NotificationItem key={notif.id} notification={notif} />
        ))}

        {filtered.length === 0 && (
          <p className="text-center text-gray-500 py-8">
            No hay notificaciones disponibles.
          </p>
        )}
      </div>
    </section>
  );
}
