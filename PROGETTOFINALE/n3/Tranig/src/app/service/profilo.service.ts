import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment.development';
import { User } from '../interface/user.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfiloService {
  private apiBack=environment.apiBack;

  constructor(private http: HttpClient,private authService: AuthService) { }

  updateUser(id: number, user: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${this.apiBack}users/${id}`, user);
  }

  updateAvatar(id: number, formData: FormData) : Observable<User> {
    return this.http.patch<User>(`${this.apiBack}users/${id}/avatar`, formData)
  }

}
