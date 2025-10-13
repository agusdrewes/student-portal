"use client";

import { useMemo, useState } from "react";
import {
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  PanelLeft,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

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

const capitalize = (s: string) => (s ? s[0].toUpperCase() + s.slice(1) : s);

const TZ = "America/Argentina/Buenos_Aires" as const;

const monthFormatter = new Intl.DateTimeFormat("es-AR", {
  month: "long",
  timeZone: TZ,
});
const longDateFormatter = new Intl.DateTimeFormat("es-AR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: TZ,
});
const eventDateFormatter = new Intl.DateTimeFormat("es-AR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
  timeZone: TZ,
});
const monthOnlyFormatter = new Intl.DateTimeFormat("es-AR", {
  month: "long",
  timeZone: TZ,
});

function monthLabelEs(year: number, monthIndex: number) {
  const name = monthFormatter.format(new Date(year, monthIndex, 1));
  return `${capitalize(name)} ${year}`;
}

function toDateOnly(d: Date) {
  const x = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  return x.toISOString().slice(0, 10);
}
function daysGrid(year: number, monthIndex: number) {
  const first = new Date(year, monthIndex, 1);
  const startWeekday = (first.getDay() + 6) % 7;
  const last = new Date(year, monthIndex + 1, 0);
  const total = last.getDate();
  const prevPad = startWeekday;
  const nextPad = (42 - (prevPad + total)) % 42;
  const cells: { date: Date; inMonth: boolean }[] = [];
  for (let i = prevPad; i > 0; i--)
    cells.push({ date: new Date(year, monthIndex, 1 - i), inMonth: false });
  for (let d = 1; d <= total; d++)
    cells.push({ date: new Date(year, monthIndex, d), inMonth: true });
  for (let i = 1; i <= nextPad; i++)
    cells.push({ date: new Date(year, monthIndex + 1, i), inMonth: false });
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
const DINING_SLOTS: DiningSlot[] = [
  { label: "Desayuno", from: "07:00", to: "12:00" },
  { label: "Almuerzo", from: "12:00", to: "16:00" },
  { label: "Merienda", from: "16:00", to: "20:00" },
];

function nextLine(dateISO: string, time?: string) {
  const d = new Date(dateISO);
  const month = capitalize(monthOnlyFormatter.format(d));
  const day = d.getDate();
  return time ? `${month} ${day} - ${time}` : `${month} ${day}`;
}

export default function CalendarClient() {
  const [cursor, setCursor] = useState(new Date(2025, 5, 27));
  const [selected, setSelected] = useState(new Date(2025, 5, 27));

  const year = cursor.getFullYear();
  const monthIndex = cursor.getMonth();
  const cells = useMemo(() => daysGrid(year, monthIndex), [year, monthIndex]);

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
      <div className="bg-[#f3f4f6] text-gray-900 min-h-[calc(100vh-64px)]">
        <div className="pt-9.5 pb-9.5 pl-8 flex gap-4 items-center space-x-2 text-sm text-muted-foreground border-b h-[53px]">
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

        <div className="mx-auto max-w-[1200px] px-4 lg:px-6 py-6">
          <h1 className="text-[28px] leading-8 font-semibold">{PAGE_TITLE}</h1>
          <div className="mt-4 flex items-center gap-6 text-[14px]">
            <span className="inline-flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-blue-500" /> Exámenes
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-amber-600" /> Eventos
            </span>
          </div>

          <div className="mt-4 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3">
                <button
                  onClick={() => setCursor(new Date(year, monthIndex - 1, 1))}
                  className="p-2 rounded-full hover:bg-gray-100"
                  aria-label="Mes anterior"
                >
                  <ChevronLeft size={18} />
                </button>
                <div className="text-[14px] font-medium text-gray-700">
                  {monthLabelEs(year, monthIndex)}
                </div>
                <button
                  onClick={() => setCursor(new Date(year, monthIndex + 1, 1))}
                  className="p-2 rounded-full hover:bg-gray-100"
                  aria-label="Mes siguiente"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
              <div className="grid grid-cols-7 text-center text-[11px] text-gray-500 px-4">
                <div className="py-2">Lu</div>
                <div className="py-2">Ma</div>
                <div className="py-2">Mi</div>
                <div className="py-2">Ju</div>
                <div className="py-2">Vi</div>
                <div className="py-2">Sá</div>
                <div className="py-2">Do</div>
              </div>
              <div className="grid grid-cols-7 gap-1 px-4 pb-4">
                {cells.map(({ date, inMonth }, idx) => {
                  const key = toDateOnly(date);
                  const day = date.getDate();
                  const evs = eventsByDay.get(key) ?? [];
                  const isSelected = key === selectedKey;

                  return (
                    <button
                      key={idx}
                      onClick={() => setSelected(date)}
                      className={[
                        "relative h-11 rounded-lg text-[13px] transition",
                        inMonth ? "text-gray-800" : "text-gray-400",
                        isSelected
                          ? "bg-amber-700 text-white shadow-sm"
                          : "hover:bg-gray-50",
                      ].join(" ")}
                    >
                      <span className="absolute left-2 top-2 font-medium">
                        {day}
                      </span>
                      {evs.length > 0 && (
                        <span className="absolute bottom-2 left-1/2 -translate-x-1/2 inline-flex gap-1">
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
            <div className="space-y-5">
              <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="px-4 py-3 border-b border-gray-100">
                  <h3 className="text-[15px] font-semibold text-gray-700">
                    {capitalize(longDateFormatter.format(selected))}
                  </h3>
                </div>
                <div className="p-4">
                  {selectedEvents.length === 0 ? (
                    <div className="rounded-xl border border-gray-200 bg-gray-50 text-gray-500 text-sm py-6 text-center">
                      No hay eventos para este día.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {selectedEvents.map(ev => (
                        <EventRow key={ev.id} ev={ev} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="px-4 py-3 border-b border-gray-100">
                  <h3 className="text-[15px] font-semibold text-gray-700">
                    Próximos eventos
                  </h3>
                </div>
                <div className="p-4">
                  {nextEvents.length === 0 ? (
                    <div className="rounded-xl border border-gray-200 bg-gray-50 text-gray-500 text-sm py-6 text-center">
                      Sin próximos eventos.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {nextEvents.map(ev => (
                        <NextEventRow key={ev.id} ev={ev} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="px-4 py-3 border-b border-gray-100">
                  <h3 className="text-[15px] font-semibold text-gray-700">
                    Reservas comedor –{" "}
                    {capitalize(
                      new Intl.DateTimeFormat("es-AR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        timeZone: TZ,
                      }).format(selected)
                    )}
                  </h3>
                </div>
                <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {DINING_SLOTS.map(s => (
                    <div
                      key={s.label}
                      className="rounded-xl border border-gray-200 bg-gray-50 p-3 text-center"
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
          </div>
        </div>
      </div>
    </main>
  );
}

function EventRow({ ev }: { ev: UniEvent }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
      <span className={`mt-1 w-3 h-3 rounded-full ${dotColors[ev.type]}`} />
      <div className="flex-1">
        <div className="text-sm font-medium text-gray-800">{ev.title}</div>
        <div className="text-xs text-gray-600 flex items-center gap-1">
          <CalendarIcon size={14} />
          {capitalize(eventDateFormatter.format(new Date(ev.date)))}
          {ev.time ? <>&nbsp;·&nbsp;{ev.time}</> : null}
          {ev.meta ? <>&nbsp;·&nbsp;{ev.meta}</> : null}
        </div>
      </div>
    </div>
  );
}

function NextEventRow({ ev }: { ev: UniEvent }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
      <span className={`mt-1 w-3 h-3 rounded-full ${dotColors[ev.type]}`} />
      <div className="flex-1">
        <div className="text-sm font-medium text-gray-800">{ev.title}</div>
        <div className="text-xs text-gray-600 flex items-center gap-1">
          <CalendarIcon size={14} />
          {nextLine(ev.date, ev.time)}
        </div>
      </div>
    </div>
  );
}
