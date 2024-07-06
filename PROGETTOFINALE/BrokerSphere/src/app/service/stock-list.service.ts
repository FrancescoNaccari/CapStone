import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment.development';
import { Observable, catchError, map, throwError } from 'rxjs';
import { StockList } from '../interface/stock-list.interface';
import { ApiKeyService } from './api-key.service';

@Injectable({
  providedIn: 'root'
})
export class StockListService {

  private apiUrl = `${environment.apiURL}stocks`;

constructor(private http: HttpClient, private apiKeyService: ApiKeyService) {}

private fetchStockListWithKey(apiKey: string): Observable<StockList[]> {
  const url = `${this.apiUrl}?exchange=NASDAQ&format=json`;
  const httpOptions = {
    headers: new HttpHeaders({
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'twelve-data1.p.rapidapi.com'
    })
  };

  return this.http.get<any>(url, httpOptions).pipe(
    map(response => {
      if (response && Array.isArray(response.data)) {
        return response.data;
      } else {
        console.error('Risposta inattesa dal server', response);
        return [];
      }
    }),
    catchError(error => {
      console.error('Errore durante la chiamata API con la chiave:', apiKey, error);
      return throwError(() => new Error('Chiamata API fallita'));
    })
  );
}

getStockList(): Observable<StockList[]> {
  return new Observable<StockList[]>(observer => {
    const attemptFetch = () => {
      const apiKey = this.apiKeyService.getNextKey();
      this.fetchStockListWithKey(apiKey).subscribe({
        next: data => {
          observer.next(data);
          observer.complete();
        },
        error: () => {
          console.warn('Tentativo con chiave fallito, provo con la chiave successiva');
          attemptFetch(); // Prova con la chiave successiva
        }
      });
    };

    attemptFetch(); // Chiamata iniziale
  });
}
}