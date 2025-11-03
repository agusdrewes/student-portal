// lib/api/types.ts

export interface Saldo {
  balance: number;
}

export interface Compra {
  id: string; // o number
  product: { description: string };
  date: string;
  total: number;
}
