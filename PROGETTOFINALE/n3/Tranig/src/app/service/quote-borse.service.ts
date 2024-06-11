// import { Injectable } from '@angular/core';
// import { environment } from '../environment/environment.development';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { QuoteBorse } from '../interface/quote-borse.interface';

// @Injectable({
//   providedIn: 'root'
// })
// export class QuoteBorseService {

// //possibilità di cambiare da "1D" a diververse giornate (1giorno-settiname-anni)
//   private apiUrl = `${environment.apiURL}quote`;
//   private apikey1 = `${environment.apikey1}`;
//   private apikey2 = `${environment.apikey2}`;
//   constructor(private http: HttpClient) {}

//   // GET PER SINGOLA QUOTAZIONE TEMPO REALE
//   getQuote(symbol: string): Observable<QuoteBorse> {
//     const url = `${this.apiUrl}?symbol=${symbol}&outputsize=30&format=json&interval=1day`;
//     const httpOptions = {
//       headers: new HttpHeaders({
//         'x-rapidapi-key': `${this.apikey1}`,
//         'x-rapidapi-host': 'twelve-data1.p.rapidapi.com'
//       })
//     };

//     return this.http.get<QuoteBorse>(url, httpOptions);
//   }
// }
//   // / GET QUOTE /-/ real-time-price
//   //GET PREZZO DEL GIORNO (DA FARE OSCILARE CON I DUE DATI PRESENTI IN QUESTA GET)
//   // const url = 'https://twelve-data1.p.rapidapi.com/quote?symbol=AMZN&outputsize=30&format=json&interval=1day';
//   // const options = {
//   //   method: 'GET',
//   //   headers: {
//   //     'x-rapidapi-key': 'bc8942ba1amshb7e93717f1c3565p163688jsnee2f17033f11',
//   //     'x-rapidapi-host': 'twelve-data1.p.rapidapi.com'
//   //   }
//   // };
  
//   // try {
//   //   const response = await fetch(url, options);
//   //   const result = await response.text();
//   //   console.log(result);
//   // } catch (error) {
//   //   console.error(error);
//   // }

