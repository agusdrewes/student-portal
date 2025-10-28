// src/components/ui/loader.tsx
"use client";

import { Loader2 } from "lucide-react";

export default function Loader({ message = "Cargando información..." }) {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-white">
      <Loader2 size={40} className="animate-spin text-[#6F97F0]" />
      <p className="mt-4 text-gray-600 text-sm">{message}</p>
    </main>
  );
}
