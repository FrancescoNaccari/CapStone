export interface Transaction {
    id: number;
    userId: number;
    symbol: string;
    quantity: number;
    price: number;
    type: string; // "BUY" o "SELL"
    date: string;
  }
  