export interface Transaction {
    id: number;
    userId: number;
    symbol: string|null;
    quantity: number;
    price: number;
    type: string; // "ACQUISTO", "VENDITA", "DEPOSITO", "PRELIEVO"
    date: string;
  }
  