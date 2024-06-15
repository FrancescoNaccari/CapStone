import { FavoriteStock } from "./favorite-stock.interface";

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
}
