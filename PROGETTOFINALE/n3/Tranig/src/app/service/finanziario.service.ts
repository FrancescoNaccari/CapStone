import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { RealTimePriceResponse } from '../interface/real-time-price-response.interface';
import { TimeSeries, TimeSeriesData, TimeSeriesValue } from '../interface/time-series-data.interface';
import { StockList } from '../interface/stock-list.interface';
import { environment } from '../environment/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FinanziarioService {

  // private url = 'https://twelve-data1.p.rapidapi.com/time_series';
  // private headers = new HttpHeaders({
  //   'x-rapidapi-key': 'bc8942ba1amshb7e93717f1c3565p163688jsnee2f17033f11',
  //   'x-rapidapi-host': 'twelve-data1.p.rapidapi.com'
  // });

  // constructor(private http: HttpClient) { }

  // getRealTimePrice(symbol: string): Observable<RealTimePriceResponse> {
  //   const params = {
  //     outputsize: '30',
  //     symbol: symbol,
  //     interval: '1day',
  //     format: 'json'
  //   };
  //   return this.http.get<RealTimePriceResponse>(this.url, { headers: this.headers, params });
  // }



//   private url = 'https://twelve-data1.p.rapidapi.com/time_series';
//   private headers = new HttpHeaders({
//     'x-rapidapi-key': 'bc8942ba1amshb7e93717f1c3565p163688jsnee2f17033f11',
//     'x-rapidapi-host': 'twelve-data1.p.rapidapi.com'
//   });

//   constructor(private http: HttpClient) { }

// //PREZZO IN TEMPO REALE  
//   getRealTimePrice(symbol: string): Observable<RealTimePriceResponse> {
//     const params = {
//       outputsize: '30',
//       symbol: symbol,
//       interval: '1day',
//       format: 'json'
//     };
//     return this.http.get<RealTimePriceResponse>(this.url, { headers: this.headers, params });
//   }


//   getTimeSeries(symbol: string): Observable<TimeSeries> {
//   const params = {
//     outputsize: '30',
//     symbol: symbol,
//     interval: '1day',
//     format: 'json'
//   };
//   return this.http.get(this.url, { headers: this.headers, params }).pipe(
//     map((response: any) => {
//       const timeSeries: TimeSeries = {
//         data: response['meta'],
//         values: response['values'].map((value: Value) => ({
//           datetime: new Date(value['datetime']),
//           open: parseFloat(value['open']),
//           high: parseFloat(value['high']),
//           low: parseFloat(value['low']),
//           close: parseFloat(value['close']),
//           volume: parseInt(value['volume'], 10)
//         }))
//       };
//       return timeSeries;
//     }),
//     catchError(error => {
//       console.error(error);
//       throw error;
//     })
//   );
// }







// private apiKey = 'bc8942ba1amshb7e93717f1c3565p163688jsnee2f17033f11';
// private host = 'twelve-data1.p.rapidapi.com';
// private timeSeriesUrl = `https://${this.host}/time_series`;
// private stocksUrl = `https://${this.host}/stocks`;

// private httpOptions = {
//   headers: new HttpHeaders({
//     'x-rapidapi-key': this.apiKey,
//     'x-rapidapi-host': this.host
//   })
// };

// constructor(private http: HttpClient) { }

// getTimeSeries(symbol: string): Observable<TimeSeries> {
//   const params = {
//     outputsize: '30',
//     symbol: symbol,
//     interval: '1day',
//     format: 'json'
//   };

//   return this.http.get<any>(this.timeSeriesUrl, { headers: this.httpOptions.headers, params })
//     .pipe(
//       map(response => this.transformTimeSeriesResponse(response)),
//       catchError(this.handleError)
//     );
// }

// getStocks(exchange: string): Observable<StockList[]> {
//   const params = {
//     exchange: exchange,
//     format: 'json'
//   };

//   return this.http.get<any>(this.stocksUrl, { headers: this.httpOptions.headers, params })
//     .pipe(
//       map(response => response.data as StockList[]),
//       catchError(this.handleError)
//     );
// }

// private transformTimeSeriesResponse(response: any): TimeSeries {
//   const timeSeriesData: TimeSeriesData = {
//     symbol: response.meta.symbol,
//     interval: response.meta.interval,
//     currency: response.meta.currency,
//     exchange_timezone: response.meta.exchange_timezone,
//     exchange: response.meta.exchange,
//     mic_code: response.meta.mic_code,
//     type: response.meta.type
//   };

//   const timeSeriesValues: TimeSeriesValue[] = response.values.map((value: any) => ({
//     datetime: new Date(value.datetime),
//     open: parseFloat(value.open),
//     high: parseFloat(value.high),
//     low: parseFloat(value.low),
//     close: parseFloat(value.close),
//     volume: parseInt(value.volume, 10)
//   }));

//   return {
//     data: timeSeriesData,
//     values: timeSeriesValues
//   };
// }

// private handleError(error: any) {
//   console.error('An error occurred', error);
//   return throwError(error.message || error);
// }
// }







///prova 3
// private apiKey = 'bc8942ba1amshb7e93717f1c3565p163688jsnee2f17033f11';
// private host = 'twelve-data1.p.rapidapi.com';
// private timeSeriesUrl = `https://${this.host}/time_series`;
// private stocksUrl = `https://${this.host}/stocks`;

// private httpOptions = {
//     headers: new HttpHeaders({
//         'x-rapidapi-key': this.apiKey,
//         'x-rapidapi-host': this.host
//     })
// };

// constructor(private http: HttpClient) { }

// getTimeSeries(symbol: string): Observable<TimeSeries> {
//     const params = {
//         outputsize: '30',
//         symbol: symbol,
//         interval: '1day',
//         format: 'json'
//     };

//     return this.http.get<any>(this.timeSeriesUrl, { headers: this.httpOptions.headers, params })
//         .pipe(
//             map(response => this.transformTimeSeriesResponse(response)),
//             catchError(this.handleError)
//         );
// }

// getStocks(exchange: string): Observable<StockList[]> {
//     const params = {
//         exchange: exchange,
//         format: 'json'
//     };

//     return this.http.get<any>(this.stocksUrl, { headers: this.httpOptions.headers, params })
//         .pipe(
//             map(response => response.data as StockList[]),
//             catchError(this.handleError)
//         );
// }

// private transformTimeSeriesResponse(response: any): TimeSeries {
//     const timeSeriesData: TimeSeriesData = {
//         symbol: response.meta.symbol,
//         interval: response.meta.interval,
//         currency: response.meta.currency,
//         exchange_timezone: response.meta.exchange_timezone,
//         exchange: response.meta.exchange,
//         mic_code: response.meta.mic_code,
//         type: response.meta.type
//     };

//     const timeSeriesValues: TimeSeriesValue[] = response.values.map((value: any) => ({
//         datetime: new Date(value.datetime),
//         open: parseFloat(value.open),
//         high: parseFloat(value.high),
//         low: parseFloat(value.low),
//         close: parseFloat(value.close),
//         volume: parseInt(value.volume, 10)
//     }));

//     return {
//         data: timeSeriesData,
//         values: timeSeriesValues
//     };
// }

// private handleError(error: any) {
//     console.error('An error occurred', error);
//     return throwError(error.message || error);
// }


// searchStock(query: string): Observable<StockList[]> {
//   const params = {
//       query: query,
//       format: 'json'
//   };

//   return this.http.get<any>(this.stocksUrl, { headers: this.httpOptions.headers, params })
//       .pipe(
//           map(response => response.data as StockList[]),
//           catchError(this.handleError)
//       );
// }




}