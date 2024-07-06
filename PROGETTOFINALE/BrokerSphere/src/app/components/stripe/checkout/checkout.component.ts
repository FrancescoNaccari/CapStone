import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgbModal, NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from 'src/app/environment/environment.development';
import { User } from 'src/app/interface/user.interface';
import { AuthService } from 'src/app/service/auth.service';
import { ProfiloService } from 'src/app/service/profilo.service';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  @Input() rechargeAmount: number = 0;
  @Input() withdrawAmount: number = 0;
  @Input() userId: string|undefined| null = ''; 
  @Output() paymentSuccess = new EventEmitter<void>();

  @ViewChild('rechargePopover', { static: false }) rechargePopover!: NgbPopover;
  @ViewChild('withdrawPopover', { static: false }) withdrawPopover!: NgbPopover;
  @ViewChild('confirmModal', { static: false }) confirmModal!: ElementRef;
  stripePromise = loadStripe(environment.stripe);
  user: User | undefined;
  alertMessage: string | null = null;

  constructor(
    private http: HttpClient, 
    private authSrv: AuthService,
    private profiloSrv: ProfiloService,
    private modalService: NgbModal,  
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.authSrv.user$.subscribe(user => {
      if (user?.user) {
        this.user = user.user;
      } else {
        this.user = undefined;
      }
    });
  }

  async pay(amount: number): Promise<void> {
    const payment = {
      name: 'ricarica',
      currency: 'eur', // moneta
      amount: amount * 100, // Importo in centesimi
      quantity: '1',
      cancelUrl: 'http://localhost:4200/cancel',
      successUrl: 'http://localhost:4200/success',
      clientReferenceId: this.user?.idUtente
    };

    const stripe = await this.stripePromise;
    if (!stripe) {
      console.error('Stripe non è stato caricato correttamente.');
      return;
    }
    
    this.http.post(`${environment.serverUrl}/payment`, payment).subscribe((data: any) => {
      stripe.redirectToCheckout({
        sessionId: data.id,
      }).then((result) => {
        if (result.error) {
          console.error('Errore durante il redirect a Stripe:', result.error.message);
        } else {
          this.paymentSuccess.emit();
        }
      });
    });
  }

  recharge() {
    if (this.rechargeAmount > 0) {
      this.pay(this.rechargeAmount);
    } else {
      this.showPopover(this.rechargePopover);
    }
  }

  withdraw() {
    if (this.withdrawAmount > 0) {
      const modalRef = this.modalService.open(ConfirmModalComponent);
      modalRef.componentInstance.amount = this.withdrawAmount;

      modalRef.result.then((result) => {
        if (result) {
          if (this.user?.idUtente) {
            this.profiloSrv.withdrawBalance(this.user.idUtente, this.withdrawAmount).subscribe(
              (updatedUser) => {
                console.log(updatedUser);
                this.authSrv.updateUser2(updatedUser); // Aggiorna il profilo dell'utente
                this.paymentSuccess.emit();
                this.translate.get('CHECKOUT.WITHDRAW_SUCCESS', { amount: this.withdrawAmount }).subscribe((res: string) => {
                  this.showSuccessAlert(res);
                });
              },
              (error) => console.error('Errore durante il prelievo', error)
            );
          } else {
            console.error('User ID is undefined');
          }
        }
      }, (reason) => {
        console.log('Prelievo annullato:', reason);
      });
    } else {
      this.showPopover(this.withdrawPopover);
    }
  }

  showPopover(popover: NgbPopover) {
    popover.open();
    setTimeout(() => popover.close(), 3000); // Nasconde il popover dopo 3 secondi
  }

  showSuccessAlert(message: string) {
    this.alertMessage = message;
    setTimeout(() => this.alertMessage = null, 4000); // Nasconde l'alert dopo 3 secondi
  }
}
