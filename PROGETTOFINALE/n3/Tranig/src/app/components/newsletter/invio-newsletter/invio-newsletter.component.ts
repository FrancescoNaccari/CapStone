import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Newsletter } from 'src/app/interface/newsletter.interface';
import { User } from 'src/app/interface/user.interface';
import { AuthService } from 'src/app/service/auth.service';
import { ProfiloService } from 'src/app/service/profilo.service';

@Component({
  selector: 'app-invio-newsletter',
  templateUrl: './invio-newsletter.component.html',
  styleUrls: ['./invio-newsletter.component.scss']
})
export class InvioNewsletterComponent {
  titolo: string = '';
  testo: string = '';
  successMessage: string | null = null;
  errorMessage: string | null = null;
  user: User | null = null;

  constructor(private authSrv: AuthService, private profiloSrv: ProfiloService, private router: Router) { }

  ngOnInit(): void {
    this.authSrv.user$.subscribe((data) => {
      this.user = data?.user || null;
      if (!this.isAdmin()) {
        this.router.navigate(['/profilo']);
      }
    });
  }

  isAdmin(): boolean {
    return this.user ? this.user.tipoUtente.includes('ADMIN') : false;
  }

  inviaNewsletter() {
    if (this.titolo && this.testo) {
      const newsletter: Newsletter = { titolo: this.titolo, testo: this.testo };
      this.profiloSrv.inviaNewsletter(newsletter).subscribe(
        () => {
          this.successMessage = 'Newsletter inviata con successo';
          this.titolo = '';
          this.testo = '';
          setTimeout(() => this.successMessage = null, 3000);
        },
        (error) => {
          console.error('Errore durante l\'invio della newsletter', error);
          this.errorMessage = 'Errore durante l\'invio della newsletter';
          setTimeout(() => this.errorMessage = null, 3000);
        }
      );
    } else {
      this.errorMessage = 'Titolo e testo sono obbligatori';
      setTimeout(() => this.errorMessage = null, 3000);
    }
  }
}
