import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from 'src/app/environment/environment.development';
import { AuthService } from 'src/app/service/auth.service';
import { ProfiloService } from 'src/app/service/profilo.service';

@Component({
  selector: 'app-deposita-modal',
  templateUrl: './deposita-modal.component.html',
  styleUrls: ['./deposita-modal.component.scss']
})
export class DepositaModalComponent {
  @Input() userId: number | undefined;
  rechargeAmount: number = 0;
  stripePromise = loadStripe(environment.stripe);
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    public activeModal: NgbActiveModal, 
    private http: HttpClient, 
    private profiloSrv: ProfiloService, 
    private authSrv: AuthService, 
    private translate: TranslateService
  ) {}

  async recharge() {
    if (this.rechargeAmount > 0 && this.userId !== undefined) {
      const payment = {
        name: 'ricarica',
        currency: 'eur', // moneta
        amount: this.rechargeAmount * 100, // Importo in centesimi
        quantity: '1',
        cancelUrl: 'http://localhost:4200/cancel',
        successUrl: 'http://localhost:4200/success',
        clientReferenceId: this.userId
      };

      const stripe = await this.stripePromise;
      if (!stripe) {
        this.errorMessage = 'Stripe non è stato caricato correttamente.';
        return;
      }

      this.http.post(`${environment.serverUrl}/payment`, payment).subscribe((data: any) => {
        stripe.redirectToCheckout({
          sessionId: data.id,
        }).then((result) => {
          if (result.error) {
            this.errorMessage = 'Errore durante il redirect a Stripe: ' + result.error.message;
          } else {
            this.successMessage = 'Pagamento avviato con successo.';
            setTimeout(() => {
              this.activeModal.close();
            }, 3000); // Chiudi il modale dopo 3 secondi
          }
        });
      }, (error) => {
        this.errorMessage = 'Errore durante la creazione della sessione di pagamento: ' + error.message;
      });
    } else {
      this.errorMessage = 'L\'importo deve essere maggiore di zero.';
    }
  }
}
