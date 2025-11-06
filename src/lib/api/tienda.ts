// lib/api/tienda.ts

import { apiFetch } from "./client";
// Asumimos que types.ts tiene Saldo y Compra
import { Saldo, Compra } from "./types";

// Este es el ID de tu usuario de prueba local
const userId = "c8a85eb5-7018-4f16-a232-54dbd04140dc";

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

// CAMBIO: Esta es la interfaz que tu *app* usa (buena práctica)
export interface CardDetails {
  cardNumber: string;
  expiration: string; // <-- El nombre correcto
  cvv: string;
  amount: number; // <-- El tipo correcto (número)
}

/**
 * Realiza un depósito en la cuenta del usuario.
 */
export async function cargarSaldo(depositData: CardDetails) {
  // CAMBIO: Creamos el DTO para la API
  // que cumpla con los requisitos que nos dio
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
