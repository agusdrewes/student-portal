import { apiFetch } from "./client";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

const userId = 2;

export async function getEnrollmentsByUser() {
  return apiFetch(`/enrollments?userId=${userId}`);
}

export async function getAcademicHistoryByUser() {
  return apiFetch(`/academic-history/${userId}`);
}

export async function getEnrollmentDetailsByid(comissionid: number) {
  return apiFetch(`/enrollments/${comissionid}?userId=${userId}`);
}

export async function getAtendencessByUserID(comissionid: number) {
  return apiFetch(`/attendances/${userId}/${comissionid}`);
}

export async function deleteEnrollmentById(
  courseid: number,
  comissionid: number
) {
  return apiFetch(`/enrollments/${courseid}/commissions/${courseid}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });
}

export async function getAvailableCoursesByUserId() {
  return apiFetch(`/courses/available?userId=${userId}`);
}

export async function getCoursesGradesByCommissionID(commissionId: number) {
  return apiFetch(`/grades/user/${userId}/commission/${commissionId}`);
}
