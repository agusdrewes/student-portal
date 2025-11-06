// lib/api/client.ts

// 1. Apuntamos a nuestro backend LOCAL (¡Corregido al 3001!)
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// 2. Pegamos el token que obtuvimos de la API de AWS
const STATIC_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhM2I1ZjZkNC05YzI4LTRiNDEtYmI5MC05ZDM2YTkyZjRiMTciLCJlbWFpbCI6ImdyZWdvcmlvY2FycmFuemFAaG90bWFpbC5jb20iLCJuYW1lIjoiR3JlZ29yaW8iLCJyb2xlIjoiQUxVTU5PIiwiY2FyZWVyIjp7InV1aWQiOiJlZGI1YTc1NC02NTE5LTQ4OTUtODQ2NC1iNzcwN2U3Nzc5NjMiLCJuYW1lIjoiTGljZW5jaWF0dXJhIGVuIFNpc3RlbWFzIGRlIEluZm9ybWFjacOzbiJ9LCJpYXQiOjE3NjIzOTk1OTcsImV4cCI6MTc2MjQwODU5N30.dZixdo9mRPcN84G4Vlr9eFi9Nk_lVsYtQ2yCjel5cPQ";

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      // 3. Adjuntamos el token en CADA llamada
      Authorization: `Bearer ${STATIC_TOKEN}`,
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    const errorText = await res.text();
    try {
      const errorJson = JSON.parse(errorText);
      throw new Error(errorJson.message || `Error ${res.status}`);
    } catch (e) {
      throw new Error(errorText || `Error ${res.status}`);
    }
  }

  const text = await res.text();
  if (!text) {
    return true as T;
  }

  return JSON.parse(text);
}
