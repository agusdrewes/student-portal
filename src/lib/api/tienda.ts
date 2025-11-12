// lib/api/tienda.ts

import { apiFetch } from "./client";
// CAMBIO: Importamos CardDetails desde types.ts
import { Saldo, Compra, CardDetails } from "./types";

// Este es el ID de tu usuario de la NOTEBOOK
const userId = "961093aa-88c5-4b0f-85a7-fcc45f21d7bb";

// Interfaz de lo que la API envía
interface ApiSaldoResponse {
  balance: string; // La API envía el saldo como string
}

/**
 * Obtiene el saldo actual del usuario.
 */
export async function getSaldo(): Promise<Saldo> {
  const apiData = await apiFetch<ApiSaldoResponse>(
    `/account/${userId}/balance`
  );
  return {
    balance: parseFloat(apiData.balance),
  };
}

/**
 * Obtiene el historial de compras del usuario.
 */
export async function getHistorialCompras(): Promise<Compra[]> {
  return apiFetch<Compra[]>(`/users/${userId}/purchases`);
}

/**
 * Realiza un depósito en la cuenta del usuario.
 */
export async function cargarSaldo(depositData: CardDetails) {
  // Creamos el DTO para la API
  const apiRequestBody = {
    cardNumber: depositData.cardNumber,
    expiration: depositData.expiration,
    cvv: depositData.cvv,
    amount: String(depositData.amount), // Convertimos a string para la API
  };

  return apiFetch<any>(`/account/${userId}/deposit`, {
    method: "POST",
    body: JSON.stringify(apiRequestBody),
  });
}
