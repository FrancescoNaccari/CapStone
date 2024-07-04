import { Component } from '@angular/core';
import { ProfiloService } from 'src/app/service/profilo.service';
import { AuthService } from 'src/app/service/auth.service';
import { User } from 'src/app/interface/user.interface';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-iscrizione-newsletter',
  templateUrl: './iscrizione-newsletter.component.html',
  styleUrls: ['./iscrizione-newsletter.component.scss']
})
export class IscrizioneNewsletterComponent {
  email: string = '';
  privacyAccepted: boolean = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  currentUser: User | undefined;

  constructor(
    private profiloSrv: ProfiloService,
    private authSrv: AuthService,
    private translate: TranslateService
  ) {
    this.authSrv.user$.subscribe(user => {
      this.currentUser = user?.user;
      this.email = this.currentUser?.email || '';
      this.privacyAccepted = this.currentUser?.newsletter || false;
    });
  }

  subscribeToNewsletter() {
    if (this.email && this.privacyAccepted) {
      if (this.currentUser?.email === this.email && this.currentUser?.newsletter) {
        this.errorMessage = this.translate.instant('iscrizioneNewsletter.ALREADY_SUBSCRIBED_MESSAGE');
        setTimeout(() => this.errorMessage = null, 3000);
      } else {
        this.profiloSrv.updateNewsletter(this.currentUser?.idUtente!, true).subscribe(
          () => {
            this.successMessage = this.translate.instant('iscrizioneNewsletter.SUCCESS_MESSAGE');
            setTimeout(() => this.successMessage = null, 3000);
          },
          (error) => {
            console.error('Subscription error', error);
            this.errorMessage = this.translate.instant('iscrizioneNewsletter.SUBSCRIPTION_ERROR');
            setTimeout(() => this.errorMessage = null, 3000);
          }
        );
      }
    } else {
      this.errorMessage = this.translate.instant('iscrizioneNewsletter.PRIVACY_POLICY_ERROR');
      setTimeout(() => this.errorMessage = null, 3000);
    }
  }
}
