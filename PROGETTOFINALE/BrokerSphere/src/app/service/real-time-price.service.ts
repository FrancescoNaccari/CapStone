import { Injectable } from '@angular/core';
import { environment } from '../environment/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { RealTimePriceResponse } from '../interface/real-time-price-response.interface';
import { ApiKeyService } from './api-key.service';

@Injectable({
  providedIn: 'root'
})
export class RealTimePriceService {
private apiUrl = `${environment.apiURL}price`;

  constructor(private http: HttpClient, private apiKeyService: ApiKeyService) {}

  private fetchRealTimePriceWithKey(symbol: string, apiKey: string): Observable<RealTimePriceResponse> {
    const url = `${this.apiUrl}?format=json&outputsize=50&symbol=${symbol}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': 'twelve-data1.p.rapidapi.com'
      })
    };

    return this.http.get<RealTimePriceResponse>(url, httpOptions).pipe(
      catchError(error => {
        console.error('Errore durante la chiamata API con la chiave:', apiKey, error);
        return throwError(() => new Error('Chiamata API fallita'));
      })
    );
  }

  getRealTimePrice(symbol: string): Observable<RealTimePriceResponse> {
    return new Observable<RealTimePriceResponse>(observer => {
      const attemptFetch = () => {
        const apiKey = this.apiKeyService.getNextKey();
        this.fetchRealTimePriceWithKey(symbol, apiKey).subscribe({
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