import { Injectable } from '@angular/core';
import { environment } from '../environment/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { LogoBorsa } from '../interface/logo-borsa.interface';
import { ApiKeyService } from './api-key.service';
import { LogoDto } from '../interface/logo-dto.interface';

@Injectable({
  providedIn: 'root'
})
export class LogoBorsaService {


  private apiUrl = `${environment.apiBack}logos`; // URL del backend

  constructor(private http: HttpClient) {}
  getLogo(symbol: string): Observable<LogoBorsa> {
    const url = `${this.apiUrl}/${symbol}`;
    return this.http.get<LogoBorsa>(url).pipe(
      catchError(error => {
        console.error('Errore durante il recupero del logo dal backend', error);
        return throwError(() => new Error('Chiamata API fallita'));
      })
    );
  }

  getAllLogos(): Observable<LogoDto[]> {
    return this.http.get<LogoDto[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Errore durante il recupero dei loghi dal backend', error);
        return throwError(() => new Error('Chiamata API fallita'));
      })
    );
  }


  //------------------------------------------------PRENDE I LOGHI DALL'API--------------------//
// private apiUrl = `${environment.apiURL}logo`;

//   constructor(private http: HttpClient, private apiKeyService: ApiKeyService) {}

//   private fetchLogoWithKey(symbol: string, apiKey: string): Observable<LogoBorsa> {
//     const url = `${this.apiUrl}?symbol=${symbol}`;
//     const httpOptions = {
//       headers: new HttpHeaders({
//         'x-rapidapi-key': apiKey,
//         'x-rapidapi-host': 'twelve-data1.p.rapidapi.com'
//       })
//     };
//     // Aggiungi un log per vedere l'URL e le opzioni della richiesta
//     console.log(`Fetching logo for symbol: ${symbol} with URL: ${url}`);
//     return this.http.get<LogoBorsa>(url, httpOptions).pipe(
//       catchError(error => {
//         if (error.status === 429) {
//           console.error('Errore 429: Crediti API gratuiti esauriti.');
//         } else {
//           console.error('Errore durante la chiamata API con la chiave:', apiKey, error);
//         }
//         return throwError(() => new Error('Chiamata API fallita'));
//       })
//     );
//   }

//   getLogo(symbol: string): Observable<LogoBorsa> {
//     return new Observable<LogoBorsa>(observer => {
//       const attemptFetch = () => {
//         const apiKey = this.apiKeyService.getNextKey();
//         this.fetchLogoWithKey(symbol, apiKey).subscribe({
//           next: (data: any) => {
//             if (data.code === 429) {
//               setTimeout(attemptFetch, 500);
             
//             }
//             console.log('Risposta API del logo:', data);
//             observer.next(data);
//             observer.complete();
//           },
//           error: (err) => {
//             if (err.message.includes('Chiamata API fallita')) {
//               observer.error('Crediti API gratuiti esauriti. Riprova domani.');
//             } else {
//               console.warn('Tentativo con chiave fallito, provo con la chiave successiva');
//               attemptFetch(); // Prova con la chiave successiva
//             }
//           }
//         });
//       };

//       attemptFetch(); // Chiamata iniziale
//     });
//   }
  
//-------------------------------METOTO PER PRENDERE I LOGHI DALLL'API E METTERELI NEL DATABASE------------------------//
  // getAllLogos(symbols: string[]): Observable<LogoDto[]> {
  //   return new Observable<LogoDto[]>(observer => {
  //     const logos: LogoDto[] = [];
  //     let completedRequests = 0;

  //     console.log('Symbols:', symbols);

  //     const processSymbol = (index: number) => {
  //       if (index >= symbols.length) {
  //         console.log('All requests completed. Logos:', logos);
  //         observer.next(logos);
  //         observer.complete();
  //         return;
  //       }

  //       const symbol = symbols[index];
  //       console.log(`Requesting logo for symbol: ${symbol}`);

  //       this.getLogo(symbol).subscribe({
  //         next: logo => {
  //           console.log(`Received logo for symbol: ${symbol}`, logo);
  //           logos.push({ symbol, url: logo.url });
  //           completedRequests++;
  //           setTimeout(() => processSymbol(index + 1), 500); // Attende 1 secondo prima di processare il prossimo simbolo
  //         },
  //         error: (error) => {
  //           console.error(`Error fetching logo for symbol: ${symbol}`, error);
  //           completedRequests++;
  //           setTimeout(() => processSymbol(index + 1), 500); // Attende 1 secondo prima di processare il prossimo simbolo
  //         }
  //       });
  //     };

  //     processSymbol(0); // Start processing symbols from index 0
  //   });
  // }
}