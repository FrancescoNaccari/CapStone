import { Injectable } from '@angular/core';
import { environment } from '../environment/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { LogoBorsa } from '../interface/logo-borsa.interface';
import { ApiKeyService } from './api-key.service';

@Injectable({
  providedIn: 'root'
})
export class LogoBorsaService {
//   private apiUrl= environment.apiURL;
//   private logoUrl=`${this.apiUrl}logo`;
//   private apikey1 = `${environment.apikey1}`;
// private apikey2 = `${environment.apikey2}`;
//   constructor(private http: HttpClient) { }

//   httpOptions = {
//     headers: new HttpHeaders({
//       'x-rapidapi-key': `${this.apikey1}`,
//       'x-rapidapi-host': 'twelve-data1.p.rapidapi.com'
//     })
//   };

//    getLogo(symbol: string): Observable<LogoBorsa> {
//     const url = `${this.logoUrl}?symbol=${symbol}`;
//     return this.http.get<LogoBorsa>(url, this.httpOptions);
//   }



  //GET LOGO
// GET LOGO DELLA BORSA
// const url = 'https://twelve-data1.p.rapidapi.com/logo?symbol=AAPL';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'x-rapidapi-key': 'bc8942ba1amshb7e93717f1c3565p163688jsnee2f17033f11',
// 		'x-rapidapi-host': 'twelve-data1.p.rapidapi.com'
// 	}
// };
// }
private apiUrl = `${environment.apiURL}logo`;

constructor(private http: HttpClient, private apiKeyService: ApiKeyService) {}

private fetchLogoWithKey(symbol: string, apiKey: string): Observable<LogoBorsa> {
  const url = `${this.apiUrl}?symbol=${symbol}`;
  const httpOptions = {
    headers: new HttpHeaders({
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'twelve-data1.p.rapidapi.com'
    })
  };

  return this.http.get<LogoBorsa>(url, httpOptions).pipe(
    catchError(error => {
      console.error('Errore durante la chiamata API con la chiave:', apiKey, error);
      return throwError(() => new Error('Chiamata API fallita'));
    })
  );
}

getLogo(symbol: string): Observable<LogoBorsa> {
  return new Observable<LogoBorsa>(observer => {
    const attemptFetch = () => {
      const apiKey = this.apiKeyService.getNextKey();
      this.fetchLogoWithKey(symbol, apiKey).subscribe({
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
