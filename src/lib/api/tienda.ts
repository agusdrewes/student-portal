// lib/api/tienda.ts

import { apiFetch } from "./client";
// Importamos los tipos que NUESTRA APP espera (Saldo.balance es un 'number')
import { Saldo, Compra } from "./types";

const userId = 1;

// Esta es la interfaz de lo que la API *REALMENTE* nos envía
interface ApiSaldoResponse {
  balance: string; // La API envía el saldo como string
}

/**
 * Obtiene el saldo actual del usuario.
 */
export async function getSaldo(): Promise<Saldo> {
  // 1. Pedimos los datos y le decimos a apiFetch qué forma *real* tienen
  const apiData = await apiFetch<ApiSaldoResponse>(
    `/account/${userId}/balance`
  );

  // 2. TRANSFORMAMOS los datos de la API a lo que nuestra App espera
  // Convertimos el string a un número.
  return {
    balance: parseFloat(apiData.balance),
  };
}

/**
 * Obtiene el historial de compras del usuario.
 */
export async function getHistorialCompras(): Promise<Compra[]> {
  // (Esta función ya estaba bien)
  return apiFetch<Compra[]>(`/users/${userId}/purchases`);
}

/**
 * Realiza un depósito en la cuenta del usuario.
 * @param amount El monto a depositar
 */
export async function cargarSaldo(amount: number) {
  // (Esta función ya estaba bien)
  return apiFetch<any>(`/account/${userId}/deposit`, {
    method: "POST",
    body: JSON.stringify({ amount: amount }),
  });
}
