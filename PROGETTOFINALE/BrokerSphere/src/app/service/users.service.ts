import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../environment/environment.development';
import { AuthData } from '../interface/auth-data.interface';
import { User } from '../interface/user.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiBack = environment.apiBack;
  constructor(private http:HttpClient) { }

  
  updateUser(id: number, user: User): Observable<User> {
    const url = `${this.apiBack}/users/${id}`;
    return this.http.put<User>(url, user);
  }

}