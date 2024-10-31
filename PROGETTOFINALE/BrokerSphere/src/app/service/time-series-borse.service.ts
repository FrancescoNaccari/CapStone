import { Injectable } from '@angular/core';
import { environment } from '../environment/environment.development';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { TimeSeries } from '../interface/time-series-data.interface';
import { ApiKeyService } from './api-key.service';

@Injectable({
  providedIn: 'root'
})
export class TimeSeriesBorseService {

private apiUrl = `${environment.apiURL}time_series`;
private baseUrl = 'https://api.twelvedata.com/';

constructor(private http: HttpClient, private apiKeyService: ApiKeyService) {}

 // Funzione per fare una richiesta con una chiave API rotativa
 fetchData(endpoint: string, params: any) {
  // Ottieni la prossima chiave API disponibile
  const apiKey = this.apiKeyService.getNextKey();

  // Aggiungi la chiave API ai parametri della richiesta
  let httpParams = new HttpParams().set('apikey', apiKey);
  Object.keys(params).forEach(key => {
    httpParams = httpParams.set(key, params[key]);
  });

  // Costruisce l'URL completo dell'endpoint e fa la richiesta
  return this.http.get(`${this.baseUrl}${endpoint}`, { params: httpParams });
}
private fetchTimeSeriesWithKey(symbol: string, interval: string, apiKey: string, fromDate?: string, toDate?: string): Observable<TimeSeries> {
  let url = `${this.apiUrl}?symbol=${symbol}&interval=${interval}&outputsize=5000&format=json`;
  if (fromDate && toDate) {
    url += `&start_date=${fromDate}&end_date=${toDate}`;
  }
  const httpOptions = {
    headers: new HttpHeaders({
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'twelve-data1.p.rapidapi.com'
    })
  };

  return this.http.get<TimeSeries>(url, httpOptions).pipe(
    catchError(error => {
      console.error('Errore durante la chiamata API con la chiave:', apiKey, error);
      return throwError(() => new Error('Chiamata API fallita'));
    })
  );
}

getTimeSeries(symbol: string, interval: string, fromDate?: string, toDate?: string): Observable<TimeSeries> {
  return new Observable<TimeSeries>(observer => {
    const attemptFetch = () => {
      const apiKey = this.apiKeyService.getNextKey();
      this.fetchTimeSeriesWithKey(symbol, interval, apiKey, fromDate, toDate).subscribe({
        next: data => {
          if (data && data.values) {
            observer.next(data);
            observer.complete();
          } else {
            console.error('Dati delle serie temporali non disponibili');
            observer.error(new Error('Dati delle serie temporali non disponibili'));
          }
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