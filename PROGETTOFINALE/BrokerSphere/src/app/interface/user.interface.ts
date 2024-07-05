import { FavoriteStock } from "./favorite-stock.interface";
import { Stock } from "./stock.interface";

export interface User {
    idUtente?: number,
    nome: string,
    cognome: string,
    email: string,
    password: string,
    tipoUtente: string,
    username: string,
    avatar?: string
    listaFavoriti:FavoriteStock[];
    newsletter: boolean
    balance: number; // Aggiungi questa riga
    stocks: Stock[]; 
}
