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

// CAMBIO: Añadimos y exportamos la interfaz CardDetails
// Esta es la interfaz que tu APP usa (amount es un número)
export interface CardDetails {
  cardNumber: string;
  expiration: string;
  cvv: string;
  amount: number;
}
