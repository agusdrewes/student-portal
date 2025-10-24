"use client";

import { useMemo, useState } from "react";
import {
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  PanelLeft,
  X,
} from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

import { Badge } from "@/components/ui/badge";

const PAGE_TITLE = "Calendario Académico";

type EventType = "exam" | "event";
type UniEvent = {
  id: string;
  type: EventType;
  title: string;
  date: string;
  time?: string;
  meta?: string;
};
type DiningSlot = { label: string; from: string; to: string };

const dotColors: Record<EventType, string> = {
  exam: "bg-blue-500",
  event: "bg-amber-600",
};

const TZ = "America/Argentina/Buenos_Aires" as const;
const cap = (s: string) => (s ? s[0].toUpperCase() + s.slice(1) : s);

const fmtMonth = new Intl.DateTimeFormat("es-AR", {
  month: "long",
  timeZone: TZ,
});
const fmtLong = new Intl.DateTimeFormat("es-AR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: TZ,
});
const fmtEvent = new Intl.DateTimeFormat("es-AR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
  timeZone: TZ,
});
const fmtMonthOnly = new Intl.DateTimeFormat("es-AR", {
  month: "long",
  timeZone: TZ,
});

function monthHeader(year: number, monthIndex: number) {
  return `${cap(fmtMonth.format(new Date(year, monthIndex, 1)))} ${year}`;
}

function toDateOnly(d: Date) {
  const x = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  return x.toISOString().slice(0, 10);
}
function addMonths(d: Date, n: number) {
  const x = new Date(d);
  x.setMonth(x.getMonth() + n);
  return x;
}
function daysGrid(year: number, monthIndex: number) {
  const first = new Date(year, monthIndex, 1);
  const start = (first.getDay() + 6) % 7; // Lu=0..Do=6
  const last = new Date(year, monthIndex + 1, 0).getDate();
  const cells: { date: Date; inMonth: boolean }[] = [];
  for (let i = start; i > 0; i--)
    cells.push({ date: new Date(year, monthIndex, 1 - i), inMonth: false });
  for (let d = 1; d <= last; d++)
    cells.push({ date: new Date(year, monthIndex, d), inMonth: true });
  while (cells.length % 7 !== 0)
    cells.push({
      date: new Date(year, monthIndex + 1, cells.length - (start + last) + 1),
      inMonth: false,
    });
  while (cells.length < 42)
    cells.push({
      date: new Date(year, monthIndex + 1, cells.length - (start + last) + 1),
      inMonth: false,
    });
  return cells;
}

const EVENTS: UniEvent[] = [
  {
    id: "e1",
    type: "event",
    title: "Comienzan las inscripciones del segundo cuatrimestre",
    date: "2025-06-27",
    time: "12:00",
  },
  {
    id: "e2",
    type: "exam",
    title: "Parcial estadística",
    date: "2025-08-23",
    time: "19:30 a 21:00",
  },
  {
    id: "e3",
    type: "event",
    title: "Reunión informativa nuevas carreras",
    date: "2025-08-25",
    time: "19:30 a 20:30",
  },
];
const DESCRIPTIONS: Record<string, string> = {
  e1: "Encuentre las inscripciones a las materias para el segundo cuatrimestre 2025 en la página de inscripciones.",
  e2: "Parcial correspondiente a la primera mitad de la cursada. Revisar contenidos y material de apoyo.",
  e3: "Charla informativa sobre nuevas carreras y planes de estudio. Abierta al público general.",
};

const DINING_SLOTS: DiningSlot[] = [
  { label: "Desayuno", from: "07:00", to: "12:00" },
  { label: "Almuerzo", from: "12:00", to: "16:00" },
  { label: "Merienda", from: "16:00", to: "20:00" },
];

function nextLine(dateISO: string, time?: string) {
  const d = new Date(dateISO);
  const month = cap(fmtMonthOnly.format(d));
  const day = d.getDate();
  return time ? `${month} ${day} - ${time}` : `${month} ${day}`;
}

export default function EventosPage() {
  const [cursor, setCursor] = useState(new Date(2025, 5, 27));
  const [selected, setSelected] = useState(new Date(2025, 5, 27));

  const [openEventDlg, setOpenEventDlg] = useState(false);
  const [activeEvent, setActiveEvent] = useState<UniEvent | null>(null);

  const eventsByDay = useMemo(() => {
    const map = new Map<string, UniEvent[]>();
    EVENTS.forEach(ev => {
      const arr = map.get(ev.date) ?? [];
      arr.push(ev);
      map.set(ev.date, arr);
    });
    return map;
  }, []);

  const selectedKey = toDateOnly(selected);
  const selectedEvents = eventsByDay.get(selectedKey) ?? [];

  const nextEvents = useMemo(() => {
    const threshold = new Date(selectedKey);
    return EVENTS.filter(e => new Date(e.date) > threshold)
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, 5);
  }, [selectedKey]);

  return (
    <main>
      <div className="bg-[#f5f7fb] text-gray-900 min-h-[calc(100vh-64px)]">
        <div className="pt-9.5 pb-9.5 pl-8 flex gap-4 items-center space-x-2 text-sm text-muted-foreground border-b h-[53px] bg-white">
          <PanelLeft size={15} />
          <span className="text-muted-foreground">|</span>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Eventos</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="mx-auto max-w-[1200px] px-6 py-8">
          <h1 className="text-[28px] leading-[36px] font-semibold mb-4">
            {PAGE_TITLE}
          </h1>

          <div className="flex items-center gap-6 text-[14px] mb-4">
            <span className="inline-flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-blue-500" /> Exámenes
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-amber-600" /> Eventos
            </span>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
            <div className="space-y-6">
              <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-5 pt-4">
                  <button
                    onClick={() => setCursor(addMonths(cursor, -1))}
                    className="p-2 rounded-full hover:bg-gray-100"
                    aria-label="Mes anterior"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <div className="w-[1px] h-5" />
                  <button
                    onClick={() => setCursor(addMonths(cursor, 1))}
                    className="p-2 rounded-full hover:bg-gray-100"
                    aria-label="Mes siguiente"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-5 pb-5">
                  {[0, 1].map(i => {
                    const base = addMonths(cursor, i);
                    const y = base.getFullYear();
                    const m = base.getMonth();
                    const cells = daysGrid(y, m);
                    return (
                      <div key={i} className="pt-1">
                        <div className="text-center text-[14px] font-medium text-gray-700 mb-2">
                          {monthHeader(y, m)}
                        </div>

                        <div className="grid grid-cols-7 text-center text-[12px] text-gray-500 px-1">
                          <div className="py-2">Lu</div>
                          <div className="py-2">Ma</div>
                          <div className="py-2">Mi</div>
                          <div className="py-2">Ju</div>
                          <div className="py-2">Vi</div>
                          <div className="py-2">Sá</div>
                          <div className="py-2">Do</div>
                        </div>

                        <div className="grid grid-cols-7 gap-1 px-1">
                          {cells.map(({ date, inMonth }, idx) => {
                            const key = toDateOnly(date);
                            const day = date.getDate();
                            const evs = eventsByDay.get(key) ?? [];
                            const isSel = key === selectedKey;

                            return (
                              <button
                                key={idx}
                                onClick={() => setSelected(date)}
                                className={[
                                  "relative h-10 rounded-md text-[13px] transition",
                                  inMonth ? "text-gray-800" : "text-gray-400",
                                  isSel
                                    ? "bg-amber-700 text-white shadow-sm"
                                    : "hover:bg-gray-50",
                                ].join(" ")}
                              >
                                <span className="absolute left-2 top-1.5 font-medium">
                                  {day}
                                </span>
                                {evs.length > 0 && (
                                  <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 inline-flex gap-1">
                                    {evs.map(e => (
                                      <span
                                        key={e.id}
                                        className={`w-1.5 h-1.5 rounded-full ${dotColors[e.type]}`}
                                      />
                                    ))}
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="px-5 py-4 border-b">
                  <h3 className="text-[15px] font-semibold text-gray-700">
                    Reservas comedor –{" "}
                    {cap(
                      new Intl.DateTimeFormat("es-AR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        timeZone: TZ,
                      }).format(selected)
                    )}
                  </h3>
                </div>
                <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {DINING_SLOTS.map(s => (
                    <div
                      key={s.label}
                      className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-center"
                    >
                      <div className="font-medium text-gray-700">{s.label}</div>
                      <div className="text-[13px] text-gray-600 mt-1">
                        {s.from} - {s.to}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="px-5 py-4 border-b">
                  <h3 className="text-[15px] font-semibold text-gray-700">
                    {cap(fmtLong.format(selected))}
                  </h3>
                </div>
                <div className="p-5">
                  {selectedEvents.length === 0 ? (
                    <div className="rounded-xl border border-gray-200 bg-gray-50 text-gray-600 text-sm py-6 text-center">
                      No hay eventos para este día.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {selectedEvents.map(ev => (
                        <EventItemButton
                          key={ev.id}
                          ev={ev}
                          onOpen={e => {
                            setActiveEvent(e);
                            setOpenEventDlg(true);
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="px-5 py-4 border-b">
                  <h3 className="text-[15px] font-semibold text-gray-700">
                    Próximos eventos
                  </h3>
                </div>
                <div className="p-5">
                  {nextEvents.length === 0 ? (
                    <div className="rounded-xl border border-gray-200 bg-gray-50 text-gray-600 text-sm py-6 text-center">
                      Sin próximos eventos.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {nextEvents.map(ev => (
                        <EventItemButton
                          key={ev.id}
                          ev={ev}
                          onOpen={e => {
                            setActiveEvent(e);
                            setOpenEventDlg(true);
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AlertDialog open={openEventDlg} onOpenChange={setOpenEventDlg}>
        <AlertDialogContent className="w-[520px]">
          <div className="flex justify-end">
            <AlertDialogCancel className="h-7 w-7 p-0 rounded-full bg-gray-100 hover:bg-gray-200">
              <X className="h-4 w-4" />
            </AlertDialogCancel>
          </div>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base font-semibold">
              {activeEvent?.title}
            </AlertDialogTitle>

            <div className="mt-3">
              <Badge
                className={
                  activeEvent?.type === "event"
                    ? "bg-amber-600/90 text-white"
                    : "bg-blue-500 text-white"
                }
              >
                {activeEvent?.type === "event" ? "Evento" : "Examen"}
              </Badge>
            </div>

            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-medium min-w-[64px]">Horario</span>
                <span className="text-gray-700">
                  {activeEvent?.time ?? "—"}
                </span>
              </div>

              <div>
                <div className="font-medium mb-1">Descripción</div>
                <AlertDialogDescription className="text-gray-700">
                  {activeEvent ? DESCRIPTIONS[activeEvent.id] : ""}
                </AlertDialogDescription>
              </div>
            </div>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}

function EventCard({ ev }: { ev: UniEvent }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
      <span className={`mt-1 w-3 h-3 rounded-full ${dotColors[ev.type]}`} />
      <div className="flex-1">
        <div className="text-sm font-medium text-gray-800">{ev.title}</div>
        <div className="text-xs text-gray-600 flex items-center gap-1">
          <CalendarIcon size={14} />
          {cap(fmtEvent.format(new Date(ev.date)))}
          {ev.time ? <>&nbsp;·&nbsp;{ev.time}</> : null}
          {ev.meta ? <>&nbsp;·&nbsp;{ev.meta}</> : null}
        </div>
      </div>
    </div>
  );
}

function EventItemButton({
  ev,
  onOpen,
}: {
  ev: UniEvent;
  onOpen: (ev: UniEvent) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(ev)}
      className="w-full text-left hover:shadow transition rounded-xl"
    >
      <EventCard ev={ev} />
    </button>
  );
}
