import { apiFetch } from "./client";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

const userId = "6b4eab19-c3a5-406d-9002-2e3a0e8dbcc5";

export async function getEventsByUser() {
  return apiFetch(`/calendar/user/${userId}`);
}
