import { apiFetch } from "./client";

const userId = "09109e49-e243-4db8-b3b8-291e1f997bda";

export async function getEventsByUser() {
  return apiFetch(`/calendar/user/${userId}`);
}
