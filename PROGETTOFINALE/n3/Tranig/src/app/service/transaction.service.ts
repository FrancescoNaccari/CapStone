import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment.development';
import { User } from '../interface/user.interface';
import { TransactionRequest } from '../interface/transaction-request.interface';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = environment.apiBack; 

  constructor(private http: HttpClient) { }
  buyStock(request: TransactionRequest): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}api/buyStock`, request);
  }

  sellStock(request: TransactionRequest): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}api/sellStock`, request);
  }
}
