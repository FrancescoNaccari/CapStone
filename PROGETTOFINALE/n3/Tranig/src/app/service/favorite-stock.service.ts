import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FavoriteStock } from '../interface/favorite-stock.interface';
import { environment } from '../environment/environment.development';

@Injectable({
  providedIn: 'root'
})

  export class FavoriteStockService {
 
  
  
    constructor(private http: HttpClient) {}
    getFavorites(userId: number): Observable<FavoriteStock[]> {
      return this.http.get<FavoriteStock[]>(`${environment.apiBack}favorites/${userId}`);
    }
  
    addFavorite(favorite: FavoriteStock): Observable<FavoriteStock> {
      return this.http.post<FavoriteStock>(`${environment.apiBack}favorites`, favorite);
    }
  
    removeFavorite(favoriteId: number): Observable<void> {
      return this.http.delete<void>(`${environment.apiBack}favorites/${favoriteId}`);
    }}