import { Injectable } from '@angular/core';
import { environment } from '../environment/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { QuoteBorse } from '../interface/quote-borse.interface';
import { ApiKeyService } from './api-key.service';

@Injectable({
  providedIn: 'root'
})
export class QuoteBorseService {
private apiUrl = `${environment.apiURL}quote`;

  constructor(private http: HttpClient, private apiKeyService: ApiKeyService) {}

  private fetchQuoteWithKey(symbol: string, apiKey: string): Observable<QuoteBorse> {
    const url = `${this.apiUrl}?format=json&outputsize=1&symbol=${symbol}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': 'twelve-data1.p.rapidapi.com'
      })
    };

    return this.http.get<QuoteBorse>(url, httpOptions).pipe(
      catchError(error => {
        console.error('Errore durante la chiamata API con la chiave:', apiKey, error);
        return throwError(() => new Error('Chiamata API fallita'));
      })
    );
  }

  getQuote(symbol: string): Observable<QuoteBorse> {
    return new Observable<QuoteBorse>(observer => {
      const attemptFetch = () => {
        const apiKey = this.apiKeyService.getNextKey();
        this.fetchQuoteWithKey(symbol, apiKey).subscribe({
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