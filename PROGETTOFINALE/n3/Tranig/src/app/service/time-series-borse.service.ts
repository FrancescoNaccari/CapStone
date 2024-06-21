import { Injectable } from '@angular/core';
import { environment } from '../environment/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { TimeSeries } from '../interface/time-series-data.interface';
import { ApiKeyService } from './api-key.service';

@Injectable({
  providedIn: 'root'
})
export class TimeSeriesBorseService {
//   private apiUrl = `${environment.apiURL}time_series`;
//   private apikey1 = `${environment.apikey1}`;
//   private apikey2 = `${environment.apikey2}`;
  
//   constructor(private http: HttpClient) {}

//   // GET TIME SERIES
//   getTimeSeries(symbol: string, interval: string): Observable<TimeSeries> {
//     const url = `${this.apiUrl}?symbol=${symbol}&interval=${interval}&outputsize=30&format=json`;
//     const httpOptions = {
//       headers: new HttpHeaders({
//         'x-rapidapi-key': `${this.apikey1}`,
//         'x-rapidapi-host': 'twelve-data1.p.rapidapi.com'
//       })
//     };

//     return this.http.get<TimeSeries>(url, httpOptions);
//   }
// }

//   //GET TIME SERIES
// //GET PREZZO MENSILI PER QUELLA SINGOLA BORSA( CHIAMANDO UNA BORSA SPECIFICA )

// const url = 'https://twelve-data1.p.rapidapi.com/time_series?outputsize=30&symbol=AMZN&interval=1day&format=json';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'x-rapidapi-key': 'bc8942ba1amshb7e93717f1c3565p163688jsnee2f17033f11',
// 		'x-rapidapi-host': 'twelve-data1.p.rapidapi.com'
// 	}
// };

// try {
// 	const response = await fetch(url, options);
// 	const result = await response.text();
// 	console.log(result);
// } catch (error) {
// 	console.error(error);
// }

// private apiUrl = `${environment.apiURL}time_series`;

// constructor(private http: HttpClient, private apiKeyService: ApiKeyService) {}

// private fetchTimeSeriesWithKey(symbol: string, interval: string, apiKey: string): Observable<TimeSeries> {
//   const url = `${this.apiUrl}?symbol=${symbol}&interval=${interval}&outputsize=30&format=json`;
//   const httpOptions = {
//     headers: new HttpHeaders({
//       'x-rapidapi-key': apiKey,
//       'x-rapidapi-host': 'twelve-data1.p.rapidapi.com'
//     })
//   };

//   return this.http.get<TimeSeries>(url, httpOptions).pipe(
//     catchError(error => {
//       console.error('Errore durante la chiamata API con la chiave:', apiKey, error);
//       return throwError(() => new Error('Chiamata API fallita'));
//     })
//   );
// }

// getTimeSeries(symbol: string, interval: string): Observable<TimeSeries> {
//   return new Observable<TimeSeries>(observer => {
//     const attemptFetch = () => {
//       const apiKey = this.apiKeyService.getNextKey();
//       this.fetchTimeSeriesWithKey(symbol, interval, apiKey).subscribe({
//         next: data => {
//           if (data && data.values) {
//             observer.next(data);
//             observer.complete();
//           } else {
//             console.error('Dati delle serie temporali non disponibili');
//             observer.error(new Error('Dati delle serie temporali non disponibili'));
//           }
//         },
//         error: () => {
//           console.warn('Tentativo con chiave fallito, provo con la chiave successiva');
//           attemptFetch(); // Prova con la chiave successiva
//         }
//       });
//     };

//     attemptFetch(); // Chiamata iniziale
//   });
// }
// }

private apiUrl = `${environment.apiURL}time_series`;

constructor(private http: HttpClient, private apiKeyService: ApiKeyService) {}

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