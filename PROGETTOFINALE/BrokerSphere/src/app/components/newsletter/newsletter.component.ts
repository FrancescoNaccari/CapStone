import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthData } from 'src/app/interface/auth-data.interface';
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
  isAdmin: boolean = false;

  constructor(private authSrv: AuthService, private profiloSrv: ProfiloService, private translate: TranslateService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.authSrv.user$.subscribe((data) => {
      if (data && isAuthData(data)) {
        this.profilo = data.user;
        this.isAdmin = data.user.tipoUtente.includes('ADMIN'); // Supponendo che i ruoli siano un array di stringhe
      }
    });
  }

  updateNewsletter() {
    if (this.profilo?.idUtente) {
      this.profiloSrv.updateNewsletter(this.profilo.idUtente, this.profilo.newsletter).subscribe(
        (updatedUser) => {
          this.authSrv.updateUser(updatedUser);
          this.successMessage = this.translate.instant('newsletter.SUCCESS_MESSAGE');
          this.cd.detectChanges(); 
          setTimeout(() => this.successMessage = null, 3000);
        },
        (error) => {
          console.error('Errore durante l\'aggiornamento della preferenza newsletter', error);
          this.errorMessage = this.translate.instant('newsletter.ERROR_MESSAGE');
          this.cd.detectChanges(); 
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

function isAuthData(user: any): user is AuthData {
  return user && 'accessToken' in user;
}
