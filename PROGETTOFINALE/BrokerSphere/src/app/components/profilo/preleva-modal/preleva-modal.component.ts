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

  constructor(
    public activeModal: NgbActiveModal, 
    private profiloSrv: ProfiloService, 
    private authSrv: AuthService, 
    private translate: TranslateService
  ) {}

  withdraw() {
    if (this.withdrawAmount > 0 && this.userId !== undefined) {
      this.profiloSrv.updateBalance(this.userId, -this.withdrawAmount).subscribe(
        (updatedUser) => {
          this.authSrv.updateUser(updatedUser);
          this.successMessage = 'Prelievo effettuato con successo.';
          setTimeout(() => {
            this.activeModal.close();
          }, 3000); // Chiudi il modale dopo 3 secondi
        },
        (error) => {
          this.errorMessage = 'Errore durante il prelievo: ' + error.message;
        }
      );
    } else {
      this.errorMessage = 'L\'importo deve essere maggiore di zero.';
    }
  }
}
