// lib/api/client.ts

// CAMBIO CRÍTICO: El BASE_URL debe apuntar a tu API de NestJS
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    // Lanzamos un error para que el 'catch' en la página lo capture
    throw new Error(`Error ${res.status}: ${await res.text()}`);
  }

  // Si la respuesta no tiene contenido (ej: un 204 No Content), devolvemos 'true'
  const text = await res.text();
  if (!text) {
    return true as T;
  }

  return JSON.parse(text);
}
