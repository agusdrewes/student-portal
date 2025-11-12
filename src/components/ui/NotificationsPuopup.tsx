"use client";

import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
  getNotificationsByUser,
  patchReadNotification,
} from "@/lib/api/notifs";

export default function NotificationPopup() {
  const [open, setOpen] = useState(false);
  const [notif, setNotif] = useState<any | null>(null);

  useEffect(() => {
    async function fetchNotifs() {
      try {
        const data = await getNotificationsByUser();

        if (Array.isArray(data) && data.length > 0) {
          setNotif(data[0]);
          setOpen(true);
        }
      } catch (err) {
        console.error("❌ Error al obtener notificaciones:", err);
      }
    }

    fetchNotifs();
  }, []);

  if (!notif) return null;

  async function handleClose() {
    patchReadNotification(notif.id);
    setOpen(false);
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="max-w-[420px] rounded-xl border border-gray-200 shadow-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-semibold">
            🔔 {notif.title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-700 mt-2">
            {notif.message || "Tienes una nueva notificación."}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="mt-4 flex justify-end">
          <AlertDialogAction
            onClick={handleClose}
            className="bg-[#6F97F0] text-white px-4 py-2 rounded-md hover:bg-[#5c7fe3]"
          >
            Entendido
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
