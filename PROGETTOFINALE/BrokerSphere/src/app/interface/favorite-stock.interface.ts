export interface FavoriteStock {
    id?: number; // Questo campo è opzionale, utile solo quando si recuperano i dati dal backend
    userId: number;
    symbol: string;
    name: string;
    price: number;
    increased: boolean;
    logoUrl: string;
    favorite: boolean;
  }
  