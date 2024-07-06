import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/service/auth.service';
import { ProfiloService } from 'src/app/service/profilo.service';

@Component({
  selector: 'app-preleva-modal',
  templateUrl: './preleva-modal.component.html',
  styleUrls: ['./preleva-modal.component.scss']
})
export class PrelevaModalComponent {
  @Input() userId: number | undefined;
  withdrawAmount: number = 0;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  alertMessage: string | null = null;

  constructor(
    public activeModal: NgbActiveModal, 
    private profiloSrv: ProfiloService, 
    private authSrv: AuthService, 
    private translate: TranslateService
  ) {}

  withdraw() {
    if (this.withdrawAmount > 0 && this.userId !== undefined) {
      this.profiloSrv.withdrawBalance(this.userId, this.withdrawAmount).subscribe(
        (updatedUser) => {
          console.log(updatedUser);
          this.authSrv.updateUser2(updatedUser); // Aggiorna il profilo dell'utente
          this.successMessage = 'Prelievo effettuato con successo.';
          setTimeout(() => {
            this.activeModal.close();
          }, 3000); // Chiudi il modale dopo 3 secondi
        },
        (error) => console.error('Errore durante il prelievo', error)
      );
    } else {
      this.errorMessage = 'L\'importo deve essere maggiore di zero.';
    }
  }

  showSuccessAlert(message: string) {
    this.alertMessage = message;
    setTimeout(() => this.alertMessage = null, 4000); // Nasconde l'alert dopo 3 secondi
  }
}
