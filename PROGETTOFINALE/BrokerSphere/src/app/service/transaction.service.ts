import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment.development';
import { User } from '../interface/user.interface';
import { TransactionRequest } from '../interface/transaction-request.interface';
import { Stock } from '../interface/stock.interface';
import { Transaction } from '../interface/transaction.interface';

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

  getUserStocks(userId: number): Observable<Stock[]> {
    return this.http.get<Stock[]>(`${this.apiUrl}${userId}/stocks`);
  }

  getUserTransactions(userId: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}api/transactions/${userId}`);
  }

}
