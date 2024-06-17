import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interface/user.interface';
import { AuthService } from 'src/app/service/auth.service';
import { ProfiloService } from 'src/app/service/profilo.service';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent implements OnInit {
  profilo: User | undefined;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private authSrv: AuthService, private profiloSrv: ProfiloService) { }

  ngOnInit(): void {
    this.authSrv.user$.subscribe((data) => {
      this.profilo = data?.user;
    });
  }

  updateNewsletter() {
    if (this.profilo?.idUtente) {
      this.profiloSrv.updateNewsletter(this.profilo.idUtente, this.profilo.newsletter).subscribe(
        (updatedUser) => {
          this.authSrv.updateUser(updatedUser);
          this.successMessage = 'Preferenza newsletter aggiornata con successo';
          setTimeout(() => this.successMessage = null, 3000);
        },
        (error) => {
          console.error('Errore durante l\'aggiornamento della preferenza newsletter', error);
          this.errorMessage = 'Errore durante l\'aggiornamento della preferenza newsletter';
          setTimeout(() => this.errorMessage = null, 3000);
        }
      );
    }
  }

  onNewsletterChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (this.profilo) {
      this.profilo.newsletter = input.checked;
      this.updateNewsletter();
    }
  }
}
