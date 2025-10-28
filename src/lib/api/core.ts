import { apiFetch } from "./client";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
//http://localhost:3000/users

export async function getUserInfoByUserID(userId: number) {
  return apiFetch(`/enrollments?userId=${userId}`);
}
