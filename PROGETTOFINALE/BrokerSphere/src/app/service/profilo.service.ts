import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment.development';
import { User } from '../interface/user.interface';
import { AuthService } from './auth.service';
import { Newsletter } from '../interface/newsletter.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfiloService {
private apiBack = environment.apiBack;

constructor(private http: HttpClient, private authService: AuthService) { }

updateUser(id: number, user: Partial<User>): Observable<User> {
  return this.http.patch<User>(`${this.apiBack}users/${id}`, user);
}

updateAvatar(id: number, formData: FormData): Observable<User> {
  return this.http.patch<User>(`${this.apiBack}users/${id}/avatar`, formData);
}

updatePassword(id: number, currentPassword: string, newPassword: string): Observable<void> {
  return this.http.patch<void>(`${this.apiBack}users/${id}/password`, { currentPassword, newPassword });
}
updateNewsletter(id: number, newsletter: boolean): Observable<User> {
  return this.http.put<User>(`${this.apiBack}users/${id}/newsletter`, { newsletter });
}

inviaNewsletter(newsletter: Newsletter): Observable<void> {
  return this.http.post<void>(`${this.apiBack}newsletter/send`, newsletter);

}

updateBalance(userId: number, amount: number): Observable<User> {
  return this.http.put<User>(`${this.apiBack}users/${userId}/balance`, { amount });
}

withdrawBalance(userId: number, amount: number): Observable<number> {
  return this.http.post<number>(`${environment.serverUrl}/users/${userId}/withdraw`, { amount });
}
}