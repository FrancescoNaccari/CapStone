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

  // private apiUrl= environment.apiURL;
  // private apikey1 = `${environment.apikey1}`;
  // private apikey2 = `${environment.apekey2}`;
  
  // constructor(private http: HttpClient) { }
  // getStockList(): Observable<StockList[]> {
  //   const url = `${this.apiUrl}stocks?exchange=NASDAQ&format=json`;
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'x-rapidapi-key':`${this.apikey1}`,
  //         'x-rapidapi-host': 'twelve-data1.p.rapidapi.com'
  //       })
  //     };
  
  //     return this.http.get<any>(url, httpOptions).pipe(
  //       map(response => {
  //         if (response && Array.isArray(response.data)) {
  //           return response.data;
  //         } else {
  //           console.error('Risposta inattesa dal server', response);
  //           return [];
  //         }
  //       })
  //     );
  //   }
  // }

  // GET STOCKS LIST
// GET LISTA DI TUTTE LE BORSE
// const url = 'https://twelve-data1.p.rapidapi.com/stocks?exchange=NASDAQ&format=json';
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