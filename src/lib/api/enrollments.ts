import { apiFetch } from "./client";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

const userId = 1;

export async function getEnrollmentsByUser(userId: number) {
  return apiFetch(`/enrollments?userId=${userId}`);
}

export async function getAcademicHistoryByUser(userId: number) {
  return apiFetch(`/academic-history/${userId}`);
}
