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


}