import { apiFetch } from "./client";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

const userId = "6b4eab19-c3a5-406d-9002-2e3a0e8dbcc5";

export async function getEnrollmentsByUser() {
  return apiFetch(`/enrollments?userId=${userId}`);
}

export async function getAcademicHistoryByUser() {
  return apiFetch(`/academic-history/${userId}`);
}

export async function getEnrollmentDetailsByid(comissionid: string) {
  return apiFetch(`/enrollments/${comissionid}?userId=${userId}`);
}

export async function getAtendencessByUserID(comissionid: string) {
  return apiFetch(`/attendances/${userId}/${comissionid}`);
}

export async function deleteEnrollmentById(
  courseid: string,
  comissionid: string
) {
  return apiFetch(`/enrollments/${courseid}/commissions/${comissionid}`, {
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

export async function getCoursesGradesByCommissionID(commissionId: string) {
  return apiFetch(`/grades/user/${userId}/commission/${commissionId}`);
}

export async function enrollUserInCourseIdAndCommissionId(
  courseId: string,
  commissionId: string
) {
  return apiFetch(`/enrollments/${courseId}/commissions/${commissionId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });
}
