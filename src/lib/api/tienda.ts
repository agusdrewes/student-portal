// lib/api/tienda.ts

import { apiFetch } from "./client";
import { Saldo, Compra } from "./types";

const userId = "09109e49-e243-4db8-b3b8-291e1f997bda";

interface ApiSaldoResponse {
  balance: string;
}

export async function getSaldo(): Promise<Saldo> {
  const apiData = await apiFetch<ApiSaldoResponse>(
    `/account/${userId}/balance`
  );
  return {
    balance: parseFloat(apiData.balance),
  };
}

export async function getHistorialCompras(): Promise<Compra[]> {
  return apiFetch<Compra[]>(`/users/${userId}/purchases`);
}

export interface CardDetails {
  cardNumber: string;
  expiration: string;
  cvv: string;
  amount: number;
}

export async function cargarSaldo(depositData: CardDetails) {
  const apiRequestBody = {
    cardNumber: depositData.cardNumber,
    expiration: depositData.expiration,
    cvv: depositData.cvv,
    amount: String(depositData.amount),
  };

  return apiFetch<any>(`/account/${userId}/transactions`, {
    method: "POST",
    body: JSON.stringify(apiRequestBody),
  });
}
